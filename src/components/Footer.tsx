import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <h2 className="font-display text-[18vw] md:text-[12rem] leading-none font-black tracking-tighter text-center bg-gradient-to-b from-[oklch(0.85_0.18_95)] to-[oklch(0.52_0.18_145)] bg-clip-text text-transparent select-none">
          AQUI É BRASIL
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Loja</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/catalogo" className="hover:text-background">Catálogo</Link></li>
              <li><Link to="/" className="hover:text-background">Coleção Brasil</Link></li>
              <li><Link to="/contato" className="hover:text-background">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Marca</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background">Sobre nós</a></li>
              <li><a href="#" className="hover:text-background">Manifesto</a></li>
              <li><a href="#" className="hover:text-background">Lojistas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Redes sociais</h3>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full border border-background/20 p-2 hover:bg-background/10"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="rounded-full border border-background/20 p-2 hover:bg-background/10"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Youtube" className="rounded-full border border-background/20 p-2 hover:bg-background/10"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="flex-1 min-w-0 rounded-l-md bg-background/10 border border-background/20 px-3 py-2 text-sm placeholder:text-background/40 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-background/15 pt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-background/60">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-background">Política de Privacidade</a>
            <a href="#" className="hover:text-background">Política de Reembolso</a>
            <a href="#" className="hover:text-background">Termos de Serviço</a>
            <a href="#" className="hover:text-background">Informações de Contato</a>
          </div>
          <div>CNPJ 00.000.000/0001-00</div>
        </div>
        <div className="mt-4 text-xs text-background/50">© 2026 PéDireito. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}