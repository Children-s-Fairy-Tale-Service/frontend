import { Routes, Route } from "react-router-dom";
import StorySelectPage from "./pages/StorySelectPage";
import LoadingPage from "./pages/LoadingPage";
//import StoryReadPage from "./StoryReadPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StorySelectPage />} />
      <Route path="/loading/:id" element={<LoadingPage />} />
      
    </Routes>
  );
}

export default App;
