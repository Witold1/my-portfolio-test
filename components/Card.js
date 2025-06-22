import { useState } from 'react';

export default function Card({ card, openModal }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevImage = () => {
    setCarouselIndex((prev) => (prev === 0 ? card.media.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCarouselIndex((prev) => (prev === card.media.length - 1 ? 0 : prev + 1));
  };

  const renderContent = () => {
    switch (card.type) {
      case 'single-image':
      case 'gif':
        return (
          <img
            src={card.media[0].src}
            alt={card.media[0].alt}
            loading="lazy"
            className="w-full h-auto object-contain rounded-lg cursor-pointer"
            onClick={() => openModal(card.media[0])}
          />
        );
      case 'video':
        return (
          <video
            src={card.media[0].src}
            controls
            loading="lazy"
            className="w-full h-auto object-contain rounded-lg cursor-pointer"
            onClick={() => openModal(card.media[0])}
          />
        );
      case 'image-carousel':
      case 'mixed-carousel':
        return (
          <div className="relative w-full h-auto">
            {card.media[carouselIndex].type === 'image' ? (
              <img
                src={card.media[carouselIndex].src}
                alt={card.media[carouselIndex].alt}
                loading="lazy"
                className="w-full h-auto object-contain rounded-lg cursor-pointer"
                onClick={() => openModal(card.media[carouselIndex])}
              />
            ) : (
              <video
                src={card.media[carouselIndex].src}
                controls
                loading="lazy"
                className="w-full h-auto object-contain rounded-lg cursor-pointer"
                onClick={() => openModal(card.media[carouselIndex])}
              />
            )}
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
              {carouselIndex + 1} / {card.media.length}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition">
      {renderContent()}
    </div>
  );
}