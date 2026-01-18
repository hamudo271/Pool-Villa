"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { API_URL } from "@/lib/api";

export default function ListingDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 1));
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    if (id) {
      // Fetch mock data (simulated with standard fetch for now)
      fetch(`${API_URL}/listings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setListing(data);
          setLoading(false);
        })
        .catch((err) => {
             console.error(err);
             // Mock fallback if localhost fails for demo
             setListing({
                 id: id,
                 title: "가평 더 스테이 풀빌라",
                 description: "가평의 맑은 공기와 함께하는 럭셔리 풀빌라. 전 객실 프라이빗 온수풀 구비. 넓은 테라스에서 즐기는 바베큐 파티와 함께 잊지 못할 추억을 만들어보세요. 픽업 서비스 가능하며, 주변 남이섬 등 관광지와 인접해 있습니다.",
                 price: 250000,
                 image: "https://static.yeogi.com/_next/static/media/04_Kv_PC_Light_B.4e7e6534.webp",
                 category: "풀빌라",
                 score: 4.8,
                 reviewCount: 124,
                 location: "경기 가평군"
             });
             setLoading(false);
        });
    }
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) return alert("날짜를 선택해주세요.");
    
    const days = differenceInDays(endDate, startDate);
    if (days <= 0) return alert("체크아웃 날짜는 체크인 이후여야 합니다.");

    // Simple mock booking
    alert(`[예약 완료]\n숙소: ${listing.title}\n일정: ${format(startDate, 'yyyy-MM-dd')} ~ ${format(endDate, 'yyyy-MM-dd')}\n총 금액: ${(listing.price * days).toLocaleString()}원`);
    router.push("/");
  };

  if (loading) return (
     <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
     </div>
  );
  
  if (!listing) return <div className="text-center py-20">Listing not found</div>;

  const days = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = days > 0 ? listing.price * days : 0;

  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      <div className="container-custom py-8">
        {/* Header Section */}
        <section className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">{listing.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center text-primary font-bold">
                    ★ {listing.score}
                </span>
                <span className="underline cursor-pointer hover:text-gray-800">후기 {listing.reviewCount}개</span>
                <span>•</span>
                <span className="underline cursor-pointer hover:text-gray-800">{listing.location || "경기도 가평"}</span>
            </div>
        </section>

        {/* Image Grid (Simulated with one hero for now) */}
        <section className="mb-10 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[21/9] bg-gray-100 group">
             <img src={listing.image} alt={listing.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-transform">
                 사진 모두 보기
             </button>
        </section>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 relative">
            
            {/* Left Column: Details */}
            <div className="flex-1">
                <div className="border-b border-gray-200 pb-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        {listing.category} 전체 • 호스트: 여기어때
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed break-keep">
                        {listing.description}
                    </p>
                </div>

                <div className="border-b border-gray-200 pb-8 mb-8">
                    <h2 className="text-xl font-bold mb-6 text-gray-900">숙소 편의시설</h2>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                        <div className="flex items-center gap-3"><span className="w-6 text-center">📶</span> 무선 인터넷</div>
                        <div className="flex items-center gap-3"><span className="w-6 text-center">🅿️</span> 무료 주차 공간</div>
                        <div className="flex items-center gap-3"><span className="w-6 text-center">🏊</span> 수영장</div>
                        <div className="flex items-center gap-3"><span className="w-6 text-center">❄️</span> 에어컨</div>
                        <div className="flex items-center gap-3"><span className="w-6 text-center">🍳</span> 주방</div>
                    </div>
                </div>

                {/* Calendar Section (Optional placement) */}
                <div className="mb-20">
                    <h2 className="text-xl font-bold mb-4 text-gray-900">체크인 날짜를 선택해주세요</h2>
                    <p className="text-gray-500 mb-6">여행 날짜를 입력하여 정확한 요금을 확인하세요.</p>
                     {/* Calendar view here if needed, but sidebar handles it */}
                </div>
            </div>

            {/* Right Column: Sticky Booking Widget */}
            <div className="lg:w-[380px] relative">
                <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 transition-all ring-1 ring-black/5">
                    <div className="flex justify-between items-baseline mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900">{listing.price.toLocaleString()}원</span>
                            <span className="text-gray-500">/ 박</span>
                        </div>
                        <div className="text-sm underline font-medium text-gray-500">후기 {listing.reviewCount}개</div>
                    </div>

                    <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                        <div className="flex border-b border-gray-300">
                            <div className="flex-1 p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
                                <label className="block text-[10px] font-bold uppercase text-gray-800">체크인</label>
                                <DatePicker 
                                    selected={startDate} 
                                    onChange={(date: Date | null) => setStartDate(date)} 
                                    selectsStart 
                                    startDate={startDate} 
                                    endDate={endDate} 
                                    className="w-full bg-transparent outline-none text-sm text-gray-700 font-medium cursor-pointer"
                                    dateFormat="yyyy. MM. dd"
                                />
                            </div>
                            <div className="flex-1 p-3 hover:bg-gray-50 cursor-pointer">
                                <label className="block text-[10px] font-bold uppercase text-gray-800">체크아웃</label>
                                <DatePicker 
                                    selected={endDate} 
                                    onChange={(date: Date | null) => setEndDate(date)} 
                                    selectsEnd 
                                    startDate={startDate} 
                                    endDate={endDate} 
                                    minDate={startDate || new Date()} 
                                    className="w-full bg-transparent outline-none text-sm text-gray-700 font-medium cursor-pointer"
                                    dateFormat="yyyy. MM. dd"
                                />
                            </div>
                        </div>
                        <div className="p-3 hover:bg-gray-50 cursor-pointer">
                            <label className="block text-[10px] font-bold uppercase text-gray-800">인원</label>
                            <select 
                                className="w-full bg-transparent outline-none text-sm text-gray-700 font-medium cursor-pointer"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                            >
                                <option value={1}>게스트 1명</option>
                                <option value={2}>게스트 2명</option>
                                <option value={3}>게스트 3명</option>
                                <option value={4}>게스트 4명</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={handleBooking}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl text-lg mb-4 transition-transform active:scale-95 shadow-md"
                    >
                        예약하기
                    </button>

                    <p className="text-center text-xs text-gray-500 mb-6">예약 확정 전에는 요금이 청구되지 않습니다.</p>

                    <div className="flex flex-col gap-3 text-gray-600 text-base">
                        <div className="flex justify-between underline decoration-gray-300">
                            <span>{listing.price.toLocaleString()}원 x {days}박</span>
                            <span>{(listing.price * days).toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between underline decoration-gray-300">
                            <span>청소비</span>
                            <span>30,000원</span>
                        </div>
                        <div className="flex justify-between underline decoration-gray-300">
                            <span>서비스 수수료</span>
                            <span>15,000원</span>
                        </div>
                    </div>
                    
                    <div className="my-4 border-t border-gray-200" />
                    
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>총 합계</span>
                        <span>{(totalPrice + 45000).toLocaleString()}원</span>
                    </div>

                </div>
            </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
