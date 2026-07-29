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

export interface ProductFlavor {
  id: string;
  name: string;
  sizes: ProductSize[];
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  badge?: string;
  tagline: string;
  description: string;
  image: string;
  flavors: ProductFlavor[];
}

interface FlavorTemplate {
  id: string;
  name: string;
  /** Added to every base size's price for this flavor. */
  delta?: number;
}

const CAKE_FLAVORS: FlavorTemplate[] = [
  { id: "vanilla-bean", name: "Vanilla Bean" },
  { id: "chocolate-fudge", name: "Chocolate Fudge", delta: 300 },
  { id: "red-velvet", name: "Red Velvet", delta: 300 },
];

const BOX_FLAVORS: FlavorTemplate[] = [
  { id: "classic-assortment", name: "Classic Assortment" },
  { id: "chocolate-lovers", name: "Chocolate Lovers", delta: 200 },
  { id: "fruit-floral", name: "Fruit & Floral", delta: 200 },
];

function withFlavors(
  baseSizes: ProductSize[],
  templates: FlavorTemplate[]
): ProductFlavor[] {
  return templates.map((template) => ({
    id: template.id,
    name: template.name,
    sizes: baseSizes.map((size) => ({
      ...size,
      price: size.price + (template.delta ?? 0),
    })),
  }));
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
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6800 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 9150 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11450 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "lavender-rosette",
    name: "Lavender Rosette",
    category: "signature",
    tagline: "Lavender-infused vanilla, Italian meringue rosettes",
    description:
      "Silky lavender buttercream piped into billowing rosettes over a vanilla bean sponge, scattered with crystallised violets. Delicate, floral, and unmistakably ours.",
    image: "/images/lavender-rosette.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6300 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 8650 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11000 },
      ],
      CAKE_FLAVORS
    ),
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
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7250 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 10050 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "petits-fours-macaron-box",
    name: "Petits Fours & Macaron Box",
    category: "petits-fours",
    tagline: "Lavender & vanilla macarons, petite cupcakes",
    description:
      "A hand-tied box of our weekly macarons and petite cupcakes — lavender, vanilla bean and rose. Made from scratch in small batches, no artificial anything.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 3750 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 6800 },
      ],
      BOX_FLAVORS
    ),
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
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 37450 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 56150 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "rose-praline-delight",
    name: "Rose Praline Delight",
    category: "signature",
    tagline: "Hazelnut praline sponge, rose Chantilly cream",
    description:
      "Layers of hazelnut praline sponge folded with rose-scented Chantilly cream, finished with candied petals and a whisper of gold leaf.",
    image: "/images/lavender-rosette.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6600 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 8950 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11250 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "salted-caramel-swirl",
    name: "Salted Caramel Swirl",
    category: "signature",
    tagline: "Brown butter sponge, salted caramel ganache",
    description:
      "A brown butter sponge layered with silky salted caramel ganache and finished with a swirled caramel drip and flaked sea salt.",
    image: "/images/berry-bloom.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6900 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 9300 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11600 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "midnight-chocolate-ganache",
    name: "Midnight Chocolate Ganache",
    category: "signature",
    badge: "Rich & decadent",
    tagline: "Dark cocoa sponge, whipped ganache",
    description:
      "Deep, dark cocoa sponge stacked with whipped dark chocolate ganache and a glossy mirror glaze — for the true chocolate lover.",
    image: "/images/lavender-rosette.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7100 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 9500 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11900 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "pistachio-rose-layer",
    name: "Pistachio Rose Layer",
    category: "signature",
    tagline: "Pistachio sponge, rose cream cheese frosting",
    description:
      "Nutty pistachio sponge layered with tangy rose cream cheese frosting, topped with crushed pistachios and sugared rose petals.",
    image: "/images/berry-bloom.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7250 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 9700 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 12100 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "honey-fig-sponge",
    name: "Honey Fig Sponge",
    category: "signature",
    tagline: "Wildflower honey sponge, fig compote",
    description:
      "A delicately sweet wildflower honey sponge layered with fig compote and mascarpone cream, finished with fresh fig slices.",
    image: "/images/lavender-rosette.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6750 },
        { id: "8in", label: "8 kg", serves: "Serves 12", price: 9100 },
        { id: "10in", label: "10 kg", serves: "Serves 20", price: 11400 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "rainbow-sprinkle-surprise",
    name: "Rainbow Sprinkle Surprise",
    category: "celebration",
    badge: "Kids' favourite",
    tagline: "Confetti vanilla sponge, rainbow sprinkle shell",
    description:
      "A funfetti vanilla sponge hidden beneath a shell of hand-pressed rainbow sprinkles — cut into it for a confetti surprise inside.",
    image: "/images/magic-unicorn.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 6950 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 9650 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "superhero-burst",
    name: "Superhero Burst",
    category: "celebration",
    tagline: "Chocolate sponge, comic-pop buttercream burst",
    description:
      "A bold chocolate sponge finished with a hand-piped buttercream burst and edible comic-style sugar shards for the little hero in your life.",
    image: "/images/magic-unicorn.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7050 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 9850 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "mermaid-tail-delight",
    name: "Mermaid Tail Delight",
    category: "celebration",
    tagline: "Ocean blue ombré, shimmer scale fondant",
    description:
      "A dreamy ocean blue ombré buttercream cake finished with hand-cut shimmer scale fondant and a sugar mermaid tail topper.",
    image: "/images/magic-unicorn.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7350 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 10150 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "dinosaur-adventure-cake",
    name: "Dinosaur Adventure Cake",
    category: "celebration",
    tagline: "Jungle green buttercream, sugar dino toppers",
    description:
      "A rugged jungle-green buttercream landscape topped with hand-piped sugar dinosaurs and edible rock rubble for young explorers.",
    image: "/images/magic-unicorn.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7150 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 9950 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "galaxy-explorer-cake",
    name: "Galaxy Explorer Cake",
    category: "celebration",
    badge: "New",
    tagline: "Deep purple galaxy swirl, edible star dust",
    description:
      "A swirling deep purple and midnight blue galaxy buttercream, dusted with edible star shimmer and topped with a sugar rocket.",
    image: "/images/magic-unicorn.jpg",
    flavors: withFlavors(
      [
        { id: "6in", label: "6 kg", serves: "Serves 8", price: 7450 },
        { id: "8in", label: "8 kg", serves: "Serves 14", price: 10250 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "ivory-lace-tiers",
    name: "Ivory Lace Tiers",
    category: "wedding",
    tagline: "Piped sugar lace, ivory buttercream",
    description:
      "Hand-piped sugar lace cascades over smooth ivory buttercream tiers, finished with a cluster of sugar florals at the base of each layer.",
    image: "/images/hero-cake.jpg",
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 36250 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 54850 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "blush-peony-cascade",
    name: "Blush Peony Cascade",
    category: "wedding",
    tagline: "Blush buttercream, cascading silk peonies",
    description:
      "Soft blush buttercream tiers finished with a hand-arranged cascade of silk peonies and trailing greenery down one side.",
    image: "/images/hero-cake.jpg",
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 38150 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 57450 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "golden-hour-ombre",
    name: "Golden Hour Ombré",
    category: "wedding",
    badge: "Editor's pick",
    tagline: "Amber ombré tiers, gold leaf accents",
    description:
      "A warm amber-to-cream ombré buttercream finish, hand-brushed with edible gold leaf accents for a golden-hour glow.",
    image: "/images/hero-cake.jpg",
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 39450 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 58650 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "classic-white-tier",
    name: "Classic White Tier",
    category: "wedding",
    tagline: "Smooth white fondant, pearl piping",
    description:
      "A timeless smooth white fondant finish with delicate hand-piped pearl detailing along each tier — simple, elegant, unforgettable.",
    image: "/images/hero-cake.jpg",
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 35450 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 53150 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "champagne-drip-elegance",
    name: "Champagne Drip Elegance",
    category: "wedding",
    tagline: "Champagne buttercream, shimmer gold drip",
    description:
      "Champagne-hued buttercream tiers finished with a shimmering gold drip and a scatter of sugared grapes and silk florals.",
    image: "/images/hero-cake.jpg",
    flavors: withFlavors(
      [
        { id: "2tier", label: "Two-tier", serves: "Serves 30", price: 38950 },
        { id: "3tier", label: "Three-tier", serves: "Serves 50", price: 57950 },
      ],
      CAKE_FLAVORS
    ),
  },
  {
    slug: "french-macaron-sampler",
    name: "French Macaron Sampler",
    category: "petits-fours",
    badge: "Best seller",
    tagline: "Nine flavours, hand-piped shells",
    description:
      "A curated box of our nine signature macaron flavours, each shell hand-piped and filled to order — a little taste of everything.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 3900 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 7100 },
      ],
      BOX_FLAVORS
    ),
  },
  {
    slug: "mini-cupcake-tower-box",
    name: "Mini Cupcake Tower Box",
    category: "petits-fours",
    tagline: "Bite-sized cupcakes, swirled buttercream",
    description:
      "A hand-tied box of bite-sized cupcakes in rotating seasonal flavours, each topped with a delicate buttercream swirl.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 3600 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 6500 },
      ],
      BOX_FLAVORS
    ),
  },
  {
    slug: "petite-eclair-collection",
    name: "Petite Éclair Collection",
    category: "petits-fours",
    tagline: "Choux pastry, glazed fondant tops",
    description:
      "Delicate choux pastry piped and baked to order, filled with pastry cream and finished with glossy glazed fondant tops in three flavours.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 4100 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 7500 },
      ],
      BOX_FLAVORS
    ),
  },
  {
    slug: "rose-pistachio-macarons",
    name: "Rose & Pistachio Macarons",
    category: "petits-fours",
    tagline: "Rose water shells, pistachio ganache",
    description:
      "Delicate rose water macaron shells sandwiched with a silky pistachio ganache and a scatter of crushed pistachio.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 4000 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 7300 },
      ],
      BOX_FLAVORS
    ),
  },
  {
    slug: "vanilla-bean-petit-four-box",
    name: "Vanilla Bean Petit Four Box",
    category: "petits-fours",
    tagline: "Classic vanilla bean, fondant icing",
    description:
      "Delicate vanilla bean sponge cubes dipped in smooth fondant icing and finished with a hand-piped sugar flower — a timeless classic.",
    image: "/images/petits-fours.jpg",
    flavors: withFlavors(
      [
        { id: "box9", label: "Box of 9", serves: "9 pieces", price: 3500 },
        { id: "box18", label: "Box of 18", serves: "18 pieces", price: 6400 },
      ],
      BOX_FLAVORS
    ),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
