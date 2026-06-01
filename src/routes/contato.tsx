import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — PéDireito" },
      { name: "description", content: "Fale com o time PéDireito. Em que podemos te ajudar?" },
    ],
  }),
  component: Contato,
});

const WHATSAPP_NUMBER = "5511999999999"; // edite aqui

function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá PéDireito! Vim pelo site.")}`;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Contato</p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight">Fale conosco</h1>
        <p className="mt-3 text-muted-foreground text-lg">Em que podemos te ajudar?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-xl bg-primary text-primary-foreground p-5 hover:brightness-110 transition"
          >
            <MessageCircle className="h-7 w-7" />
            <div>
              <p className="font-semibold">Fale no WhatsApp</p>
              <p className="text-sm opacity-90">Atendimento rápido seg–sex 9h–18h</p>
            </div>
          </a>
          <div className="rounded-xl border border-border p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">contato@pedireito.com.br</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">(11) 99999-9999</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border p-6">
          {sent ? (
            <div className="py-8 text-center">
              <p className="font-display text-2xl font-bold text-primary">Mensagem enviada!</p>
              <p className="mt-2 text-muted-foreground text-sm">Em breve nosso time entrará em contato.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium block mb-1.5">Nome</label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">E-mail</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Telefone</label>
                <input
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Mensagem</label>
                <textarea
                  required
                  rows={4}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-foreground py-3 font-semibold text-background hover:bg-foreground/90"
              >
                Enviar mensagem
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}