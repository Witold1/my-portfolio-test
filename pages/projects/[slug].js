import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import ContentBlock from '../../components/ContentBlock';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const post = posts.find((p) => p.slug === params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  const [modalImage, setModalImage] = useState(null);

  const closeModal = () => setModalImage(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{post.title} - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{post.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.subtitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Version: {post.version} • Created: {post.created}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tags: {post.tags.join(', ')}</p>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6 cursor-pointer"
            onClick={() => setModalImage(post.image)}
          />
          <div className="space-y-6">
            {post.content.map((block, index) => (
              <ContentBlock key={index} block={block} setModalImage={setModalImage} />
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Table of Contents: {post.toc.join(' • ')}</p>
            <p className="mt-2">
              How to cite: {post.citation} <a href={post.url} className="text-blue-600 dark:text-blue-400 hover:underline">{post.url}</a>
            </p>
          </div>
          <a href="#top" className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline">Back to top ⇪</a>
        </div>
      </div>
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="relative w-[80vw] max-h-[80vh] max-w-none overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalImage} alt="Modal Image" className="w-full h-auto object-contain rounded-lg" />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-100 text-4xl font-bold transition duration-300 hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}