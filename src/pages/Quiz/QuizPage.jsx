import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { quizData } from "../../data/content";
import {
    Brain,
    CheckCircle,
    XCircle,
    ArrowRight,
    Trophy,
    Lightbulb,
    ArrowsClockwise,
    ClockCountdown,
} from "@phosphor-icons/react";

const QUIZ_STORAGE_KEY = "cld_quiz_session_v1";

const difficultyColor = {
    easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    medium: "bg-orange-50 text-orange-700 border border-orange-200",
    hard: "bg-red-50 text-red-700 border border-red-200",
};
const difficultyLabel = {
    easy: "Độ khó: Dễ",
    medium: "Độ khó: Vừa",
    hard: "Độ khó: Khó",
};

// Thuật toán xáo trộn mảng ngẫu nhiên (Fisher-Yates shuffle)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Xáo trộn cả thứ tự câu hỏi VÀ thứ tự các câu trả lời bên trong mỗi câu hỏi
function generateShuffledQuiz(data) {
    return shuffleArray(data).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
    }));
}

// Khởi tạo state: Ưu tiên khôi phục tiến trình cũ từ localStorage, nếu không có thì random mới
function getInitialQuizState() {
    try {
        const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (
                parsed &&
                Array.isArray(parsed.questions) &&
                parsed.questions.length > 0 &&
                typeof parsed.current === "number"
            ) {
                return {
                    questions: parsed.questions,
                    current: Math.min(
                        parsed.current,
                        parsed.questions.length - 1,
                    ),
                    selected: parsed.selected ?? null,
                    answered: Boolean(parsed.answered),
                    score: parsed.score ?? 0,
                    done: Boolean(parsed.done),
                    isResumed:
                        !parsed.done && (parsed.current > 0 || parsed.answered),
                };
            }
        }
    } catch (err) {
        console.error("Không thể đọc tiến trình quiz cũ:", err);
    }

    return {
        questions: generateShuffledQuiz(quizData),
        current: 0,
        selected: null,
        answered: false,
        score: 0,
        done: false,
        isResumed: false,
    };
}

function ResultScreen({ score, total, onRetry }) {
    const pct = Math.round((score / total) * 100);
    const message =
        pct === 100
            ? "Xuất sắc! Bạn là chuyên gia nhận diện và phòng chống lừa đảo mạng!"
            : pct >= 70
              ? "Rất tốt! Bạn đã trang bị nền tảng phản xạ an ninh mạng vững vàng."
              : pct >= 50
                ? "Khá ổn! Hãy đọc kỹ thêm phần cẩm nang để củng cố các kỹ năng còn thiếu."
                : "Cần chú ý hơn. Đừng lo lắng, hãy ôn lại cẩm nang thực hành rồi thử lại nhé!";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-8 sm:py-10"
        >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 shadow-sm">
                <Trophy size={40} weight="fill" />
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-950 mb-1">
                {score}/{total} câu trả lời đúng
            </h2>
            <div className="text-4xl sm:text-5xl font-black font-sans text-orange-500 my-3">
                {pct}%
            </div>
            <p className="text-gray-600 text-sm sm:text-base max-w-sm mx-auto mb-6 leading-relaxed">
                {message}
            </p>

            {/* Score bar */}
            <div className="mx-auto max-w-xs h-3 bg-gray-100 rounded-full overflow-hidden mb-8">
                <motion.div
                    className="h-full bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                />
            </div>

            <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-bold shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
                <ArrowsClockwise size={18} weight="bold" />
                <span>Bắt đầu bài kiểm tra mới</span>
            </button>
        </motion.div>
    );
}

