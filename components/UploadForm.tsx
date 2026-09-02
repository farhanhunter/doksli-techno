"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "signing" | "uploading" | "saving" | "done";

export default function UploadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const busy = status !== "idle" && status !== "done";

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Pilih foto dulu.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const kodePanitia = String(fd.get("kodePanitia") ?? "");

    try {
      // --- Langkah 1: minta signature dari server kita ---
      setStatus("signing");
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kodePanitia }),
      });
      if (!signRes.ok) {
        const j = await signRes.json().catch(() => ({}));
        throw new Error(j.error ?? "Gagal mengambil signature");
      }
      const { signature, timestamp, folder, apiKey, cloudName } =
        await signRes.json();

      // --- Langkah 2: upload LANGSUNG ke Cloudinary (bypass limit 4.5MB) ---
      setStatus("uploading");
      const cldForm = new FormData();
      cldForm.append("file", file);
      cldForm.append("api_key", apiKey);
      cldForm.append("timestamp", String(timestamp));
      cldForm.append("folder", folder);
      cldForm.append("signature", signature);

      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: cldForm }
      );
      if (!cldRes.ok) throw new Error("Upload ke Cloudinary gagal");
      const cld = await cldRes.json();

      // --- Langkah 3: simpan metadata ke database kita ---
      setStatus("saving");
      const saveRes = await fetch("/api/dokumentasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kodePanitia,
          namaKegiatan: fd.get("namaKegiatan"),
          deskripsi: fd.get("deskripsi"),
          lokasi: fd.get("lokasi"),
          tanggal: fd.get("tanggal"),
          uploader: fd.get("uploader"),
          kategori: fd.get("kategori"),
          imageUrl: cld.secure_url,
          publicId: cld.public_id,
          width: cld.width,
          height: cld.height,
        }),
      });
      if (!saveRes.ok) {
        const j = await saveRes.json().catch(() => ({}));
        throw new Error(j.error ?? "Gagal menyimpan data");
      }

      setStatus("done");
      router.push("/galeri");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("idle");
    }
  }

  const label: Record<Status, string> = {
    idle: "Upload Dokumentasi",
    signing: "Menyiapkan…",
    uploading: "Mengunggah foto…",
    saving: "Menyimpan data…",
    done: "Selesai",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Nama Kegiatan" required>
        <input name="namaKegiatan" required maxLength={150} className={input} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tanggal" required>
          <input type="date" name="tanggal" required className={input} />
        </Field>
        <Field label="Lokasi">
          <input name="lokasi" maxLength={150} className={input} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Diunggah oleh">
          <input name="uploader" maxLength={100} className={input} />
        </Field>
        <Field label="Kategori">
          <select name="kategori" className={input} defaultValue="">
            <option value="">— pilih —</option>
            <option>Seremonial</option>
            <option>Workshop</option>
            <option>Lomba</option>
            <option>Hiburan</option>
            <option>Lainnya</option>
          </select>
        </Field>
      </div>

      <Field label="Deskripsi">
        <textarea name="deskripsi" rows={3} className={input} />
      </Field>

      <Field label="Foto" required>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onPickFile}
          required
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-paper"
        />
      </Field>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Pratinjau"
          className="max-h-64 rounded-lg border border-ink/10 object-contain"
        />
      )}

      <Field label="Kode Panitia" required>
        <input type="password" name="kodePanitia" required className={input} />
      </Field>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-ink px-5 py-3 font-medium text-paper disabled:opacity-50"
      >
        {label[status]}
      </button>
    </form>
  );
}

const input =
  "w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-brass";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">
        {label}
        {required && <span className="text-brass"> *</span>}
      </span>
      {children}
    </label>
  );
}
