// LoadingPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const steps = [
  "색칠 도구를 준비하는 중이에요… 🎨",
  "배경을 그리고 있어요… 🌈",
  "주인공을 불러오는 중이에요… ✨",
];

function LoadingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 2500);

    const doneTimer = setTimeout(() => {
      if (id) {
        navigate(`/stories/${id}`);
      } else {
        navigate("/");
      }
    }, 8000);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [id, navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-pink-100 to-sky-100">
      <div className="text-6xl mb-6 animate-bounce">✨</div>

      <p className="text-xl font-bold text-slate-800 mb-3">
        그림을 준비하는 중이에요…
      </p>

      <p className="text-base text-slate-700 animate-pulse">
        {steps[stepIndex]}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        잠시만 기다리면 멋진 그림이 나타날 거예요! ✨
      </p>
    </div>
  );
}

export default LoadingPage;
