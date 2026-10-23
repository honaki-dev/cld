import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { safetyChecklist } from "../../../data/content";
import {
    Lock,
    CreditCard,
    Users,
    DeviceMobile,
    Warning,
    CheckSquare,
    Square,
    ArrowCounterClockwise,
} from "@phosphor-icons/react";

const CHECKLIST_STORAGE_KEY = "cld_checklist_state_v1";

function getInitialChecklistState() {
    try {
        const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === "object") {
                return parsed;
            }
        }
    } catch (_err) {
        void _err;
    }
    return {};
}

const iconMap = { Lock, CreditCard, Users, DeviceMobile, Warning };

const colorMap = {
    info: {
        icon: "bg-blue-50 text-blue-600",
        check: "text-blue-500",
        header: "text-blue-900",
    },
    safe: {
        icon: "bg-emerald-50 text-emerald-600",
        check: "text-emerald-500",
        header: "text-emerald-900",
    },
    primary: {
        icon: "bg-emerald-50 text-emerald-700",
        check: "text-emerald-600",
        header: "text-emerald-950",
    },
    danger: {
        icon: "bg-red-50 text-red-600",
        check: "text-red-500",
        header: "text-red-900",
    },
};

export default function ChecklistSection() {
    const [checked, setChecked] = useState(getInitialChecklistState);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        try {
            localStorage.setItem(
                CHECKLIST_STORAGE_KEY,
                JSON.stringify(checked),
            );
        } catch (_err) {
            void _err;
        }
    }, [checked]);

    const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

    const handleReset = () => {
        setChecked({});
        try {
            localStorage.removeItem(CHECKLIST_STORAGE_KEY);
        } catch (_err) {
            void _err;
        }
    };

    const totalItems = safetyChecklist.reduce(
        (sum, g) => sum + g.items.length,
        0,
    );
    const checkedCount = Object.values(checked).filter(Boolean).length;
    const progress = Math.round((checkedCount / totalItems) * 100);

    return (
        <section id="checklist" className="py-16 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
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
                        Danh mục kiểm tra{" "}
                        <span className="text-emerald-600">an toàn số</span>
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
                        className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed"
                    >
                        Đánh dấu các biện pháp bạn đã thực hiện. Đạt 100% để đảm
                        bảo tài khoản và tài sản số luôn được bảo vệ tối đa.
                    </motion.p>

                    <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                        <div
                            className="flex-1 min-w-[200px] h-3 bg-gray-200 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Tiến độ hoàn thành checklist an toàn"
                        >
                            <motion.div
                                className="h-full bg-emerald-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.35,
                                    ease: "easeOut",
                                }}
                            />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-gray-800 whitespace-nowrap font-mono">
                            {checkedCount}/{totalItems} ({progress}%)
                        </span>
                        {checkedCount > 0 && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-all py-1.5 px-3 min-h-[36px] rounded-lg hover:bg-gray-200/60 active:scale-[0.97] cursor-pointer"
                                title="Đặt lại toàn bộ checklist"
                            >
                                <ArrowCounterClockwise
                                    size={13}
                                    weight="bold"
                                />
                                <span>Đặt lại</span>
                            </button>
                        )}
                    </div>

                    {progress === 100 && (
                        <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 text-sm font-bold text-emerald-600 flex items-center gap-1.5"
                        >
                            <span>
                                Xuất sắc! Bạn đã thiết lập trọn vẹn lá chắn an
                                toàn số.
                            </span>
                        </motion.p>
                    )}
                </div>

                <div className="space-y-5">
                    {safetyChecklist.map((group, gi) => {
                        const Icon = iconMap[group.icon] || Lock;
                        const c = colorMap[group.color] || colorMap.info;
                        const groupChecked = group.items.filter(
                            (it) => checked[it.id],
                        ).length;

                        return (
                            <motion.div
                                key={group.category}
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 12 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.35,
                                    delay: shouldReduceMotion ? 0 : gi * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs hover:border-gray-300 transition-all"
                            >
                                <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gray-50/70 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}
                                        >
                                            <Icon size={16} weight="fill" />
                                        </div>
                                        <span
                                            className={`text-sm sm:text-base font-bold ${c.header}`}
                                        >
                                            {group.category}
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-500 font-mono">
                                        {groupChecked}/{group.items.length}
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {group.items.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            role="checkbox"
                                            aria-checked={Boolean(
                                                checked[item.id],
                                            )}
                                            onClick={() => toggle(item.id)}
                                            className="w-full flex items-center gap-3.5 px-4 sm:px-5 py-3.5 text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
                                        >
                                            {checked[item.id] ? (
                                                <CheckSquare
                                                    size={20}
                                                    weight="fill"
                                                    className={c.check}
                                                />
                                            ) : (
                                                <Square
                                                    size={20}
                                                    className="text-gray-300 hover:text-gray-400"
                                                />
                                            )}
                                            <span
                                                className={`text-sm sm:text-base transition-colors leading-relaxed ${
                                                    checked[item.id]
                                                        ? "text-gray-400 line-through"
                                                        : "text-gray-700 font-medium"
                                                }`}
                                            >
                                                {item.text}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
