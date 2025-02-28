export const generatePdfThumbnail = (url: string, width = 16 * 12 * 4) =>
  `https://image.thum.io/get/pdfSource/width/${width}/page/1/${url}`;

export const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
