import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
    FishSimple, Phone, Briefcase, ChartLine,
    Heart, UserSwitch, ArrowRight, ShieldWarning,
} from "@phosphor-icons/react";
import { scamTypes } from "../../../data/content";

const iconMap = {
    FishSimple, Phone, Briefcase, ChartLine, Heart, UserSwitch,
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
        badge: "bg-orange-50 text-orange-700 border border-orange-200",
        icon: "bg-orange-50 text-orange-500",
        border: "border-gray-200 hover:border-orange-300",
        tag: "bg-orange-50/80 text-orange-700",
        dot: "bg-orange-500",
    },
};

const severityLabel = { high: "Nguy hiểm cao", medium: "Nguy hiểm vừa" };

export default function ScamTypesSection() {
    const [expanded, setExpanded] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="scam-types" className="py-16 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header without unnecessary tags */}
                <div className="mb-10 md:mb-12">
                    <motion.h2
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight"
                    >
                        6 hình thức lừa đảo{" "}
                        <span className="text-orange-500">phổ biến nhất</span>
                    </motion.h2>
                    <motion.p
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                        className="mt-3 text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed"
                    >
                        Nhận biết các dấu hiệu đặc trưng để không bao giờ trở thành nạn nhân. Bấm vào mỗi thẻ để xem chi tiết.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
                    {scamTypes.map((scam, i) => {
                        const Icon = iconMap[scam.icon] || ShieldWarning;
                        const c = colorMap[scam.color] || colorMap.danger;
                        const isOpen = expanded === scam.id;

                        return (
                            <motion.div
                                key={scam.id}
                                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.35,
                                    delay: shouldReduceMotion ? 0 : i * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`rounded-2xl bg-white border p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md ${c.border} ${isOpen ? "ring-2 ring-orange-500/20 border-orange-400" : ""}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setExpanded(isOpen ? null : scam.id)}
                                    className="w-full text-left cursor-pointer group"
                                    aria-expanded={isOpen}
                                >
                                    {/* Card header */}
                                    <div className="flex items-start gap-3.5 mb-3">
                                        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${c.icon}`}>
                                            <Icon size={22} weight="fill" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors mb-1">
                                                {scam.title}
                                            </h3>
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.badge}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                                {severityLabel[scam.severity]}
                                            </span>
                                        </div>
                                        <div
                                            className={`text-gray-400 group-hover:text-gray-600 p-1 transition-transform duration-200 ${isOpen ? "rotate-90 text-orange-500" : ""}`}
                                        >
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed">{scam.shortDesc}</p>

                                    {/* Tags */}
                                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                                        {scam.tags.map((tag) => (
                                            <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-md ${c.tag}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </button>

                                {/* Expandable accordion */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="accordion-content"
                                            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                            animate={
                                                shouldReduceMotion
                                                    ? { opacity: 1 }
                                                    : {
                                                          height: "auto",
                                                          opacity: 1,
                                                          transition: {
                                                              height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                                                              opacity: { duration: 0.2, delay: 0.05 },
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
                                                              height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                                              opacity: { duration: 0.12 },
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
                                                        {scam.signs.map((sign) => (
                                                            <li key={sign} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                                                                <span>{sign}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
                                                        Cách phòng tránh:
                                                    </p>
                                                    <ul className="space-y-1.5">
                                                        {scam.howToAvoid.map((tip) => (
                                                            <li key={tip} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                                <span>{tip}</span>
                                                            </li>
                                                        ))}
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
            </div>
        </section>
    );
}
