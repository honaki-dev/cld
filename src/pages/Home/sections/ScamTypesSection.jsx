import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
    FishSimple,
    Phone,
    Briefcase,
    ChartLine,
    Heart,
    UserSwitch,
    ArrowRight,
    ShieldWarning,
} from "@phosphor-icons/react";
import { scamTypes } from "../../../data/content";

const iconMap = {
    FishSimple,
    Phone,
    Briefcase,
    ChartLine,
    Heart,
    UserSwitch,
};

const colorMap = {
    danger: {
        badge: "bg-red-50 text-red-700 border border-red-200",
        icon: "bg-red-50 text-red-500",
        border: "border-gray-200 hover:border-red-300",
        tag: "bg-red-50/80 text-red-700",
        dot: "bg-red-500",
    },
    primary: {
        badge: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        icon: "bg-emerald-50 text-emerald-600",
        border: "border-gray-200 hover:border-emerald-300",
        tag: "bg-emerald-50/80 text-emerald-800",
        dot: "bg-emerald-500",
    },
};

const severityLabel = { high: "Nguy hiểm cao", medium: "Nguy hiểm vừa" };

export default function ScamTypesSection() {
    const [expanded, setExpanded] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="scam-types" className="py-16 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 md:mb-12">
                    <motion.h2
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 12 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight"
                    >
                        6 thủ đoạn lừa đảo{" "}
                        <span className="text-emerald-600">phổ biến nhất</span>
                    </motion.h2>
                    <motion.p
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 12 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                        className="mt-3 text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed"
                    >
                        Nhận diện chính xác dấu hiệu nhận biết và cách ứng phó
                        tức thì. Bấm vào từng thẻ để xem hướng dẫn phòng vệ chi
                        tiết.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
                    {scamTypes.map((scam, i) => {
                        const Icon = iconMap[scam.icon] || ShieldWarning;
                        const c = colorMap[scam.color] || colorMap.danger;
                        const isOpen = expanded === scam.id;

                        return (
                            <motion.div
                                key={scam.id}
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.35,
                                    delay: shouldReduceMotion ? 0 : i * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`rounded-2xl bg-white border p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md ${c.border} ${isOpen ? "ring-2 ring-emerald-500/20 border-emerald-500" : ""}`}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpanded(isOpen ? null : scam.id)
                                    }
                                    className="w-full text-left cursor-pointer group"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-start gap-3.5 mb-3">
                                        <div
                                            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${c.icon}`}
                                        >
                                            <Icon size={22} weight="fill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition-colors mb-1">
                                                {scam.title}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.badge}`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${c.dot}`}
                                                />
                                                {severityLabel[scam.severity]}
                                            </span>
                                        </div>
                                        <div
                                            className={`text-gray-400 group-hover:text-gray-600 p-1 transition-transform duration-200 ${isOpen ? "rotate-90 text-emerald-600" : ""}`}
                                        >
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {scam.shortDesc}
                                    </p>

                                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                                        {scam.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`text-xs font-medium px-2 py-0.5 rounded-md ${c.tag}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="accordion-content"
                                            initial={
                                                shouldReduceMotion
                                                    ? { opacity: 0 }
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={
                                                shouldReduceMotion
                                                    ? { opacity: 1 }
                                                    : {
                                                          height: "auto",
                                                          opacity: 1,
                                                          transition: {
                                                              height: {
                                                                  duration: 0.28,
                                                                  ease: [
                                                                      0.16, 1,
                                                                      0.3, 1,
                                                                  ],
                                                              },
                                                              opacity: {
                                                                  duration: 0.2,
                                                                  delay: 0.05,
                                                              },
                                                          },
                                                      }
                                            }
                                            exit={
                                                shouldReduceMotion
                                                    ? { opacity: 0 }
                                                    : {
                                                          height: 0,
                                                          opacity: 0,
                                                          transition: {
                                                              height: {
                                                                  duration: 0.2,
                                                                  ease: [
                                                                      0.16, 1,
                                                                      0.3, 1,
                                                                  ],
                                                              },
                                                              opacity: {
                                                                  duration: 0.12,
                                                              },
                                                          },
                                                      }
                                            }
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3.5">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
                                                        Dấu hiệu nhận biết:
                                                    </p>
                                                    <ul className="space-y-1.5">
                                                        {scam.signs.map(
                                                            (sign) => (
                                                                <li
                                                                    key={sign}
                                                                    className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed"
                                                                >
                                                                    <span
                                                                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`}
                                                                    />
                                                                    <span>
                                                                        {sign}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
                                                        Cách phòng tránh:
                                                    </p>
                                                    <ul className="space-y-1.5">
                                                        {scam.howToAvoid.map(
                                                            (tip) => (
                                                                <li
                                                                    key={tip}
                                                                    className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed"
                                                                >
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                                    <span>
                                                                        {tip}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        to="/scams"
                        className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
                    >
                        <span>
                            Tra cứu toàn bộ 12+ thủ đoạn tại Thư viện Cẩm Nang
                        </span>
                        <ArrowRight size={16} weight="bold" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
