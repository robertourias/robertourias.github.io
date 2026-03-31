import { projects, type Project } from "@/data/projects";

export default function Projects() {
  return (
    <section className="py-20 px-8 bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-8">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium text-black dark:text-zinc-50">
                {project.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}