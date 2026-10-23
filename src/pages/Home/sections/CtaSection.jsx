import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Brain, MagnifyingGlass } from "@phosphor-icons/react";

export default function CtaSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-16 md:py-24 bg-emerald-600">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                >
                    Sẵn sàng nâng cao phản xạ an toàn số?
                </motion.h2>
                <motion.p
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="mt-4 text-emerald-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                >
                    Thử sức với các tình huống thực tế hoặc tra cứu ngay liên
                    kết, email và số điện thoại đáng ngờ.
                </motion.p>
                <motion.div
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
                >
                    <Link
                        to="/quiz"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-xl bg-white text-emerald-700 text-sm sm:text-base font-bold hover:bg-emerald-50 active:scale-[0.98] transition-all shadow-md shadow-emerald-950/20"
                    >
                        <Brain size={18} weight="fill" />
                        <span>Làm bài trắc nghiệm</span>
                    </Link>
                    <Link
                        to="/checker"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-xl bg-gray-950 text-white text-sm sm:text-base font-bold hover:bg-gray-900 active:scale-[0.98] transition-all"
                    >
                        <MagnifyingGlass size={18} weight="bold" />
                        <span>Tra cứu thông tin nghi vấn</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
