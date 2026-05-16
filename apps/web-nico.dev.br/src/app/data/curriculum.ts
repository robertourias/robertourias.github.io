export interface WorkExperience {
  company: string
  role: string
  period: string
  duration: string
  bullets: string[]
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface EducationEntry {
  degree: string
  institution: string
  period: string
  status: "completed" | "in_progress"
  expectedCompletion?: string
  highlights?: string[]
}

export interface CurriculumData {
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  summary: string[]
  skillGroups: SkillGroup[]
  differentials: string[]
  experiences: WorkExperience[]
  educationList: EducationEntry[]
}

export const curriculumData: CurriculumData = {
  name: "Roberto Nicoletti",
  title: "Senior Frontend / Product Engineer",
  location: "São Paulo — SP",
  email: "roberto.urias@gmail.com",
  phone: "11 98092-7661",
  linkedin: "https://www.linkedin.com/in/robertourias",
  github: "https://github.com/robertourias",

  summary: [
    "Desenvolvedor Front-end/Fullstack com mais de 10 anos de experiência construindo produtos digitais escaláveis para bancos e e-commerces de grande porte.",
    "Especialista em React, Next.js e arquitetura de front-end, com forte foco em performance, experiência do usuário e impacto no negócio. Atua na interseção entre engenharia e produto, contribuindo ativamente na definição de soluções que aumentam conversão, engajamento e eficiência operacional.",
    "Experiência sólida em ambientes ágeis, arquitetura escalável (Clean Architecture, DDD) e construção de Design Systems reutilizáveis.",
  ],

  skillGroups: [
    {
      label: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "Angular",
        "Vue.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "SASS",
        "Styled Components",
        "Tailwind CSS",
        "Shadcn/ui",
        "Bootstrap",
      ],
    },
    {
      label: "Backend & Infra",
      skills: [
        "Node.js",
        "NestJS",
        "APIs REST",
        "GraphQL",
        "Docker",
        "CI/CD",
        "MongoDB",
        "PostgreSQL",
      ],
    },
    {
      label: "Arquitetura & Qualidade",
      skills: [
        "Clean Architecture",
        "DDD",
        "Design Systems",
        "Storybook",
        "Testes unitários",
        "Testes de integração",
      ],
    },
    {
      label: "Performance & Analytics",
      skills: [
        "SEO técnico",
        "Core Web Vitals",
        "Google Tag Manager",
        "Web Performance",
      ],
    },
  ],

  differentials: [
    "Forte orientação a produto e impacto no negócio",
    "Experiência em projetos de grande escala (fintech, e-commerce)",
    "Capacidade de conectar tecnologia, UX e métricas",
    "Atuação em times ágeis e ambientes de alta performance",
  ],

  experiences: [
    {
      company: "Banco BMG (NAVA)",
      role: "Senior Frontend Engineer",
      period: "Fev 2025 – Atual",
      duration: "1 ano",
      bullets: [
        "Desenvolvi a plataforma de seguros com foco em performance, escalabilidade e experiência do usuário.",
        "Estruturei arquitetura de componentes reutilizáveis com Design System e Storybook, aumentando consistência e velocidade de desenvolvimento.",
        "Implementei interfaces modernas com React e Next.js, otimizando renderização (SSR) e performance.",
        "Atuei na integração com microsserviços via GraphQL e NestJS.",
        "Aumentei a qualidade do código por meio de testes automatizados e práticas de code review.",
      ],
    },
    {
      company: "Luizalabs (Magazine Luiza)",
      role: "Senior Frontend Engineer",
      period: "Jun 2024 – Nov 2024",
      duration: "6 meses",
      bullets: [
        "Otimizei a experiência do e-commerce, impactando diretamente usabilidade e conversão.",
        "Desenvolvi interfaces complexas com React, Next.js e Styled Components.",
        "Implementei rastreamento e monitoramento com GTM para análise de comportamento do usuário.",
        "Contribuí para estabilidade da aplicação com testes automatizados e boas práticas.",
      ],
    },
    {
      company: "PicPay",
      role: "Frontend Engineer",
      period: "Abr 2020 – Abr 2024",
      duration: "4 anos e 1 mês",
      bullets: [
        "Desenvolvi dashboards administrativos e ferramentas internas, melhorando a eficiência operacional.",
        "Atuei no desenvolvimento de aplicações web com React e Next.js, incluindo site institucional e blog.",
        "Trabalhei com sistemas legados (AngularJS, WordPress), garantindo evolução contínua.",
        "Criei webviews, landing pages e campanhas com foco em conversão.",
      ],
    },
    {
      company: "BRQ Digital Solutions",
      role: "Frontend Developer",
      period: "Jun 2019 – Abr 2020",
      duration: "11 meses",
      bullets: [
        "Desenvolvi aplicações com Angular, TypeScript e Bootstrap.",
        "Criei interfaces responsivas e performáticas com HTML5, CSS3 e SASS.",
      ],
    },
    {
      company: "Tritone Interactive",
      role: "Senior Frontend Developer",
      period: "Jul 2016 – Jun 2019",
      duration: "3 anos",
      bullets: [
        "Atuei no desenvolvimento de aplicações web responsivas e escaláveis.",
        "Estruturei arquitetura de front-end com foco em reutilização e performance.",
        "Trabalhei com Vue.js, Angular e ferramentas modernas de CSS.",
      ],
    },
    {
      company: "Beleza na Web",
      role: "Frontend Developer",
      period: "Abr 2014 – Jun 2016",
      duration: "2 anos e 3 meses",
      bullets: [
        "Desenvolvi interfaces para e-commerce com foco em conversão e performance.",
        "Trabalhei com AngularJS, Razor e integração com backend.",
        "Implementei estratégias de SEO técnico e otimizações de performance.",
      ],
    },
    {
      company: "IBM (Projeto Fastshop)",
      role: "Web Developer",
      period: "Set 2012 – Mar 2014",
      duration: "1 ano e 7 meses",
      bullets: [
        "Desenvolvi componentes de interface para e-commerce de grande escala.",
        "Trabalhei com JavaScript, Java e arquitetura corporativa.",
      ],
    },
    {
      company: "UOL",
      role: "Webmaster",
      period: "Set 2011 – Ago 2012",
      duration: "1 ano",
      bullets: [
        "Desenvolvi interfaces para portais de alto tráfego.",
        "Apliquei técnicas avançadas de SEO e performance.",
      ],
    },
    {
      company: "Tekbond",
      role: "Analista Programador",
      period: "Set 2009 – Ago 2011",
      duration: "2 anos",
      bullets: [
        "Desenvolvi sistemas internos e portais institucionais.",
        "Atuação fullstack com PHP, MySQL e JavaScript.",
      ],
    },
  ],

  educationList: [
    {
      degree: "Pós-graduação em Engenharia de Software em IA Aplicada",
      institution: "Unipds",
      period: "Em andamento",
      status: "in_progress",
      expectedCompletion: "04/2027",
      highlights: [
        "IA Generativa e LLMs",
        "RAG e Vector Databases",
        "Agents e Multi-Agent Systems",
        "MCP (Model Context Protocol)",
        "LangChain e LangGraph",
        "Arquitetura AI-First",
        "Fine-tuning de modelos",
        "DevOps para IA e AIOps",
        "Kubernetes e observabilidade",
        "Engenharia de prompts",
        "Sistemas multimodais",
      ],
    },
    {
      degree: "Bacharel em Sistemas de Informação",
      institution: "Universidade Bandeirantes de São Paulo",
      period: "2005 – 2008",
      status: "completed",
    },
  ],
}
