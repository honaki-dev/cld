import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home/HomePage";

const ScamsPage = lazy(() => import("./pages/Scams/ScamsPage"));
const CaseStudiesPage = lazy(
    () => import("./pages/CaseStudies/CaseStudiesPage"),
);
const EmergencyPage = lazy(() => import("./pages/Emergency/EmergencyPage"));
const CheckerPage = lazy(() => import("./pages/Checker/CheckerPage"));
const QuizPage = lazy(() => import("./pages/Quiz/QuizPage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));

function PageFallback() {
    return (
        <div
            className="min-h-[60dvh] flex items-center justify-center p-8"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-emerald-600 animate-spin" />
                <span className="text-xs text-gray-500 font-medium">
                    Đang tải dữ liệu...
                </span>
            </div>
        </div>
    );
}

function ScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace("#", "");
            let attempts = 0;
            const maxAttempts = 8;

            const tryScroll = () => {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryScroll, 80);
                }
            };

            const timer = setTimeout(tryScroll, 40);
            return () => clearTimeout(timer);
        }

        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollHandler />
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="scams" element={<ScamsPage />} />
                        <Route
                            path="case-studies"
                            element={<CaseStudiesPage />}
                        />
                        <Route path="emergency" element={<EmergencyPage />} />
                        <Route path="checker" element={<CheckerPage />} />
                        <Route path="quiz" element={<QuizPage />} />
                        <Route path="about" element={<AboutPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
