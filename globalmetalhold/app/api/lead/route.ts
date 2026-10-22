// Серверный эндпоинт приёма B2B-заявок: /api/lead
// 1. Валидирует поля формы и файл чертежа (тип + размер) на сервере.
// 2. Создаёт лид в Битрикс24 через crm.lead.add (BITRIX24_WEBHOOK_URL).
// 3. Прикрепляет чертёж к лиду; ошибка прикрепления не отменяет создание лида.
// 4. Возвращает { ok } или понятную ошибку; все сбои логируются на сервере.

import { NextResponse, type NextRequest } from "next/server";
import { UPLOAD } from "@/lib/site";
import { createBitrixLead, attachDrawingToLead } from "@/lib/bitrix";

export const runtime = "nodejs"; //FormData/File API
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()\-]{7,20}$/;

/** Простейшая защита от спама: honeypot-поле + базовые лимиты длины */
const LIMITS = { name: 120, phone: 40, email: 160, company: 160, comment: 4000 };

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return bad("INVALID_BODY");
    }

    // Honeypot: боты заполняют скрытое поле — тихо «принимаем», ничего не отправляя
    if ((form.get("website") as string)?.length) {
      return NextResponse.json({ ok: true });
    }

    const getStr = (key: string, max: number) => {
      const raw = form.get(key);
      return typeof raw === "string" ? raw.trim().slice(0, max) : "";
    };

    const name = getStr("name", LIMITS.name);
    const phone = getStr("phone", LIMITS.phone);
    const email = getStr("email", LIMITS.email);
    const company = getStr("company", LIMITS.company);
    const comment = getStr("comment", LIMITS.comment);
    const locale = getStr("locale", 5) === "en" ? "en" : "ru";

    // ── Серверная валидация полей ────────────────────────────────────────
    if (name.length < 2) return bad("FIELD_NAME");
    if (!PHONE_RE.test(phone)) return bad("FIELD_PHONE");
    if (!EMAIL_RE.test(email)) return bad("FIELD_EMAIL");

    // ── Серверная проверка файла чертежа (тип + размер) ──────────────────
    const drawing = form.get("drawing");
    if (!(drawing instanceof File) || drawing.size === 0) {
      return bad("FIELD_FILE_REQUIRED");
    }
    const ext = ("." + (drawing.name.split(".").pop() ?? "")).toLowerCase();
    if (!(UPLOAD.allowedExtensions as readonly string[]).includes(ext)) {
      return bad("FIELD_FILE_TYPE");
    }
    if (drawing.size > UPLOAD.maxFileSizeBytes) {
      return bad("FIELD_FILE_SIZE");
    }

    // ── Формируем заголовок лида и комментарий для Битрикс24 ─────────────
    const title =
      locale === "ru"
        ? `Заявка с сайта: ${company || name}${ext.toUpperCase().replace(".", " / ")}`
        : `Website lead: ${company || name}${ext.toUpperCase().replace(".", " / ")}`;

    const commentsBody = [
      locale === "ru" ? "Имя:" : "Name:", name,
      "|",
      locale === "ru" ? "Телефон:" : "Phone:", phone,
      "|",
      "Email:", email,
      company ? `| ${locale === "ru" ? "Компания:" : "Company:"} ${company}` : "",
      comment ? `| ${locale === "ru" ? "Комментарий:" : "Comment:"} ${comment}` : "",
      `| ${locale === "ru" ? "Язык заявки:" : "Lead language:"} ${locale}`,
      `| ${locale === "ru" ? "Файл чертежа:" : "Drawing file:"} ${drawing.name} (${(drawing.size / 1024 / 1024).toFixed(2)} MB)`,
    ]
      .filter(Boolean)
      .join(" ");

    // ── Создание лида в CRM ──────────────────────────────────────────────
    const leadId = await createBitrixLead({
      title,
      name,
      phone,
      email,
      companyTitle: company || undefined,
      comments: commentsBody,
    });

    // ── Прикрепление чертежа (graceful: ошибка не отменяет лид) ──────────
    try {
      await attachDrawingToLead(leadId, drawing);
    } catch (attachError) {
      console.error("[/api/lead] Failed to attach drawing to lead", leadId, attachError);
      // Лид уже создан — пользователю всё равно отвечаем успехом.
    }

    return NextResponse.json({ ok: true, leadId });
  } catch (error) {
    console.error("[/api/lead] Unhandled error:", error);
    // Не раскрываем детали внутренней ошибки клиенту
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
