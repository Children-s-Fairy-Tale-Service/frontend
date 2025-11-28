import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Story = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  colorClass: string;
};

const STORIES: Story[] = [
  {
    id: "fox",
    title: "노란 여우의 장난",
    subtitle: "장난꾸러기 여우의 하루",
    description:
      "산속 마을을 돌아다니며 장난을 치던 노란 여우가 정말 소중한 것을 발견하게 되는 이야기.",
    emoji: "🤠",
    colorClass: "from-amber-100 to-yellow-200",
  },
  {
    id: "squirrel",
    title: "도토리를 지키는 다람쥐",
    subtitle: "용감한 다람쥐의 선택",
    description:
      "폭풍이 몰아치는 밤, 친구들을 위해 소중한 도토리를 나누려고 마음먹는 다람쥐의 모험.",
    emoji: "👦",
    colorClass: "from-sky-100 to-blue-200",
  },
  {
    id: "tiger",
    title: "호랑이와 약속",
    subtitle: "약속을 지키는 마음",
    description:
      "겁이 많던 아이가 숲 속 호랑이와의 약속을 지키며 진짜 용기를 배우는 이야기.",
    emoji: "🐆",
    colorClass: "from-pink-100 to-rose-200",
  },
];

// ✅ 메인 페이지: 동화 선택 화면 (/)
function StorySelectPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!selectedId) {
      alert("읽고 싶은 동화를 하나 선택해 주세요!");
      return;
    }
    navigate(`/loading/${selectedId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-100 via-sky-100 to-slate-50">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
        {/* 상단 헤더 */}
        <header className="w-full pt-8 pb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            <br></br>
            오늘은 어떤 이야기를 들을까?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            마음에 드는 동화를 한 가지 골라 보아요.
          </p>
        </header>
        <br></br>
        
        
        {/* 동화 카드 영역 */}
        <main className="w-full flex-1 pb-10">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {STORIES.map((story) => {
              const isSelected = selectedId === story.id;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setSelectedId(story.id)}
                  className={[
                    "group flex flex-col h-full rounded-2xl bg-white/80 shadow-md hover:shadow-xl transition-all duration-150",
                    "border-2 text-left",
                    isSelected
                      ? "border-orange-400 shadow-orange-200 scale-[1.02]"
                      : "border-transparent hover:-translate-y-1",
                  ].join(" ")}
                >
                  {/* 상단 이모지 + 배경 */}
                  <div
                    className={`px-4 pt-4 pb-3 rounded-t-2xl bg-gradient-to-r ${story.colorClass} flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 flex items-center justify-center text-2xl sm:text-3xl">
                      {story.emoji}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-slate-600">
                        동화 선택
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        {story.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="flex-1 flex flex-col px-4 py-3">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {story.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {story.description}
                    </p>

                    
                  </div>
                </button>
              );
            })}
          </div>
            <br></br>
          {/* 시작 버튼 */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleStart}
              className="px-8 py-3 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-orange-400 to-pink-500 shadow-lg shadow-pink-300 hover:shadow-pink-400 hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
            >
              이 이야기로 시작할래요 ✨
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StorySelectPage;
