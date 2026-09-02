# Doksli Techno

Web arsip **dokumentasi asli** kegiatan Techno. Foto dari lapangan diunggah, disimpan, dan ditampilkan di galeri publik.

**Live:** _(isi setelah deploy)_

---

## Stack

- **Next.js 15** (App Router) + TypeScript — frontend & backend jadi satu
- **Postgres** (Neon) + **Prisma**
- **Cloudinary** — penyimpanan & CDN gambar
- **Tailwind CSS**
- **Vercel** — hosting

## Arsitektur Upload

Foto **tidak** melewati server kita. Serverless function Vercel punya limit body 4.5 MB, sedangkan foto HP mudah melebihi itu. Jadi:

```
Browser  ──1── POST /api/upload/sign ──▶  Server (bikin signature)
Browser  ──2── POST langsung ─────────▶  Cloudinary
Browser  ──3── POST /api/dokumentasi ─▶  Server (simpan metadata ke Postgres)
```

API secret tetap aman di server; browser hanya menerima signature berumur pendek.

## Setup Lokal

```bash
git clone https://github.com/<username>/doksli-techno.git
cd doksli-techno
npm install

cp .env.example .env.local   # lalu isi nilainya

npx prisma db push           # bikin tabel
npm run db:seed              # opsional, isi data contoh
npm run dev
```

Buka http://localhost:3000

## Environment Variables

| Variable | Keterangan |
|---|---|
| `DATABASE_URL` | Connection string Postgres (pakai **pooled** URL dari Neon) |
| `CLOUDINARY_CLOUD_NAME` | Dari dashboard Cloudinary |
| `CLOUDINARY_API_KEY` | Dari dashboard Cloudinary |
| `CLOUDINARY_API_SECRET` | **Jangan** diberi prefix `NEXT_PUBLIC_` |
| `UPLOAD_SECRET` | Kode panitia untuk bisa upload |

Semua variable di atas juga harus di-set di **Vercel → Settings → Environment Variables**.

## API

| Method | Path | Keterangan |
|---|---|---|
| `POST` | `/api/upload/sign` | Generate signature Cloudinary |
| `GET` | `/api/dokumentasi` | List galeri (`?page=&limit=&kategori=`) |
| `POST` | `/api/dokumentasi` | Simpan metadata dokumentasi |
| `GET` | `/api/dokumentasi/[id]` | Detail |
| `DELETE` | `/api/dokumentasi/[id]` | Hapus dari DB + Cloudinary |

## Struktur

```
app/
├── page.tsx                    Landing
├── galeri/page.tsx             Grid galeri
├── galeri/[id]/page.tsx        Detail
├── upload/page.tsx             Form upload
└── api/
    ├── upload/sign/route.ts
    └── dokumentasi/
        ├── route.ts
        └── [id]/route.ts
components/UploadForm.tsx
lib/prisma.ts                   Singleton (wajib untuk serverless)
lib/cloudinary.ts               Signature + optimizer URL
prisma/schema.prisma
```

## Deploy ke Vercel

1. Push repo ke GitHub
2. Vercel → **Add New Project** → import repo
3. Isi semua Environment Variables
4. Deploy

`prisma generate` sudah otomatis lewat script `postinstall` dan `build`.

## Troubleshooting

| Error | Solusi |
|---|---|
| `Invalid Signature` | Parameter yang di-sign harus persis sama & urut alfabetis dengan yang dikirim ke Cloudinary |
| `413 Payload Too Large` | Berarti masih upload lewat API route, bukan direct ke Cloudinary |
| `Invalid src prop` | `remotePatterns` di `next.config.ts` belum di-set |
| `Too many connections` | Prisma tidak pakai singleton, atau `DATABASE_URL` belum pooled |
| Build gagal di Vercel | Env var belum di-set di dashboard |

## Tim

| Nama | Bagian |
|---|---|
| | Setup & deploy |
| | Database & Prisma |
| | API |
| | Upload flow |
| | Galeri & UI |
