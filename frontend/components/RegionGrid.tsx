"use client";

import { useRouter } from "next/navigation";
import NextImage from "next/image";

// Used Unsplash source URLs for reliable random travel images
const REGIONS = [
  { id: 1, name: "제주도", image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "서울", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "부산", image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "강원", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "경주", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "여수", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop" },
];

export default function RegionGrid() {
  const router = useRouter();

  const handleRegionClick = (regionName: string) => {
    // Navigate to search page with region query
    console.log(`Navigating to region: ${regionName}`);
    router.push(`/search?region=${regionName}`);
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">국내 인기 여행지</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {REGIONS.map((region) => (
          <div 
            key={region.id} 
            onClick={() => handleRegionClick(region.name)}
            className="group cursor-pointer flex flex-col gap-3"
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-black/5 isolate">
              <NextImage 
                src={region.image} 
                alt={region.name} 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </div>
            <span className="text-base font-bold text-gray-800 text-center group-hover:text-primary transition-colors">
              {region.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
