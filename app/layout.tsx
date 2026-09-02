import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doksli Techno — Dokumentasi Asli Kegiatan Techno",
  description:
    "Arsip foto dan dokumentasi asli seluruh rangkaian kegiatan Techno.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <header className="border-b border-ink/10">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Doksli<span className="text-brass">.</span>
            </Link>
            <div className="flex gap-5 text-sm">
              <Link href="/galeri" className="hover:text-brass">Galeri</Link>
              <Link href="/upload" className="hover:text-brass">Upload</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-ink/10 py-6 text-center text-xs text-ink/50">
          Doksli Techno — dokumentasi asli, bukan karangan.
        </footer>
      </body>
    </html>
  );
}
