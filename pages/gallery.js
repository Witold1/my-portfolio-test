import { useState, useEffect } from 'react';
import Head from 'next/head';
import { MasonryGrid } from '@egjs/react-grid';
import Card from '../components/Card';

export default function Gallery() {
  const [modalMedia, setModalMedia] = useState(null);
  const [filter, setFilter] = useState('all');
  const [cards, setCards] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    fetch('/data/gallery.json')
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        // Wait for images to load
        const images = data.flatMap((card) => 
          card.type === 'carousel' ? card.items : [{ src: card.src, type: card.type }]
        ).filter((item) => item.type === 'image');
        let loadedCount = 0;
        if (images.length === 0) {
          setImagesLoaded(true);
          return;
        }
        images.forEach((item) => {
          const img = new Image();
          img.src = item.src;
          img.onload = img.onerror = () => {
            loadedCount += 1;
            if (loadedCount === images.length) {
              setImagesLoaded(true);
            }
          };
        });
      })
      .catch((err) => console.error('Failed to load gallery data:', err));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredCards = filter === 'all' 
    ? cards 
    : cards.filter((card) => card.categories.some((cat) => cat.toLowerCase().replace('/', '') === filter));

  const openModal = (media) => setModalMedia(media);
  const closeModal = () => setModalMedia(null);

  const categories = [
    'all',
    'general-topic',
    'population-charts',
    'road-networks',
    '3d-lidar',
    'geography-terrain',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Gallery - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 py-8">
        <div className="w-full max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Data Visualization Gallery</h1>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded ${
                  filter === category 
                    ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100' 
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'Show All' : category.replace(/-/g, ' ').replace('3d-lidar', '3D/LiDAR').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            ))}
          </div>

          {isClient && imagesLoaded && (
            <MasonryGrid
              className="masonry-grid"
              gap={8}
              column={{
                0: 1,
                768: 2,
                1400: 3,
              }}
              align="justify"
            >
              {filteredCards.map((card) => (
                <Card key={card.id} card={card} openModal={openModal} />
              ))}
            </MasonryGrid>
          )}

          {modalMedia && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div 
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {modalMedia.type === 'image' ? (
                  <img src={modalMedia.src} alt={modalMedia.alt} className="w-full h-auto rounded-lg" />
                ) : (
                  <video src={modalMedia.src} controls autoPlay className="w-full h-auto rounded-lg" />
                )}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-9 text-gray-100 text-4xl font-bold transition duration-300 hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}