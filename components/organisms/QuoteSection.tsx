export function QuoteSection() {
  return (
    <section className="bg-[#F9F6F0] py-32 text-center text-primary border-y border-primary/10">
      <div className="container-x flex flex-col items-center">
        <div className="text-tertiary text-3xl mb-8">✧</div>
        <blockquote className="font-serif text-3xl md:text-4xl leading-relaxed max-w-4xl italic">
          "We believe true luxury lies in purity. Every dish is a testament to
          100% vegetarian excellence, honoring traditional methods while
          embracing modern sophistication."
        </blockquote>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] font-semibold opacity-70">
          — The Chef's Note
        </p>
      </div>
    </section>
  );
}
