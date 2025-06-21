import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">About Me</h1>
          <p className="mb-4">
            Hi! I'm a passionate developer with experience in building web applications using modern technologies like Next.js and Tailwind CSS.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <ul className="list-disc list-inside">
            <li>JavaScript & React</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Docker</li>
          </ul>
        </div>
      </div>
    </div>
  );
}