import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORIES } from "../data/stories.ts";


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
        <br></br>
        <br></br>
          {/* 💫 상단 히어로 섹션 */}
        <section className="flex flex-col md:flex-row items-center gap-10 mb-14">
          {/* 왼쪽: 텍스트 소개 */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-pink-200 text-[11px] sm:text-xs font-semibold text-pink-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              AI 동화 생성 서비스 · 프로토타입
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              <span className="block">아이의 상상이</span>
              <span className="block bg-gradient-to-r from-pink-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                그림 동화와 퀴즈가<br></br> 되는 곳 ✨
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              아이가 떠올린 이야기를 한 줄로 적으면,
              그 내용을 바탕으로 <span className="font-semibold">동화와 퀴즈</span>가 함께 만들어지는 서비스를
              목표로 하고 있어요. 지금은 미리 준비한 동화 3편으로 흐름을 체험해 볼 수 있어요.
            </p>

            {/* 3단 설명 */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 shadow-sm">
                <p className="font-semibold text-slate-600 mb-1">1단계 · 이야기 쓰기</p>
                <p className="text-slate-700">
                  아이가 상상한 모험이나 하루를 한 줄로 적어요.
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 shadow-sm">
                <p className="font-semibold text-slate-600 mb-1">2단계 · 동화 생성</p>
                <p className="text-slate-700">
                  장면마다 어울리는 그림과 글이 자동으로 만들어져요.
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 shadow-sm">
                <p className="font-semibold text-slate-600 mb-1">3단계 · 퀴즈로 마무리</p>
                <p className="text-slate-700">
                  방금 읽은 내용을 퀴즈로 풀며 자연스럽게 복습해요.
                </p>
              </div>
            </div>

            <p className="mt-4 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
              🧪 현재 버전은 <span className="font-semibold">프로토타입</span>이라
              직접 스토리를 입력해서 생성하는 기능은 준비 중이에요.
              <br />
              대신 아래의 <span className="font-semibold">3편의 동화</span>를 골라 실제 서비스 흐름을 먼저 체험해 보세요.
            </p>
          </div>

          {/* 오른쪽: 데모 카드 느낌 */}
          <div className="flex-1 w-full">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-300/40 via-amber-200/40 to-sky-200/40 blur-xl" />
              <div className="relative rounded-[2rem] bg-white/90 border border-slate-100 shadow-xl px-6 py-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-4xl mb-3 shadow-lg">
                  📚
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  오늘의 동화를 골라볼까요?
                </p>
                <p className="mt-1 text-xs text-slate-500 text-center">
                  아래에서 이야기 하나를 고르면<br />로딩 화면 후 그림 동화가 펼쳐져요.
                </p>

                <div className="mt-4 w-full space-y-2 text-xs">
                  {STORIES.slice(0, 3).map((story) => (
                    <div
                      key={story.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg">
                        {story.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 truncate">
                          {story.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {story.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-medium text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    동화를 고르면 다음 화면으로 이동해요
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 상단 헤더 */}
        <header className="w-full pt-8 pb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            
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
                    {/* 제목 */}
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {story.title}
                    </h2>

                    {/* 얇은 그라디언트 선 */}
                    <div className="mt-1 h-[2px] rounded-full bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200" />

                    {/* 설명 */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
                      {story.description}
                    </p>

                    {/* 아래쪽 작은 정보 라인 */}
                    <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {story.pages.length}쪽 동화
                      </span>
                      <span className="inline-flex items-center gap-1 text-pink-500 font-medium">
                        이 이야기로 시작할게요
                        <span className="group-hover:translate-x-0.5 transition-transform">✨</span>
                      </span>
                    </div>
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
