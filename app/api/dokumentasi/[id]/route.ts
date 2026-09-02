import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const item = await prisma.dokumentasi.findUnique({ where: { id: Number(id) } });

  if (!item) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { id } = await params;
  const { kodePanitia } = await req.json().catch(() => ({}));

  if (kodePanitia !== process.env.UPLOAD_SECRET) {
    return NextResponse.json({ error: "Kode panitia salah" }, { status: 401 });
  }

  const item = await prisma.dokumentasi.findUnique({ where: { id: Number(id) } });
  if (!item) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }

  // Hapus dari Cloudinary dulu, baru dari DB
  await cloudinary.uploader.destroy(item.publicId).catch(() => null);
  await prisma.dokumentasi.delete({ where: { id: Number(id) } });

  return NextResponse.json({ ok: true });
}
