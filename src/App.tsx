import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header.tsx";
import Loader from "./components/Loader.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Learning = lazy(() => import("./pages/Learning.tsx"));
const Quiz = lazy(() => import("./pages/Quiz.tsx"));
const Result = lazy(() => import("./pages/Result.tsx"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
