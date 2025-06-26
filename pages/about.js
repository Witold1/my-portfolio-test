import Head from 'next/head';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>About - Witold's Data Consulting</title>
      </Head>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>
          <p className="text-lg mb-4">
            Hello, I'm Witold, a data enthusiast specializing in analytical projects and data visualization. 
            With a passion for uncovering insights through data, I create compelling visualizations and robust solutions.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Data Analysis</li>
            <li>Data Visualization</li>
            <li>Web Development</li>
            <li>Project Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}