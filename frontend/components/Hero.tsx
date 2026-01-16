"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"; // Korean locale
import { format } from "date-fns";

export default function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"destination" | "date" | "guests" | null>(null);
  const [selectedDestination, setSelectedDestination] = useState("");

  
  // Date State
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() + 1)));

  // Guest State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
        setActiveTab(null); // Close popup when both dates selected
    }
  };

  const formatDateDisplay = () => {
    if (startDate && endDate) {
      return `${format(startDate, "M.d")} - ${format(endDate, "M.d")}`;
    }
    return "날짜 선택";
  };

  const formatGuestDisplay = () => {
    return `성인 ${adults}, 아동 ${children}`;
  };

  const handleDestinationSelect = (dest: string) => {
      setSelectedDestination(dest);
      setActiveTab(null);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedDestination) params.append("region", selectedDestination);
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    params.append("adults", adults.toString());
    params.append("children", children.toString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative py-32 md:py-48 bg-cover bg-center isolate" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop")' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-md">
          풀빌라 예약하기
        </h1>
        
        {/* Search Widget */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-2 relative">
          
          {/* Destination */}
          <div 
            className={`flex-1 flex flex-col items-start p-4 rounded-xl cursor-pointer transition-colors ${activeTab === "destination" ? "bg-gray-100" : "hover:bg-gray-50"}`}
            onClick={() => setActiveTab("destination")}
          >
            <span className="text-xs font-bold text-gray-500 mb-1">여행지</span>
            <span className={`text-lg font-bold ${selectedDestination ? 'text-primary' : 'text-gray-900'}`}>
                {selectedDestination || "어디로 떠날까요?"}
            </span>
             {/* Mock Destination Popup */}
             {activeTab === "destination" && (
                <div 
                    className="absolute top-[120%] left-0 bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-20 min-w-[300px] text-left animate-in fade-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="font-bold text-gray-900 mb-2">인기 여행지</p>
                    <div className="grid grid-cols-2 gap-2">
                        {["제주도", "강원도", "부산", "가평"].map((city) => (
                           <button 
                             key={city}
                             className="text-left py-2 px-3 rounded hover:bg-gray-50 text-gray-600 font-medium"
                             onClick={() => handleDestinationSelect(city)}
                           >
                             {city}
                           </button>
                        ))}
                    </div>
                </div>
             )}
          </div>
          
          <div className="w-px bg-gray-200 my-2 hidden md:block" />

          {/* Date Picker */}
          <div 
            className={`flex-1 flex flex-col items-start p-4 rounded-xl cursor-pointer transition-colors ${activeTab === "date" ? "bg-gray-100" : "hover:bg-gray-50"}`}
            onClick={() => setActiveTab(activeTab === "date" ? null : "date")}
          >
            <span className="text-xs font-bold text-gray-500 mb-1">날짜</span>
            <span className="text-lg font-bold text-gray-900">{formatDateDisplay()}</span>
            
            {activeTab === "date" && (
                <div className="absolute top-[120%] left-0 md:left-auto bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-20 z-[100] animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <style>{`
                      .react-datepicker { border: none; font-family: inherit; }
                      .react-datepicker__header { background: white; border-bottom: none; }
                      .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: var(--primary) !important; }
                      .react-datepicker__day--keyboard-selected { background-color: var(--primary-hover) !important; }
                      .react-datepicker__day:hover { background-color: #f0f0f0; }
                    `}</style>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        minDate={new Date()}
                        locale={ko}
                        monthsShown={2}
                    />
                </div>
            )}
          </div>

          <div className="w-px bg-gray-200 my-2 hidden md:block" />
          
          {/* Guest Selector */}
          <div 
            className={`flex-1 flex flex-col items-start p-4 rounded-xl cursor-pointer transition-colors ${activeTab === "guests" ? "bg-gray-100" : "hover:bg-gray-50"}`}
            onClick={() => setActiveTab(activeTab === "guests" ? null : "guests")}
          >
             <span className="text-xs font-bold text-gray-500 mb-1">인원</span>
             <span className="text-lg font-bold text-gray-900">{formatGuestDisplay()}</span>

            {activeTab === "guests" && (
                <div 
                    className="absolute top-[120%] right-0 bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-20 min-w-[320px] animate-in fade-in zoom-in-95 duration-200" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-gray-900">성인</span>
                        <div className="flex items-center gap-4">
                            <button 
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-gray-800 transition-colors"
                                disabled={adults <= 1}
                                onClick={() => setAdults(adults - 1)}
                            >-</button>
                            <span className="w-6 text-center font-bold text-gray-900">{adults}</span>
                            <button 
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 transition-colors"
                                onClick={() => setAdults(adults + 1)}
                            >+</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">아동</span>
                        <div className="flex items-center gap-4">
                            <button 
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-gray-800 transition-colors"
                                disabled={children <= 0}
                                onClick={() => setChildren(children - 1)}
                            >-</button>
                            <span className="w-6 text-center font-bold text-gray-900">{children}</span>
                            <button 
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 transition-colors"
                                onClick={() => setChildren(children + 1)}
                            >+</button>
                        </div>
                    </div>
                </div>
            )}
          </div>
          
          <button 
            className="bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-xl px-10 py-4 transition-all shadow-lg hover:shadow-xl active:scale-95 ml-2 mt-2 md:mt-0 w-full md:w-auto"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>
    </section>
  );
}
