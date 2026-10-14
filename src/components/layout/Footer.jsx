import { Link } from "react-router-dom";
import { ShieldCheck, Warning, Phone } from "@phosphor-icons/react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 text-gray-400 border-t border-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-xs">
                                <ShieldCheck size={22} weight="fill" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-sans text-base sm:text-lg font-extrabold text-white tracking-tight">
                                    Cẩm Nang Số
                                </span>
                                <span className="text-xs font-semibold text-orange-400">
                                    Phòng chống lừa đảo
                                </span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-[300px]">
                            Dự án STEM giáo dục cộng đồng về nhận biết, phòng chống và hóa giải các thủ đoạn lừa đảo trực tuyến.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white text-sm sm:text-base font-bold mb-4">Khám phá nội dung</h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: "/#scam-types", label: "Các loại lừa đảo phổ biến" },
                                { to: "/#guide", label: "Quy trình phản xạ 4 bước" },
                                { to: "/#case-study", label: "Tình huống điều tra thực tế" },
                                { to: "/quiz", label: "Thử thách trắc nghiệm phản xạ" },
                                { to: "/checker", label: "Công cụ kiểm tra nhanh" },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Emergency Contacts */}
                    <div>
                        <h3 className="text-white text-sm sm:text-base font-bold mb-4 flex items-center gap-2">
                            <Warning size={18} weight="fill" className="text-orange-400" />
                            Đường dây nóng hỗ trợ khẩn cấp
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:113"
                                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    <Phone size={15} weight="fill" />
                                    <span>Tội phạm công nghệ cao: <strong className="text-white font-bold">113</strong></span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://canhbao.ncsc.gov.vn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    Cổng giám sát an toàn không gian mạng: <span className="text-white underline">canhbao.ncsc.gov.vn</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://chongluadao.vn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    Cơ sở dữ liệu cộng đồng: <span className="text-white underline">chongluadao.vn</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        &copy; {year} Cẩm Nang Số - Dự án STEM giáo dục phi lợi nhuận
                    </p>
                    <p className="text-xs text-gray-500">
                        Thông tin mang tính tham khảo - Luôn chủ động xác minh từ nguồn chính thức
                    </p>
                </div>
            </div>
        </footer>
    );
}
