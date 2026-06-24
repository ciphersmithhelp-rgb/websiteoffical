import { Link } from "react-router-dom";
import { Nav, Footer } from "../studios";
import gameChakra from "@/assets/game-chakra.jpg";
import { ArrowLeft } from "lucide-react";

export default function ChakraPage() {
  return (
    <div className="studios-theme">
      <main className="studios-bg-forge relative min-h-screen flex flex-col">
        <Nav />

        {/* ── Cinematic Hero ── */}
        <div className="relative w-full" style={{ minHeight: "70vh" }}>
          {/* Hero image fills full width */}
          <div className="relative w-full overflow-hidden" style={{ height: "70vh" }}>
            <img
              src={gameChakra}
              alt="Chakra — The Divine Realm"
              className="w-full h-full object-cover object-center"
              style={{ display: "block" }}
            />
            {/* Bottom gradient fade into page */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.12 0.02 285 / 0.15) 0%, oklch(0.12 0.02 285 / 0.05) 40%, oklch(0.12 0.02 285 / 0.55) 70%, oklch(0.12 0.02 285) 100%)",
              }}
            />
            {/* Left edge vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.12 0.02 285 / 0.6) 0%, transparent 40%, oklch(0.12 0.02 285 / 0.3) 100%)",
              }}
            />
            {/* Top Nav fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.12 0.02 285 / 0.7) 0%, transparent 25%)",
              }}
            />
          </div>

          {/* Overlay content pinned to hero bottom */}
          <div
            className="absolute inset-x-0 bottom-0 px-6 pb-14 lg:px-20"
          >
            {/* Back button */}
            <Link
              to="/studios"
              className="inline-flex items-center gap-2 mb-8 text-[10px] studios-tracking text-studios-muted transition-colors hover:text-studios-fg"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO WORLDS
            </Link>

            {/* Accent line */}
            <div className="flex items-center gap-3 mb-4 text-[10px] studios-tracking text-studios-primary-glow">
              <span className="h-px w-10 bg-studios-primary-glow/70" />
              CIPHERSMITH STUDIOS PRESENTS
            </div>

            {/* World Title */}
            <h1
              className="font-cinzel font-bold text-studios-fg leading-none"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                textShadow: "0 4px 32px rgba(0,0,0,0.85)",
                letterSpacing: "-0.01em",
              }}
            >
              CHAKRA
            </h1>

            {/* Tagline */}
            <h2
              className="mt-3 font-cinzel text-studios-aurum"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.75rem)", letterSpacing: "0.08em" }}
            >
              The Divine Realm
            </h2>

            {/* Status badge */}
            <div className="mt-5">
              <span className="inline-flex rounded-full border border-studios-primary/40 bg-studios-primary/15 px-4 py-1.5 text-[10px] studios-tracking text-studios-primary-glow backdrop-blur">
                Concept Phase
              </span>
            </div>
          </div>
        </div>

        {/* ── Content Section ── */}
        <div className="flex-1 px-6 pb-24 pt-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            {/* Description */}
            <p className="text-lg leading-relaxed text-studios-muted">
              A cosmic fantasy journey through floating realms, celestial gateways, and divine mysteries. Chakra invites you into an open-world odyssey across cosmic planes — where floating temples hold ancient secrets, divine entities test your worth, and the boundary between mortal and eternal blurs at every step.
            </p>

            {/* Divider */}
            <div className="my-10 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, oklch(0.62 0.25 295 / 0.4), transparent)" }} />

            {/* More details */}
            <p className="text-sm text-studios-silver/60 studios-tracking">
              MORE DETAILS COMING SOON
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
