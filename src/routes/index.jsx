import { Link } from "react-router-dom";
import { Logo, Nav, Contact, Footer, PurpleDust } from "../components/Shared";
import { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  Brain,
  Smartphone,
  Code2,
  Boxes,
  Workflow,
  BarChart3,
  Hammer,
  Sparkles,
  Target,
  Infinity as InfinityIcon,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Menu,
  Mouse,
  Gamepad2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import heroEmblem from "@/assets/hero-emblem.jpg";
import productLuna from "@/assets/product-luna.jpg";
import productAi from "@/assets/product-ai.jpg";
import productSaas from "@/assets/product-saas.jpg";
import productGames from "@/assets/product-games.jpg";
import theForgeImg from "@/assets/the-forge.png";
import twoPathsProducts from "@/assets/two-paths-products.jpg";
import twoPathsSolutions from "@/assets/two-paths-solutions.jpg";
import ctaMountains from "@/assets/cta-mountains.jpg";
/* ─── Forge Portal Overlay ──────────────────────────────────────────────── */
const STUDIOS_URL = "/studios";

function ForgePortalOverlay({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "forge-screen-fade 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        pointerEvents: "all",
      }}
    >
      {/* Dark overlay base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "oklch(0.08 0.01 285 / 0.93)",
        }}
      />

      {/* Energy pulse burst */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.72 0.27 305 / 0.9) 0%, oklch(0.55 0.25 295 / 0.3) 50%, transparent 70%)",
          animation: "forge-energy-pulse 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />

      {/* Portal ring 1 */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: "3px solid oklch(0.72 0.27 305 / 0.9)",
          boxShadow:
            "0 0 24px 8px oklch(0.62 0.26 300 / 0.7), inset 0 0 24px 8px oklch(0.62 0.26 300 / 0.4)",
          animation: "forge-portal-ring 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />

      {/* Portal ring 2 — counter-rotating */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "2px dashed oklch(0.62 0.26 300 / 0.75)",
          boxShadow: "0 0 16px 4px oklch(0.55 0.25 295 / 0.5)",
          animation: "forge-portal-ring-2 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />

      {/* Glow core */}
      <div
        style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.95 0.1 305 / 1) 0%, oklch(0.72 0.27 305 / 0.6) 50%, transparent 80%)",
          filter: "blur(6px)",
          animation: "forge-energy-pulse 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />

      {/* Loading text */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.35em",
          color: "oklch(0.78 0.21 305)",
          textShadow: "0 0 16px oklch(0.72 0.27 305 / 0.8)",
          whiteSpace: "nowrap",
          animation: "forge-text-flicker 0.55s ease-in-out infinite",
        }}
      >
        ENTERING THE FORGE...
      </div>
    </div>
  );
}

