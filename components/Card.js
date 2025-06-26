import { useState } from 'react';

export default function Card({ card, openModal }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevImage = () => setCarouselIndex((prev) => (prev === 0 ? card.items.length - 1 : prev - 1));
  const nextImage = () => setCarouselIndex((prev) => (prev === card.items.length - 1 ? 0 : prev + 1));

  if (card.type === 'carousel') {
    const currentItem = card.items[carouselIndex];
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full">
          {currentItem.type === 'image' ? (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
              onClick={() => openModal(currentItem)}
            />
          ) : (
            <video
              src={currentItem.src}
              className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {card.type === 'image' ? (
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
          onClick={() => openModal(card)}
        />
      ) : (
        <video
          src={card.src}
          className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
          onClick={() => openModal(card)}
          muted
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
      </div>
    </div>
  );
}