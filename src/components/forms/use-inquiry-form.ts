"use client";

import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";

export type FormStatus = "idle" | "submitting" | "success" | "error" | "limited";
type FieldErrors = Record<string, string>;

function readValues(form: HTMLFormElement): Record<string, unknown> {
  const data = new FormData(form);
  const values: Record<string, unknown> = {};
  data.forEach((value, key) => {
    values[key] = value;
  });
  values.consent = data.get("consent") === "on";
  return values;
}

function firstErrors(error: z.ZodError): FieldErrors {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  const result: FieldErrors = {};
  for (const [field, messages] of Object.entries(flat)) {
    if (messages?.[0]) result[field] = messages[0];
  }
  return result;
}

/**
 * Shared validate-then-submit flow for the quote and contact forms:
 * validates on blur and on submit, focuses the first invalid field, then POSTs to /api/inquiry.
 */
export function useInquiryForm(type: "quote" | "contact", schema: z.ZodType) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);

  function validateField(name: string) {
    if (!formRef.current) return;
    const result = schema.safeParse(readValues(formRef.current));
    const next = result.success ? {} : firstErrors(result.error);
    setErrors((current) => {
      const copy = { ...current };
      if (next[name]) copy[name] = next[name];
      else delete copy[name];
      return copy;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);

    const result = schema.safeParse(readValues(form));
    if (!result.success) {
      const found = firstErrors(result.error);
      setErrors(found);
      const firstName = Object.keys(found)[0];
      (form.elements.namedItem(firstName) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...(result.data as Record<string, unknown>) }),
      });
      if (response.ok) setStatus("success");
      else setStatus(response.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setErrors({});
    setAttempted(false);
  }

  return { formRef, status, errors, attempted, validateField, onSubmit, reset };
}
