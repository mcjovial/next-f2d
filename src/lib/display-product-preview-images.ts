export function displayImage(
  gallery: string[] | undefined | null,
  image: string | undefined
) {
  if (gallery?.length) {
    return gallery;
  }
  if (image) {
    return [image];
  }
  return [];
}
