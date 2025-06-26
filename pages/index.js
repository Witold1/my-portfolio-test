import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [modalImage, setModalImage] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
  ];

  // Auto-cycle carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);
  const prevImage = () => setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCarouselIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Home - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Welcome to My Portfolio</h1>
          <p className="text-lg mb-8 text-center">Showcasing my skills, projects, and more!</p>

          {/* Modal Images Section */}
          <h2 className="text-2xl font-semibold mb-4">Featured Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80"
                onClick={() => openModal(image)}
              />
            ))}
          </div>

          {/* Image Carousel Section */}
          <h2 className="text-2xl font-semibold mb-4">Image Carousel</h2>
          <div className="relative w-full h-64 mb-8">
            <img
              src={images[carouselIndex]}
              alt={`Carousel Image ${carouselIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
            >
              →
            </button>
          </div>

          {/* Modal */}
          {modalImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative max-w-3xl w-full">
                <img src={modalImage} alt="Modal Image" className="w-full h-auto rounded-lg" />
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
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