export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/next-property-ea36a.firebasestorage.app/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
