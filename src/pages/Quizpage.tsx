// src/pages/QuizPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { STORIES } from "../data/stories";
const API_BASE = import.meta.env.VITE_BACKEND_URL;
type QuizItem = {
  quiz: string;
  answer: string;
};

type QuizResponse = {
  items: QuizItem[];
};

function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const story = STORIES.find((s) => s.id === id);

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ 퀴즈 요청
  useEffect(() => {
    if (!story) return;

    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        setChecked(false);
        setCorrectCount(0);
        setQuizItems([]);
        setUserAnswers([]);

        // 동화 전체 텍스트 하나로 합치기 (페이지 기준)
        const fullStoryText = story.pages.map((p) => p.text).join(" ");
        const fullcaptions = story.caption
        // TODO: 실제 캡션이 있으면 여기에 넣으면 됨
        const requestBody = {
          stories: [fullStoryText], // 현재는 1개 동화만 보냄
          captions: fullcaptions,             // 캡션 있으면 ["...", "..."] 이렇게 채우기
          n_quizzes: 5,
        };

        // 👉 백엔드 실제 URL 로 바꾸기
        // 예: http://localhost:8000/quizzes/generation 이라면 그걸로
        const response = await fetch(`${API_BASE}/quizzes/generation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`퀴즈 생성 요청 실패 (status: ${response.status})`);
        }

        const data: QuizResponse = await response.json();

        setQuizItems(data.items || []);
        setUserAnswers((data.items || []).map(() => ""));
      } catch (err: any) {
        console.error(err);
        setError(err.message || "퀴즈를 불러오는 중 오류가 발생했어요.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <p className="text-lg text-slate-700">해당 동화를 찾을 수 없어요.</p>
        <Link to="/" className="mt-4 text-sm text-blue-600 underline">
          메인으로 돌아가기
        </Link>
      </div>
    );
  }

  const handleChangeAnswer = (index: number, value: string) => {
    setUserAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleCheck = () => {
    if (!quizItems.length) return;

    let count = 0;
    quizItems.forEach((item, idx) => {
      const user = (userAnswers[idx] || "").trim().toLowerCase();
      const answer = (item.answer || "").trim().toLowerCase();
      if (user && user === answer) count += 1;
    });

    setCorrectCount(count);
    setChecked(true);
  };

  const handleRetry = () => {
    setChecked(false);
    setCorrectCount(0);
    setUserAnswers(quizItems.map(() => ""));
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gradient-to-b from-violet-100 via-white to-sky-100 px-4 pb-16">
      <div className="w-full max-w-3xl pt-10">
        {/* 헤더 */}
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            퀴즈 시간
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="text-3xl">{story.emoji}</span>
            <span>{story.title} 퀴즈</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            방금 읽은 동화를 잘 기억하고 있나요? 아래 퀴즈를 풀어 보면서 내용을 떠올려 볼까요? 😊
          </p>
        </header>

        {/* 상태 영역 */}
        {loading && (
          <div className="mt-6 flex flex-col items-center justify-center py-10 bg-white/80 rounded-3xl shadow">
            <div className="w-8 h-8 border-4 border-violet-300 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-700">퀴즈를 준비하는 중이에요… ✏️</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm">
            <p className="font-semibold">퀴즈를 불러오지 못했어요.</p>
            <p className="mt-1 text-xs">{error}</p>
          </div>
        )}

        {!loading && !error && quizItems.length === 0 && (
          <div className="mt-6 bg-white rounded-3xl shadow px-4 py-6 text-sm text-slate-700">
            아직 생성된 퀴즈가 없어요. 잠시 후 다시 시도해 주세요.
          </div>
        )}

        {/* 퀴즈 리스트 */}
        {!loading && !error && quizItems.length > 0 && (
          <>
            <div className="space-y-4 mt-4">
              {quizItems.map((item, index) => {
                const user = userAnswers[index] || "";
                const correctAns = item.answer || "";
                const isCorrect =
                  checked &&
                  user.trim().length > 0 &&
                  user.trim().toLowerCase() === correctAns.trim().toLowerCase();

                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow px-4 py-4 sm:px-5 sm:py-5"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-sm font-bold text-violet-500">
                        Q{index + 1}.
                      </div>
                      <p className="text-sm sm:text-base text-slate-800">
                        {item.quiz}
                      </p>
                    </div>

                    <div className="mt-3">
                      <input
                        type="text"
                        value={user}
                        onChange={(e) =>
                          handleChangeAnswer(index, e.target.value)
                        }
                        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                        placeholder="여기에 답을 적어 보세요"
                        disabled={loading}
                      />
                    </div>

                    {checked && (
                      <div className="mt-2 text-xs sm:text-sm flex items-center justify-between">
                        <span
                          className={
                            isCorrect
                              ? "text-emerald-600 font-semibold"
                              : "text-rose-600 font-semibold"
                          }
                        >
                          {isCorrect ? "정답이에요! 🎉" : "아쉬워요. 다시 생각해 볼까요?"}
                        </span>
                        {!isCorrect && correctAns && (
                          <span className="text-slate-500">
                            정답: <span className="font-medium">{correctAns}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 하단 버튼 영역 */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center text-sm sm:text-base">
              <div className="text-xs sm:text-sm text-slate-600">
                {checked ? (
                  <span>
                    총 <span className="font-bold text-emerald-600">{correctCount}</span> /{" "}
                    {quizItems.length}문제를 맞췄어요!
                  </span>
                ) : (
                  <span>모든 문제를 다 적은 후 채점하기 버튼을 눌러 보세요.</span>
                )}
              </div>

              <div className="flex gap-2 sm:gap-3">
                {checked && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="px-4 py-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                  >
                    다시 풀어보기 🔁
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCheck}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 text-white font-semibold shadow hover:shadow-lg transition"
                >
                  채점하기 ✏️
                </button>
              </div>
            </div>

            {/* 아래 네비게이션 */}
            <div className="mt-8 flex justify-between text-xs sm:text-sm text-slate-600">
              <Link
                to={`/stories/${story.id}`}
                className="underline underline-offset-2 hover:text-slate-800"
              >
                동화 다시 보기 📖
              </Link>
              <Link
                to="/"
                className="underline underline-offset-2 hover:text-slate-800"
              >
                처음으로 돌아가기 🏠
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
