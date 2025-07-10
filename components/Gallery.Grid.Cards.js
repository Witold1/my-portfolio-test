'use client';

import { memo } from 'react';
import Image from 'next/image';

const Card = memo(({ id, 'content-type': contentType, src, categories, className, gridType, onClick, title, notes, link }) => {
  console.log('Card: id:', id, 'contentType:', contentType, 'gridType:', gridType); // Debug
  const isUniform = gridType === 'uniform';

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className} cursor-pointer`}
      onClick={() => onClick({ id, 'content-type': contentType, src, categories, title, notes, link })}
    >
      {contentType === 'image' && (
        <div className={`relative w-full ${isUniform ? 'h-full' : 'h-auto'}`}>
          <Image
            src={src}
            alt={title || `Gallery item ${id} - ${categories.join(', ')}`}
            fill={isUniform}
            width={!isUniform ? 0 : undefined}
            height={!isUniform ? 0 : undefined}
            sizes={isUniform ? '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw' : '100vw'}
            style={!isUniform ? { width: '100%', height: 'auto' } : undefined}
            className={isUniform ? 'object-cover' : 'object-contain'}
            loading="lazy"
            quality={85}
          />
          {categories && categories.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
              <p className="text-xs truncate">
                Categories: {categories.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
      {contentType === 'video' && (
        <div className={`relative w-full ${isUniform ? 'h-full' : 'h-auto'}`}>
          <video
            src={src}
            controls
            preload="metadata"
            className={isUniform ? 'w-full h-full object-cover' : 'w-full h-auto object-contain'}
          />
          {categories && categories.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
              <p className="text-xs truncate">
                Categories: {categories.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
      {contentType === 'carousel' && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <p>Carousel Placeholder (TBD)</p>
        </div>
      )}
      {!['image', 'video', 'carousel'].includes(contentType) && (
        <p className="text-gray-700 dark:text-gray-300">Unsupported content type: {contentType}</p>
      )}
    </div>
  );
});

export default Card;