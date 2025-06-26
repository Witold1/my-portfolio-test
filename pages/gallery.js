'use client';

import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import styles from './Gallery.module.css';

// Sample image data with low and high-quality placeholder URLs from Lorem Picsum
const galleryItems = [
  {
    id: 1,
    thumbnail: 'https://picsum.photos/id/1018/300/200?blur=2',
    full: 'https://picsum.photos/id/1018/1200/800',
    width: 1200,
    height: 800,
    category: 'nature',
    alt: 'Nature landscape',
  },
  {
    id: 2,
    thumbnail: 'https://picsum.photos/id/1025/300/400?blur=2',
    full: 'https://picsum.photos/id/1025/1200/1600',
    width: 1200,
    height: 1600,
    category: 'urban',
    alt: 'City skyline',
  },
  {
    id: 3,
    thumbnail: 'https://picsum.photos/id/1015/300/250?blur=2',
    full: 'https://picsum.photos/id/1015/1200/1000',
    width: 1200,
    height: 1000,
    category: 'nature',
    alt: 'Forest path',
  },
  {
    id: 4,
    thumbnail: 'https://picsum.photos/id/1020/300/300?blur=2',
    full: 'https://picsum.photos/id/1020/1200/1200',
    width: 1200,
    height: 1200,
    category: 'urban',
    alt: 'Urban street',
  },
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('masonry');
  const [modalImage, setModalImage] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter items based on category
  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  // Responsive breakpoints for masonry
  const breakpointCols = {
    350: 1,
    750: 2,
    1200: 3,
  };

  // Open/close modal
  const openModal = (item) => setModalImage(item);
  const closeModal = () => setModalImage(null);

  // Debug: Log filtered items, layout, and client status
  useEffect(() => {
    console.log('Is Client:', isClient);
    console.log('Filtered Items:', filteredItems);
    console.log('Current Layout:', layout);
  }, [isClient, filteredItems, layout]);

  // Render nothing until client-side
  if (!isClient) {
    return <p>Loading gallery...</p>;
  }

  return (
    <div className={styles.container}>
      {/* Filter and Layout Controls */}
      <div className={styles.filters}>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? styles.active : ''}
          aria-label="Show all images"
        >
          All
        </button>
        <button
          onClick={() => setFilter('nature')}
          className={filter === 'nature' ? styles.active : ''}
          aria-label="Show nature images"
        >
          Nature
        </button>
        <button
          onClick={() => setFilter('urban')}
          className={filter === 'urban' ? styles.active : ''}
          aria-label="Show urban images"
        >
          Urban
        </button>
        <button
          onClick={() => setLayout('grid')}
          className={layout === 'grid' ? styles.active : ''}
          aria-label="Switch to grid layout"
        >
          Grid
        </button>
        <button
          onClick={() => setLayout('masonry')}
          className={layout === 'masonry' ? styles.active : ''}
          aria-label="Switch to masonry layout"
        >
          Masonry
        </button>
      </div>

      {/* Gallery */}
      {layout === 'grid' ? (
        <div className={styles.grid}>
          {filteredItems.length === 0 ? (
            <p>No items to display</p>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className={styles.gridItem}>
                <Image
                  src={item.thumbnail}
                  alt={item.alt}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPp6o9mwAAAABJRU5ErkJggg=="
                  className={styles.image}
                  onClick={() => openModal(item)}
                  loading="lazy"
                  onError={() => console.error(`Failed to load image: ${item.thumbnail}`)}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {filteredItems.length === 0 ? (
            <p>No items to display</p>
          ) : (
            <ResponsiveMasonry columnsCountBreakPoints={breakpointCols}>
              <Masonry gutter="10px">
                {filteredItems.map(item => (
                  <div key={item.id} className={styles.masonryItem}>
                    <Image
                      src={item.thumbnail}
                      alt={item.alt}
                      width={300}
                      height={item.height}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPp6o9mwAAAABJRU5ErkJggg=="
                      className={styles.image}
                      onClick={() => openModal(item)}
                      loading="lazy"
                      onError={() => console.error(`Failed to load image: ${item.thumbnail}`)}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      )}

      {/* Custom Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <Image
              src={modalImage.full}
              alt={modalImage.alt}
              width={modalImage.width}
              height={modalImage.height}
              className={styles.modalImage}
              loading="eager"
              onError={() => console.error(`Failed to load modal image: ${modalImage.full}`)}
            />
            <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;