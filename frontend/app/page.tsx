import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import RegionGrid from "@/components/RegionGrid";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <div className="container-custom py-12 space-y-16">
        <CategoryGrid />
        <RegionGrid />
        <FeaturedListings />
      </div>
      <Footer />
    </main>
  );
}
