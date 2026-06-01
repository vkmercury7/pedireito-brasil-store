import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero-brasil.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PéDireito — Coleção Brasil" },
      { name: "description", content: "Tênis, camisetas e bonés com identidade brasileira. Coleção Brasil PéDireito." },
      { property: "og:title", content: "PéDireito — Coleção Brasil" },
      { property: "og:description", content: "Identidade. Liberdade. Passo Firme." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Bandeira do Brasil" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-24 md:py-36 text-background">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent mb-6">Coleção Brasil</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] font-black max-w-3xl">
            Ditado Popular.<br />
            Identidade Brasileira.<br />
            <span className="text-accent">Liberdade de Escolha.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-background/80 max-w-xl">
            Identidade. Liberdade. Passo Firme.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-4 font-semibold text-accent-foreground hover:brightness-110 transition"
            >
              Comprar agora
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-md border border-background/40 px-8 py-4 font-semibold text-background hover:bg-background/10 transition"
            >
              Ver coleção
            </Link>
          </div>
        </div>
      </section>

      {/* COLEÇÃO */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">Coleção Brasil</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight">Nossos produtos</h2>
          </div>
          <Link to="/catalogo" className="hidden md:inline-block text-sm font-semibold underline-offset-4 hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-foreground text-background py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Manifesto</p>
          <p className="font-display text-3xl md:text-5xl font-black leading-tight">
            Cada passo é uma escolha. Cada escolha, uma <span className="text-accent">identidade</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
