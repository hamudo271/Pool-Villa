"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const query = searchParams.get("q") || "";
        const region = searchParams.get("region") || "";
        
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (region) params.append("region", region);

        const res = await fetch(`http://localhost:4000/listings/search?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to search listings");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="container-custom py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8">검색 결과</h1>

        {loading ? (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-text-secondary">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
