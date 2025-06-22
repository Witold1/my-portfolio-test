import Navbar from '../components/Navbar';

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce site with product listings and payments.',
      image: 'https://picsum.photos/800/400?random=10',
      tech: ['Next.js', 'Node.js', 'Stripe'],
      link: 'https://github.com/Witold1/ecommerce',
      date: 'Jan 2023'
    },
    {
      title: 'Task Manager App',
      description: 'A productivity app for managing tasks with real-time updates.',
      image: 'https://picsum.photos/800/400?random=11',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      link: 'https://github.com/Witold1/task-manager',
      date: 'Mar 2023'
    },
    {
      title: 'Portfolio Website',
      description: 'This very portfolio site, built with Next.js and Tailwind.',
      image: 'https://picsum.photos/800/400?random=12',
      tech: ['Next.js', 'Tailwind CSS', 'Docker'],
      link: 'https://github.com/Witold1/my-portfolio-test',
      date: 'Jun 2025'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-2">{project.description}</p>
                <p className="text-sm text-gray-600 mb-2">Tech: {project.tech.join(', ')}</p>
                <p className="text-sm text-gray-600 mb-4">Completed: {project.date}</p>
                <a
                  href={project.link}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}