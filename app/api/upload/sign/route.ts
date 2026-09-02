import { NextResponse } from "next/server";
import { buildSignature, CLOUDINARY_FOLDER } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { kodePanitia } = await req.json();

    if (!process.env.UPLOAD_SECRET || kodePanitia !== process.env.UPLOAD_SECRET) {
      return NextResponse.json({ error: "Kode panitia salah" }, { status: 401 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const signature = buildSignature({
      folder: CLOUDINARY_FOLDER,
      timestamp,
    });

    return NextResponse.json({
      signature,
      timestamp,
      folder: CLOUDINARY_FOLDER,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch {
    return NextResponse.json({ error: "Gagal membuat signature" }, { status: 500 });
  }
}
