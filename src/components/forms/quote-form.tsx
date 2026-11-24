"use client";

import { FormAlert, SuccessPanel } from "@/components/forms/form-feedback";
import {
  ConsentField,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { useInquiryForm } from "@/components/forms/use-inquiry-form";
import { Button } from "@/components/ui/button";
import { quoteSchema, shipmentTypes } from "@/lib/validation";

export function QuoteForm() {
  const { formRef, status, errors, attempted, validateField, onSubmit, reset } = useInquiryForm(
    "quote",
    quoteSchema,
  );

  if (status === "success") {
    return (
      <SuccessPanel
        title="Talebiniz alındı"
        text="Teşekkürler. Gönderi bilgilerinizi inceleyip en kısa sürede sizinle iletişime geçeceğiz."
        resetLabel="Yeni teklif talebi"
        onReset={reset}
      />
    );
  }

  const common = { onBlurField: validateField };
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label="Teklif talep formu">
      {attempted && hasErrors ? <FormAlert kind="validation" /> : null}
      {status === "error" ? <FormAlert kind="server" /> : null}
      {status === "limited" ? <FormAlert kind="limited" /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Ad soyad" required autoComplete="name" error={errors.name} {...common} />
        <TextField
          name="phone"
          label="Telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+90 5xx xxx xx xx"
          required
          error={errors.phone}
          {...common}
        />
      </div>
      <TextField
        name="email"
        label="E-posta"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        error={errors.email}
        {...common}
      />
      <SelectField
        name="shipmentType"
        label="Gönderi türü"
        options={shipmentTypes}
        required
        error={errors.shipmentType}
        {...common}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="origin"
          label="Çıkış şehri"
          placeholder="Örn. İstanbul"
          required
          error={errors.origin}
          {...common}
        />
        <TextField
          name="destination"
          label="Varış ülkesi / şehri"
          placeholder="Örn. Almanya, Berlin"
          required
          error={errors.destination}
          {...common}
        />
      </div>
      <TextAreaField
        name="cargo"
        label="Yük bilgisi"
        hint="Yükün cinsi, yaklaşık ağırlık ve hacim, palet/koli adedi gibi bilgileri yazabilirsiniz."
        required
        error={errors.cargo}
        {...common}
      />
      <ConsentField error={errors.consent} onBlurField={validateField} />
      <Honeypot />

      <Button
        type="submit"
        icon="arrow"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Gönderiliyor…" : "Teklif talep et"}
      </Button>
    </form>
  );
}
