'use client';

import ToolbarIcon from './ToolbarIcon';

export default function ContentLayoutToolbar({
  layout = 'list',
  onGrid,
  onList,
  className = '',
}) {
  return (
    <div
      className={`gallery-grid-toolbar content-layout-toolbar${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Card layout"
    >
      <span className="content-section-label">Layout</span>
      <button
        type="button"
        onClick={onGrid}
        className={`gallery-grid-toggle${layout === 'grid' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={layout === 'grid'}
        aria-label="Grid layout"
        title="Grid"
      >
        <ToolbarIcon name="layout-grid" />
        <span>Grid</span>
      </button>
      <button
        type="button"
        onClick={onList}
        className={`gallery-grid-toggle${layout === 'list' ? ' gallery-grid-toggle--active' : ''}`}
        aria-pressed={layout === 'list'}
        aria-label="List layout"
        title="List"
      >
        <ToolbarIcon name="layout-list" />
        <span>List</span>
      </button>
    </div>
  );
}
