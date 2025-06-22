import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Masonry from 'react-masonry-css';

export default function Gallery() {
  const [modalMedia, setModalMedia] = useState(null);
  const [filter, setFilter] = useState('all');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/data/gallery.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => console.error('Failed to load gallery data:', err));
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

  const breakpointCols = {
    default: 3,
    960: 3,
    576: 3,
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Data Visualization Gallery</h1>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded ${filter === category ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {category === 'all' ? 'Show All' : category.replace(/-/g, ' ').replace('3d-lidar', '3D/LiDAR').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <Masonry
            breakpointCols={breakpointCols}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredCards.map((card) => (
              <Card key={card.id} card={card} openModal={openModal} />
            ))}
          </Masonry>

          {/* Modal */}
          {modalMedia && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
              <div className="relative w-[80vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
                {modalMedia.type === 'image' ? (
                  <img src={modalMedia.src} alt={modalMedia.alt} className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <video src={modalMedia.src} controls autoPlay className="w-full h-full object-contain rounded-lg" />
                )}
              </div>
              <button
                onClick={closeModal}
                className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full text-xl"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Custom CSS for Masonry (inlined for static export)
const styles = `
  .my-masonry-grid {
    display: flex;
    margin-left: -1rem; /* Adjust for gap */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 1rem; /* Adjust for gap */
    background-clip: padding-box;
  }
  /* Add media query for responsiveness if needed */
  @media (max-width: 576px) {
    .my-masonry-grid {
      margin-left: 0;
    }
    .my-masonry-grid_column {
      padding-left: 0;
    }
  }
`;