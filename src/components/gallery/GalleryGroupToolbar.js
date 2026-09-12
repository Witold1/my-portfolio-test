'use client';

export default function GalleryGroupToolbar({
  groupBy = 'none',
  onNone,
  onYear,
  onSeries,
  className = '',
}) {
  return (
    <div
      className={`gallery-grid-toolbar gallery-group-toolbar${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Group gallery items"
    >
      <span className="content-section-label">Group</span>
      <button
        type="button"
        onClick={onNone}
        className={`gallery-grid-toggle${groupBy === 'none' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={groupBy === 'none'}
        aria-label="No grouping"
        title="No grouping"
      >
        <span>None</span>
      </button>
      <button
        type="button"
        onClick={onYear}
        className={`gallery-grid-toggle${groupBy === 'year' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={groupBy === 'year'}
        aria-label="Group by year"
        title="Group by year"
      >
        <span>Year</span>
      </button>
      <button
        type="button"
        onClick={onSeries}
        className={`gallery-grid-toggle${groupBy === 'series' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={groupBy === 'series'}
        aria-label="Group by series"
        title="Group by series"
      >
        <span>Series</span>
      </button>
    </div>
  );
}
