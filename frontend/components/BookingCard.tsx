"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface BookingCardProps {
  id: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  listing: {
    title: string;
    image: string;
    description: string;
  };
}

export default function BookingCard({ startDate, endDate, totalPrice, status, listing }: BookingCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
      {/* Image */}
      <div className="relative w-full md:w-48 h-48 flex-shrink-0">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
            {status === 'CONFIRMED' && (
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">예약확정</span>
            )}
             {status === 'CANCELLED' && (
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">취소됨</span>
            )}
             {status === 'PENDING' && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">대기중</span>
            )}
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{listing.description}</p>
          
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <div className="flex items-center gap-2">
               <span className="font-bold">일정:</span>
               <span>{format(new Date(startDate), "yyyy.MM.dd (eee)", { locale: ko })} - {format(new Date(endDate), "yyyy.MM.dd (eee)", { locale: ko })}</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="font-bold">가격:</span>
               <span>{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                상세보기
            </button>
        </div>
      </div>
    </div>
  );
}
