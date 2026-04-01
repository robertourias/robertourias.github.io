export default function Skills() {
  const skills = [
    { title: "Frontend", description: "React • Next.js • TypeScript" },
    { title: "Backend", description: "Node.js • NestJS • APIs REST • GraphQL" },
    { title: "Inteligência Artificial", description: "LLMs • RAG • Embeddings • Agents • Prompt Engineering" },
    { title: "Banco de dados", description: "PostgreSQL • Redis" },
    { title: "Infraestrutura", description: "Vercel • Docker • Cloud Deploy" },
  ];

  return (
    <section id="skills" className="py-20 md:py-24 px-6 md:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-12 md:mb-16 space-y-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface tracking-tighter">
            Conhecimentos
          </h2>
          <p className="text-on-surface-variant text-lg">
            Tecnologias e conceitos que utilizo para construir soluções robustas e inteligentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10"
            >
              <h4 className="font-display font-bold text-primary mb-3 md:mb-4 uppercase text-xs tracking-widest">
                {skill.title}
              </h4>
              <p className="text-on-surface font-medium leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}