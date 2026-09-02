import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Upload Dokumentasi</h1>
      <p className="mt-1 mb-6 text-sm text-ink/60">
        Foto diunggah langsung ke Cloudinary, jadi ukuran besar pun aman.
      </p>
      <UploadForm />
    </section>
  );
}
