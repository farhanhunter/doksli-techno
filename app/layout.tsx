import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doksli Techno — Dokumentasi Asli Technocenter",
  description: "Arsip foto dokumentasi seluruh kegiatan Technocenter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <header className="border-b border-hairline bg-surface">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-navy">
              Doksli<span className="text-teal">.</span>
            </Link>
            <div className="flex gap-5 text-sm">
              <Link href="/galeri" className="hover:text-teal">Galeri</Link>
              <Link href="/upload" className="hover:text-teal">Upload</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-hairline py-6 text-center text-xs text-ink/50">
          Doksli Techno — Dokumentasi Asli Technocenter
        </footer>
      </body>
    </html>
  );
}
