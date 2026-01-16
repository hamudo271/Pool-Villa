"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    description?: string;
    href: string;
}

function MenuItem({ icon, label, description, href }: MenuItemProps) {
    return (
        <Link href={href} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-100 last:border-0">
            <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-gray-900">{label}</h3>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
            <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </Link>
    )
}

export default function MorePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container-custom py-12 flex-1 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                 T
             </div>
             <div>
                 <h1 className="text-2xl font-bold text-gray-900">Test User님</h1>
                 <p className="text-gray-500">test@example.com</p>
             </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <MenuItem 
                href="/booking"
                label="예약 내역"
                description="다녀온 여행과 예정된 여행을 확인하세요"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v4.072c0 .621.504 1.125 1.125 1.125in17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                }
            />
             <MenuItem 
                href="#"
                label="내 정보 관리"
                description="개인정보 및 비밀번호를 변경합니다"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                }
            />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <MenuItem 
                href="#"
                label="공지사항"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.795 23.944 23.944 0 0 1-1.014 5.954m-12.898-9.1a21.666 21.666 0 0 1-.989-2.58c-.27-1.008.23-2.193 1.157-2.659l.802-.405c1.096-.554 2.39.117 2.654 1.315.32 1.45.545 2.944.662 4.468m-4.286 3.903a21.67 21.67 0 0 1-.413-4.532" />
                    </svg>
                }
            />
            <MenuItem 
                href="#"
                label="고객센터 (1544-1234)"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                }
            />
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left text-red-500">
                <div className="p-3 rounded-full bg-red-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </div>
                <h3 className="font-bold">로그아웃</h3>
            </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
