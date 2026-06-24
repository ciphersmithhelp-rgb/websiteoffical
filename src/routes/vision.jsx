import { Nav, Footer } from "./studios";

export default function VisionPage() {
  return (
    <div className="studios-theme">
      <main className="studios-bg-forge relative min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 px-6 py-32 max-w-[1000px] mx-auto mt-20 text-center">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-studios-fg mb-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]">Our Vision</h1>
          <p className="text-lg leading-relaxed text-studios-muted mb-16">
            The future direction of CipherSmith Studios.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border">
              <h3 className="font-cinzel text-xl text-studios-aurum mb-3">Mythology Inspired</h3>
              <p className="text-sm leading-relaxed text-studios-muted">We draw from the well of ancient legends, folklore, and forgotten tales to breathe life into our universes.</p>
            </div>
            <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border">
              <h3 className="font-cinzel text-xl text-studios-aurum mb-3">Original Worlds</h3>
              <p className="text-sm leading-relaxed text-studios-muted">Every world we forge is an original creation designed with deep history, diverse cultures, and endless mysteries.</p>
            </div>
            <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border">
              <h3 className="font-cinzel text-xl text-studios-aurum mb-3">Story First Design</h3>
              <p className="text-sm leading-relaxed text-studios-muted">Narrative is not an afterthought. It drives the mechanics, the environment, and the entire player journey.</p>
            </div>
            <div className="studios-glass-panel p-8 rounded-2xl border border-studios-border">
              <h3 className="font-cinzel text-xl text-studios-aurum mb-3">Forging The Future</h3>
              <p className="text-sm leading-relaxed text-studios-muted">We continuously push the boundaries of technology and art to create experiences that define the next generation of gaming.</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
