import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, PurpleDust } from "../../components/Shared";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products/luna")({
  component: LunaPage,
});

function LunaPage() {
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

          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Luna
          </h1>
          
          <div className="mt-4 text-xl md:text-2xl font-medium text-foreground/80">
            Privacy-First Women's Health Platform
          </div>

          <div className="mt-8 inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-primary backdrop-blur">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Currently In Development
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Luna is a privacy-first women's health platform focused on trust, simplicity, and care.
          </p>

          <div className="mt-12 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <p className="mt-12 text-sm font-medium tracking-[0.3em] uppercase text-primary/60">
            More details coming soon.
          </p>
        </div>

        <Footer />
      </div>
    </main>
  );
}
