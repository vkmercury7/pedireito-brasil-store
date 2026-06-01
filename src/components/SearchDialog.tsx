import { Search, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/context/StoreContext";
import { formatBRL, products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function SearchDialog() {
  const { searchOpen, setSearchOpen, query, setQuery, results } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const list = query.trim() ? results : products.slice(0, 4);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity",
        searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto mt-20 max-w-2xl px-4">
        <div className="bg-background rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você procura?"
              className="flex-1 bg-transparent text-base outline-none"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Fechar">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {query.trim() ? `${results.length} resultado(s)` : "Sugestões"}
            </p>
            {list.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</p>
            ) : (
              <ul>
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/produto/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                    >
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover bg-muted" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                      <span className="text-sm font-semibold">{formatBRL(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}