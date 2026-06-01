import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/context/StoreContext";
import { formatBRL } from "@/lib/products";
import { buildCheckoutUrl } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, items, updateQty, removeItem, subtotal } = useStore();

  const handleCheckout = () => {
    const url = buildCheckoutUrl(items.map((i) => ({ slug: i.slug, quantity: i.quantity, size: i.size, color: i.color })));
    window.open(url, "_blank");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity",
        cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setCartOpen(false)} />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background shadow-2xl transition-transform flex flex-col",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-lg font-bold">Seu carrinho</h2>
          <button aria-label="Fechar" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center gap-4">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-foreground/80 font-medium">O carrinho está vazio</p>
            <Link
              to="/catalogo"
              onClick={() => setCartOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Voltar à loja
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover bg-muted" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium text-sm leading-tight">{item.name}</p>
                      <button
                        aria-label="Remover"
                        onClick={() => removeItem(item.slug, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {(item.size || item.color) && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.size && <>Tam {item.size}</>}{item.size && item.color && " · "}{item.color}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-md">
                        <button
                          aria-label="Diminuir"
                          className="p-1.5 hover:bg-muted"
                          onClick={() => updateQty(item.slug, item.quantity - 1, item.size, item.color)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          aria-label="Aumentar"
                          className="p-1.5 hover:bg-muted"
                          onClick={() => updateQty(item.slug, item.quantity + 1, item.size, item.color)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{formatBRL(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold">{formatBRL(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Frete e impostos calculados no checkout.</p>
              <button
                onClick={handleCheckout}
                className="w-full rounded-md bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}