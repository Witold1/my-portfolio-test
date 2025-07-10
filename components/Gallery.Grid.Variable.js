'use client';

import { memo } from 'react';
import Card from './Gallery.Grid.Cards';

const GalleryGridVariable = memo(({ items, onCardClick }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-4">
          <Card {...item} gridType="variable" onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
});

export default GalleryGridVariable;