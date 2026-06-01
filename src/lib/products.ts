import tenisAmarelo from "@/assets/tenis-amarelo.jpg";
import tenisBranco from "@/assets/tenis-branco.jpg";
import tenisVerde from "@/assets/tenis-verde.jpg";
import tenisAzul from "@/assets/tenis-azul.jpg";
import camisetaBrasil from "@/assets/camiseta-brasil.jpg";
import camisetaAqui from "@/assets/camiseta-aqui.jpg";
import boneBrasil from "@/assets/bone-brasil.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: "Tênis" | "Camiseta" | "Boné";
  description: string;
  sizes?: string[];
  colors?: string[];
  soldOut?: boolean;
};

const SHOE_SIZES = ["35/36", "37/38", "39/40", "41/42", "43/44"];
const SHIRT_SIZES = ["P", "M", "G", "GG"];

const DESC_TENIS =
  "Tênis casual da Coleção Brasil PéDireito. Cabedal em lona resistente, palmilha acolchoada e solado vulcanizado de alta durabilidade. Conforto para o dia a dia, com identidade brasileira e passo firme.";
const DESC_CAMISETA =
  "Camiseta unissex em algodão premium, modelagem confortável e estampa de alta qualidade. Vista a identidade brasileira com orgulho.";
const DESC_BONE =
  "Boné estilo dad hat com bordado Brasil. Tecido leve, regulagem traseira e acabamento premium.";

export const products: Product[] = [
  {
    slug: "classico-amarelo",
    name: "Clássico Amarelo",
    price: 59.9,
    oldPrice: 69.9,
    image: tenisAmarelo,
    category: "Tênis",
    description: DESC_TENIS,
    sizes: SHOE_SIZES,
  },
  {
    slug: "classico-branco",
    name: "Clássico Branco",
    price: 59.9,
    oldPrice: 69.9,
    image: tenisBranco,
    category: "Tênis",
    description: DESC_TENIS,
    sizes: SHOE_SIZES,
  },
  {
    slug: "classico-verde",
    name: "Clássico Verde",
    price: 59.9,
    oldPrice: 69.9,
    image: tenisVerde,
    category: "Tênis",
    description: DESC_TENIS,
    sizes: SHOE_SIZES,
  },
  {
    slug: "classico-azul",
    name: "Clássico Azul",
    price: 59.9,
    oldPrice: 69.9,
    image: tenisAzul,
    category: "Tênis",
    description: DESC_TENIS,
    sizes: SHOE_SIZES,
  },
  {
    slug: "camiseta-brasil",
    name: "Camiseta Brasil",
    price: 129.9,
    image: camisetaBrasil,
    category: "Camiseta",
    description: DESC_CAMISETA,
    sizes: SHIRT_SIZES,
    colors: ["Amarelo", "Verde", "Branco"],
  },
  {
    slug: "camiseta-aqui-e-o-brasil",
    name: "Camiseta Aqui é o Brasil",
    price: 129.9,
    image: camisetaAqui,
    category: "Camiseta",
    description: DESC_CAMISETA,
    sizes: SHIRT_SIZES,
    colors: ["Verde", "Amarelo"],
  },
  {
    slug: "bone-brasil",
    name: "Boné Brasil",
    price: 119.9,
    image: boneBrasil,
    category: "Boné",
    description: DESC_BONE,
    soldOut: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}