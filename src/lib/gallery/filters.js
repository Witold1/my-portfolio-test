import { filterVisibleContent } from '../content/hidden';

/** Omit YAML `hidden: true` items unless `showHidden` is enabled (admin / dev). */
export function filterVisibleGalleryItems(galleryData, { showHidden = false } = {}) {
  return filterVisibleContent(galleryData, { showHidden });
}

export function getGalleryCategories(galleryData, configuredCategories) {
  if (Array.isArray(configuredCategories) && configuredCategories.length > 0) {
    return ['all', ...configuredCategories];
  }
  const categories = galleryData.flatMap((item) =>
    Array.isArray(item?.categories) ? item.categories : []
  );
  return ['all', ...new Set(categories)];
}

/**
 * @param {string} filter - `'all'` or a single category slug.
 */
export function filterGalleryItems(galleryData, filter) {
  if (filter == null || filter === 'all') return galleryData;
  return galleryData.filter((item) => {
    const categories = Array.isArray(item?.categories) ? item.categories : [];
    return categories.includes(filter);
  });
}

/** Human-readable label for a gallery category slug. */
export function formatGalleryCategoryLabel(category) {
  if (category == null || category === '' || category === 'all') return 'All';
  const s = String(category).trim();
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Comma-separated labels for gallery `categories`. */
export function formatGalleryCategories(categories) {
  if (!Array.isArray(categories) || categories.length === 0) return '';
  return categories.map(formatGalleryCategoryLabel).filter(Boolean).join(', ');
}

/** Split gallery `notes` into display paragraphs (blank-line breaks in block scalars). */
export function normalizeGalleryNotesParagraphs(notes) {
  if (notes == null || notes === '') return [];
  const chunks = Array.isArray(notes) ? notes : [notes];
  return chunks
    .flatMap((chunk) =>
      String(chunk)
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    );
}

/** Flatten gallery `notes` (string or string[]) for meta tags */
export function galleryNotesToMetaString(notes, fallback = 'View this item from my gallery') {
  const trimmed = normalizeGalleryNotesParagraphs(notes).join(' ');
  if (!trimmed) return fallback;
  return trimmed.length > 300 ? `${trimmed.slice(0, 297)}...` : trimmed;
}
