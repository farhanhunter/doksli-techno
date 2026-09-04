import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Dokumentasi <span className="text-teal">Asli</span> Technocenter
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-ink/60">
        Semua epstein file doksli techno.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/galeri"
          className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navyDeep"
        >
          Buka Galeri
        </Link>
        <Link
          href="/upload"
          className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium hover:border-teal"
        >
          Upload Foto
        </Link>
      </div>
    </section>
  );
}
