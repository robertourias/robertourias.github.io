import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import {
  Button,
  Input,
  Textarea,
  FormGroup,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@nico.dev/ui";

const meta = {
  title: "Formulários/Compostos",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Formulário de Contato ────────────────────────────────────────────────────

type ContatoState = "idle" | "loading" | "success";

function ContatoFormComponent() {
  const [state, setState] = React.useState<ContatoState>("idle");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("success"), 1500);
  };

  if (state === "success") {
    return (
      <div className="w-[400px] space-y-4">
        <Alert variant="success">
          <AlertTitle>Mensagem enviada!</AlertTitle>
          <AlertDescription>
            Obrigado pelo contato. Retornaremos em breve.
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => setState("idle")} className="w-full">
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-[400px] space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Entre em contato</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Preencha o formulário e retornaremos em breve.
        </p>
      </div>

      <FormGroup label="Nome" htmlFor="contact-nome" required>
        <Input
          id="contact-nome"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup label="E-mail" htmlFor="contact-email" required>
        <Input
          id="contact-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup label="Mensagem" htmlFor="contact-mensagem" required>
        <Textarea
          id="contact-mensagem"
          placeholder="Como podemos ajudar?"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
      </FormGroup>

      <Button type="submit" className="w-full" disabled={state === "loading"}>
        {state === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

export const ContatoForm: Story = {
  name: "Formulário de Contato",
  render: () => <ContatoFormComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nomeInput = canvas.getByLabelText(/nome/i);
    await userEvent.tab();
    await userEvent.type(nomeInput, "Roberto Nicoletti", { delay: 30 });

    const emailInput = canvas.getByLabelText(/e-mail/i);
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, "roberto@nico.dev", { delay: 30 });

    const mensagemInput = canvas.getByLabelText(/mensagem/i);
    await userEvent.click(mensagemInput);
    await userEvent.type(mensagemInput, "Olá, gostaria de saber mais sobre seus serviços.", { delay: 20 });

    const submitButton = canvas.getByRole("button", { name: /enviar mensagem/i });
    await userEvent.click(submitButton);
  },
};

// ─── Formulário com Validação ─────────────────────────────────────────────────

type Fields = { nome: string; email: string; senha: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.nome.trim()) errors.nome = "Nome é obrigatório";
  if (!fields.email.trim()) errors.email = "E-mail é obrigatório";
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = "E-mail inválido";
  if (!fields.senha) errors.senha = "Senha é obrigatória";
  else if (fields.senha.length < 8) errors.senha = "Mínimo de 8 caracteres";
  return errors;
}

function ValidacaoFormComponent() {
  const [fields, setFields] = React.useState<Fields>({ nome: "", email: "", senha: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-[400px]">
        <Alert variant="success">
          <AlertTitle>Cadastro realizado!</AlertTitle>
          <AlertDescription>Bem-vindo, {fields.nome}.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-[400px] space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Criar conta</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Todos os campos são obrigatórios.</p>
      </div>

      <FormGroup label="Nome" htmlFor="val-nome" required error={errors.nome}>
        <Input
          id="val-nome"
          placeholder="Seu nome"
          value={fields.nome}
          onChange={set("nome")}
          variant={errors.nome ? "error" : "default"}
        />
      </FormGroup>

      <FormGroup label="E-mail" htmlFor="val-email" required error={errors.email}>
        <Input
          id="val-email"
          type="email"
          placeholder="seu@email.com"
          value={fields.email}
          onChange={set("email")}
          variant={errors.email ? "error" : "default"}
        />
      </FormGroup>

      <FormGroup
        label="Senha"
        htmlFor="val-senha"
        required
        error={errors.senha}
        hint={!errors.senha ? "Mínimo de 8 caracteres" : undefined}
      >
        <Input
          id="val-senha"
          type="password"
          placeholder="••••••••"
          value={fields.senha}
          onChange={set("senha")}
          variant={errors.senha ? "error" : "default"}
        />
      </FormGroup>

      <Button type="submit" className="w-full">
        Criar conta
      </Button>
    </form>
  );
}

export const ValidacaoForm: Story = {
  name: "Formulário com Validação",
  render: () => <ValidacaoFormComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Primeiro: submete vazio para disparar todos os erros
    const submitBtn = canvas.getByRole("button", { name: /criar conta/i });
    await userEvent.click(submitBtn);

    // Preenche corretamente após ver os erros
    const nomeInput = canvas.getByLabelText(/nome/i);
    await userEvent.click(nomeInput);
    await userEvent.type(nomeInput, "Roberto Nicoletti", { delay: 30 });

    const emailInput = canvas.getByLabelText(/e-mail/i);
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, "roberto@nico.dev", { delay: 30 });

    const senhaInput = canvas.getByLabelText(/senha/i);
    await userEvent.click(senhaInput);
    await userEvent.type(senhaInput, "senhasegura123", { delay: 30 });

    await userEvent.click(submitBtn);
  },
};
