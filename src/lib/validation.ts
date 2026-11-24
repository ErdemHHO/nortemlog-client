import { z } from "zod";

const requiredText = (message: string, min = 2, max = 120) =>
  z.string().trim().min(min, message).max(max, "Bu alan çok uzun.");

const email = z.string().trim().pipe(z.email("Geçerli bir e-posta adresi girin."));

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s().-]{10,18}$/, "Geçerli bir telefon numarası girin.");

const consent = z.literal(true, {
  error: "Devam etmek için onay vermeniz gerekiyor.",
});

/** Hidden field that real users never fill in. */
const honeypot = z.string().max(0).optional();

export const shipmentTypes = [
  "Karayolu taşımacılığı",
  "Denizyolu taşımacılığı",
  "Havayolu taşımacılığı",
  "Parsiyel taşımacılık",
  "Ekspres taşımacılık",
  "Depolama",
  "Gümrükleme",
  "İhracat / ithalat",
  "Henüz emin değilim",
] as const;

export const quoteSchema = z.object({
  name: requiredText("Adınızı ve soyadınızı yazın.", 3, 80),
  phone,
  email,
  shipmentType: z.enum(shipmentTypes, { error: "Bir gönderi türü seçin." }),
  origin: requiredText("Çıkış şehrini yazın."),
  destination: requiredText("Varış ülkesini veya şehrini yazın."),
  cargo: requiredText("Yükünüzü kısaca tanımlayın.", 5, 600),
  consent,
  website: honeypot,
});

export const contactSchema = z.object({
  name: requiredText("Adınızı ve soyadınızı yazın.", 3, 80),
  email,
  phone: z.union([z.literal(""), phone]).optional(),
  message: requiredText("Mesajınızı yazın.", 10, 1500),
  consent,
  website: honeypot,
});

export const inquirySchema = z.discriminatedUnion("type", [
  quoteSchema.extend({ type: z.literal("quote") }),
  contactSchema.extend({ type: z.literal("contact") }),
]);

export type QuoteInput = z.infer<typeof quoteSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
