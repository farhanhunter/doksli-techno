import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Dokumentasi <span className="text-brass">Asli</span> Kegiatan Techno
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-ink/60">
        Semua momen Techno diarsipkan di satu tempat. Foto langsung dari
        lapangan, tanpa filter berlebihan, tanpa rekayasa.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/galeri"
          className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90"
        >
          Lihat Galeri
        </Link>
        <Link
          href="/upload"
          className="rounded-lg border border-ink/20 px-5 py-2.5 text-sm font-medium hover:border-brass"
        >
          Upload Foto
        </Link>
      </div>
    </section>
  );
}
