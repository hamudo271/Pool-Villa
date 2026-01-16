import React from "react";
import NextImage from "next/image";

interface ListingProps {
  image: string;
  category: string;
  title: string;
  score: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
}

export default function ListingCard({
  image,
  category,
  title,
  score,
  reviewCount,
  price,
  originalPrice,
}: ListingProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group cursor-pointer flex flex-col gap-3 w-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 isolate">
        <NextImage
          src={image || "https://placehold.co/800x600?text=No+Image"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay for better contrast if we had text on image, optional */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
        
        {/* Wishlist Button (Optional implementation) */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex flex-col">
            <span className="text-xs font-medium text-text-secondary">{category}</span>
            <div className="flex justify-between items-start mt-1">
                <h3 className="text-[17px] font-semibold text-text-primary line-clamp-1 group-hover:underline decoration-2 decoration-transparent group-hover:decoration-current transition-all">
                  {title}
                </h3>
            </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm">
           <div className="flex items-center text-primary font-bold">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-0.5">
               <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
             </svg>
             {score}
           </div>
           <span className="text-text-tertiary font-normal">({reviewCount})</span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
            {discount > 0 && <span className="text-lg font-bold text-error">{discount}%</span>}
            <span className="text-xl font-bold text-text-primary">
              {price.toLocaleString()}원
            </span>
             {originalPrice && (
              <span className="text-sm text-text-tertiary line-through decoration-gray-300">
                {originalPrice.toLocaleString()}원
              </span>
            )}
        </div>
      </div>
    </div>
  );
}
