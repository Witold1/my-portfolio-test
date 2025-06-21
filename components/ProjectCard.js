export default function ProjectCard({ title, description, link }) {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
        <a href={link} className="text-blue-600 hover:underline">View Project</a>
      </div>
    );
  }