/* ─── CipherSmith Studios Card ─────────────────────────────────────────── */
function StudiosCard() {
  const [showPortal, setShowPortal] = useState(false);

  const handleEnter = useCallback(() => {
    setShowPortal(true);
  }, []);

  const handleDone = useCallback(() => {
    window.location.href = STUDIOS_URL;
  }, []);

  return (
    <>
      {showPortal && <ForgePortalOverlay onDone={handleDone} />}
      <div
        className="group relative col-span-1 overflow-hidden rounded-3xl glass-card lg:col-span-4 transition-all duration-500"
        style={{
          "--tw-translate-y": "0px",
          transition: "transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 0 90px -10px oklch(0.62 0.26 300 / 0.75), 0 0 0 1px oklch(0.62 0.26 300 / 0.4)";
          e.currentTarget.style.borderColor = "oklch(0.62 0.26 300 / 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "";
        }}
      >
        <img
          src={productGames}
          alt="CipherSmith Studios"
          loading="lazy"
          width={1280}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />

        {/* Portal ring hover decoration */}
        <div
          className="portal-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/0 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_12px_oklch(0.62_0.26_300_/_0.35)]"
          style={{
            width: "220px",
            height: "220px",
            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
            pointerEvents: "none",
          }}
        />
        <div
          className="portal-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/0 group-hover:border-primary/25"
          style={{
            width: "300px",
            height: "300px",
            borderStyle: "dashed",
            transition: "border-color 0.8s ease",
            pointerEvents: "none",
          }}
        />

        <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary mb-3">
                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                Studio Vision
              </div>
              <h3 className="font-display text-4xl font-semibold">
                CipherSmith
                <br />
                Studios
              </h3>
              <p className="mt-4 max-w-[16rem] text-sm text-muted-foreground leading-relaxed">
                Forging worlds, stories, and interactive experiences inspired by mythology,
                imagination, and technology.
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/40 bg-obsidian/70 backdrop-blur">
              <Gamepad2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <button
            id="enter-the-forge-btn"
            onClick={handleEnter}
            className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:shadow-[var(--shadow-glow-strong)] hover:scale-105 active:scale-95"
          >
            Enter The Forge
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </>
  );
}
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-12">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        <div className="relative z-10 animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            <span className="text-xs font-medium tracking-[0.3em] text-primary">
              WELCOME TO CIPHERSMITH
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02]">
            Building Intelligent
            <br />
            Products & <span className="text-gradient">Digital Solutions</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            We help ideas become powerful products. We build, ship, and scale digital experiences
            that people love.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--gradient-primary)] px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)]"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-obsidian/50 px-7 py-3.5 text-sm font-medium backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-obsidian"
            >
              Explore Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="mt-12 flex items-center gap-3 text-xs tracking-widest text-muted-foreground">
            <div className="grid h-9 w-6 place-items-center rounded-full border border-border/80">
              <Mouse className="h-3.5 w-3.5" />
            </div>
            Scroll to explore
          </div>
        </div>

        {/* Hero emblem */}
        <div className="relative h-[480px] sm:h-[560px] lg:h-[640px]">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-[var(--gradient-radial-glow)]" />
          {/* orbit rings */}
          <div className="absolute inset-8 animate-orbit rounded-full border border-primary/20" />
          <div className="absolute inset-16 animate-orbit-reverse rounded-full border border-primary/15" />
          <div className="absolute inset-24 animate-orbit rounded-full border border-primary/10" />

          <div className="absolute inset-0 animate-float">
            <img
              src={heroEmblem}
              alt="CipherSmith glowing 3D emblem"
              width={1536}
              height={1280}
              className="h-full w-full object-cover object-center rounded-3xl"
              style={{
                maskImage: "radial-gradient(ellipse at center, black 55%, transparent 85%)",
              }}
            />
          </div>

          {/* sparks */}
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-spark"
              style={{
                top: `${10 + ((i * 73) % 80)}%`,
                left: `${5 + ((i * 47) % 90)}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Values strip */}
      <div className="mx-auto mt-16 max-w-[1400px] px-6">
        <div className="glass-card grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl p-8 md:grid-cols-4 md:p-10">
          {VALUES.map((v) => (
            <div key={v.title} className="flex items-start gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg" />
                <div className="relative grid h-14 w-14 place-items-center rounded-xl border border-primary/40 bg-obsidian-hi">
                  <v.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                </div>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold leading-tight">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const VALUES = [
  {
    title: "Craftsmanship First",
    desc: "We build with precision and care.",
    icon: Hammer,
  },
  {
    title: "AI-Powered Innovation",
    desc: "Intelligent solutions for a smarter tomorrow.",
    icon: Sparkles,
  },
  {
    title: "Products With Purpose",
    desc: "Creating value that makes a difference.",
    icon: Target,
  },
  {
    title: "Building For The Long Term",
    desc: "Our mission is impact that lasts.",
    icon: InfinityIcon,
  },
];
const SERVICES = [
  {
    title: "AI & ML Solutions",
    desc: "We build intelligent systems that automate workflows, uncover insights, and solve complex business problems.",
    icon: Brain,
    servicesList: [
      "AI Integration",
      "Machine Learning Solutions",
      "Predictive Analytics",
      "Recommendation Systems",
      "Intelligent Automation",
    ],
  },
  {
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications designed for performance, scalability, and exceptional user experiences.",
    icon: Smartphone,
    servicesList: [
      "Android Apps",
      "iOS Apps",
      "Flutter Development",
      "App Modernization",
      "Maintenance & Support",
    ],
  },
  {
    title: "Web Development",
    desc: "Modern websites and web applications engineered for speed, scalability, and growth.",
    icon: Code2,
    servicesList: [
      "Business Websites",
      "Web Applications",
      "React Development",
      "Full Stack Solutions",
      "API Integrations",
    ],
  },
  {
    title: "Custom Software",
    desc: "Tailored software solutions designed around your unique business requirements.",
    icon: Boxes,
    servicesList: [
      "Business Systems",
      "Internal Tools",
      "Dashboards",
      "CRM Solutions",
      "Enterprise Applications",
    ],
  },
  {
    title: "Automation",
    desc: "Eliminate repetitive work and increase efficiency through intelligent automation.",
    icon: Workflow,
    servicesList: [
      "Workflow Automation",
      "Process Optimization",
      "AI Agents",
      "Integration Systems",
      "Business Automation",
    ],
  },
  {
    title: "Data & Analytics",
    desc: "Transform raw data into actionable insights and strategic decisions.",
    icon: BarChart3,
    servicesList: [
      "Business Dashboards",
      "Data Visualization",
      "Reporting Systems",
      "KPI Tracking",
      "Analytics Solutions",
    ],
  },
];

function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card overflow-hidden rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 grid h-8 w-8 place-items-center rounded-full border border-border bg-obsidian/60 text-muted-foreground transition-colors hover:text-foreground hover:bg-obsidian"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/40 bg-gradient-to-br from-primary/20 to-transparent">
          <service.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>

        <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

        <ul className="mt-6 space-y-3">
          {service.servicesList.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <a
            href="/#contact"
            onClick={(e) => {
              onClose();
              if (window.location.pathname === "/") {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group flex w-full justify-center items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)]"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  return (
    <>
      <section id="services" className="relative py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-medium tracking-[0.3em] text-primary">
                  WHAT WE DO
                </span>
              </div>
              <h2 className="font-display text-4xl font-semibold sm:text-5xl">What We Build</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                We combine technology, intelligence, and craftsmanship to create products, software,
                and digital experiences that help businesses grow.
              </p>
            </div>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-obsidian/60 px-6 py-3 text-sm backdrop-blur-xl transition-all hover:border-primary/50"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {SERVICES.map((s) => {
              const serviceId = `service-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <button
                  key={s.title}
                  id={serviceId}
                  onClick={() => setSelectedService(s)}
                  className="group relative flex w-full text-left flex-col rounded-2xl glass-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
                >
                <div className="relative mb-6 grid h-24 w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-transparent">
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "var(--gradient-radial-glow)",
                    }}
                  />
                  <s.icon
                    className="relative h-12 w-12 text-primary transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="font-display text-[15px] font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {s.desc}
                </p>
                <div className="mt-5 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary/15">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </>
  );
}
function Products() {
  return (
    <section id="products" className="relative py-28 border-t border-border/30">
      <div className="mx-auto max-w-[1400px] px-6 mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-8 bg-primary" />
          <span className="text-xs font-medium tracking-[0.3em] text-primary">OUR PRODUCTS</span>
        </div>
        <h2 className="font-display text-4xl font-semibold sm:text-5xl">Building The Future</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Products, ideas, and experiences currently being crafted inside the CipherSmith forge.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-6 lg:grid-cols-12">
        {/* Luna */}
        <div className="group relative col-span-1 overflow-hidden rounded-3xl glass-card lg:col-span-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
          <img
            src={productLuna}
            alt="Luna"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-obsidian/70 to-transparent" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium tracking-[0.3em] text-primary">
                  OUR PRODUCT VISION
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  Currently In Development
                </span>
              </div>
              <h3 className="mt-4 font-display text-5xl font-semibold">Luna</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                A privacy-first women's health platform focused on trust, simplicity, and care.
              </p>
            </div>
            <Link
              to="/products/luna"
              className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              Explore Luna
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* The Forge */}
        <div className="group relative col-span-1 overflow-hidden rounded-3xl glass-card lg:col-span-3 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
          <img
            src={theForgeImg}
            alt="The Forge"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
                  RESEARCH • EXPERIMENTATION • CREATION
                </span>
              </div>
              <h3 className="mt-4 font-display text-4xl font-semibold">The Forge</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The Forge is where future products, intelligent systems, tools, ideas, and digital experiences are explored and crafted inside CipherSmith.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed font-medium">
                Not every idea becomes a product.<br/>But every great product begins in the forge.
              </p>
            </div>
            <Link
              to="/products/forge"
              className="group/btn mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Explore The Forge
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* CipherSmith Studios */}
        <StudiosCard />
      </div>
    </section>
  );
}
function TwoPaths() {
  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium tracking-[0.4em] text-primary">
            TWO PATHS. ONE VISION.
          </span>
        </div>

        <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Products card */}
          <div className="glass-card relative overflow-hidden rounded-3xl p-8">
            <h3 className="font-display text-3xl font-semibold">Products We Create</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              We build our own products to solve real-world problems and empower people.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["Problem-first approach", "Privacy & performance", "Designed for the future"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
            <img
              src={twoPathsProducts}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="mt-6 w-full rounded-2xl border border-border/60"
            />
          </div>

          {/* Center emblem */}
          <div className="relative mx-auto hidden h-40 w-40 lg:block">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-[var(--gradient-radial-glow)]" />
            <div className="absolute inset-2 animate-orbit rounded-full border border-primary/30" />
            <div className="absolute inset-6 animate-orbit-reverse rounded-full border border-primary/20" />
            <div className="absolute inset-0 grid place-items-center">
              <svg
                viewBox="0 0 60 60"
                className="h-20 w-20 drop-shadow-[0_0_20px_var(--color-primary)]"
              >
                <path
                  d="M44 14 L20 14 L10 30 L20 46 L44 46 L34 30 Z"
                  fill="none"
                  stroke="url(#cg)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="60" y2="60">
                    <stop offset="0" stopColor="oklch(0.85 0.18 305)" />
                    <stop offset="1" stopColor="oklch(0.55 0.25 295)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Solutions card */}
          <div className="glass-card relative overflow-hidden rounded-3xl p-8">
            <h3 className="font-display text-3xl font-semibold">Solutions We Build</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              We help startups and businesses turn their ideas into powerful digital products.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["End-to-end development", "Modern technologies", "Reliable & scalable"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <img
              src={twoPathsSolutions}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="mt-6 w-full rounded-2xl border border-border/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="relative py-24 bg-obsidian/30">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <span className="text-xs font-medium tracking-[0.4em] text-primary">OUR VISION</span>
        <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl max-w-3xl mx-auto leading-tight">
          Building the foundation for tomorrow's intelligent digital ecosystems.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          We believe the future belongs to products that seamlessly integrate AI, performance, and
          extraordinary design. Our vision is to elevate the standard of digital experiences
          globally.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="glass-card rounded-3xl p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-medium tracking-[0.4em] text-primary">ABOUT US</span>
            <h2 className="mt-4 font-display text-4xl font-semibold">The Forge of Innovation</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              CipherSmith is a collective of visionary engineers, designers, and strategists. We are
              a product and service technology company focused on building intelligent products,
              software, and premium digital experiences that push boundaries and redefine industry
              standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <img
        src={ctaMountains}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center">
        <span className="text-xs font-medium tracking-[0.4em] text-primary">
          START YOUR JOURNEY
        </span>
        <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl md:text-6xl max-w-3xl mx-auto leading-tight">
          Let's Build Something{" "}
          <span className="text-gradient">Extraordinary</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Have an idea, a product, or a challenge? We're ready to forge it into
          reality.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--gradient-primary)] px-8 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)]"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="mailto:ciphersmithelp@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-obsidian/50 px-8 py-4 text-sm font-medium backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-obsidian"
          >
            ciphersmithelp@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "products", "solutions", "vision", "about", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PurpleDust />
      <div className="relative z-10">
        <Nav
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <Hero />
        <Services />
        <Products />
        <TwoPaths />
        <Vision />
        <About />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
