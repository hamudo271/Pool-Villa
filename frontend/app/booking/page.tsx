"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:4000/bookings/my");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container-custom py-12 flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">예약 내역</h1>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="flex flex-col gap-6">
            {bookings.map((booking: any) => (
              <BookingCard key={booking.id} {...booking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
             <p className="text-xl text-gray-500 mb-4">아직 예약된 여행이 없습니다.</p>
             <button className="text-primary font-bold hover:underline" onClick={() => window.location.href = '/'}>
                 여행지 둘러보기
             </button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
