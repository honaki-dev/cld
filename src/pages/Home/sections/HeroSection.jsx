import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, MagnifyingGlass, Brain, ArrowRight } from "@phosphor-icons/react";

export default function HeroSection() {
    const shouldReduceMotion = useReducedMotion();

    const animProps = (delay = 0) =>
        shouldReduceMotion
            ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
            : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
              };

    return (
        <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24">
            {/* Subtle lightweight background gradient for weak devices */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-orange-50/40 via-white to-white"
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    {/* Headline */}
                    <motion.h1
                        {...animProps(0)}
                        className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-gray-950"
                    >
                        Nhận biết lừa đảo{" "}
                        <span className="relative inline-block text-orange-500">
                            trước khi
                            <svg
                                aria-hidden
                                className="absolute -bottom-1 left-0 w-full"
                                viewBox="0 0 200 8"
                                fill="none"
                            >
                                <path
                                    d="M2 6 C50 2, 150 2, 198 6"
                                    stroke="#FF6B35"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    fill="none"
                                    strokeOpacity="0.6"
                                />
                            </svg>
                        </span>{" "}
                        quá muộn
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        {...animProps(0.08)}
                        className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600 max-w-xl"
                    >
                        Cẩm nang thực chiến giúp bạn hiểu rõ thủ đoạn, nâng cao phản xạ và tự bảo vệ
                        trước 24+ hình thức lừa đảo trực tuyến phổ biến nhất.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...animProps(0.14)}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
                    >
                        <Link
                            to="/#scam-types"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm sm:text-base font-bold shadow-md shadow-orange-500/20 transition-all duration-200"
                        >
                            <ShieldCheck size={18} weight="fill" />
                            Bắt đầu học
                        </Link>
                        <Link
                            to="/checker"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white text-sm sm:text-base font-bold transition-all duration-200"
                        >
                            <MagnifyingGlass size={18} weight="bold" />
                            Kiểm tra ngay
                        </Link>
                    </motion.div>

                    {/* Quick navigation links */}
                    <motion.div
                        {...animProps(0.2)}
                        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                    >
                        {[
                            { to: "/quiz", icon: Brain, label: "Làm quiz thử thách" },
                            { to: "/#case-study", icon: ArrowRight, label: "Xem tình huống thực tế" },
                        ].map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors group"
                            >
                                <Icon size={15} className="group-hover:translate-x-0.5 transition-transform" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {/* Hero preview card */}
                <motion.div
                    {...animProps(0.25)}
                    className="mt-12 md:mt-16 mx-auto max-w-4xl"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/50 bg-gray-900">
                        <img
                            src="https://picsum.photos/seed/cybersecurity-vietnam-student/1200/500"
                            alt="Minh họa phòng chống lừa đảo mạng"
                            className="w-full h-52 sm:h-64 md:h-80 object-cover"
                            loading="eager"
                        />
                        {/* Overlay with key statistics */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent flex items-end">
                            <div className="p-3.5 sm:p-5 md:p-8 grid grid-cols-3 gap-2 sm:gap-4 w-full">
                                {[
                                    { num: "24+", label: "Loại lừa đảo phổ biến" },
                                    { num: "10+", label: "Câu quiz thử thách" },
                                    { num: "3", label: "Công cụ kiểm tra nhanh" },
                                ].map(({ num, label }) => (
                                    <div key={label} className="text-center">
                                        <div className="text-xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight">
                                            {num}
                                        </div>
                                        <div className="text-[11px] sm:text-xs md:text-sm text-gray-200 mt-1 font-medium leading-tight">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
