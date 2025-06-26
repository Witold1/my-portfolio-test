import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 text-left">
        <div className="mb-0">
          <Link href="/sitemap" className="hover:underline text-sm">Sitemap</Link>
        </div>
        <p className="text-sm">
          © Copyright 2025 by Witold's Data Consulting, LLC. All rights reserved. Designed and developed by Witold's Data Consulting, LLC.
        </p>
      </div>
    </footer>
  );
}