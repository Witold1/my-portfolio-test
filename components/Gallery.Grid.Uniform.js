'use client';

import { memo } from 'react';
import Card from './Gallery.Grid.Cards';

const GalleryGridUniform = memo(({ items }) => {
  console.log('GalleryGridUniform: items length:', items.length); // Debug
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md bg-white"
        >
          <Card {...item} className="absolute inset-0" gridType="uniform" />
        </div>
      ))}
    </div>
  );
});

export default GalleryGridUniform;