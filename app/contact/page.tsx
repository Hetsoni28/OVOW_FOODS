export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0B2118] py-28 text-white">
      <div className="container-x max-w-4xl">
        <p className="text-xs uppercase tracking-[.3em] text-[#E4C77A]">
          Get in touch
        </p>
        <h1 className="mt-3 font-serif text-6xl">Talk to OVOW.</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href="tel:+91XXXXXXXXXX"
            className="border border-white/10 bg-white/5 p-7"
          >
            Call OVOW
            <br />
            <span className="text-white/50">+91 XXXXX XXXXX</span>
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            className="border border-white/10 bg-white/5 p-7"
          >
            WhatsApp
            <br />
            <span className="text-white/50">Order or enquire</span>
          </a>
        </div>
      </div>
    </main>
  );
}
