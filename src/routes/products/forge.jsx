import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, PurpleDust } from "../../components/Shared";
import { ArrowLeft, Hammer } from "lucide-react";

export const Route = createFileRoute("/products/forge")({
  component: ForgeProductPage,
});

function ForgeProductPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <PurpleDust />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav activeSection="" isMobileMenuOpen={false} setIsMobileMenuOpen={() => {}} />

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center mt-20 max-w-[1000px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-10 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to CipherSmith
          </Link>

          <div className="mb-8 grid h-20 w-20 place-items-center rounded-2xl border border-primary/40 bg-obsidian-hi shadow-[0_0_30px_var(--color-primary)] shadow-primary/20">
            <Hammer className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            The Forge
          </h1>

          <div className="mt-4 text-xl md:text-2xl font-medium text-foreground/80 tracking-widest uppercase">
            Research • Experimentation • Creation
          </div>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The Forge is CipherSmith's internal innovation and research lab where future products, intelligent systems, tools, ideas, and digital experiences are explored and crafted.
          </p>

          <div className="mt-12 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <p className="mt-12 text-sm font-medium tracking-[0.3em] uppercase text-primary/60">
            Not every idea becomes a product. But every great product begins in the forge.
          </p>
        </div>

        <Footer />
      </div>
    </main>
  );
}
