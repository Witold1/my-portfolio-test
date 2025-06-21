import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const projects = [
    { title: 'Project One', description: 'A web app built with Next.js.', link: '#' },
    { title: 'Project Two', description: 'A REST API with Node.js.', link: '#' },
    { title: 'Project Three', description: 'A mobile-first UI with Tailwind.', link: '#' },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}