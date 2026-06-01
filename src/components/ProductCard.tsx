import { Link } from "@tanstack/react-router";
import { type Product, formatBRL } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && !product.soldOut && (
            <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Promoção
            </span>
          )}
          {product.soldOut && (
            <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
              Esgotado
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">{formatBRL(product.oldPrice!)}</span>
          )}
          <span className={cn("font-display text-lg font-bold", hasDiscount && "text-primary")}>
            {formatBRL(product.price)}
          </span>
        </div>
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-foreground/70 border-b border-foreground/30 pb-0.5 group-hover:text-primary group-hover:border-primary">
          Ver produto
        </span>
      </div>
    </Link>
  );
}