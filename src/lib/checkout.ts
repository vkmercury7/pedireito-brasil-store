// Edite este link para o seu checkout externo (Shopify, Yampi, Hotmart, etc.)
export const CHECKOUT_URL = "https://checkout.exemplo.com.br/pedireito";

export function buildCheckoutUrl(items: { slug: string; quantity: number; size?: string; color?: string }[]) {
  const params = new URLSearchParams();
  params.set(
    "items",
    items.map((i) => `${i.slug}:${i.quantity}${i.size ? `:${i.size}` : ""}`).join(","),
  );
  return `${CHECKOUT_URL}?${params.toString()}`;
}