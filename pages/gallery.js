'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import GalleryGridVariable from '../components/Gallery.Grid.Variable';
import GalleryGridUniform from '../components/Gallery.Grid.Uniform';
import Modal from '../components/Modal';
import { getGalleryCategories, filterGalleryItems } from '../lib/galleryUtils';
import galleryData from '../data/gallery-data.json';

export async function getStaticProps() {
  console.log('getStaticProps: galleryData length:', galleryData.length);
  return {
    props: {
      galleryData,
    },
  };
}

export default function Gallery({ galleryData }) {
  console.log('Gallery: galleryData length:', galleryData.length);
  const router = useRouter();
  const { item: itemId } = router.query; // Read item ID from query parameter
  const [gridType, setGridType] = useState('uniform');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showTopButton, setShowTopButton] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const itemsPerPage = 25;

  const categories = useMemo(() => getGalleryCategories(galleryData), [galleryData]);
  const filteredItems = useMemo(() => filterGalleryItems(galleryData, filter), [galleryData, filter]);
  const paginatedItems = useMemo(
    () => filteredItems.slice(0, page * itemsPerPage),
    [filteredItems, page]
  );

  // Open modal based on query parameter
  useEffect(() => {
    if (itemId) {
      const item = galleryData.find((item) => item.id.toString() === itemId);
      setModalItem(item || null);
    } else {
      setModalItem(null);
    }
  }, [itemId, galleryData]);

  // Handle scroll to show/hide "to the top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal handlers
  const openModal = (item) => {
    setModalItem(item);
    router.push(`/gallery?item=${item.id}`, undefined, { shallow: true }); // Update URL
  };
  const closeModal = () => {
    setModalItem(null);
    router.push('/gallery', undefined, { shallow: true }); // Clear query parameter
  };

  return (
    <>
      <Head>
        {modalItem ? (
          <>
            <title>{modalItem.title || `Gallery Item ${modalItem.id}`}</title>
            <meta name="description" content={modalItem.notes || 'View this item from my gallery'} />
            <meta property="og:title" content={modalItem.title || `Gallery Item ${modalItem.id}`} />
            <meta property="og:description" content={modalItem.notes || 'View this item from my gallery'} />
            <meta property="og:image" content={modalItem.src} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Your Portfolio" />
          </>
        ) : (
          <>
            <title>Data and Information Visualization Pond</title>
            <meta name="description" content="Explore my gallery of data and information visualizations" />
            <meta property="og:title" content="Data and Information Visualization Pond" />
            <meta property="og:description" content="Explore my gallery of data and information visualizations" />
            <meta property="og:image" content="/default-image.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Your Portfolio" />
          </>
        )}
      </Head>
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Data and information visualization pond ⛵
          </h1>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            ⇱ Click preview images to enlarge in better quality
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            ⟳ Check github project repositories to see raw code
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            ⛟ Some elements may display differently across platforms (desktop, smartphone, etc)
          </p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 items-center gallery-controls">
          <div className="flex gap-2">
            <label className="font-semibold text-gray-900 dark:text-gray-100">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold text-gray-900 dark:text-gray-100">Grid Type:</label>
            <button
              onClick={() => setGridType('variable')}
              className={`px-3 py-1 rounded ${
                gridType === 'variable'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100'
              }`}
            >
              Variable
            </button>
            <button
              onClick={() => setGridType('uniform')}
              className={`px-3 py-1 rounded ${
                gridType === 'uniform'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100'
              }`}
            >
              Uniform
            </button>
          </div>
        </div>
        {paginatedItems.length > 0 ? (
          <>
            {gridType === 'variable' ? (
              <GalleryGridVariable items={paginatedItems} onCardClick={openModal} />
            ) : (
              <GalleryGridUniform items={paginatedItems} onCardClick={openModal} />
            )}
            {paginatedItems.length < filteredItems.length && (
              <button
                onClick={() => setPage(page + 1)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-600"
              >
                Load More
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No items match the selected filter.</p>
        )}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
        <Modal isOpen={!!modalItem} onClose={closeModal} item={modalItem} />
      </div>
    </>
  );
}