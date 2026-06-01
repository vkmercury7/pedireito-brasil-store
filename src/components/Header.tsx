import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const { count, setCartOpen, setSearchOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-8">
          <button
            type="button"
            aria-label="Abrir menu"
            className="md:hidden -ml-1 p-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-black tracking-tight text-foreground">
              Pé<span className="text-primary">Direito</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button aria-label="Buscar" className="p-2 hover:text-primary" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Conta" className="p-2 hover:text-primary hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Carrinho" className="relative p-2 hover:text-primary" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-72 bg-background p-6 shadow-2xl transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display text-xl font-black">
              Pé<span className="text-primary">Direito</span>
            </span>
            <button aria-label="Fechar menu" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}