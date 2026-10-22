// Интеграция с Битрикс24: создание лида (crm.lead.add) и прикрепление файла чертежа.
// Используется серверным эндпоинтом /api/lead.

const BITRIX_TIMEOUT_MS = 15_000;

export interface BitrixLeadInput {
  title: string;
  name: string;
  secondName?: string;
  phone: string;
  email: string;
  companyTitle?: string;
  comments?: string;
  sourceId?: string;
}

/** Универсальный вызов REST-вебхука Битрикс24 */
async function callBitrix(webhookUrl: string, method: string, params: Record<string, unknown>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BITRIX_TIMEOUT_MS);
  try {
    const res = await fetch(`${webhookUrl.replace(/\/+$/, "")}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Bitrix24 HTTP ${res.status}`);
    }
    const json = (await res.json()) as { result?: unknown };
    return json.result;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Создаёт лид в Битрикс24 через crm.lead.add.
 * Возвращает ID созданного лида.
 */
export async function createBitrixLead(lead: BitrixLeadInput): Promise<number> {
  const webhookUrl = process.env.BITRIX24_WEBHOOK_URL;
  if (!webhookUrl) {
    // TODO: переменная окружения обязательна на проде — см. .env.example
    throw new Error("BITRIX24_WEBHOOK_URL is not configured");
  }

  const fields: Record<string, unknown> = {
    TITLE: lead.title,
    // TODO: при необходимости поменять CATEGORY_ID (направление)/ASSIGNED_ID (ответственный менеджер)
    COMMENTS: lead.comments ?? "",
    SOURCE_ID: lead.sourceId ?? "WEBFORM", // TODO: завести источник «Сайт» в CRM и подставить его ID
  };

  if (lead.name) fields.NAME = lead.name;
  if (lead.secondName) fields.SECOND_NAME = lead.secondName;
  if (lead.phone) fields.PHONE = [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }];
  if (lead.email) fields.EMAIL = [{ VALUE: lead.email, VALUE_TYPE: "WORK" }];
  if (lead.companyTitle) fields.COMPANY_TITLE = lead.companyTitle;

  const result = (await callBitrix(webhookUrl, "crm.lead.add", { fields })) as number;
  if (typeof result !== "number" || result <= 0) {
    throw new Error("Bitrix24 crm.lead.add returned unexpected result");
  }
  return result;
}

/**
 * Прикрепляет файл чертежа к лиду через crm.timeline.attachment.uploadFileForElement.
 * Ошибка прикрепления НЕ отменяет создание лида — только логируется (graceful degradation).
 */
export async function attachDrawingToLead(
  leadId: number,
  file: File
): Promise<void> {
  const webhookUrl = process.env.BITRIX24_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("BITRIX24_WEBHOOK_URL is not configured");

  const form = new FormData();
  // Тип элемента 10 = CRM (для timeline attachment API)
  form.append("elementType", "10");
  form.append("elementId", String(leadId));
  form.append("file", file, file.name);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BITRIX_TIMEOUT_MS);
  try {
    const res = await fetch(
      `${webhookUrl.replace(/\/+$/, "")}/crm.timeline.attachment.uploadFileForElement`,
      { method: "POST", body: form, signal: controller.signal }
    );
    if (!res.ok) throw new Error(`Bitrix24 attachment HTTP ${res.status}`);
    const json = (await res.json()) as { result?: { id?: number } };
    if (!json.result?.id) throw new Error("Bitrix24 attachment upload failed");
  } finally {
    clearTimeout(timer);
  }
}
