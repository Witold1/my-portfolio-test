'use client';

import { memo } from 'react';
import Image from 'next/image';

const Card = memo(({ id, 'content-type': contentType, src, categories, className, gridType }) => {
  const isUniform = gridType === 'uniform';

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {contentType === 'image' && (
        <div className={`relative w-full ${isUniform ? 'h-full' : 'h-auto'}`}>
          <Image
            src={src}
            alt={`Gallery item ${id} - ${categories.join(', ')}`}
            fill={isUniform}
            width={!isUniform ? 0 : undefined}
            height={!isUniform ? 0 : undefined}
            sizes={'(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'}
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
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p>Carousel Placeholder (TBD)</p>
        </div>
      )}
      {!['image', 'video', 'carousel'].includes(contentType) && (
        <p>Unsupported content type: {contentType}</p>
      )}
    </div>
  );
});

export default Card;