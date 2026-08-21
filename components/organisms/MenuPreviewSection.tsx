import { products } from "@/data/products";
import { ProductCard } from "@/components/molecules/ProductCard";

export function MenuPreviewSection() {
  return (
    <section className="bg-[#F4F1E9] py-32 text-primary">
      <div className="container-x text-center mb-16">
        <h2 className="font-serif text-5xl md:text-6xl mb-4">
          The Curated Menu
        </h2>
        <p className="opacity-80">
          Discover our collection of artisanal vegetarian creations.
        </p>
      </div>
      <div className="container-x">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
