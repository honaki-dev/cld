import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home/HomePage";
import QuizPage from "./pages/Quiz/QuizPage";
import CheckerPage from "./pages/Checker/CheckerPage";

function ScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.replace("#", ""));
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollHandler />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="quiz" element={<QuizPage />} />
                    <Route path="checker" element={<CheckerPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