export default function QuizPage() {
    const [initialState] = useState(getInitialQuizState);

    const [questions, setQuestions] = useState(initialState.questions);
    const [current, setCurrent] = useState(initialState.current);
    const [selected, setSelected] = useState(initialState.selected);
    const [answered, setAnswered] = useState(initialState.answered);
    const [score, setScore] = useState(initialState.score);
    const [done, setDone] = useState(initialState.done);
    const [isResumed, setIsResumed] = useState(initialState.isResumed);

    const shouldReduceMotion = useReducedMotion();

    // Tự động lưu tiến trình dở dang vào localStorage mỗi khi có thay đổi
    useEffect(() => {
        try {
            const payload = {
                questions,
                current,
                selected,
                answered,
                score,
                done,
            };
            localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.error(
                "Không thể lưu tiến trình quiz vào localStorage:",
                err,
            );
        }
    }, [questions, current, selected, answered, score, done]);

    const q = questions[current] || questions[0];
    const isCorrect = selected === q?.correctAnswer;

    const handleSelect = (id) => {
        if (answered) return;
        setSelected(id);
        setAnswered(true);
        if (id === q.correctAnswer) {
            setScore((s) => s + 1);
        }
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setDone(true);
            setIsResumed(false);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    // Làm mới hoàn toàn: Xóa tiến trình cũ, random lại câu hỏi & câu trả lời
    const handleRestartFresh = () => {
        try {
            localStorage.removeItem(QUIZ_STORAGE_KEY);
        } catch (err) {
            console.error(err);
        }
        const fresh = generateShuffledQuiz(quizData);
        setQuestions(fresh);
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setDone(false);
        setIsResumed(false);
    };

    return (
        <div className="min-h-[100dvh] bg-gray-50 py-10 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                            <Brain size={24} weight="fill" />
                        </div>
                        <div>
                            <h1 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">
                                Thử thách phản xạ lừa đảo
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {questions.length} câu hỏi ngẫu nhiên được xáo
                                trộn mỗi lượt chơi
                            </p>
                        </div>
                    </div>

                    {!done && (
                        <button
                            type="button"
                            onClick={handleRestartFresh}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                            title="Xáo trộn lại toàn bộ câu hỏi và bắt đầu từ đầu"
                        >
                            <ArrowsClockwise size={15} weight="bold" />
                            <span>Trộn lại bài mới</span>
                        </button>
                    )}
                </div>

                {/* Resume Notice Badge */}
                {isResumed && !done && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 px-4 py-2.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs sm:text-sm text-orange-900 flex items-center justify-between gap-2"
                    >
                        <div className="flex items-center gap-2">
                            <ClockCountdown
                                size={18}
                                weight="fill"
                                className="text-orange-500 shrink-0"
                            />
                            <span>
                                Hệ thống đã tự động khôi phục tiến trình làm bài
                                dở dang của bạn.
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleRestartFresh}
                            className="text-xs font-bold text-orange-600 hover:underline shrink-0 cursor-pointer"
                        >
                            Làm lại từ đầu
                        </button>
                    </motion.div>
                )}

                {done ? (
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-8">
                        <ResultScreen
                            score={score}
                            total={questions.length}
                            onRetry={handleRestartFresh}
                        />
                    </div>
                ) : (
                    <>
                        {/* Progress */}
                        <div className="mb-4 flex items-center gap-3">
                            <div
                                role="progressbar"
                                aria-label="Tiến độ bài trắc nghiệm"
                                aria-valuenow={current + 1}
                                aria-valuemin={1}
                                aria-valuemax={questions.length}
                                className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-orange-500 rounded-full"
                                    animate={{
                                        width: `${(current / questions.length) * 100}%`,
                                    }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.3,
                                    }}
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-gray-500 font-mono whitespace-nowrap">
                                Câu {current + 1}/{questions.length}
                            </span>
                        </div>

                        {/* Question card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 0, x: 12 }
                                }
                                animate={{ opacity: 1, x: 0 }}
                                exit={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { opacity: 0, x: -12 }
                                }
                                transition={{
                                    duration: 0.25,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xs overflow-hidden"
                            >
                                {/* Card header */}
                                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 bg-gray-50/50">
                                    <span
                                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[q.difficulty]}`}
                                    >
                                        {difficultyLabel[q.difficulty]}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-500">
                                        {q.category}
                                    </span>
                                </div>

                                <div className="p-4 sm:p-6 md:p-8">
                                    {/* Question */}
                                    <p id="current-question-title" className="text-base sm:text-lg font-bold text-gray-950 leading-relaxed mb-6">
                                        {q.question}
                                    </p>

                                    {/* Options (shuffled order with visual A, B, C, D indicators) */}
                                    <div role="radiogroup" aria-labelledby="current-question-title" className="space-y-3">
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected =
                                                selected === opt.id;
                                            const isRight =
                                                opt.id === q.correctAnswer;
                                            const letter = String.fromCharCode(
                                                65 + optIdx,
                                            ); // A, B, C, D

                                            let style =
                                                "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40 text-gray-800";
                                            if (answered && isRight)
                                                style =
                                                    "border-emerald-500 bg-emerald-50/60 text-emerald-950";
                                            else if (
                                                answered &&
                                                isSelected &&
                                                !isRight
                                            )
                                                style =
                                                    "border-red-400 bg-red-50/60 text-red-950";

                                            return (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={isSelected}
                                                    onClick={() =>
                                                        handleSelect(opt.id)
                                                    }
                                                    disabled={answered}
                                                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${style} ${
                                                        !answered
                                                            ? "cursor-pointer"
                                                            : "cursor-default"
                                                    }`}
                                                >
                                                    <span
                                                        className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono border ${
                                                            answered && isRight
                                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                                : answered &&
                                                                    isSelected
                                                                  ? "bg-red-500 border-red-500 text-white"
                                                                  : "border-gray-300 bg-gray-50 text-gray-600"
                                                        }`}
                                                    >
                                                        {letter}
                                                    </span>
                                                    <span className="text-sm sm:text-base font-medium flex-1">
                                                        {opt.text}
                                                    </span>
                                                    {answered && isRight && (
                                                        <CheckCircle
                                                            size={20}
                                                            weight="fill"
                                                            className="text-emerald-500 shrink-0"
                                                        />
                                                    )}
                                                    {answered &&
                                                        isSelected &&
                                                        !isRight && (
                                                            <XCircle
                                                                size={20}
                                                                weight="fill"
                                                                className="text-red-500 shrink-0"
                                                            />
                                                        )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation banner */}
                                    {answered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={`mt-6 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                                                isCorrect
                                                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                                                    : "bg-amber-50 border-amber-200 text-amber-900"
                                            }`}
                                        >
                                            <div className="flex items-center gap-1.5 font-bold mb-1">
                                                <Lightbulb
                                                    size={16}
                                                    weight="fill"
                                                    className={
                                                        isCorrect
                                                            ? "text-emerald-600"
                                                            : "text-amber-600"
                                                    }
                                                />
                                                <span>
                                                    {isCorrect
                                                        ? "Chính xác!"
                                                        : "Giải thích chi tiết:"}
                                                </span>
                                            </div>
                                            <p>{q.explanation}</p>
                                        </motion.div>
                                    )}

                                    {/* Next Question Button */}
                                    {answered && (
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-bold transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                                            >
                                                <span>
                                                    {current + 1 >=
                                                    questions.length
                                                        ? "Xem kết quả"
                                                        : "Câu tiếp theo"}
                                                </span>
                                                <ArrowRight
                                                    size={16}
                                                    weight="bold"
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    );
}
