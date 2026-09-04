import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.dokumentasi.createMany({
    data: [
      {
        namaKegiatan: "Opening Ceremony Techno",
        deskripsi: "Pembukaan rangkaian acara Techno tahun ini.",
        lokasi: "Aula Utama",
        tanggal: new Date("2026-09-01"),
        uploader: "Panitia",
        kategori: "Doksli",
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/w_1200/sample.jpg",
        publicId: "sample",
        width: 1200,
        height: 800,
      },
      {
        namaKegiatan: "Laporan Barang Hilang",
        deskripsi:
          "Dompet coklat ditemukan tercecer di area Aula Utama, silakan hubungi panitia jika merasa kehilangan.",
        lokasi: "Aula Utama",
        tanggal: new Date("2026-09-02"),
        uploader: "Divisi Acara",
        kategori: "Kehilangan",
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/w_1200/sample.jpg",
        publicId: "sample",
        width: 1200,
        height: 800,
      },
    ],
  });
  console.log("Seed selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
