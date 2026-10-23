import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { scamDirectory } from "../../data/content";
import {
    MagnifyingGlass,
    Funnel,
    Warning,
    ShieldCheck,
    ArrowRight,
    X,
    Lightbulb,
    PhoneCall,
    CheckCircle,
    CaretDown,
    ArrowCounterClockwise,
    SquaresFour,
} from "@phosphor-icons/react";

const categories = [
    { id: "all", label: "Tất cả danh mục" },
    { id: "banking", label: "Tài chính & Ngân hàng" },
    { id: "authority", label: "Mạo danh cơ quan" },
    { id: "job", label: "Việc làm online" },
    { id: "tech", label: "Công nghệ & AI" },
    { id: "social", label: "Tình cảm & Đời sống" },
];

const riskFilters = [
    { id: "all", label: "Mọi mức độ" },
    { id: "critical", label: "Cực kỳ nguy hiểm" },
    { id: "high", label: "Rủi ro cao" },
];

export default function ScamsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedRisk, setSelectedRisk] = useState("all");
    const [activeModalScam, setActiveModalScam] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!activeModalScam) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setActiveModalScam(null);
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeModalScam]);

    const categoryCounts = useMemo(() => {
        const counts = { all: scamDirectory.length };
        scamDirectory.forEach((s) => {
            counts[s.category] = (counts[s.category] || 0) + 1;
        });
        return counts;
    }, []);

    const hasActiveFilters =
        searchTerm.trim() !== "" ||
        selectedCategory !== "all" ||
        selectedRisk !== "all";

    const handleResetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedRisk("all");
    };

    const filteredScams = useMemo(() => {
        return scamDirectory.filter((scam) => {
            const matchesCategory =
                selectedCategory === "all" ||
                scam.category === selectedCategory;
            const matchesRisk =
                selectedRisk === "all" || scam.riskLevel === selectedRisk;
            const query = searchTerm.trim().toLowerCase();
            const matchesSearch =
                !query ||
                scam.title.toLowerCase().includes(query) ||
                scam.summary.toLowerCase().includes(query) ||
                scam.trapStory.toLowerCase().includes(query) ||
                scam.redFlags.some((rf) => rf.toLowerCase().includes(query));

            return matchesCategory && matchesRisk && matchesSearch;
        });
    }, [searchTerm, selectedCategory, selectedRisk]);

    return (
        <div className="min-h-[100dvh] bg-gray-50 py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-10">
                    <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
                        Thư viện{" "}
                        <span className="text-emerald-600">
                            thủ đoạn lừa đảo
                        </span>
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                        Hệ thống hóa toàn diện các cạm bẫy trực tuyến tinh vi
                        nhất tại Việt Nam. Thấu suốt quy luật thao túng tâm lý
                        và dấu hiệu nhận biết để chủ động bảo vệ bản thân và gia
                        đình.
                    </p>
                </div>

                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-xs mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                        <div className="relative sm:col-span-2 lg:col-span-6">
                            <MagnifyingGlass
                                size={18}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm theo tên thủ đoạn, từ khóa (OTP, VNeID, việc làm...)"
                                className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-950 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                    aria-label="Xóa từ khóa tìm kiếm"
                                >
                                    <X size={15} weight="bold" />
                                </button>
                            )}
                        </div>

                        <div className="relative sm:col-span-1 lg:col-span-3">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                aria-label="Lọc theo nhóm danh mục"
                                className="w-full appearance-none bg-gray-50/70 hover:bg-gray-100/80 border border-gray-200 text-gray-800 text-xs sm:text-sm font-semibold py-2.5 sm:py-3 pl-9 pr-8 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer truncate"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label} (
                                        {categoryCounts[cat.id] || 0})
                                    </option>
                                ))}
                            </select>
                            <SquaresFour
                                size={15}
                                weight="bold"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                            <CaretDown
                                size={13}
                                weight="bold"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>

                        <div className="relative sm:col-span-1 lg:col-span-3">
                            <select
                                value={selectedRisk}
                                onChange={(e) =>
                                    setSelectedRisk(e.target.value)
                                }
                                aria-label="Lọc theo mức độ rủi ro"
                                className="w-full appearance-none bg-gray-50/70 hover:bg-gray-100/80 border border-gray-200 text-gray-800 text-xs sm:text-sm font-semibold py-2.5 sm:py-3 pl-9 pr-8 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer truncate"
                            >
                                <option value="all">Mọi mức độ rủi ro</option>
                                <option value="critical">
                                    Cực kỳ nguy hiểm
                                </option>
                                <option value="high">Rủi ro cao</option>
                            </select>
                            <Funnel
                                size={15}
                                weight="bold"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                            <CaretDown
                                size={13}
                                weight="bold"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex flex-wrap items-center gap-1.5 text-gray-600">
                                <span className="font-medium text-gray-400">
                                    Đang lọc theo:
                                </span>
                                {searchTerm && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                                        Từ khóa: &ldquo;{searchTerm}&rdquo;
                                        <button
                                            type="button"
                                            onClick={() => setSearchTerm("")}
                                            className="hover:text-emerald-950 cursor-pointer ml-0.5"
                                            aria-label="Xóa từ khóa"
                                        >
                                            <X size={12} weight="bold" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory !== "all" && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                                        {
                                            categories.find(
                                                (c) =>
                                                    c.id === selectedCategory,
                                            )?.label
                                        }
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedCategory("all")
                                            }
                                            className="hover:text-emerald-950 cursor-pointer ml-0.5"
                                            aria-label="Bỏ chọn danh mục"
                                        >
                                            <X size={12} weight="bold" />
                                        </button>
                                    </span>
                                )}
                                {selectedRisk !== "all" && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                                        {
                                            riskFilters.find(
                                                (r) => r.id === selectedRisk,
                                            )?.label
                                        }
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedRisk("all")
                                            }
                                            className="hover:text-amber-950 cursor-pointer ml-0.5"
                                            aria-label="Bỏ chọn mức độ"
                                        >
                                            <X size={12} weight="bold" />
                                        </button>
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
                            >
                                <ArrowCounterClockwise
                                    size={13}
                                    weight="bold"
                                />
                                <span>Xóa tất cả bộ lọc</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4 mb-6">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        Hiển thị{" "}
                        <strong className="text-gray-950 font-bold">
                            {filteredScams.length}
                        </strong>{" "}
                        thủ đoạn nhận diện
                    </p>
                    <Link
                        to="/case-studies"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                        <span>Thực hành phòng điều tra</span>
                        <ArrowRight size={14} weight="bold" />
                    </Link>
                </div>

                {filteredScams.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                        <Warning
                            size={36}
                            className="text-amber-500 mx-auto mb-3"
                        />
                        <h2 className="text-lg font-bold text-gray-900">
                            Không tìm thấy thủ đoạn phù hợp
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                            Hãy thử đổi từ khóa tìm kiếm hoặc bấm chọn "Tất cả
                            thủ đoạn" để xem đầy đủ danh bạ.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                                setSelectedRisk("all");
                            }}
                            className="mt-4 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Đặt lại bộ lọc
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredScams.map((scam, idx) => (
                            <motion.div
                                key={scam.id}
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{
                                    duration: 0.35,
                                    delay: shouldReduceMotion
                                        ? 0
                                        : (idx % 3) * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                            >
                                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span
                                                className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                                    scam.riskLevel ===
                                                    "critical"
                                                        ? "bg-red-50 text-red-700 border border-red-200"
                                                        : "bg-amber-50 text-amber-800 border border-amber-200"
                                                }`}
                                            >
                                                {scam.riskLabel}
                                            </span>
                                            <span className="text-xs font-medium text-gray-400">
                                                {scam.categoryName}
                                            </span>
                                        </div>

                                        <h2 className="text-base sm:text-lg font-bold text-gray-950 leading-snug mb-2">
                                            {scam.title}
                                        </h2>

                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                            {scam.summary}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 pt-3 border-t border-gray-100 mb-4">
                                            <span className="font-semibold text-gray-700">
                                                Mục tiêu:
                                            </span>{" "}
                                            {scam.targetAudience}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveModalScam(scam)
                                            }
                                            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                                        >
                                            <span>Xem phân tích chi tiết</span>
                                            <ArrowRight
                                                size={14}
                                                weight="bold"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-12 rounded-3xl bg-gray-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                            <ShieldCheck size={16} weight="fill" />
                            <span>Hành động tức thì</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                            Bạn vừa nghi ngờ chuyển tiền cho kẻ gian?
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                            Xem ngay cẩm nang 5 bước khẩn cấp trong 15 phút đầu
                            và danh bạ hotline khóa thẻ các ngân hàng Việt Nam.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                        <Link
                            to="/emergency"
                            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20"
                        >
                            Quy trình xử lý khẩn cấp
                        </Link>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activeModalScam && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-scam-title"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setActiveModalScam(null)}
                            className="fixed inset-0 bg-black/50 transform-gpu"
                        />

                        <motion.div
                            initial={
                                shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.96, y: 8 }
                            }
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={
                                shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.96, y: 8 }
                            }
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="relative w-full max-w-2xl max-h-[85dvh] sm:max-h-[88dvh] bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl z-10 flex flex-col overflow-hidden transform-gpu"
                        >
                            <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 bg-white shrink-0">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span
                                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                                activeModalScam.riskLevel ===
                                                "critical"
                                                    ? "bg-red-50 text-red-700 border border-red-200"
                                                    : "bg-amber-50 text-amber-800 border border-amber-200"
                                            }`}
                                        >
                                            {activeModalScam.riskLabel}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {activeModalScam.categoryName}
                                        </span>
                                    </div>
                                    <h2
                                        id="modal-scam-title"
                                        className="text-lg sm:text-xl md:text-2xl font-black text-gray-950 leading-tight"
                                    >
                                        {activeModalScam.title}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setActiveModalScam(null)}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1 -mt-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                                    aria-label="Đóng bảng chi tiết"
                                >
                                    <X size={20} weight="bold" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6 space-y-6 text-sm text-gray-700 modal-scrollbar">
                                <div>
                                    <h3 className="font-bold text-gray-950 flex items-center gap-2 mb-2 text-sm sm:text-base">
                                        <Lightbulb
                                            size={18}
                                            weight="fill"
                                            className="text-amber-500"
                                        />
                                        Kịch bản lừa đảo thực tế
                                    </h3>
                                    <p className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed border border-gray-200/80">
                                        {activeModalScam.trapStory}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-950 flex items-center gap-2 mb-2 text-sm sm:text-base">
                                        <Warning
                                            size={18}
                                            weight="fill"
                                            className="text-red-500"
                                        />
                                        Bẫy tâm lý kẻ gian giăng ra
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {activeModalScam.psychology}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-950 flex items-center gap-2 mb-2 text-sm sm:text-base">
                                        <ShieldCheck
                                            size={18}
                                            weight="fill"
                                            className="text-red-600"
                                        />
                                        Dấu hiệu nhận biết bất thường (Red
                                        Flags)
                                    </h3>
                                    <ul className="space-y-2">
                                        {activeModalScam.redFlags.map(
                                            (rf, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2.5 bg-red-50/60 p-3 rounded-xl border border-red-100 text-red-900 text-xs sm:text-sm"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                                                    <span>{rf}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-950 flex items-center gap-2 mb-2 text-sm sm:text-base">
                                        <CheckCircle
                                            size={18}
                                            weight="fill"
                                            className="text-emerald-600"
                                        />
                                        Quy tắc phòng thủ kiên quyết
                                    </h3>
                                    <ul className="space-y-2">
                                        {activeModalScam.preventionSteps.map(
                                            (step, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2.5 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-emerald-950 text-xs sm:text-sm"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                                                    <span>{step}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                                    <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                                        <PhoneCall size={18} weight="bold" />
                                        <span>
                                            Phản xạ xử lý nếu nghi ngờ bị lừa
                                        </span>
                                    </div>
                                    <p className="text-amber-950 text-xs sm:text-sm leading-relaxed">
                                        {activeModalScam.emergencyAction}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 py-3.5 sm:px-7 sm:py-4 border-t border-gray-100 bg-gray-50/90 shrink-0 flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-500 hidden sm:inline">
                                    Nhấn phím{" "}
                                    <kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 font-mono text-[11px]">
                                        Esc
                                    </kbd>{" "}
                                    để đóng
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setActiveModalScam(null)}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                                >
                                    Đã hiểu, đóng lại
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
