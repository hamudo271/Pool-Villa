export default function CategoryGrid() {
  const categories = [
    { id: 1, label: "풀빌라", icon: "🏊" },
    { id: 2, label: "호텔/리조트", icon: "🏨" },
    { id: 3, label: "펜션", icon: "🏡" },
    { id: 4, label: "캠핑/글램핑", icon: "⛺" },
    { id: 5, label: "한옥", icon: "🏯" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 my-10">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          className="flex flex-col items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-white group-hover:shadow-md transition-all">
            {cat.icon}
          </div>
          <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{cat.label}</span>
        </div>
      ))}
    </div>
  );
}
