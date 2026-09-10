'use client';

import ToolbarIcon from '../content/ToolbarIcon';

export default function GalleryGridLayoutToolbar({
  gridType,
  onUniform,
  onVariable,
  className = '',
}) {
  return (
    <div
      className={`gallery-grid-toolbar${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Grid layout"
    >
      <span className="content-section-label">Grid</span>
      <button
        type="button"
        onClick={onUniform}
        className={`gallery-grid-toggle${gridType === 'uniform' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={gridType === 'uniform'}
        aria-label="Uniform grid: same width, same height"
        title="Same width, same height"
      >
        <ToolbarIcon name="layout-grid" />
        <span>Uniform</span>
      </button>
      <button
        type="button"
        onClick={onVariable}
        className={`gallery-grid-toggle${gridType === 'variable' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={gridType === 'variable'}
        aria-label="Variable grid: same width, but height changes"
        title="Same width, but height changes"
      >
        <ToolbarIcon name="layout-grid-aspect" />
        <span>Variable</span>
      </button>
    </div>
  );
}
