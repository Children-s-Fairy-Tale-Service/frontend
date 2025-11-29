// src/pages/StoryReadPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { STORIES } from "../data/stories";

function StoryReadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = STORIES.find((s) => s.id === id);
  const [pageIndex, setPageIndex] = useState(0);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-700">해당 동화를 찾을 수 없어요.</p>
        <Link to="/" className="mt-4 text-sm text-blue-600 underline">
          메인으로 돌아가기
        </Link>
      </div>
    );
  }

  const page = story.pages[pageIndex];
  const isFirst = pageIndex === 0;
  const isLast = pageIndex === story.pages.length - 1;
  const pageNumber = String(page.page).padStart(2, "0");
  // 예: public/images/cheetah/1.webp
  const imageSrc = `/images/${story.id}/image${pageNumber}.png`;
  console.log(imageSrc)
  const goQuiz = () => {
    if (!id) return;
    navigate(`/quiz/${id}`);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-100 via-sky-100 to-slate-50">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
      {/* 제목 */}
      <header className="w-full max-w-2xl text-center pt-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1 flex justify-center items-center gap-2">
          <span className="text-4xl">{story.emoji}</span>
          {story.title}
        </h1>
        <p className="text-sm text-slate-600">{story.subtitle}</p>
      </header>

      <main className="w-full max-w-2xl mt-6 flex flex-col">
        {/* 이미지 */}
        <div className="w-full overflow-hidden rounded-3xl shadow-md bg-white/80 border border-slate-200">
          <img
            src={imageSrc}
            alt="동화 이미지"
            className="w-full h-auto object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/default.png";
            }}
          />
        </div>

        {/* 텍스트 */}
        <div className="mt-6 bg-white rounded-3xl shadow p-6 sm:p-8 leading-relaxed text-slate-800 text-sm sm:text-base">
          {page.text}
          <p className="text-xs text-right text-slate-500 mt-4">
            {page.page} / {story.pages.length} 페이지
          </p>
        </div>

        {/* 버튼 영역 */}
        {!isLast ? (
  // 🔸 마지막 페이지가 아닐 때: 이전 / 처음으로 / 다음
            <div className="mt-6 flex items-center justify-between gap-3 text-sm sm:text-base">

                {/* ← 이전 */}
                <button
                disabled={isFirst}
                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                className={`px-5 py-2 rounded-full transition min-w-[90px]
                    ${
                    isFirst
                        ? "bg-slate-200 text-slate-400 cursor-default"
                        : "bg-slate-700 text-black hover:bg-slate-800"
                    }`}
                >
                ← 이전
                </button>

                {/* 🏠 처음으로 */}
                <button
                onClick={goHome}
                className="px-5 py-2 rounded-full bg-slate-500 text-black hover:bg-slate-600 transition min-w-[110px]"
                >
                처음으로 🏠
                </button>

                {/* → 다음 */}
                <button
                onClick={() =>
                    setPageIndex((i) => Math.min(story.pages.length - 1, i + 1))
                }
                className="px-5 py-2 rounded-full bg-orange-400 text-black hover:bg-orange-500 transition min-w-[90px]"
                >
                다음 →
                </button>
            </div>
            ) : (
            // 🔸 마지막 페이지: 이전 / 처음으로 / 퀴즈 풀러가기
            <div className="mt-6 flex items-center justify-between gap-3 text-sm sm:text-base">

                {/* ← 이전 */}
                <button
                disabled={isFirst}
                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                className={`px-5 py-2 rounded-full transition min-w-[90px]
                    ${
                    isFirst
                        ? "bg-slate-200 text-slate-400 cursor-default"
                        : "bg-slate-700 text-black hover:bg-slate-800"
                    }`}
                >
                ← 이전
                </button>

                {/* 🏠 처음으로 */}
                <button
                onClick={goHome}
                className="px-5 py-2 rounded-full bg-slate-500 text-black hover:bg-slate-600 transition min-w-[110px]"
                >
                처음으로 🏠
                </button>

                {/* ✏️ 퀴즈 풀러 가기 */}
                <button
                onClick={goQuiz}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold shadow hover:shadow-lg transition min-w-[120px]"
                >
                퀴즈 풀러 가기 ✏️
                </button>
            </div>
            )}
      </main>
      </div>
    </div>
  );
}

export default StoryReadPage;
