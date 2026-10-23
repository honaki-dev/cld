import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import {
    ShieldCheck,
    List,
    X,
    MagnifyingGlass,
    Brain,
    HouseLine,
    BookOpen,
    Warning,
    Info,
} from "@phosphor-icons/react";

const navLinks = [
    { to: "/", label: "Trang chủ", icon: HouseLine, exact: true },
    { to: "/scams", label: "Cẩm nang", icon: BookOpen },
    { to: "/case-studies", label: "Phòng điều tra", icon: ShieldCheck },
    { to: "/checker", label: "Kiểm tra", icon: MagnifyingGlass },
    { to: "/quiz", label: "Trắc nghiệm", icon: Brain },
    { to: "/emergency", label: "Khẩn cấp", icon: Warning, isAlert: true },
    { to: "/about", label: "Về dự án", icon: Info },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const isPast = latest > 16;
        setScrolled((prev) => (prev !== isPast ? isPast : prev));
    });

    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeMenu();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-colors duration-150 transform-gpu ${
                    scrolled
                        ? "bg-white/98 shadow-xs border-b border-gray-200 supports-[backdrop-filter]:backdrop-blur-xs"
                        : "bg-white border-b border-gray-100"
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group shrink-0"
                            aria-label="Cẩm Nang Số: Trang chủ"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                                <ShieldCheck size={22} weight="fill" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-sans text-base sm:text-lg font-extrabold text-gray-950 tracking-tight">
                                    Cẩm Nang Số
                                </span>
                                <span className="text-xs font-semibold text-emerald-700">
                                    Phòng chống lừa đảo
                                </span>
                            </div>
                        </Link>

                        <nav
                            className="hidden lg:flex items-center gap-1"
                            aria-label="Menu chính"
                        >
                            {navLinks.map(
                                ({ to, label, icon: Icon, exact, isAlert }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        end={exact}
                                        className={({ isActive }) =>
                                            `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 ${
                                                isActive
                                                    ? isAlert
                                                        ? "bg-red-50 text-red-700 font-bold"
                                                        : "bg-emerald-50 text-emerald-700 font-bold"
                                                    : isAlert
                                                      ? "text-red-600 hover:text-red-700 hover:bg-red-50/50"
                                                      : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon
                                                    size={16}
                                                    weight={
                                                        isActive
                                                            ? "fill"
                                                            : "regular"
                                                    }
                                                />
                                                <span>{label}</span>
                                            </>
                                        )}
                                    </NavLink>
                                ),
                            )}
                        </nav>

                        <div className="hidden lg:flex items-center gap-2 shrink-0">
                            <Link
                                to="/checker"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs xl:text-sm font-bold shadow-xs transition-all duration-150"
                            >
                                <MagnifyingGlass size={15} weight="bold" />
                                <span>Kiểm tra ngay</span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            className="flex lg:hidden items-center justify-center w-11 h-11 rounded-xl hover:bg-gray-100 active:scale-[0.95] text-gray-700 transition-all cursor-pointer"
                            onClick={() => setIsOpen((v) => !v)}
                            aria-expanded={isOpen}
                            aria-label="Mở menu di động"
                        >
                            {isOpen ? (
                                <X size={24} weight="bold" />
                            ) : (
                                <List size={24} weight="bold" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={closeMenu}
                            className="fixed inset-0 top-16 bg-black/50 z-30 lg:hidden"
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 px-4 py-5 shadow-xl lg:hidden overflow-hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
                        >
                            <nav className="flex flex-col gap-1.5">
                                {navLinks.map(
                                    ({
                                        to,
                                        label,
                                        icon: Icon,
                                        exact,
                                        isAlert,
                                    }) => (
                                        <NavLink
                                            key={to}
                                            to={to}
                                            end={exact}
                                            onClick={closeMenu}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                                                    isActive
                                                        ? isAlert
                                                            ? "bg-red-50 text-red-700 font-bold"
                                                            : "bg-emerald-50 text-emerald-700 font-bold"
                                                        : isAlert
                                                          ? "text-red-600 hover:bg-red-50"
                                                          : "text-gray-700 hover:bg-gray-50"
                                                }`
                                            }
                                        >
                                            <Icon size={18} weight="fill" />
                                            <span>{label}</span>
                                        </NavLink>
                                    ),
                                )}
                                <div className="pt-3 border-t border-gray-100 mt-2">
                                    <Link
                                        to="/checker"
                                        onClick={closeMenu}
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm"
                                    >
                                        <MagnifyingGlass
                                            size={16}
                                            weight="bold"
                                        />
                                        <span>Kiểm tra liên kết & số ĐT</span>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
