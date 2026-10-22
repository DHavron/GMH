"use client";

import { useCallback, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { SiteStrings } from "@/lib/i18n/en";
import { UPLOAD } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import {
  FileIcon,
  SpinnerIcon,
  AlertIcon,
  CheckIcon,
  CloseIcon,
} from "@/components/ui/icons";

type FieldErrors = Partial<
  Record<"name" | "phone" | "email" | "drawing", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()\-]{7,20}$/;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Клиентская проверка файла чертежа: расширение + размер */
function validateDrawing(file: File | null, strings: SiteStrings): string | undefined {
  if (!file) return strings.form.errors.fileRequired;
  const ext = ("." + (file.name.split(".").pop() ?? "")).toLowerCase();
  if (!(UPLOAD.allowedExtensions as readonly string[]).includes(ext)) {
    return strings.form.errors.fileType;
  }
  if (file.size > UPLOAD.maxFileSizeBytes) {
    return strings.form.errors.fileSize;
  }
  return undefined;
}

export default function LeadForm({ strings, locale }: { strings: SiteStrings; locale: Locale }) {
  const f = strings.form.fields;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const [drawing, setDrawing] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // aria-live区域 для озвучки статуса скринридерам
  const liveRef = useRef<HTMLDivElement>(null);

  const acceptList = UPLOAD.allowedExtensions.join(",");

  const handleFile = useCallback(
    (file: File | null) => {
      setDrawing(file);
      const err = file ? validateDrawing(file, strings) : undefined;
      setErrors((prev) => ({ ...prev, drawing: err ?? undefined }));
      if (!file) setErrors((prev) => ({ ...prev, drawing: strings.form.errors.fileRequired }));
    },
    [strings]
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0] ?? null);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = strings.form.errors.required;
    else if (name.trim().length < 2) next.name = strings.form.errors.nameShort;
    if (!phone.trim()) next.phone = strings.form.errors.required;
    else if (!PHONE_RE.test(phone.trim())) next.phone = strings.form.errors.phoneInvalid;
    if (!email.trim()) next.email = strings.form.errors.required;
    else if (!EMAIL_RE.test(email.trim())) next.email = strings.form.errors.emailInvalid;
    const fileErr = validateDrawing(drawing, strings);
    if (fileErr) next.drawing = fileErr;
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      // фокус на первом невалидном поле
      const firstKey = Object.keys(nextErrors)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"], #drawing-zone`);
      (firstKey === "drawing" ? fileInputRef.current : el)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const payload = new FormData();
      payload.append("name", name.trim());
      payload.append("phone", phone.trim());
      payload.append("email", email.trim());
      payload.append("company", company.trim());
      payload.append("comment", comment.trim());
      payload.append("locale", locale);
      if (drawing) payload.append("drawing", drawing, drawing.name);

      const res = await fetch("/api/lead", {
        method: "POST",
        body: payload,
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (res.ok && data?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerMessage(
          data?.error === "NETWORK"
            ? strings.form.errors.network
            : strings.form.errors.server
        );
      }
    } catch {
      setStatus("error");
      setServerMessage(strings.form.errors.network);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setComment("");
    setDrawing(null);
    setErrors({});
    setStatus("idle");
    setServerMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputCls = (hasError: boolean) =>
    `w-full rounded-md border bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-graphite-400 transition-colors focus:border-gold-500 ${
      hasError ? "border-red-500" : "border-graphite-900/20"
    }`;

  /* ─── Экран успеха ─────────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <section id="lead-form" aria-labelledby="lead-title" className="bg-graphite-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div role="status" className="rounded-2xl border border-gold-600/40 bg-gradient-to-b from-graphite-800 to-graphite-950 p-10 text-center shadow-2xl">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold-500 text-graphite-950">
                <CheckIcon className="size-8" />
              </span>
              <h2 id="lead-title" className="mt-6 text-2xl font-extrabold">
                {strings.form.success.title}
              </h2>
              <p className="mt-3 text-white/70">{strings.form.success.text}</p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-8 rounded-md border border-gold-600/50 px-6 py-3 text-sm font-bold text-gold-400 transition-colors hover:bg-gold-600/10"
              >
                {strings.form.success.again}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ─── Форма ────────────────────────────────────────────────────────── */
  return (
    <section id="lead-form" aria-labelledby="lead-title" className="diagonal-hatch bg-graphite-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="lead-title" className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            {strings.form.heading}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/60 sm:text-base">
            {strings.form.subheading}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            encType="multipart/form-data"
            className="metal-panel mt-12 space-y-5 rounded-2xl border border-white/10 p-6 shadow-2xl sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Имя */}
              <div>
                <label htmlFor="lf-name" className="mb-1.5 block text-sm font-semibold">
                  {f.name} <span className="text-gold-400" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="lf-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "lf-name-error" : undefined}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={f.namePlaceholder}
                  className={inputCls(!!errors.name)}
                />
                {errors.name && (
                  <p id="lf-name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <AlertIcon className="size-3.5 shrink-0" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Телефон */}
              <div>
                <label htmlFor="lf-phone" className="mb-1.5 block text-sm font-semibold">
                  {f.phone} <span className="text-gold-400" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="lf-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "lf-phone-error" : undefined}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={f.phonePlaceholder}
                  className={inputCls(!!errors.phone)}
                />
                {errors.phone && (
                  <p id="lf-phone-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <AlertIcon className="size-3.5 shrink-0" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="lf-email" className="mb-1.5 block text-sm font-semibold">
                  {f.email} <span className="text-gold-400" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="lf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "lf-email-error" : undefined}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.emailPlaceholder}
                  className={inputCls(!!errors.email)}
                />
                {errors.email && (
                  <p id="lf-email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <AlertIcon className="size-3.5 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Компания */}
              <div>
                <label htmlFor="lf-company" className="mb-1.5 block text-sm font-semibold">
                  {f.company}
                </label>
                <input
                  id="lf-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={f.companyPlaceholder}
                  className={inputCls(false)}
                />
              </div>
            </div>

            {/* Комментарий */}
            <div>
              <label htmlFor="lf-comment" className="mb-1.5 block text-sm font-semibold">
                {f.comment}
              </label>
              <textarea
                id="lf-comment"
                name="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={f.commentPlaceholder}
                className={inputCls(false)}
              />
            </div>

            {/* Чертёж — обязательный файл */}
            <fieldset className="min-w-0">
              <legend className="mb-1.5 text-sm font-semibold">
                {f.drawing} <span className="text-gold-400" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </legend>
              <p className="mb-3 text-xs leading-relaxed text-white/50">{f.drawingHint}</p>

              <div
                id="drawing-zone"
                tabIndex={-1}
                role="button"
                aria-label={f.drawingDropzone}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
                  dragOver
                    ? "border-gold-400 bg-gold-400/10"
                    : errors.drawing
                      ? "border-red-500/70 bg-red-500/5"
                      : "border-white/25 bg-white/[0.03] hover:border-gold-500/60"
                }`}
              >
                <FileIcon className="size-8 text-gold-400" />
                {drawing ? (
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                    <span className="max-w-[220px] truncate text-sm font-semibold text-white">
                      {drawing.name}
                    </span>
                    <span className="text-xs text-white/50">{formatBytes(drawing.size)}</span>
                    <button
                      type="button"
                      aria-label={f.removeFile}
                      className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white hover:bg-red-500/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      <CloseIcon className="size-3" /> {f.removeFile}
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm text-white/70">{f.drawingDropzone}</span>
                    <span className="rounded bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-graphite-950">
                      {f.drawingButton}
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  id="lf-drawing"
                  name="drawing"
                  type="file"
                  accept={acceptList}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.drawing}
                  aria-describedby={errors.drawing ? "lf-drawing-error" : "lf-drawing-hint"}
                  onChange={onInputChange}
                  className="sr-only"
                />
              </div>
              <p id="lf-drawing-hint" className="sr-only">{f.drawingHint}</p>
              {errors.drawing && (
                <p id="lf-drawing-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-400">
                  <AlertIcon className="size-3.5 shrink-0" /> {errors.drawing}
                </p>
              )}
            </fieldset>

            {/* Общее сообщение об ошибке отправки */}
            {status === "error" && serverMessage && (
              <div role="alert" className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertIcon className="mt-0.5 size-4 shrink-0" />
                {serverMessage}
              </div>
            )}

            <p className="text-xs leading-relaxed text-white/40">{f.consent}</p>

            <button
              type="submit"
              disabled={status === "submitting"}
              aria-disabled={status === "submitting"}
              className="group relative flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-4 text-base font-extrabold text-graphite-950 shadow-xl shadow-gold-600/25 transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <SpinnerIcon className="size-5 animate-spin" />
                  {f.submitting}
                </>
              ) : (
                f.submit
              )}
            </button>

            {/* Живой регион для объявлений о статусе отправки */}
            <div ref={liveRef} aria-live="polite" className="sr-only">
              {status === "submitting" ? f.submitting : status === "error" ? serverMessage : ""}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
