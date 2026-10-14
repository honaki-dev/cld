import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ShieldCheck, List, X, MagnifyingGlass, Brain, HouseLine } from "@phosphor-icons/react";

const navLinks = [
    { to: "/", label: "Trang chủ", icon: HouseLine, exact: true },
    { to: "/quiz", label: "Kiểm tra kiến thức", icon: Brain },
    { to: "/checker", label: "Công cụ kiểm tra", icon: MagnifyingGlass },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 16);
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
                className={`sticky top-0 z-50 transition-all duration-200 ${
                    scrolled
                        ? "bg-white/95 shadow-xs backdrop-blur-sm border-b border-gray-200"
                        : "bg-white border-b border-gray-100"
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group"
                            aria-label="Cẩm Nang Số - Trang chủ"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-xs">
                                <ShieldCheck size={22} weight="fill" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-sans text-base sm:text-lg font-extrabold text-gray-950 tracking-tight">
                                    Cẩm Nang Số
                                </span>
                                <span className="text-xs font-semibold text-orange-600">
                                    Phòng chống lừa đảo
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1.5" aria-label="Menu chính">
                            {navLinks.map(({ to, label, icon: Icon, exact }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={exact}
                                    className={({ isActive }) =>
                                        `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                                            isActive
                                                ? "bg-orange-50 text-orange-600 font-bold"
                                                : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                size={17}
                                                weight={isActive ? "fill" : "regular"}
                                            />
                                            <span>{label}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/checker"
                                className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-bold shadow-xs transition-all duration-150"
                            >
                                <MagnifyingGlass size={16} weight="bold" />
                                <span>Kiểm tra ngay</span>
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            type="button"
                            className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                            onClick={() => setIsOpen((v) => !v)}
                            aria-expanded={isOpen}
                            aria-label="Mở menu di động"
                        >
                            {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer & Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={closeMenu}
                            className="fixed inset-0 top-16 bg-black/40 z-30 md:hidden backdrop-blur-xs"
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 px-4 py-6 shadow-xl md:hidden overflow-hidden"
                        >
                            <nav className="flex flex-col gap-2">
                                {navLinks.map(({ to, label, icon: Icon, exact }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        end={exact}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                                                isActive
                                                    ? "bg-orange-50 text-orange-600 font-bold"
                                                    : "text-gray-700 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        <Icon size={20} weight="fill" />
                                        <span>{label}</span>
                                    </NavLink>
                                ))}
                                <div className="pt-3 border-t border-gray-100 mt-2">
                                    <Link
                                        to="/checker"
                                        onClick={closeMenu}
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-base shadow-sm"
                                    >
                                        <MagnifyingGlass size={18} weight="bold" />
                                        <span>Kiểm tra lừa đảo ngay</span>
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
