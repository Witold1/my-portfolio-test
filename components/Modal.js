'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Modal = ({ isOpen, onClose, item }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !item) return null;

  // Generate share URL with query parameter
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-username.github.io';
  const shareUrl = `${baseUrl}/gallery?item=${item.id}`;
  const shareText = item.title ? `Check out "${item.title}" on my gallery!` : 'Check out this gallery item!';

  // Encode URL and text for sharing
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  // Social media share links
  const shareLinks = [
    {
      platform: 'X',
      url: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.9 2.2h3.3l-7.2 8.3 8.5 11.3h-6.7l-5.3-6.9-6 6.9H2.2l7.7-8.8L1.7 2.2h6.8l4.8 6.4 5.6-6.4zm-1.2 17.6h1.8L6.7 4.1H4.8l12.9 15.7z" />
        </svg>
      ),
    },
    {
      platform: 'Bluesky',
      url: `https://bsky.app/intent/compose?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.1C7.8 5.2 2.6-1.4 2.4 5.8c-.1 3.8 3.2 6.9 9.6 12.5 6.4-5.6 9.7-8.7 9.6-12.5-.2-7.2-5.4-.6-9.6 4.3zM2.4 13.8c.2 7.2 5.9 1.8 9.6-4 3.7 5.8 9.4 11.2 9.6 4 0 0-.1-1.7-.4-3.3-1.3 3.2-5.4 5.5-9.2 3.9 0 0 2.8 2.2 2.8 5.2 0 4.2-4.6 5.8-8.4 2.7-1.9-1.6-2.5-3.8-1.7-5.2-.3 1.5-.3 2.7-.3 2.7z" />
        </svg>
      ),
    },
    {
      platform: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4h-3V12.1h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9v8.4c5.7-.9 10.1-5.9 10.1-11.9z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged gallery item"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Content */}
        {item['content-type'] === 'image' && item.src ? (
          <div className="relative w-full max-w-[95vw] mx-auto">
            <Image
              src={item.src}
              alt={item.title || `Gallery item ${item.id}`}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto object-contain max-h-[85vh] rounded-lg"
              quality={90}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP7YIlkwAAAABJRU5ErkJggg=="
              aria-label={item.title || `Gallery item ${item.id}`}
            />
          </div>
        ) : item['content-type'] === 'image' ? (
          <p className="p-4 text-gray-700 dark:text-gray-300">
            Error: Invalid image source
          </p>
        ) : null}
        {item['content-type'] === 'video' && item.src ? (
          <div className="relative w-full max-w-[95vw] mx-auto">
            <video
              src={item.src}
              controls
              autoPlay
              className="w-full h-auto object-contain max-h-[85vh] rounded-lg"
              aria-label={item.title || `Video item ${item.id}`}
            />
          </div>
        ) : item['content-type'] === 'video' ? (
          <p className="p-4 text-gray-700 dark:text-gray-300">
            Error: Invalid video source
          </p>
        ) : null}
        {item['content-type'] === 'carousel' && (
          <div className="w-full max-w-[95vw] mx-auto h-max flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <p>Carousel Placeholder (TBD)</p>
          </div>
        )}
        {!['image', 'video', 'carousel'].includes(item['content-type']) && (
          <p className="p-4 text-gray-700 dark:text-gray-300">Unsupported content type: {item['content-type']}</p>
        )}
        {/* Details */}
        <div className="p-6">
          {item.title && (
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {item.title}
            </h2>
          )}
          {item.notes && (
            <div className="mb-2">
              {Array.isArray(item.notes) ? (
                item.notes.map((note, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-2">
                    {note}
                  </p>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300 mb-2">{item.notes}</p>
              )}
            </div>
          )}
          {item.link && (
            <div className="mb-2">
              {Array.isArray(item.link) ? (
                <ul className="list-disc pl-5">
                  {item.link.map((url, index) => (
                    <li key={index}>
                      <Link
                        href={url}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read more about this item, link ${index + 1}`}
                      >
                        Read more {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link
                  href={item.link}
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read more about this item"
                >
                  Read more
                </Link>
              )}
            </div>
          )}
          {/* Share Buttons */}
          {(item['content-type'] === 'image' || item['content-type'] === 'video') && item.src && (
            <div className="mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Share this item:</p>
              <div className="flex space-x-3">
                {shareLinks.map(({ platform, url, icon }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label={`Share on ${platform}`}
                  >
                    {icon}
                    <span>{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          {item.categories && item.categories.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Categories: {item.categories.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;