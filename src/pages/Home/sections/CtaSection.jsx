import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Brain, MagnifyingGlass } from "@phosphor-icons/react";

export default function CtaSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-16 md:py-24 bg-orange-500">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                >
                    Bạn đã sẵn sàng tự bảo vệ chưa?
                </motion.h2>
                <motion.p
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="mt-4 text-orange-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                >
                    Thử sức với 10 câu hỏi thực tế hoặc kiểm tra ngay một số điện thoại, email, website đáng ngờ.
                </motion.p>
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
                >
                    <Link
                        to="/quiz"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-orange-600 text-sm sm:text-base font-bold hover:bg-orange-50 active:scale-[0.98] transition-all shadow-md shadow-orange-600/30"
                    >
                        <Brain size={18} weight="fill" />
                        <span>Làm quiz ngay</span>
                    </Link>
                    <Link
                        to="/checker"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-950 text-white text-sm sm:text-base font-bold hover:bg-gray-900 active:scale-[0.98] transition-all"
                    >
                        <MagnifyingGlass size={18} weight="bold" />
                        <span>Kiểm tra lừa đảo</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
