export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Projeto 1",
    description: "Descrição do projeto 1",
    image: "/project1.jpg",
    tags: ["React", "TypeScript"],
    link: "#",
  },
];