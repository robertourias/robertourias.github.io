import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Redirecionamento temporário para mailto (deve ser processado pelo frontend)
    const subject = encodeURIComponent("Contato através do site portfolio");
    const body = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    );
    const mailtoUrl = `mailto:roberto.urias@gmail.com?subject=${subject}&body=${body}`;

    return NextResponse.json({ success: true, redirectUrl: mailtoUrl });
  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    return NextResponse.json(
      { error: "Erro ao processar o formulário" },
      { status: 500 }
    );
  }
}