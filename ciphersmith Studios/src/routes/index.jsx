import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  ChevronRight,
  Sparkles,
  Swords,
  Hammer,
  Globe2,
  Trophy,
} from "lucide-react";
import heroForge from "@/assets/hero-forge.jpg";
import gameVihali from "@/assets/game-vihali.jpg";
import gameKochuni from "@/assets/game-kochuni.jpg";
import gameChakra from "@/assets/game-chakra.jpg";
import studioForge from "@/assets/studio-forge.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CipherSmith Games — We Forge Legends" },
      {
        name: "description",
        content:
          "A digital forge crafting cinematic AAA worlds inspired by mythology, imagination and technology.",
      },
      { property: "og:title", content: "CipherSmith Games — We Forge Legends" },
      { property: "og:description", content: "A digital forge crafting cinematic AAA worlds." },
    ],
  }),
  component: Index,
});
const NAV = ["Home", "Games", "Studio", "Careers", "News", "Contact"];
const PILLARS = [
  {
    icon: Sparkles,
    title: "Mythology Inspired",
    text: "Stories rooted in ancient legends and forgotten cultures.",
  },
  {
    icon: Globe2,
    title: "Immersive Worlds",
    text: "Vast handcrafted realms you'll never want to leave.",
  },
  { icon: Swords, title: "Epic Gameplay", text: "Mechanics that challenge, reward, and endure." },
  {
    icon: Hammer,
    title: "Built With Passion",
    text: "A guild of dreamers forging extraordinary games.",
  },
];
const GAMES = [
  {
    name: "VIHALI",
    tagline: "Guardian of the Wilds",
    desc: "An action-adventure rooted in the legend of Vihali, the fearless warrior who guarded the primeval forests.",
    img: gameVihali,
    status: "In Development",
  },
  {
    name: "KOCHUNI",
    tagline: "Shadow of Malabar",
    desc: "A third-person action RPG set in a rain-soaked world of ancient wisdom, inner battles and destiny.",
    img: gameKochuni,
    status: "In Development",
  },
  {
    name: "CHAKRA",
    tagline: "The Divine Realm",
    desc: "An open-world odyssey through cosmic gateways, floating temples and the secrets of the divine realms.",
    img: gameChakra,
    status: "Coming Soon",
  },
];
const STATS = [
  { icon: Hammer, value: "25+", label: "Artisans" },
  { icon: Swords, value: "3+", label: "Titles In Forge" },
  { icon: Globe2, value: "10M+", label: "Players Reached" },
  { icon: Trophy, value: "15+", label: "Awards & Nominations" },
];
/* ---------- hooks ---------- */
function useMouseParallax() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setP({ x, y });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in-view");
            io.unobserve(el);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
