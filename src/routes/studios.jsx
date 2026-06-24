import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "CipherSmith Studios — We Forge Legends" },
      {
        name: "description",
        content:
          "A digital forge crafting cinematic AAA worlds inspired by mythology, imagination and technology.",
      },
      { property: "og:title", content: "CipherSmith Studios — We Forge Legends" },
      { property: "og:description", content: "A digital forge crafting cinematic AAA worlds." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: StudiosPage,
});

export const CIPHERSMITH_MAIN_URL = "/";
export const STUDIOS_SUBSCRIBE_URL = "https://script.google.com/macros/s/AKfycbyLEUqw76SqId1FhXOniQrSsX12NJiN2ggTVBjDVG_RBOP-FnuqDzdrOibcf7MOwuUgDw/exec";
const NAV = ["Home", "Worlds", "Studio", "Vision", "Contact"];
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
const PHILOSOPHY = [
  { icon: Hammer, title: "Mythology Inspired", text: "Creating worlds rooted in timeless legends and imagination." },
  { icon: Sparkles, title: "Studio Vision", text: "Building experiences that blend storytelling, art, and technology." },
  { icon: Globe2, title: "Original Worlds", text: "Crafting unique universes designed to grow over time." },
  { icon: ArrowRight, title: "Forging The Future", text: "Exploring ideas that may become the next generation of interactive experiences." },
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

export function Emblem({ className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <defs>
          <linearGradient id="emb-studios" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.28 300)" />
            <stop offset="100%" stopColor="oklch(0.38 0.22 295)" />
          </linearGradient>
        </defs>
        <path
          d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z"
          fill="none"
          stroke="url(#emb-studios)"
          strokeWidth="2"
        />
        <path
          d="M32 18 a10 10 0 1 0 0 12"
          fill="none"
          stroke="url(#emb-studios)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ---------- nav ---------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl studios-nav-bg border-b border-studios-border" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a href="#home" className="group flex items-center gap-3">
          <Emblem className="h-9 w-9 transition-transform duration-500 group-hover:rotate-12 drop-shadow-[0_0_12px_oklch(0.62_0.25_295/0.6)]" />
          <div className="leading-none">
            <div className="font-cinzel text-base studios-tracking text-studios-fg">
              CIPHERSMITH
            </div>
            <div className="mt-1 font-cinzel text-[10px] studios-tracking text-studios-gold">
              STUDIOS
            </div>
            <div className="mt-1 font-cinzel text-[8px] studios-tracking text-studios-muted">
              A DIVISION OF CIPHERSMITH
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n, i) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className={`group relative text-[11px] studios-tracking transition-colors ${i === 0 ? "text-studios-fg" : "text-studios-muted hover:text-studios-fg"}`}
            >
              {n}
              <span
                className={`absolute -bottom-1 left-1/2 h-px bg-studios-primary transition-all duration-500 -translate-x-1/2 ${i === 0 ? "w-5" : "w-0 group-hover:w-5"}`}
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={CIPHERSMITH_MAIN_URL}
            className="hidden items-center gap-2 text-[10px] studios-tracking text-studios-muted hover:text-studios-fg md:inline-flex transition-colors"
          >
            ← BACK TO CIPHERSMITH
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
export function ForgeButton({
  children,
  href,
  onClick,
  variant = "primary",
  small = false,
  className = "",
  type = "button",
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
  const base = `sheen group relative inline-flex items-center gap-3 overflow-hidden studios-tracking transition-all duration-300 ${small ? "px-5 py-2.5 text-[10px] rounded-full" : "px-7 py-4 text-[11px] rounded-md"}`;
  const styles =
    variant === "primary"
      ? "studios-btn-primary shadow-studios-violet hover:scale-[1.03] active:scale-[0.99]"
      : variant === "outline"
        ? "border border-studios-silver/20 bg-studios-surface/40 text-studios-fg backdrop-blur hover:border-studios-primary/60 hover:bg-studios-surface-elevated/60"
        : "border border-studios-primary/40 bg-studios-primary/10 text-studios-fg backdrop-blur hover:bg-studios-primary/20 hover:shadow-studios-violet";
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
    <button ref={ref} type={type} className={cls} onMouseDown={handle}>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </button>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const p = useMouseParallax();
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
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
          <div className="absolute -top-10 left-1/4 h-[140%] w-[18%] animate-god-ray bg-gradient-to-b from-studios-primary-glow/35 via-studios-primary/15 to-transparent blur-2xl" />
          <div
            className="absolute -top-10 left-1/2 h-[140%] w-[14%] animate-god-ray bg-gradient-to-b from-studios-gold/25 via-studios-gold/5 to-transparent blur-2xl"
            style={{ animationDelay: "-3s" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-studios-bg/80 via-studios-bg/35 to-studios-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,oklch(0.12_0.02_285/0.55)_70%)]" />
      </div>

      {/* Midground particles */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(${p.x * 18}px, ${p.y * 14}px, 0)` }}
      >
        <Embers count={55} />
      </div>

      {/* Orbiting energy around the emblem */}
      <div
        className="pointer-events-none absolute right-[6%] top-[26%] hidden lg:block will-change-transform"
        style={{ transform: `translate3d(${p.x * 28}px, ${p.y * 22}px, 0)` }}
      >
        <div className="relative h-[560px] w-[560px]">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-studios-primary/25" />
          <div className="absolute inset-12 animate-spin-rev rounded-full border border-studios-gold/15" />
          <div className="absolute inset-24 animate-spin-slow rounded-full border border-studios-primary/15" />
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
            <span className="inline-flex items-center gap-2 text-[10px] studios-tracking text-studios-primary-glow">
              <span className="h-px w-8 bg-studios-primary-glow/70" />
              WE DON'T JUST MAKE GAMES
            </span>
          </div>

          <h1 className="mt-6 font-cinzel text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight animate-fade-up [animation-delay:240ms]">
            <span className="block text-studios-fg">WE FORGE</span>
            <span className="block text-studios-violet">LEGENDS</span>
          </h1>

          <div className="mt-6 flex items-center gap-3 animate-fade-up [animation-delay:360ms]">
            <span className="h-px w-12 bg-studios-gold/60" />
            <Emblem className="h-4 w-4 animate-pulse-glow" />
            <span className="h-px w-12 bg-studios-gold/60" />
          </div>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-studios-muted animate-fade-up [animation-delay:480ms]">
            CipherSmith Studios is an independent game studio crafting unforgettable cinematic worlds
            — inspired by mythology, imagination and the alchemy of modern technology.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:600ms]">
            <ForgeButton href="#worlds" variant="primary">
              EXPLORE OUR WORLDS{" "}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </ForgeButton>
            <ForgeButton href="#worlds" variant="outline">
              ENTER THE FORGE
              <span className="grid h-6 w-6 place-items-center rounded-full border border-studios-silver/30 text-studios-fg transition group-hover:border-studios-primary group-hover:text-studios-primary-glow">
                <Play className="h-3 w-3 fill-current" />
              </span>
            </ForgeButton>
          </div>
        </div>

        <div className="relative lg:col-span-6" />
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[10px] studios-tracking text-studios-muted">
          <span>SCROLL</span>
          <span className="h-10 w-px bg-gradient-to-b from-studios-primary-glow to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------- pillars ---------- */
function Pillars() {
  return (
    <section id="vision" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="studios-glass-panel grid grid-cols-2 gap-8 rounded-2xl p-8 md:grid-cols-4 lg:p-12">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="group flex flex-col gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-studios-primary/30 bg-studios-primary/10 text-studios-primary-glow transition duration-500 group-hover:-translate-y-1 group-hover:bg-studios-primary/20 group-hover:shadow-studios-violet">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-cinzel text-sm studios-tracking text-studios-fg">
                      {title}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-studios-muted">{text}</p>
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
        className="tilt-card group relative overflow-hidden rounded-xl border border-studios-border bg-studios-surface shadow-studios-cinematic transition-colors hover:border-studios-primary/60"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={g.img}
            alt={`${g.name} — ${g.tagline}`}
            loading="lazy"
            className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studios-bg via-studios-bg/40 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,oklch(0.62_0.25_295/0.35),transparent_60%)] mix-blend-screen" />
          <span className="absolute left-4 top-4 rounded-sm border border-studios-primary/40 bg-studios-primary/20 px-3 py-1.5 text-[9px] studios-tracking text-studios-primary-glow backdrop-blur">
            {g.status}
          </span>
          <div className="tilt-z absolute inset-x-0 bottom-0 p-7">
            <h3 className="font-cinzel text-4xl tracking-wide text-studios-aurum drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">
              {g.name}
            </h3>
            <div className="mt-1 font-cinzel text-[11px] studios-tracking text-studios-silver/90">
              {g.tagline}
            </div>
          </div>
          <div className="tilt-sheen" />
        </div>
        <div className="p-7">
          <p className="text-[13px] leading-relaxed text-studios-muted">{g.desc}</p>
          <Link
            to={`/worlds/${g.name.toLowerCase()}`}
            className="mt-5 inline-flex items-center gap-2 text-[10px] studios-tracking text-studios-primary-glow transition hover:gap-3 hover:text-studios-fg"
          >
            LEARN MORE <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-studios-primary/50 transition group-hover:opacity-100" />
      </article>
    </Reveal>
  );
}

function FeaturedGames() {
  return (
    <section id="worlds" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-[10px] studios-tracking text-studios-primary-glow">
                <span className="h-px w-10 bg-studios-primary-glow/70" />
                FEATURED WORLDS
              </div>
              <h2 className="mt-4 max-w-2xl font-cinzel text-4xl leading-tight tracking-tight text-studios-fg md:text-6xl">
                Worlds <span className="text-studios-aurum">forged</span> in fire & code
              </h2>
            </div>
            <a
              href="#worlds"
              className="hidden items-center gap-2 text-[10px] studios-tracking text-studios-muted transition hover:text-studios-fg md:inline-flex"
            >
              VIEW ALL WORLDS <ChevronRight className="h-3.5 w-3.5" />
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
          <div className="relative overflow-hidden rounded-2xl border border-studios-border shadow-studios-cinematic">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative overflow-hidden lg:col-span-7">
                <img
                  src={studioForge}
                  alt="The CipherSmith forge interior"
                  loading="lazy"
                  className="h-full w-full scale-105 animate-drift object-cover"
                />
                <Embers count={20} />
                <div className="absolute inset-0 bg-gradient-to-r from-studios-bg via-studios-bg/30 to-transparent" />
              </div>
              <div className="relative bg-studios-surface p-10 lg:col-span-5 lg:p-14">
                <div className="flex items-center gap-3 text-[10px] studios-tracking text-studios-primary-glow">
                  <span className="h-px w-8 bg-studios-primary-glow/70" /> ABOUT CIPHERSMITH STUDIOS
                </div>
                <h3 className="mt-4 font-cinzel text-4xl leading-tight tracking-tight text-studios-fg md:text-5xl">
                  A studio forged <br />
                  <span className="text-studios-aurum">by dreams</span>
                </h3>
                <p className="mt-6 max-w-md text-[14px] leading-relaxed text-studios-muted">
                  We are artists, engineers and storytellers united by one mission — to forge
                  legendary games that inspire, entertain, and leave a lasting echo across
                  generations.
                </p>
                <div className="mt-8">
                  <ForgeButton href="/studio" variant="ghost" small>
                    DISCOVER OUR STORY <ArrowRight className="h-3.5 w-3.5" />
                  </ForgeButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-studios-border bg-studios-border md:grid-cols-4">
            {PHILOSOPHY.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex flex-col items-start gap-4 bg-studios-surface p-6 transition hover:bg-studios-surface-elevated"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-studios-primary/30 bg-studios-primary/10 text-studios-primary-glow transition group-hover:shadow-studios-violet">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-cinzel text-lg font-semibold text-studios-aurum">{title}</div>
                  <div className="mt-1.5 text-[12px] leading-relaxed text-studios-muted">{text}</div>
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [btnText, setBtnText] = useState("ENLIST");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationMsg("");
    setError(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setValidationMsg("Email cannot be empty.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setValidationMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setBtnText("JOINING...");

    try {
      await fetch(STUDIOS_SUBSCRIBE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, source: "CipherSmith Studios" }),
      });
      
      setSuccess(true);
      setEmail("");
      setBtnText("FORGED");
      
      setTimeout(() => {
        setBtnText("ENLIST");
      }, 3000);
      
    } catch (err) {
      setError(true);
      setBtnText("ENLIST");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32 lg:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,oklch(0.62_0.25_295/0.25),transparent_60%)]" />
        <Embers count={20} />
      </div>
      <Reveal>
        <div className="relative mx-auto max-w-4xl text-center">
          <Emblem className="mx-auto h-12 w-12 animate-float-slow drop-shadow-[0_0_24px_oklch(0.62_0.25_295/0.7)]" />
          <h3 className="mt-8 font-cinzel text-5xl leading-tight tracking-tight md:text-7xl">
            {success ? (
              <span className="text-studios-violet">Welcome to the Forge.</span>
            ) : (
              <>
                <span className="text-studios-fg">Step into the </span>
                <span className="text-studios-violet">forge.</span>
              </>
            )}
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-studios-muted">
            {success ? (
              "You'll be among the first to hear about new worlds, reveals, development updates, and future projects."
            ) : (
              "Subscribe to receive cinematic reveals, dev diaries and exclusive access to the next chapter of the CipherSmith universe."
            )}
          </p>
          <form 
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-studios-border bg-studios-surface/80 p-1.5 backdrop-blur transition focus-within:border-studios-primary/60 focus-within:shadow-studios-violet"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationMsg) setValidationMsg("");
                if (error) setError(false);
              }}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-studios-fg placeholder:text-studios-muted/60 focus:outline-none"
              disabled={loading}
            />
            <ForgeButton type="submit" variant="primary" small className={loading ? "opacity-70 pointer-events-none" : ""}>
              {btnText} {btnText === "ENLIST" && <ArrowRight className="h-3.5 w-3.5" />}
            </ForgeButton>
          </form>
          
          <div className="mt-4 min-h-[20px] text-[13px] text-red-400">
            {validationMsg && <span>{validationMsg}</span>}
            {error && <span>Unable to connect right now. Please try again later.</span>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const cols = [
    { title: "STUDIO", items: [{ label: "About", href: "/studio" }, { label: "Vision", href: "/vision" }, { label: "The Forge", href: "/products/forge" }, { label: "Contact", href: "#contact" }] },
    { title: "WORLDS", items: [{ label: "Vihali", href: "/worlds/vihali" }, { label: "Kochuni", href: "/worlds/kochuni" }, { label: "Future Worlds", href: "/vision" }] },
    { title: "LEGAL", items: [{ label: "Privacy", href: "/legal/privacy" }, { label: "Terms", href: "/legal/terms" }] },
  ];
  return (
    <footer className="relative border-t border-studios-border px-6 py-16 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Emblem className="h-9 w-9" />
            <div className="leading-none">
              <div className="font-cinzel text-base studios-tracking text-studios-fg">
                CIPHERSMITH
              </div>
              <div className="mt-1 font-cinzel text-[10px] studios-tracking text-studios-gold">
                STUDIOS
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-studios-muted">
            Forging legendary games inspired by mythology, imagination & technology.
          </p>
          <div className="mt-6">
            <a
              href={CIPHERSMITH_MAIN_URL}
              className="inline-flex items-center gap-2 text-[11px] studios-tracking text-studios-primary-glow hover:text-studios-fg transition-colors"
            >
              ← BACK TO CIPHERSMITH MAIN SITE
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="md:col-span-2">
            <div className="text-[10px] studios-tracking text-studios-primary-glow">{c.title}</div>
            <ul className="mt-4 space-y-3 text-[13px] text-studios-muted">
              {c.items.map((i) => (
                <li key={i.label}>
                  <a href={i.href} className="transition hover:text-studios-fg">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1 md:text-right">
          <div className="text-[10px] studios-tracking text-studios-primary-glow">SOCIAL</div>
          <ul className="mt-4 space-y-3 text-[13px] text-studios-muted">
            {["Discord", "X", "YouTube", "Instagram"].map((s) => (
              <li key={s}>
                <a href={`https://${s.toLowerCase()}.com`} target="_blank" rel="noreferrer" className="transition hover:text-studios-fg">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1400px] items-center justify-between border-t border-studios-border pt-6 text-[10px] studios-tracking text-studios-muted">
        <span>© 2026 CIPHERSMITH STUDIOS. ALL RIGHTS RESERVED.</span>
        <span>FORGED WITH PURPOSE</span>
      </div>
    </footer>
  );
}

function StudiosPage() {
  return (
    <div className="studios-theme">
      <main className="studios-bg-forge relative min-h-screen">
        <Nav />
        <Hero />
        <Pillars />
        <FeaturedGames />
        <Studio />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
