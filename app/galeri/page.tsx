import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { optimize } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const items = await prisma.dokumentasi.findMany({
    orderBy: { tanggal: "desc" },
    take: 30,
  });

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-ink/50">
        <p>Belum ada dokumentasi.</p>
        <Link href="/upload" className="mt-3 inline-block text-teal underline">
          Upload yang pertama
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Galeri</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/galeri/${item.id}`}
            className="group overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
              <Image
                src={optimize(item.imageUrl, 600)}
                alt={item.namaKegiatan}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h2 className="truncate font-medium">{item.namaKegiatan}</h2>
              <p className="mt-0.5 text-xs text-ink/50">
                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {item.lokasi ? ` · ${item.lokasi}` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
