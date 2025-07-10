'use client';

import { memo } from 'react';
import Card from './Gallery.Grid.Cards';

const GalleryGridUniform = memo(({ items, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800"
        >
          <Card {...item} className="absolute inset-0" gridType="uniform" onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
});

export default GalleryGridUniform;