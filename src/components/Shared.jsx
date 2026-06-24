import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X, Github, Linkedin, Twitter, Loader2 } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-lg bg-[var(--gradient-primary)] opacity-30 blur-md" />
        <div className="relative grid h-10 w-10 place-items-center rounded-lg border border-primary/40 bg-obsidian">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d="M18 6 L8 6 L4 12 L8 18 L18 18 L14 12 Z"
              fill="none"
              stroke="url(#lg)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0" stopColor="oklch(0.78 0.21 305)" />
                <stop offset="1" stopColor="oklch(0.55 0.25 295)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-display text-base font-semibold tracking-[0.15em]">CIPHERSMITH</div>
        <div className="text-[9px] tracking-[0.35em] text-muted-foreground">
          CODE. CREATE. CONQUER.
        </div>
      </div>
    </div>
  );
}

export function Nav({ activeSection, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const links = ["Home", "Services", "Products", "Solutions", "Our Vision", "About", "Contact"];

  const handleScroll = (e, id) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const section = document.getElementById(id.toLowerCase().replace("our ", ""));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between gap-6 px-6">
          <Logo />
          <nav className="hidden items-center gap-8 rounded-full border border-border/60 bg-obsidian/60 px-7 py-3 backdrop-blur-xl lg:flex">
            {links.map((l) => {
              const id = l.toLowerCase().replace("our ", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={l}
                  href={`/#${id}`}
                  onClick={(e) => handleScroll(e, id)}
                  className={`relative text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                  )}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="group hidden items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[var(--shadow-glow)] lg:inline-flex"
            >
              Let's Build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-obsidian/60 backdrop-blur-xl lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-obsidian/95 shadow-2xl transition-transform duration-300 ease-in-out border-l border-border/50 p-6 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-obsidian/60 backdrop-blur-xl text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {links.map((l) => {
              const id = l.toLowerCase().replace("our ", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={l}
                  href={`/#${id}`}
                  onClick={(e) => handleScroll(e, id)}
                  className={`text-2xl font-display transition-colors ${isActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                >
                  {l}
                </a>
              );
            })}
          </nav>
          <div className="mt-auto pt-8 border-t border-border/50">
            <a
              href="/#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="group flex justify-center items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] w-full"
            >
              Let's Build Something
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbwzHp3uExrNBMeShcDLbq6VBOhsyej2vrkgZ7AEkBdrrtdt-vEeDJWvh93QHHjH8XlItA/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        },
      );

      setSubmitStatus("success");
      e.target.reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-obsidian/40 border-t border-border/30">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-medium tracking-[0.3em] text-primary">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl leading-tight">
              Let's Build Something <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Have an idea, product, startup, or project? Let's turn it into reality.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 lg:p-10 relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="ciphersmithelp@gmail.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  className="bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground">
                  Service
                </label>
                <select
                  required
                  id="service"
                  name="service"
                  defaultValue=""
                  className="bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none text-foreground/80"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="AI Solution">AI Solution</option>
                  <option value="Custom Software">Custom Software</option>
                  <option value="Product Development">Product Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows="4"
                  className="bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full justify-center items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
              <div className="text-center mt-2">
                <a
                  href="mailto:ciphersmithelp@gmail.com"
                  className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  Start A Conversation directly
                </a>
              </div>
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                  Thank you for contacting CipherSmith. We will get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      title: "Services",
      items: [
        "AI Solutions",
        "Mobile App Development",
        "Web Development",
        "Custom Software",
        "Automation",
        "Data & Analytics",
      ],
    },
    {
      title: "Products",
      items: ["Luna", "Product Lab", "Innovation Lab", "CipherSmith Studios"],
    },
    {
      title: "Quick Links",
      items: ["Home", "Services", "Products", "Solutions", "Our Vision", "About", "Contact"],
    },
  ];
  return (
    <footer className="relative border-t border-border/60 bg-obsidian/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            CipherSmith is a product and service technology company focused on building intelligent
            products, software, and digital experiences.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-obsidian/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-obsidian/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-obsidian/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="mailto:ciphersmithelp@gmail.com"
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-obsidian/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title} className="md:col-span-2">
            <h4 className="font-display text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.items.map((i) => {
                // Link mapping logic based on title
                let targetId = null;
                let targetRoute = null;

                if (c.title === "Services") {
                  const serviceMap = {
                    "AI Solutions": "service-ai-ml-solutions",
                    "Mobile App Development": "service-mobile-app-development",
                    "Web Development": "service-web-development",
                    "Custom Software": "service-custom-software",
                    "Automation": "service-automation",
                    "Data & Analytics": "service-data-analytics"
                  };
                  targetId = serviceMap[i];
                } else if (c.title === "Products") {
                  const productMap = {
                    "Luna": "/products/luna",
                    "Product Lab": "/products/forge",
                    "Innovation Lab": "/products/forge",
                    "CipherSmith Studios": "/studios"
                  };
                  targetRoute = productMap[i];
                } else if (c.title === "Quick Links") {
                  const quickMap = {
                    "Home": "home",
                    "Services": "services",
                    "Products": "products",
                    "Solutions": "solutions",
                    "Our Vision": "vision",
                    "About": "about",
                    "Contact": "contact"
                  };
                  targetId = quickMap[i];
                }

                if (targetId) {
                  return (
                    <li key={i}>
                      <a
                        href={`/#${targetId}`}
                        onClick={(e) => {
                          if (window.location.pathname === "/") {
                            e.preventDefault();
                            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="hover:text-foreground transition-colors"
                      >
                        {i}
                      </a>
                    </li>
                  );
                } else if (targetRoute) {
                  return (
                    <li key={i}>
                      <Link to={targetRoute} className="hover:text-foreground transition-colors">
                        {i}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={i}>
                    <span className="hover:text-foreground transition-colors">{i}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <h4 className="font-display text-sm font-semibold">Stay Updated</h4>
          <p className="mt-4 text-xs text-muted-foreground">
            Subscribe to get updates on our journey and products.
          </p>
          <form className="mt-4 flex overflow-hidden rounded-full border border-border bg-obsidian/60">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Email for updates"
            />
            <button
              type="submit"
              className="grid w-11 place-items-center bg-[var(--gradient-primary)] text-primary-foreground"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 CipherSmith. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PurpleDust() {
  const rand = (i, salt) => {
    const x = Math.sin(i * 9301 + salt * 49297) * 233280;
    return x - Math.floor(x);
  };
  const particles = Array.from(
    {
      length: 70,
    },
    (_, i) => {
      const size = 1 + rand(i, 1) * 4;
      const left = rand(i, 2) * 100;
      const top = 80 + rand(i, 3) * 40;
      const duration = 14 + rand(i, 4) * 22;
      const delay = -rand(i, 5) * duration;
      const dx = (rand(i, 6) - 0.5) * 160;
      const opacity = 0.35 + rand(i, 7) * 0.55;
      return {
        i,
        size,
        left,
        top,
        duration,
        delay,
        dx,
        opacity,
      };
    },
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full opacity-60 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, oklch(0.62 0.26 300 / 0.35), transparent 60%)",
          filter: "blur(60px)",
          animation: "aurora-shift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[90vh] w-[90vh] rounded-full opacity-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 295 / 0.35), transparent 60%)",
          filter: "blur(80px)",
          animation: "aurora-shift 24s ease-in-out infinite reverse",
        }}
      />
      <span
        className="absolute h-px w-[28vw]"
        style={{
          top: "30%",
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.18 305 / 0.9), transparent)",
          boxShadow: "0 0 14px oklch(0.78 0.21 305 / 0.8)",
          animation: "comet 11s linear infinite",
          animationDelay: "2s",
        }}
      />
      <span
        className="absolute h-px w-[22vw]"
        style={{
          top: "65%",
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.21 305 / 0.8), transparent)",
          boxShadow: "0 0 12px oklch(0.72 0.27 305 / 0.7)",
          animation: "comet 17s linear infinite",
          animationDelay: "7s",
        }}
      />
      {particles.map((p) => (
        <span
          key={p.i}
          className="dust-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `dust-rise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            ["--dx"]: `${p.dx}px`,
            ["--o"]: p.opacity,
            ["--s"]: 1,
          }}
        />
      ))}
    </div>
  );
}
