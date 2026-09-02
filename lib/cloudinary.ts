import crypto from "crypto";

export const CLOUDINARY_FOLDER = "doksli-techno";

/**
 * Membuat signature Cloudinary.
 * PENTING: parameter harus urut alfabetis dan PERSIS sama dengan
 * yang nanti dikirim browser ke Cloudinary. Beda sedikit -> Invalid Signature.
 */
export function buildSignature(params: Record<string, string | number>) {
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) throw new Error("CLOUDINARY_API_SECRET belum di-set");

  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(toSign + secret)
    .digest("hex");
}

/** Sisipkan transformasi ke URL Cloudinary agar gambar ringan. */
export function optimize(url: string, width = 800) {
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
}