/* ---------- atoms ---------- */
function Embers({ count = 50 }) {
  const [seeds, setSeeds] = useState([]);
  useEffect(() => {
    setSeeds(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        d: Math.random() * 15,
        dur: 12 + Math.random() * 16,
        dx: (Math.random() - 0.5) * 200,
        size: 1 + Math.random() * 3,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((s, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${s.l}%`,
            animationDelay: `${s.d}s`,
            animationDuration: `${s.dur}s`,
            width: s.size,
            height: s.size,
            ["--dx"]: `${s.dx}px`,
          }}
        />
      ))}
    </div>
  );
}
function Orbits({ rings = 3, perRing = 6 }) {
  const radii = [180, 260, 340];
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: rings }).map((_, ri) =>
        Array.from({ length: perRing }).map((_, i) => {
          const dur = 18 + ri * 8 + i * 1.4;
          const delay = -(i * (dur / perRing));
          const r = radii[ri] ?? 220;
          return (
            <span
              key={`${ri}-${i}`}
              className="orbit-dot"
              style={{
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                ["--r"]: `${r}px`,
                opacity: 0.55 + ri * 0.1,
              }}
            />
          );
        }),
      )}
    </div>
  );
}
function Emblem({ className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <defs>
          <linearGradient id="emb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.28 300)" />
            <stop offset="100%" stopColor="oklch(0.38 0.22 295)" />
          </linearGradient>
        </defs>
        <path
          d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z"
          fill="none"
          stroke="url(#emb)"
          strokeWidth="2"
        />
        <path
          d="M32 18 a10 10 0 1 0 0 12"
          fill="none"
          stroke="url(#emb)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/55 border-b border-border" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a href="#" className="group flex items-center gap-3">
          <Emblem className="h-9 w-9 transition-transform duration-500 group-hover:rotate-12 drop-shadow-[0_0_12px_oklch(0.62_0.25_295/0.6)]" />
          <div className="leading-none">
            <div className="font-display text-base tracking-monument text-foreground">
              CIPHERSMITH
            </div>
            <div className="mt-1 font-display text-[10px] tracking-monument text-gold/80">
              GAMES
            </div>
            <div className="mt-1 font-display text-[8px] tracking-monument text-muted-foreground">
              A DIVISION OF CIPHERSMITH
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n, i) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className={`group relative text-[11px] tracking-monument transition-colors ${i === 0 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n}
              <span
                className={`absolute -bottom-1 left-1/2 h-px bg-primary transition-all duration-500 -translate-x-1/2 ${i === 0 ? "w-5" : "w-0 group-hover:w-5"}`}
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="http://localhost:5173/" className="hidden items-center gap-2 text-[10px] tracking-monument text-muted-foreground hover:text-foreground md:inline-flex transition">
            BACK TO CIPHERSMITH
          </a>
          <ForgeButton href="#contact" variant="ghost" small>
            JOIN OUR JOURNEY <ArrowRight className="h-3.5 w-3.5" />
          </ForgeButton>
        </div>
      </div>
    </header>
  );
}
/* ---------- button with ripple + sheen ---------- */
function ForgeButton({
  children,
  href,
  onClick,
  variant = "primary",
  small = false,
  className = "",
}) {
  const ref = useRef(null);
  const onPointerDown = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const ink = document.createElement("span");
    ink.className = "ripple-ink";
    ink.style.left = `${e.clientX - rect.left - 7}px`;
    ink.style.top = `${e.clientY - rect.top - 7}px`;
    el.appendChild(ink);
    setTimeout(() => ink.remove(), 800);
  };
  const base = `sheen group relative inline-flex items-center gap-3 overflow-hidden tracking-monument transition-all duration-300 ${small ? "px-5 py-2.5 text-[10px] rounded-full" : "px-7 py-4 text-[11px] rounded-md"}`;
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-primary-deep via-primary to-primary-glow text-primary-foreground shadow-violet hover:scale-[1.03] active:scale-[0.99]"
      : variant === "outline"
        ? "border border-silver/20 bg-surface/40 text-foreground backdrop-blur hover:border-primary/60 hover:bg-surface-elevated/60"
        : "border border-primary/40 bg-primary/10 text-foreground backdrop-blur hover:bg-primary/20 hover:shadow-violet";
  const cls = `${base} ${styles} ${className}`;
  const handle = (e) => {
    onPointerDown(e);
    onClick?.();
  };
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} onMouseDown={handle}>
        <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} onMouseDown={handle}>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </button>
  );
}
/* ---------- hero ---------- */
function Hero() {
  const p = useMouseParallax();
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      {/* Background layer (drift + parallax) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(${p.x * -14}px, ${p.y * -10}px, 0)` }}
      >
        <img
          src={heroForge}
          alt="The CipherSmith Forge — a mythical anvil beneath a glowing obsidian C emblem"
          className="h-full w-full animate-drift object-cover object-center"
          width={1920}
          height={1080}
        />
        {/* God rays */}
        <div className="absolute inset-0 mix-blend-screen">
          <div className="absolute -top-10 left-1/4 h-[140%] w-[18%] animate-god-ray bg-gradient-to-b from-primary-glow/35 via-primary/15 to-transparent blur-2xl" />
          <div
            className="absolute -top-10 left-1/2 h-[140%] w-[14%] animate-god-ray bg-gradient-to-b from-gold/25 via-gold/5 to-transparent blur-2xl"
            style={{ animationDelay: "-3s" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,oklch(0.12_0.02_285/0.55)_70%)]" />
      </div>

      {/* Midground particles */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(${p.x * 18}px, ${p.y * 14}px, 0)` }}
      >
        <Embers count={55} />
      </div>

      {/* Orbiting energy around the emblem in the background image (right side) */}
      <div
        className="pointer-events-none absolute right-[6%] top-[26%] hidden lg:block will-change-transform"
        style={{ transform: `translate3d(${p.x * 28}px, ${p.y * 22}px, 0)` }}
      >
        <div className="relative h-[560px] w-[560px]">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-primary/25" />
          <div className="absolute inset-12 animate-spin-rev rounded-full border border-gold/15" />
          <div className="absolute inset-24 animate-spin-slow rounded-full border border-primary/15" />
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-[radial-gradient(circle_at_center,oklch(0.62_0.25_295/0.45),transparent_60%)]" />
          {/* Rune glyphs */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-rune-pulse">
            <g fill="none" stroke="oklch(0.78 0.27 300)" strokeWidth="0.6" opacity="0.7">
              <circle cx="100" cy="100" r="78" />
              <path d="M100 22 v8 M100 170 v8 M22 100 h8 M170 100 h8 M44 44 l6 6 M156 44 l-6 6 M44 156 l6 -6 M156 156 l-6 -6" />
              <path d="M100 40 l8 12 -8 12 -8 -12 z M160 100 l-12 8 -12 -8 12 -8 z M100 160 l-8 -12 8 -12 8 12 z M40 100 l12 -8 12 8 -12 8 z" />
            </g>
          </svg>
          <Orbits />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-32 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-6 lg:pt-10">
          <div className="animate-fade-up [animation-delay:120ms]">
            <span className="inline-flex items-center gap-2 text-[10px] tracking-monument text-primary-glow">
              <span className="h-px w-8 bg-primary-glow/70" />
              WE DON'T JUST MAKE GAMES
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight animate-fade-up [animation-delay:240ms]">
            <span className="block text-foreground">WE FORGE</span>
            <span className="block text-violet">LEGENDS</span>
          </h1>

          <div className="mt-6 flex items-center gap-3 animate-fade-up [animation-delay:360ms]">
            <span className="h-px w-12 bg-gold/60" />
            <Emblem className="h-4 w-4 animate-pulse-glow" />
            <span className="h-px w-12 bg-gold/60" />
          </div>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground animate-fade-up [animation-delay:480ms]">
            CipherSmith Games is an independent studio crafting unforgettable cinematic worlds —
            inspired by mythology, imagination and the alchemy of modern technology.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:600ms]">
            <ForgeButton href="#games" variant="primary">
              EXPLORE OUR GAMES{" "}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </ForgeButton>
            <ForgeButton href="#studio" variant="outline">
              ENTER THE FORGE
              <span className="grid h-6 w-6 place-items-center rounded-full border border-silver/30 text-foreground transition group-hover:border-primary group-hover:text-primary-glow">
                <Play className="h-3 w-3 fill-current" />
              </span>
            </ForgeButton>
          </div>
        </div>

        <div className="relative lg:col-span-6" />
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-monument text-muted-foreground">
          <span>SCROLL</span>
          <span className="h-10 w-px bg-gradient-to-b from-primary-glow to-transparent" />
        </div>
      </div>
    </section>
  );
}
/* ---------- pillars ---------- */
function Pillars() {
  return (
    <section className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="glass-panel grid grid-cols-2 gap-8 rounded-2xl p-8 md:grid-cols-4 lg:p-12">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="group flex flex-col gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary-glow transition duration-500 group-hover:-translate-y-1 group-hover:bg-primary/20 group-hover:shadow-violet">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-sm tracking-monument text-foreground">
                      {title}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ---------- 3D Tilt Game Card ---------- */
function GameCard({ g, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 10;
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--rx", `0deg`);
  };
  return (
    <Reveal delay={index * 140}>
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="tilt-card group relative overflow-hidden rounded-xl border border-border bg-surface shadow-cinematic transition-colors hover:border-primary/60"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={g.img}
            alt={`${g.name} — ${g.tagline}`}
            loading="lazy"
            className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,oklch(0.62_0.25_295/0.35),transparent_60%)] mix-blend-screen" />
          <span className="absolute left-4 top-4 rounded-sm border border-primary/40 bg-primary/20 px-3 py-1.5 text-[9px] tracking-monument text-primary-glow backdrop-blur">
            {g.status}
          </span>
          <div className="tilt-z absolute inset-x-0 bottom-0 p-7">
            <h3 className="font-display text-4xl tracking-wide text-aurum drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">
              {g.name}
            </h3>
            <div className="mt-1 font-display text-[11px] tracking-monument text-silver/90">
              {g.tagline}
            </div>
          </div>
          <div className="tilt-sheen" />
        </div>
        <div className="p-7">
          <p className="text-[13px] leading-relaxed text-muted-foreground">{g.desc}</p>
          <a
            href="#"
            className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-monument text-primary-glow transition hover:gap-3 hover:text-foreground"
          >
            LEARN MORE <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-primary/50 transition group-hover:opacity-100" />
      </article>
    </Reveal>
  );
}
function FeaturedGames() {
  return (
    <section id="games" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-[10px] tracking-monument text-primary-glow">
                <span className="h-px w-10 bg-primary-glow/70" />
                FEATURED GAMES
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight text-foreground md:text-6xl">
                Worlds <span className="text-aurum">forged</span> in fire & code
              </h2>
            </div>
            <a
              href="#"
              className="hidden items-center gap-2 text-[10px] tracking-monument text-muted-foreground transition hover:text-foreground md:inline-flex"
            >
              VIEW ALL GAMES <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" style={{ perspective: "1400px" }}>
          {GAMES.map((g, i) => (
            <GameCard key={g.name} g={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
/* ---------- studio ---------- */
function Studio() {
  return (
    <section id="studio" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-cinematic">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative overflow-hidden lg:col-span-7">
                <img
                  src={studioForge}
                  alt="The CipherSmith forge interior"
                  loading="lazy"
                  className="h-full w-full scale-105 animate-drift object-cover"
                />
                <Embers count={20} />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
              </div>
              <div className="relative bg-surface p-10 lg:col-span-5 lg:p-14">
                <div className="flex items-center gap-3 text-[10px] tracking-monument text-primary-glow">
                  <span className="h-px w-8 bg-primary-glow/70" /> ABOUT CIPHERSMITH
                </div>
                <h3 className="mt-4 font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
                  A studio forged <br />
                  <span className="text-aurum">by dreams</span>
                </h3>
                <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                  We are artists, engineers and storytellers united by one mission — to forge
                  legendary games that inspire, entertain, and leave a lasting echo across
                  generations.
                </p>
                <div className="mt-8">
                  <ForgeButton href="#" variant="ghost" small>
                    DISCOVER OUR STORY <ArrowRight className="h-3.5 w-3.5" />
                  </ForgeButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group flex items-center gap-4 bg-surface p-6 transition hover:bg-surface-elevated"
              >
                <div className="grid h-11 w-11 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary-glow transition group-hover:shadow-violet">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-2xl text-aurum">{value}</div>
                  <div className="text-[10px] tracking-monument text-muted-foreground">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="contact" className="relative px-6 py-32 lg:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,oklch(0.62_0.25_295/0.25),transparent_60%)]" />
        <Embers count={20} />
      </div>
      <Reveal>
        <div className="relative mx-auto max-w-4xl text-center">
          <Emblem className="mx-auto h-12 w-12 animate-float-slow drop-shadow-[0_0_24px_oklch(0.62_0.25_295/0.7)]" />
          <h3 className="mt-8 font-display text-5xl leading-tight tracking-tight md:text-7xl">
            <span className="text-foreground">Step into the </span>
            <span className="text-violet">forge.</span>
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
            Subscribe to receive cinematic reveals, dev diaries and exclusive access to the next
            chapter of the CipherSmith universe.
          </p>
          <form className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-border bg-surface/80 p-1.5 backdrop-blur transition focus-within:border-primary/60 focus-within:shadow-violet">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <ForgeButton variant="primary" small>
              ENLIST <ArrowRight className="h-3.5 w-3.5" />
            </ForgeButton>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
/* ---------- footer ---------- */
function Footer() {
  const cols = [
    { title: "STUDIO", items: ["About", "Mission", "Careers", "Press"] },
    { title: "GAMES", items: ["All Titles", "In Development", "Coming Soon"] },
    { title: "SUPPORT", items: ["FAQ", "Privacy", "Terms"] },
  ];
  return (
    <footer className="relative border-t border-border px-6 py-16 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Emblem className="h-9 w-9" />
            <div className="leading-none">
              <div className="font-display text-base tracking-monument text-foreground">
                CIPHERSMITH
              </div>
              <div className="mt-1 font-display text-[10px] tracking-monument text-gold/80">
                GAMES
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
            Forging legendary games inspired by mythology, imagination & technology.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="md:col-span-2">
            <div className="text-[10px] tracking-monument text-primary-glow">{c.title}</div>
            <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="transition hover:text-foreground">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1 md:text-right">
          <div className="text-[10px] tracking-monument text-primary-glow">SOCIAL</div>
          <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
            {["Discord", "X", "YouTube", "Instagram"].map((s) => (
              <li key={s}>
                <a href="#" className="transition hover:text-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1400px] items-center justify-between border-t border-border pt-6 text-[10px] tracking-monument text-muted-foreground">
        <span>© 2026 CIPHERSMITH GAMES. ALL RIGHTS RESERVED.</span>
        <span>FORGED WITH PURPOSE</span>
      </div>
    </footer>
  );
}
function Index() {
  return (
    <main className="bg-forge relative min-h-screen">
      <Nav />
      <Hero />
      <Pillars />
      <FeaturedGames />
      <Studio />
      <CTA />
      <Footer />
    </main>
  );
}
