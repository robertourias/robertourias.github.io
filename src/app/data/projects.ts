export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "NeuralEngine v2.0",
    description: "Motor de inferência de alto desempenho otimizado para dispositivos de borda usando técnicas de modelos quantizados.",
    category: "Otimização de IA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoWFIyacuOb17QB-qZUVGwXzfZv6NDWoX_JBAP4tAtQPPnBEnPYvg9ULpJGP9jb3-m-Ytkb_M4_GRybM452v9DZYjSCJQvJYRXHY-_UI9fG4ln2_nQht7TvazmxRvVvfajfoYuL6bGT4vB8-1UK8tfoVziXyiJ5fP2xnpSeYC0-hf4L2FN42D79lIXRoUviydsugC5IEPxieHmSt7iFFPRj6sZIrTk4eUKyBHabYCiI_6oozR8AUVw3Cm4hzv-DT-LjeiO_QPeN0U",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Semantic Bridge",
    description: "Tradutor universal para esquemas de dados estruturados usando zero-shot learning sobre instâncias privadas de LLM.",
    category: "Processamento Natural",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByEYYeqewanT-zKhtP9DJx2Fs__Ek1sTCMcAUsDAK-2p7uyVeuZpmzVVmWc2JUB9TkOH0dhGFsR1VMtlM0ejIBm2YIL9zBCRko6EjOfTyJmQBZvWCS_mKzOJbi71tnLqijPvvKfRcDRxYAVAGm7uN_mVEW_GpHbzQwrXvrjf2XUI8HkuVtaLKND75lz82buj8g6BaipxPuQlGh8On5PoD83uU7wIvKvf-AGerW010Rsm2VeNqHk9XxlbiVboJfvyj_cKkVa8OLXkQ",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Arch.AI",
    description: "Gerador automatizado de infraestrutura como código que prevê necessidades de escalabilidade em nuvem.",
    category: "Automação",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVXLoxaYDk2EjujUnfKEDn_w87Vsrg1qsRI7I2cZsGFtXOat8FcYUbkT8tirlIHhor6deLJXY2iFM43zo4elwZGZK0JOdKSrqE3n2OZ_i9mjjtcsu9kG21dKKU_egK1jXigWe064X5n9RbwJH7OrydyX30U3fHFHc_owMDTe4uDx__XzYXCL6lvoxXuMv1NoO76EA6ljAZEeB8blglgrog1ABqy7UWUTW5CphhH73HIaDhmbgs3jO66XmZLp0nWfjYgMQiFtUALYI",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 4,
    title: "NeuralEngine v2.0",
    description: "Motor de inferência de alto desempenho otimizado para dispositivos de borda usando técnicas de modelos quantizados.",
    category: "Otimização de IA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoWFIyacuOb17QB-qZUVGwXzfZv6NDWoX_JBAP4tAtQPPnBEnPYvg9ULpJGP9jb3-m-Ytkb_M4_GRybM452v9DZYjSCJQvJYRXHY-_UI9fG4ln2_nQht7TvazmxRvVvfajfoYuL6bGT4vB8-1UK8tfoVziXyiJ5fP2xnpSeYC0-hf4L2FN42D79lIXRoUviydsugC5IEPxieHmSt7iFFPRj6sZIrTk4eUKyBHabYCiI_6oozR8AUVw3Cm4hzv-DT-LjeiO_QPeN0U",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 5,
    title: "Semantic Bridge",
    description: "Tradutor universal para esquemas de dados estruturados usando zero-shot learning sobre instâncias privadas de LLM.",
    category: "Processamento Natural",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByEYYeqewanT-zKhtP9DJx2Fs__Ek1sTCMcAUsDAK-2p7uyVeuZpmzVVmWc2JUB9TkOH0dhGFsR1VMtlM0ejIBm2YIL9zBCRko6EjOfTyJmQBZvWCS_mKzOJbi71tnLqijPvvKfRcDRxYAVAGm7uN_mVEW_GpHbzQwrXvrjf2XUI8HkuVtaLKND75lz82buj8g6BaipxPuQlGh8On5PoD83uU7wIvKvf-AGerW010Rsm2VeNqHk9XxlbiVboJfvyj_cKkVa8OLXkQ",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 6,
    title: "Arch.AI",
    description: "Gerador automatizado de infraestrutura como código que prevê necessidades de escalabilidade em nuvem.",
    category: "Automação",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVXLoxaYDk2EjujUnfKEDn_w87Vsrg1qsRI7I2cZsGFtXOat8FcYUbkT8tirlIHhor6deLJXY2iFM43zo4elwZGZK0JOdKSrqE3n2OZ_i9mjjtcsu9kG21dKKU_egK1jXigWe064X5n9RbwJH7OrydyX30U3fHFHc_owMDTe4uDx__XzYXCL6lvoxXuMv1NoO76EA6ljAZEeB8blglgrog1ABqy7UWUTW5CphhH73HIaDhmbgs3jO66XmZLp0nWfjYgMQiFtUALYI",
    demoUrl: "#",
    repoUrl: "#",
  },
];