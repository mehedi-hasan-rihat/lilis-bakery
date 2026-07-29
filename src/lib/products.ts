export type ProductCategory =
  | "signature"
  | "celebration"
  | "petits-fours"
  | "wedding";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  signature: "Signature Cakes",
  celebration: "Celebration Cakes",
  "petits-fours": "Petits Fours & Macarons",
  wedding: "Wedding Cakes",
};

export interface ProductSize {
  id: string;
  label: string;
  serves: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  badge?: string;
  tagline: string;
  description: string;
  image: string;
  sizes: ProductSize[];
}

export const products: Product[] = [
  {
    slug: "wild-berry-bloom",
    name: "Wild Berry Bloom",
    category: "signature",
    badge: "Best seller",
    tagline: "Blackberry mascarpone sponge, wild berry compote",
    description:
      "A hand-piped violet drip cascades over blush mascarpone buttercream, finished with fresh berries and edible blossoms. Baked fresh and hand-delivered on your date.",
    image: "/images/berry-bloom.jpg",
    sizes: [
      { id: "6in", label: "6″ round", serves: "Serves 8", price: 6800 },
      { id: "8in", label: "8″ round", serves: "Serves 12", price: 9150 },
      { id: "10in", label: "10″ round", serves: "Serves 20", price: 11450 },
    ],
  },
  {
    slug: "lavender-rosette",
    name: "Lavender Rosette",
    category: "signature",
    tagline: "Lavender-infused vanilla, Italian meringue rosettes",
    description:
      "Silky lavender buttercream piped into billowing rosettes over a vanilla bean sponge, scattered with crystallised violets. Delicate, floral, and unmistakably ours.",
    image: "/images/lavender-rosette.jpg",
    sizes: [
      { id: "6in", label: "6″ round", serves: "Serves 8", price: 6300 },
      { id: "8in", label: "8″ round", serves: "Serves 12", price: 8650 },
      { id: "10in", label: "10″ round", serves: "Serves 20", price: 11000 },
    ],
  },
  {
    slug: "magic-unicorn",
    name: "Magic Unicorn",
    category: "celebration",
    badge: "Kids' favourite",
    tagline: "Vanilla bean sponge, rainbow buttercream mane",
    description:
      "A gold leaf horn, hand-piped rainbow mane and the sweetest sugar-work eyelashes — a showstopper for little dreamers and birthday tables everywhere.",
    image: "/images/magic-unicorn.jpg",
    sizes: [
      { id: "6in", label: "6″ round", serves: "Serves 8", price: 7250 },
      { id: "8in", label: "8″ round", serves: "Serves 14", price: 10050 },
    ],
  },
  {
    slug: "petits-fours-macaron-box",
    name: "Petits Fours & Macaron Box",
    category: "petits-fours",
    tagline: "Lavender & vanilla macarons, petite cupcakes",
    description:
      "A hand-tied box of our weekly macarons and petite cupcakes — lavender, vanilla bean and rose. Made from scratch in small batches, no artificial anything.",
    image: "/images/petits-fours.jpg",
    sizes: [
      { id: "box9", label: "Box of 9", serves: "9 pieces", price: 3750 },
      { id: "box18", label: "Box of 18", serves: "18 pieces", price: 6800 },
    ],
  },
  {
    slug: "the-grand-dream",
    name: "The Grand Dream",
    category: "wedding",
    badge: "Signature drip cake",
    tagline: "Three-tier vanilla bean, hand-painted ombré",
    description:
      "Our signature wedding centrepiece: a multi-layer vanilla bean cake finished with hand-painted purple ombré, a sugar drip and silk peonies. Serves a full celebration.",
    image: "/images/hero-cake.jpg",
    sizes: [
      { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 37450 },
      { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 56150 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
