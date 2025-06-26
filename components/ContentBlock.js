import { useState } from 'react';
import Link from 'next/link';

export default function ContentBlock({ block, setModalImage }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevImage = () => setCarouselIndex((prev) => (prev === 0 ? block.items.length - 1 : prev - 1));
  const nextImage = () => setCarouselIndex((prev) => (prev === block.items.length - 1 ? 0 : prev + 1));

  switch (block.type) {
    case 'heading':
      return <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{block.text}</h2>;
    case 'paragraph':
      return (
        <p className="text-gray-900 dark:text-gray-100 mb-4 prose dark:prose-invert">
          {block.text.split(' ').map((word, i) => (
            word.startsWith('http') ? (
              <a key={i} href={word} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{word}</a>
            ) : (
              <span key={i}>{word} </span>
            )
          ))}
        </p>
      );
    case 'carousel':
      return (
        <div className="relative w-full h-64 mb-6">
          <img
            src={block.items[carouselIndex].src}
            alt={block.items[carouselIndex].alt}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => setModalImage(block.items[carouselIndex].src)}
          />
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
            {carouselIndex + 1} / {block.items.length}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{block.caption}</p>
        </div>
      );
    case 'code':
      return (
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
          <code>{block.code}</code>
        </pre>
      );
    case 'svg':
      return (
        <div className="mb-6">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full h-auto rounded-lg cursor-pointer"
            onClick={() => setModalImage(block.src)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{block.caption}</p>
        </div>
      );
    case 'grid':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {block.items.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-lg transition cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-32 object-cover rounded-lg mb-2 cursor-pointer"
                  onClick={(e) => { e.preventDefault(); setModalImage(item.src); }}
                />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    default:
      return null;
  }
}