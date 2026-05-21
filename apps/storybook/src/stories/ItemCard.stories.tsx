import type { Meta, StoryObj } from "@storybook/react";
import { ItemCard } from "@nico.dev/ui";

const meta = {
  title: "UI/ItemCard",
  component: ItemCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    title: "Título do Item",
  },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComIcone: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      media={
        <div className="flex items-center justify-center h-24 bg-muted">
          <span className="text-3xl" aria-hidden="true">🔧</span>
        </div>
      }
      title="Ferramenta com Ícone"
      description="Exemplo de card com ícone como área de mídia. O slot media aceita qualquer ReactNode."
      links={[{ label: "Ver mais", href: "#", variant: "outline" }]}
    />
  ),
};

export const ComImagem: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      media={
        <img
          src="https://placehold.co/400x225"
          alt="Preview do projeto"
          className="aspect-video object-cover w-full"
        />
      }
      title="Projeto com Imagem"
      description="Exemplo de card com imagem de preview como área de mídia, proporção 16/9."
      links={[
        { label: "Ver repositório", href: "#", variant: "outline", target: "_blank" },
        { label: "Ver projeto", href: "#", variant: "default", target: "_blank" },
      ]}
    />
  ),
};

export const SemMidia: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      title="Card sem Mídia"
      description="Quando nenhuma prop media é fornecida, o card exibe apenas texto e links."
      links={[{ label: "Saiba mais", href: "#", variant: "outline" }]}
    />
  ),
};

export const SemDescricao: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      media={
        <div className="flex items-center justify-center h-24 bg-muted">
          <span className="text-3xl" aria-hidden="true">📊</span>
        </div>
      }
      title="Card sem Descrição"
      links={[{ label: "Acessar", href: "#", variant: "default" }]}
    />
  ),
};

export const SemLinks: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      media={
        <img
          src="https://placehold.co/400x225"
          alt="Preview do projeto"
          className="aspect-video object-cover w-full"
        />
      }
      title="Card sem Links"
      description="Quando não há links, o rodapé de ações não é renderizado."
    />
  ),
};

export const MultiplosBotoes: Story = {
  render: () => (
    <ItemCard
      className="w-72"
      media={
        <img
          src="https://placehold.co/400x225"
          alt="Preview do projeto"
          className="aspect-video object-cover w-full"
        />
      }
      title="Card com Múltiplos Botões"
      description="Dois links de ação: primário e outline. Os botões ficam em linha com quebra automática."
      links={[
        {
          label: "Ver repositório",
          href: "#",
          variant: "outline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        {
          label: "Ver projeto",
          href: "#",
          variant: "default",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ]}
    />
  ),
};
