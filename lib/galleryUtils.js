export function getGalleryCategories(galleryData) {
  return ['all', ...new Set(galleryData.flatMap((item) => item.categories))];
}

export function filterGalleryItems(galleryData, filter) {
  return filter === 'all' ? galleryData : galleryData.filter((item) => item.categories.includes(filter));
}