import nodemailer from "nodemailer";
import type { InquiryInput } from "@/lib/validation";

const DEFAULT_SMTP_PORT = 465;
const CONNECTION_TIMEOUT_MS = 8000;
const SOCKET_TIMEOUT_MS = 10000;

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.INQUIRY_TO_EMAIL,
  );
}

/** Strips line breaks so user input can never inject extra mail headers. */
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

function buildBody(inquiry: InquiryInput): { subject: string; text: string } {
  const common = [
    `Ad soyad: ${inquiry.name}`,
    `E-posta: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || "-"}`,
  ];

  if (inquiry.type === "quote") {
    return {
      subject: `Yeni teklif talebi: ${singleLine(inquiry.name)}`,
      text: [
        "Nortem Log sitesinden yeni bir TEKLİF talebi geldi.",
        "",
        ...common,
        `Gönderi türü: ${inquiry.shipmentType}`,
        `Çıkış: ${inquiry.origin}`,
        `Varış: ${inquiry.destination}`,
        "",
        "Yük bilgisi:",
        inquiry.cargo,
      ].join("\n"),
    };
  }

  return {
    subject: `Yeni iletişim mesajı: ${singleLine(inquiry.name)}`,
    text: [
      "Nortem Log sitesinden yeni bir İLETİŞİM mesajı geldi.",
      "",
      ...common,
      "",
      "Mesaj:",
      inquiry.message,
    ].join("\n"),
  };
}

/** Sends the inquiry to the business inbox. "Reply" in the mail client answers the customer. */
export async function sendInquiryEmail(inquiry: InquiryInput): Promise<void> {
  const port = Number(process.env.SMTP_PORT ?? DEFAULT_SMTP_PORT);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: CONNECTION_TIMEOUT_MS,
    socketTimeout: SOCKET_TIMEOUT_MS,
  });

  const { subject, text } = buildBody(inquiry);
  await transport.sendMail({
    from: `"Nortem Log Web" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.INQUIRY_TO_EMAIL,
    replyTo: inquiry.email,
    subject,
    text,
  });
}
