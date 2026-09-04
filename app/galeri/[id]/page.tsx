import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { optimize } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.dokumentasi.findUnique({
    where: { id: Number(id) },
  });

  if (!item) notFound();

  return (
    <article>
      <Link href="/galeri" className="text-sm text-ink/50 hover:text-teal">
        &larr; Kembali ke galeri
      </Link>

      <div className="relative mt-4 aspect-[3/2] overflow-hidden rounded-xl bg-ink/5">
        <Image
          src={optimize(item.imageUrl, 1400)}
          alt={item.namaKegiatan}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <h1 className="mt-6 text-2xl font-bold">{item.namaKegiatan}</h1>

      {item.kategori && (
        <span className="mt-3 inline-block rounded-full bg-tealSoft px-3 py-1 text-xs font-medium text-teal">
          {item.kategori}
        </span>
      )}

      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink/60">
        <div>
          <dt className="inline font-medium">Tanggal: </dt>
          <dd className="inline">
            {new Date(item.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </dd>
        </div>
        {item.lokasi && (
          <div>
            <dt className="inline font-medium">Lokasi: </dt>
            <dd className="inline">{item.lokasi}</dd>
          </div>
        )}
        {item.uploader && (
          <div>
            <dt className="inline font-medium">Diunggah oleh: </dt>
            <dd className="inline">{item.uploader}</dd>
          </div>
        )}
      </dl>

      {item.deskripsi && (
        <p className="mt-5 leading-relaxed text-ink/80">{item.deskripsi}</p>
      )}
    </article>
  );
}
