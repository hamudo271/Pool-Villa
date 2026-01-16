export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-12">
      <div className="container-custom flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-200 pb-8">
           <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-primary text-sm">고객센터</h5>
              <p className="text-2xl font-bold text-text-primary">1670-6250</p>
              <p className="text-xs text-text-tertiary">오전 9시 - 새벽 3시</p>
           </div>
           
           <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-primary text-sm">회사</h5>
              <div className="flex flex-col gap-2 text-sm text-text-secondary">
                 <a href="#" className="hover:underline">회사소개</a>
                 <a href="#" className="hover:underline">채용안내</a>
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-primary text-sm">이용안내</h5>
              <div className="flex flex-col gap-2 text-sm text-text-secondary">
                 <a href="#" className="hover:underline">이용약관</a>
                 <a href="#" className="hover:underline font-bold">개인정보처리방침</a>
                 <a href="#" className="hover:underline">소비자 분쟁해결 기준</a>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-2 text-[11px] text-text-tertiary leading-relaxed">
          <p>
            (주)여기어때컴퍼니 | 대표이사: 정명훈 | 사업자등록번호: 742-86-00224 <br />
            서울 강남구 봉은사로 479, 479타워 11층 | 전자우편주소: help@goodchoice.kr
          </p>
          <p className="mt-2">
            (주)여기어때컴퍼니는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
          </p>
          <p className="mt-4 font-medium text-gray-400">
            Copyright GC COMPANY Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
