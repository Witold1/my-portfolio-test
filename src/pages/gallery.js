import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import GalleryGridLayoutToolbar from '../components/gallery/GalleryGridLayoutToolbar';
import GalleryGroupToolbar from '../components/gallery/GalleryGroupToolbar';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import ToolbarIcon from '../components/content/ToolbarIcon';
import {
  getGalleryCategories,
  filterGalleryItems,
  filterVisibleGalleryItems,
  galleryNotesToMetaString,
  formatGalleryCategoryLabel,
  groupGalleryItems,
  orderGalleryItemsForGrouping,
  useGalleryLightbox,
} from '../lib/gallery';
import { useAdminPrefs } from '../components/admin/AdminPrefsProvider';
import ContentBreadcrumb from '../components/content/ContentBreadcrumb';
import { SITE_ORGANIZATION } from '../lib/site';

const galleryBreadcrumbItems = [
  { href: '/', label: 'Home' },
  { label: 'Gallery', title: 'Data and information visualization pond ⛵' },
];

export async function getStaticProps() {
  try {
    const { loadGallery } = await import('../lib/gallery/server');
    const { items: galleryData, categories: galleryCategories } = loadGallery();
    return {
      props: {
        galleryData,
        galleryCategories,
        galleryLoadError: null,
      },
    };
  } catch (err) {
    console.error('gallery getStaticProps:', err);
    return {
      props: {
        galleryData: [],
        galleryCategories: [],
        galleryLoadError: err?.message || 'Could not load gallery data',
      },
    };
  }
}

export default function Gallery({ galleryData, galleryCategories, galleryLoadError }) {
  const loadError = galleryLoadError;
  const { showHiddenGallery } = useAdminPrefs();
  const [gridType, setGridType] = useState('uniform');
  const [groupBy, setGroupBy] = useState('none');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const visibleItems = useMemo(
    () => filterVisibleGalleryItems(galleryData, { showHidden: showHiddenGallery }),
    [galleryData, showHiddenGallery],
  );

  const { item: modalItem, isOpen, open: openModal, close: closeModal } = useGalleryLightbox({
    syncQuery: true,
    catalog: visibleItems,
  });

  useEffect(() => {
    setPage(1);
  }, [filter, groupBy]);

  const categories = useMemo(
    () => getGalleryCategories(visibleItems, galleryCategories),
    [visibleItems, galleryCategories],
  );
  const filteredItems = useMemo(() => filterGalleryItems(visibleItems, filter), [visibleItems, filter]);
  const displayItems = useMemo(
    () => orderGalleryItemsForGrouping(filteredItems, groupBy),
    [filteredItems, groupBy],
  );
  const paginatedItems = useMemo(
    () => displayItems.slice(0, page * itemsPerPage),
    [displayItems, page],
  );
  const groupedSections = useMemo(
    () => groupGalleryItems(paginatedItems, groupBy),
    [groupBy, paginatedItems],
  );

  const modalDescription = modalItem ? galleryNotesToMetaString(modalItem.notes) : '';

  const selectCategory = (cat) => {
    setFilter((prev) => (cat !== 'all' && prev === cat ? 'all' : cat));
  };

  return (
    <>
      <Head>
        {modalItem ? (
          <>
            <title>{modalItem.title || `Gallery Item ${modalItem.id}`}</title>
            <meta name="description" content={modalDescription} />
            <meta property="og:title" content={modalItem.title || `Gallery Item ${modalItem.id}`} />
            <meta property="og:description" content={modalDescription} />
            {modalItem.src ? <meta property="og:image" content={modalItem.src} /> : null}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_ORGANIZATION} />
          </>
        ) : (
          <>
            <title>Data and Information Visualization Pond</title>
            <meta name="description" content="Explore my gallery of data and information visualizations" />
            <meta property="og:title" content="Data and Information Visualization Pond" />
            <meta property="og:description" content="Explore my gallery of data and information visualizations" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_ORGANIZATION} />
          </>
        )}
      </Head>
      <div className="content-page flex flex-col">
        <div className="content-main flex-grow">
          <div className="content-reading relative">
            <div className="content-breadcrumb-rail">
              <ContentBreadcrumb items={galleryBreadcrumbItems} />
            </div>
            <div className="content-index-body">
              <div className="gallery-toolbar">
                <div
                  role="group"
                  aria-label="Filter by category"
                  className="gallery-cat-row"
                >
                  <ToolbarIcon name="filter" className="gallery-cat-row__icon" />
                  {categories.map((category) => {
                    const pressed = filter === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={pressed}
                        disabled={!!loadError}
                        onClick={() => selectCategory(category)}
                        className={`gallery-cat-chip${pressed ? ' gallery-cat-chip--active' : ''}`}
                      >
                        {formatGalleryCategoryLabel(category)}
                      </button>
                    );
                  })}
                </div>
                <div className="gallery-toolbar__controls">
                  <GalleryGridLayoutToolbar
                    gridType={gridType}
                    onUniform={() => setGridType('uniform')}
                    onVariable={() => setGridType('variable')}
                  />
                  <GalleryGroupToolbar
                    groupBy={groupBy}
                    onNone={() => setGroupBy('none')}
                    onYear={() => setGroupBy('year')}
                    onSeries={() => setGroupBy('series')}
                  />
                </div>
              </div>
              {loadError && (
                <p className="text-red-600 dark:text-red-400" role="alert">
                  {loadError}
                </p>
              )}
              {!loadError && paginatedItems.length > 0 ? (
                <>
                  {groupedSections ? (
                    <div className="gallery-group-sections">
                      {groupedSections.map((section) => (
                        <section
                          key={section.key}
                          className="gallery-group-section"
                          aria-labelledby={`gallery-group-${section.key}`}
                        >
                          <h2
                            id={`gallery-group-${section.key}`}
                            className="gallery-group-heading"
                          >
                            {section.label}
                          </h2>
                          <GalleryGrid
                            items={section.items}
                            onCardClick={openModal}
                            layout={gridType}
                          />
                        </section>
                      ))}
                    </div>
                  ) : (
                    <GalleryGrid
                      items={paginatedItems}
                      onCardClick={openModal}
                      layout={gridType}
                    />
                  )}
                  {paginatedItems.length < displayItems.length && (
                    <button
                      type="button"
                      onClick={() => setPage(page + 1)}
                      className="gallery-load-more"
                    >
                      Load more
                      <svg
                        className="gallery-load-more__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </>
              ) : null}
              {!loadError && galleryData.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No gallery items to display.</p>
              ) : null}
              {!loadError && visibleItems.length > 0 && paginatedItems.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No items match the selected filter.</p>
              ) : null}
            </div>
            <GalleryLightbox isOpen={isOpen} onClose={closeModal} item={modalItem} />
          </div>
        </div>
      </div>
    </>
  );
}
