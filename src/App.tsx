import { Routes, Route } from "react-router-dom";
import StorySelectPage from "./pages/StorySelectPage";
import LoadingPage from "./pages/LoadingPage";
import StoryReadPage from "./pages/StoryReadPage";
import QuizPage from "./pages/Quizpage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<StorySelectPage />} />
      <Route path="/loading/:id" element={<LoadingPage />} />
      <Route path="/stories/:id" element={<StoryReadPage />}/>
      <Route path="/quiz/:id" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
