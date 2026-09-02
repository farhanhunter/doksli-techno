# Alur Kerja Tim

Waktu mepet, jadi aturannya sedikit saja tapi dipatuhi.

## Branch

```
main           # selalu bisa di-deploy, jangan push langsung
feat/<nama>    # contoh: feat/upload-form
fix/<nama>
```

## Alur

```bash
git checkout main
git pull
git checkout -b feat/nama-fitur

# ngoding...
git add .
git commit -m "feat: tambah form upload"
git push -u origin feat/nama-fitur
```

Lalu buka Pull Request ke `main`. Minta satu orang review sebentar, merge.

## Format Commit

```
feat:     fitur baru
fix:      perbaikan bug
style:    tampilan / CSS
refactor: rapikan kode
docs:     dokumentasi
chore:    konfigurasi, dependency
```

## Aturan Penting

1. **Jangan commit `.env.local`.** Sudah masuk `.gitignore`, jangan dipaksa.
2. **Jangan push langsung ke `main`** kecuali darurat menjelang deadline.
3. **Pull sebelum mulai kerja** supaya tidak konflik.
4. Kalau mengubah `prisma/schema.prisma`, kabari tim di grup — semua orang harus jalankan `npx prisma db push` dan `npx prisma generate`.
5. Pastikan `npm run build` sukses sebelum bikin PR.

## Kalau Konflik

```bash
git checkout main && git pull
git checkout feat/nama-fitur
git merge main
# selesaikan konflik, lalu:
git add . && git commit
git push
```
