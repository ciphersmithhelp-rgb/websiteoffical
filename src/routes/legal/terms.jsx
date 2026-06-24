import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "../studios";

export const Route = createFileRoute("/legal/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="studios-theme">
      <main className="studios-bg-forge relative min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 px-6 py-32 max-w-[800px] mx-auto mt-20">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-studios-fg mb-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">Terms of Use</h1>
          <div className="space-y-6 text-studios-muted text-sm leading-relaxed">
            <p>All content on this website belongs to CipherSmith Studios.</p>
            <p>Game concepts, artwork, logos, and trademarks are protected.</p>
            <p>Website information may change without notice.</p>
            <p className="pt-8 border-t border-studios-border/50 mt-12">
              Contact: <a href="mailto:ciphersmithelp@gmail.com" className="text-studios-primary-glow hover:text-studios-fg transition">ciphersmithelp@gmail.com</a>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
