import { useState } from 'react';

export default function Card({ card, openModal, layoutMode }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevImage = () => setCarouselIndex((prev) => (prev === 0 ? card.items.length - 1 : prev - 1));
  const nextImage = () => setCarouselIndex((prev) => (prev === card.items.length - 1 ? 0 : prev + 1));

  const isSquare = layoutMode === 'square';
  const mediaClass = isSquare 
    ? 'w-full h-full object-cover'
    : 'w-full h-auto object-contain rounded-t-lg cursor-pointer';
  const cardClass = `bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${isSquare ? 'w-[300px] h-[300px]' : ''}`;
  const containerClass = isSquare ? 'w-[300px] h-[300px] flex justify-center items-center' : 'carousel-container';

  if (card.type === 'carousel') {
    const currentItem = card.items[carouselIndex];
    return (
      <div className={cardClass}>
        <div className={containerClass}>
          {currentItem.type === 'image' ? (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className={mediaClass}
              onClick={() => openModal(currentItem)}
            />
          ) : (
            <video
              src={currentItem.src}
              className={mediaClass}
              onClick={() => openModal(currentItem)}
              muted
            />
          )}
          {card.items.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
              >
                ❮
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
              >
                ❯
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-gray-800 bg-opacity-50 px-2 py-1 rounded">
                {carouselIndex + 1} / {card.items.length}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <div className={isSquare ? 'w-[300px] h-[300px] flex justify-center items-center' : ''}>
        {card.type === 'image' ? (
          <img
            src={card.src}
            alt={card.alt}
            className={mediaClass}
            onClick={() => openModal(card)}
          />
        ) : (
          <video
            src={card.src}
            className={mediaClass}
            onClick={() => openModal(card)}
            muted
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
      </div>
    </div>
  );
}