import { Link, useLocation } from "react-router-dom";
import {
    HouseLine,
    BookOpen,
    ShieldCheck,
    MagnifyingGlass,
    Warning,
} from "@phosphor-icons/react";

export default function MobileBottomNav() {
    const { pathname } = useLocation();

    const items = [
        {
            to: "/",
            label: "Trang chủ",
            icon: HouseLine,
            isActive: pathname === "/",
        },
        {
            to: "/scams",
            label: "Cẩm nang",
            icon: BookOpen,
            isActive: pathname.startsWith("/scams"),
        },
        {
            to: "/case-studies",
            label: "Điều tra",
            icon: ShieldCheck,
            isActive: pathname.startsWith("/case-studies"),
        },
        {
            to: "/checker",
            label: "Kiểm tra",
            icon: MagnifyingGlass,
            isActive: pathname.startsWith("/checker"),
        },
        {
            to: "/emergency",
            label: "Khẩn cấp",
            icon: Warning,
            isActive: pathname.startsWith("/emergency"),
            isAlert: true,
        },
    ];

    return (
        <nav
            aria-label="Thanh điều hướng dưới cho điện thoại"
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/98 supports-[backdrop-filter]:backdrop-blur-xs border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] transform-gpu will-change-transform"
            style={{
                paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
            }}
        >
            <div className="grid grid-cols-5 items-center px-1 pt-1.5">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = item.isActive;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl transition-transform duration-100 active:scale-[0.94] ${
                                active
                                    ? item.isAlert
                                        ? "text-red-600 font-bold"
                                        : "text-emerald-700 font-bold"
                                    : item.isAlert
                                      ? "text-red-500 font-medium"
                                      : "text-gray-500 hover:text-gray-900 font-medium"
                            }`}
                        >
                            <div className="relative">
                                <Icon
                                    size={21}
                                    weight={active ? "fill" : "regular"}
                                    className="transition-transform"
                                />
                            </div>
                            <span className="text-[10px] mt-0.5 tracking-tight leading-none text-center">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
