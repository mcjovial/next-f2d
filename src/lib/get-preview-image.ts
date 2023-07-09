export const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value)
      ? value
      : [value];
  }
  return images;
};
