/**
 * Break same-series clumps in a newest-first gallery list.
 * Prefer the newest remaining item whose series ≠ the last placed one.
 *
 * Series = explicit YAML `series` when set; otherwise the first hyphen
 * segment of the slug (`lidar-miami-…` → `lidar`).
 */

/**
 * @param {{ series?: string, slug?: string } | string | null | undefined} itemOrSlug
 * @returns {string}
 */
export function gallerySeriesKey(itemOrSlug) {
  if (itemOrSlug && typeof itemOrSlug === 'object') {
    const explicit = typeof itemOrSlug.series === 'string' ? itemOrSlug.series.trim() : '';
    if (explicit) return explicit.toLowerCase();
    return gallerySeriesKey(itemOrSlug.slug);
  }
  const s = String(itemOrSlug || '').trim().toLowerCase();
  if (!s) return '';
  const dash = s.indexOf('-');
  return dash === -1 ? s : s.slice(0, dash);
}

/**
 * @param {Array<{ series?: string, slug?: string }>} items Newest-first (or any preferred order)
 * @returns {typeof items}
 */
export function diversifyGalleryBySeries(items) {
  if (!Array.isArray(items) || items.length < 2) return items ? [...items] : [];

  const remaining = [...items];
  const out = [];
  let lastSeries = null;

  while (remaining.length) {
    let i = remaining.findIndex((item) => gallerySeriesKey(item) !== lastSeries);
    if (i < 0) i = 0;
    const [picked] = remaining.splice(i, 1);
    out.push(picked);
    lastSeries = gallerySeriesKey(picked);
  }

  return out;
}
