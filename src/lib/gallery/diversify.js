/**
 * Break same-series clumps in a newest-first gallery list.
 * Prefer the newest remaining item whose series ≠ the last placed one.
 *
 * Series = first hyphen segment of the slug (`lidar-miami-…` → `lidar`).
 * No hand-maintained family list — follow the existing filename convention.
 */

/**
 * @param {string} slug
 * @returns {string}
 */
export function gallerySeriesKey(slug) {
  const s = String(slug || '').trim().toLowerCase();
  if (!s) return '';
  const dash = s.indexOf('-');
  return dash === -1 ? s : s.slice(0, dash);
}

/**
 * @param {Array<{ slug?: string }>} items Newest-first (or any preferred order)
 * @returns {typeof items}
 */
export function diversifyGalleryBySeries(items) {
  if (!Array.isArray(items) || items.length < 2) return items ? [...items] : [];

  const remaining = [...items];
  const out = [];
  let lastSeries = null;

  while (remaining.length) {
    let i = remaining.findIndex((item) => gallerySeriesKey(item.slug) !== lastSeries);
    if (i < 0) i = 0;
    const [picked] = remaining.splice(i, 1);
    out.push(picked);
    lastSeries = gallerySeriesKey(picked.slug);
  }

  return out;
}
