import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load projects data:', err));
  }, []);

  const filteredPosts = filter === 'all' ? posts : posts.filter((post) => post.major && filter === 'major');

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Projects - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">My Blog</h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilter('major')}
              className={`px-4 py-2 rounded ${filter === 'major' ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Major Posts
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link href={`/projects/${post.slug}`} key={post.slug}>
                <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.subtitle}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.year}</p>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline">See more...</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}