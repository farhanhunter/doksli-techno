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
        kategori: "Seremonial",
        imageUrl:
          "https://res.cloudinary.com/demo/image/upload/w_1200/sample.jpg",
        publicId: "sample",
        width: 1200,
        height: 800,
      },
      {
        namaKegiatan: "Workshop Web Development",
        deskripsi: "Sesi hands-on membangun aplikasi web modern.",
        lokasi: "Lab Komputer 2",
        tanggal: new Date("2026-09-02"),
        uploader: "Divisi Acara",
        kategori: "Workshop",
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
