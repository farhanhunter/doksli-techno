import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/dokumentasi?page=1&limit=12&kategori=Workshop
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 12));
  const kategori = searchParams.get("kategori") ?? undefined;

  const where = kategori ? { kategori } : {};

  const [items, total] = await Promise.all([
    prisma.dokumentasi.findMany({
      where,
      orderBy: { tanggal: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.dokumentasi.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}

// POST /api/dokumentasi  -> simpan metadata setelah upload ke Cloudinary sukses
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      kodePanitia,
      namaKegiatan,
      deskripsi,
      lokasi,
      tanggal,
      uploader,
      kategori,
      imageUrl,
      publicId,
      width,
      height,
    } = body;

    if (kodePanitia !== process.env.UPLOAD_SECRET) {
      return NextResponse.json({ error: "Kode panitia salah" }, { status: 401 });
    }

    if (!namaKegiatan || !tanggal || !imageUrl || !publicId) {
      return NextResponse.json(
        { error: "namaKegiatan, tanggal, imageUrl, dan publicId wajib diisi" },
        { status: 400 }
      );
    }

    // Pastikan URL benar-benar dari Cloudinary, bukan URL sembarangan
    if (!imageUrl.startsWith("https://res.cloudinary.com/")) {
      return NextResponse.json({ error: "URL gambar tidak valid" }, { status: 400 });
    }

    const created = await prisma.dokumentasi.create({
      data: {
        namaKegiatan,
        deskripsi: deskripsi || null,
        lokasi: lokasi || null,
        tanggal: new Date(tanggal),
        uploader: uploader || null,
        kategori: kategori || null,
        imageUrl,
        publicId,
        width: width ?? null,
        height: height ?? null,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Gagal menyimpan dokumentasi" }, { status: 500 });
  }
}
