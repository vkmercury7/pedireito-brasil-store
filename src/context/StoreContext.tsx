import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

type StoreCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size?: string, color?: string) => void;
  updateQty: (slug: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  results: Product[];
};

const Ctx = createContext<StoreCtx | null>(null);

const STORAGE_KEY = "pedireito_cart_v1";

function sameLine(a: CartItem, b: CartItem) {
  return a.slug === b.slug && a.size === b.size && a.color === b.color;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => sameLine(p, item));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeItem = (slug: string, size?: string, color?: string) => {
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size && p.color === color)));
  };

  const updateQty = (slug: string, qty: number, size?: string, color?: string) => {
    if (qty <= 0) return removeItem(slug, size, color);
    setItems((prev) =>
      prev.map((p) => (p.slug === slug && p.size === size && p.color === color ? { ...p, quantity: qty } : p)),
    );
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [query]);

  return (
    <Ctx.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear: () => setItems([]),
        count,
        subtotal,
        cartOpen,
        setCartOpen,
        searchOpen,
        setSearchOpen,
        query,
        setQuery,
        results,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}