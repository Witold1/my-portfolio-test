import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
          <Link href="/" className="hover:underline text-sm">Home</Link>
          <Link href="/sitemap" className="hover:underline text-sm">Sitemap</Link>
        </div>
        <div className="text-sm text-center">
          <p>Designed and developed by Witold's Data Consulting, LLC.</p>
          <p>© Copyright 2025 by Witold's Data Consulting, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}