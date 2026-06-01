import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — PéDireito" },
      { name: "description", content: "Conheça todos os produtos da Coleção Brasil PéDireito." },
    ],
  }),
  component: Catalogo,
});

const CATEGORIES = ["Todos", "Tênis", "Camiseta", "Boné"] as const;

function Catalogo() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const list = cat === "Todos" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Coleção Brasil</p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight">Catálogo</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Tênis, camisetas e acessórios com identidade brasileira. Liberdade de escolha em cada passo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              cat === c
                ? "bg-foreground text-background border-foreground"
                : "border-border text-foreground/70 hover:border-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}