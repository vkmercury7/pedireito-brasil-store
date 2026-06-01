import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Minus, Plus, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { getProduct, products, formatBRL } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import { buildCheckoutUrl } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — PéDireito` },
          { name: "description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.product.name} — PéDireito` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Produto não encontrado</h1>
      <Link to="/catalogo" className="mt-6 inline-block text-primary underline">
        Voltar ao catálogo
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem, setCartOpen } = useStore();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[2]);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const gallery = product.images?.length ? product.images : [product.image, product.image, product.image];
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const handleAdd = () => {
    if (product.soldOut) return;
    if (product.sizes && !size) return alert("Selecione um tamanho");
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
      size,
      color,
    });
  };

  const handleBuyNow = () => {
    if (product.soldOut) return;
    if (product.sizes && !size) return alert("Selecione um tamanho");
    const url = buildCheckoutUrl([{ slug: product.slug, quantity: qty, size, color }]);
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/catalogo" className="hover:text-foreground">Catálogo</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Galeria */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img src={gallery[activeImg]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "aspect-square overflow-hidden rounded-md bg-muted border-2 transition",
                  activeImg === i ? "border-primary" : "border-transparent hover:border-border",
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-black tracking-tight">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">{formatBRL(product.oldPrice!)}</span>
            )}
            <span className="font-display text-3xl font-bold text-primary">{formatBRL(product.price)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">ou 3x de {formatBRL(product.price / 3)} sem juros</p>

          {product.colors && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Cor: <span className="text-muted-foreground font-normal">{color}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition",
                      color === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Tamanho</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-[64px] rounded-md border px-3 py-2.5 text-sm font-medium transition",
                      size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-semibold">Quantidade</p>
            <div className="inline-flex items-center border border-border rounded-md">
              <button className="p-2 hover:bg-muted" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm font-medium">{qty}</span>
              <button className="p-2 hover:bg-muted" onClick={() => setQty(qty + 1)} aria-label="Aumentar">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <button
              onClick={handleAdd}
              disabled={product.soldOut}
              className="w-full rounded-md border-2 border-foreground bg-background py-3.5 font-semibold text-foreground hover:bg-foreground hover:text-background transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.soldOut ? "Esgotado" : "Adicionar ao carrinho"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.soldOut}
              className="w-full rounded-md bg-primary py-3.5 font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Comprar agora
            </button>
          </div>

          <div className="mt-8 prose prose-sm max-w-none text-foreground/80">
            <h3 className="font-display text-base font-bold uppercase tracking-wider">Descrição</h3>
            <p className="mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-border pt-6">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Entrega</p>
                <p className="text-xs text-muted-foreground">Frete para todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCcw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Trocas</p>
                <p className="text-xs text-muted-foreground">Até 30 dias para trocar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Compra segura</p>
                <p className="text-xs text-muted-foreground">Pagamento criptografado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <section className="mt-24">
        <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight mb-8">Você também vai gostar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}