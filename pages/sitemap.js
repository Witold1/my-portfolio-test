import Link from 'next/link';
import Head from 'next/head';

export default function Sitemap() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Sitemap - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Sitemap</h1>
          <ul className="space-y-2 text-center">
            <li><Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</Link></li>
            <li><Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About</Link></li>
            <li><Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">Projects</Link></li>
            <li><Link href="/gallery" className="text-blue-600 dark:text-blue-400 hover:underline">Gallery</Link></li>
            <li><Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}