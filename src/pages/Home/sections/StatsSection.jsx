import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "motion/react";
import { stats } from "../../../data/content";

const colorMap = {
    danger: { text: "text-red-600", glow: "hover:border-red-300" },
    primary: { text: "text-orange-600", glow: "hover:border-orange-300" },
    safe: { text: "text-emerald-600", glow: "hover:border-emerald-300" },
    info: { text: "text-blue-600", glow: "hover:border-blue-300" },
};

function CountingNumber({ target, suffix = "", value }) {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, amount: 0.3 });
    const shouldReduceMotion = useReducedMotion();

    const numericTarget = target !== undefined ? target : parseInt(value.replace(/\D/g, ""), 10) || 0;
    const finalSuffix = suffix || (value.includes("+") ? "+" : value.includes("%") ? "%" : "");

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (shouldReduceMotion) {
            node.textContent = value;
            return;
        }

        if (!isInView) return;

        const controls = animate(0, numericTarget, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(latest) {
                const rounded = Math.round(latest);
                const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                node.textContent = `${formatted}${finalSuffix}`;
            },
        });

        return () => controls.stop();
    }, [isInView, numericTarget, finalSuffix, value, shouldReduceMotion]);

    const initialFormatted = shouldReduceMotion ? value : `0${finalSuffix}`;

    return <span ref={nodeRef}>{initialFormatted}</span>;
}

export default function StatsSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="bg-gray-50/70 py-14 md:py-20 border-y border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section title without eyebrow tag */}
                <motion.h2
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="text-center font-sans text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-8"
                >
                    Thực trạng lừa đảo trực tuyến tại Việt Nam
                </motion.h2>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-6">
                    {stats.map((stat, i) => {
                        const c = colorMap[stat.color] || colorMap.info;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.4,
                                    delay: shouldReduceMotion ? 0 : i * 0.06,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${c.glow}`}
                            >
                                <span className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-black font-sans tracking-tight mb-1.5 ${c.text}`}>
                                    <CountingNumber
                                        target={stat.target}
                                        suffix={stat.suffix}
                                        value={stat.value}
                                    />
                                </span>
                                <span className="text-xs sm:text-sm font-semibold leading-normal text-gray-700 max-w-[200px]">
                                    {stat.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="text-center text-xs text-gray-600 mt-8">
                    Nguồn dữ liệu: Cục An toàn thông tin, Bộ Công An Việt Nam, VNCERT
                </p>
            </div>
        </section>
    );
}
