import { useState, useEffect } from 'react';

export function useGalleryData(source = '../data/gallery-data.json', page = 1, limit = 25) {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    fetch(`${source}?page=${page}&limit=${limit}`, {
      signal: controller.signal,
      cache: 'force-cache',
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryData((prev) => (page === 1 ? data : [...prev, ...data]));
        } else {
          throw new Error('Invalid gallery data format');
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [source, page, limit]);

  return { galleryData, isLoading, error };
}