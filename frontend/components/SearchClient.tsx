"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { API_URL } from "@/lib/api";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const region = searchParams.get("region");
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/listings/search?`;
        if (query) url += `q=${query}&`;
        if (region) url += `region=${region}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [query, region]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container-custom py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
            {region ? `${region} 검색 결과` : query ? `"${query}" 검색 결과` : "검색 결과"}
        </h1>

        {loading ? (
             <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
             <p className="text-xl text-gray-500 mb-4">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
