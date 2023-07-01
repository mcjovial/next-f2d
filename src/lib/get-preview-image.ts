export const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value)
      ? value.map((image) => ({ preview: image }))
      : [{ preview: value }];
  }
  return images;
};
