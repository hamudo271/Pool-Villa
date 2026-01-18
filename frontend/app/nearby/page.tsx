"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { API_URL } from "@/lib/api";

export default function NearbyPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP, just fetch all listings. In real app, filter by geolocation.
    fetch(`${API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Map Placeholder */}
      <div className="w-full h-[400px] bg-gray-200 relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Map_of_Seoul%2C_South_Korea.svg/2000px-Map_of_Seoul%2C_South_Korea.svg.png')] bg-cover bg-center"></div>
         <div className="z-10 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center max-w-sm mx-4">
             <h2 className="text-xl font-bold mb-2 text-gray-900">내 주변 숙소 찾기</h2>
             <p className="text-gray-600 mb-4">반경 10km 이내의 추천 풀빌라를 확인해보세요.</p>
             <button className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
                 지도에서 보기 (준비중)
             </button>
         </div>
      </div>

      <div className="container-custom py-12 flex-1">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            내 주변 추천 숙소
        </h1>

        {loading ? (
             <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.slice(0, 4).map((listing: any) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
