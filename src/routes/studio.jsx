import { Nav, Footer } from "./studios";

export default function StudioPage() {
  return (
    <div className="studios-theme">
      <main className="studios-bg-forge relative min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 px-6 py-32 max-w-[1000px] mx-auto mt-20">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-studios-fg mb-12 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">About CipherSmith Studios</h1>
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-xl text-studios-aurum font-cinzel mb-4">Great worlds begin as dreams.</p>
              <p className="text-lg leading-relaxed text-studios-muted">
                CipherSmith Studios was founded with a belief that mythology, imagination, and technology can come together to create unforgettable interactive experiences.
              </p>
              <p className="text-lg leading-relaxed text-studios-muted mt-4">
                Though our journey has only begun, our vision is ambitious:<br />
                <strong className="text-studios-fg">To build worlds that players remember for years.</strong>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border text-center">
                <h3 className="font-cinzel text-xl text-studios-fg mb-3">Our Vision</h3>
                <p className="text-sm leading-relaxed text-studios-muted">To forge cinematic worlds that endure in the minds of players forever.</p>
              </div>
              <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border text-center">
                <h3 className="font-cinzel text-xl text-studios-fg mb-3">The Forge</h3>
                <p className="text-sm leading-relaxed text-studios-muted">Where raw ideas are hammered into refined gameplay and rich lore.</p>
              </div>
              <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border text-center">
                <h3 className="font-cinzel text-xl text-studios-fg mb-3">Future Worlds</h3>
                <p className="text-sm leading-relaxed text-studios-muted">A continuously expanding universe of legends and mythology.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
