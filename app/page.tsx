import { Navbar, Hero, ToolsGrid, PromoSection, Footer } from "@/components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ToolsGrid />
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
}
