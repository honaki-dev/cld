import { Link } from "react-router-dom";
import { ShieldCheck, Warning, Phone } from "@phosphor-icons/react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 text-gray-600 border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 mb-4 group inline-flex"
                            aria-label="Cẩm Nang Số: Về trang chủ"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
                                <ShieldCheck size={22} weight="fill" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-sans text-base sm:text-lg font-extrabold text-gray-950 tracking-tight group-hover:text-emerald-700 transition-colors">
                                    Cẩm Nang Số
                                </span>
                                <span className="text-xs font-semibold text-emerald-700">
                                    Phòng chống lừa đảo
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 max-w-[300px]">
                            Dự án STEM giáo dục cộng đồng về nhận biết, phòng
                            chống và hóa giải các thủ đoạn lừa đảo trực tuyến.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gray-950 text-sm sm:text-base font-bold mb-4">
                            Khám phá nội dung
                        </h3>
                        <ul className="space-y-2">
                            {[
                                {
                                    to: "/scams",
                                    label: "Thư viện thủ đoạn lừa đảo",
                                },
                                {
                                    to: "/case-studies",
                                    label: "Phòng điều tra tình huống",
                                },
                                {
                                    to: "/checker",
                                    label: "Công cụ kiểm tra nhanh",
                                },
                                {
                                    to: "/quiz",
                                    label: "Trắc nghiệm nhận diện lừa đảo",
                                },
                                {
                                    to: "/emergency",
                                    label: "Cẩm nang xử lý khẩn cấp",
                                },
                                { to: "/about", label: "Về dự án STEM" },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="inline-block py-1 text-xs sm:text-sm text-gray-600 hover:text-emerald-700 font-medium transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-950 text-sm sm:text-base font-bold mb-4 flex items-center gap-2">
                            <Warning
                                size={18}
                                weight="fill"
                                className="text-red-600"
                            />
                            Đường dây nóng hỗ trợ khẩn cấp
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:113"
                                    className="inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-gray-700 hover:text-red-700 transition-colors"
                                >
                                    <Phone
                                        size={15}
                                        weight="fill"
                                        className="text-red-600"
                                    />
                                    <span>
                                        Tội phạm công nghệ cao:{" "}
                                        <strong className="text-red-700 font-bold">
                                            113
                                        </strong>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://canhbao.ncsc.gov.vn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block py-1 text-xs sm:text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                                >
                                    Cổng giám sát an toàn không gian mạng:{" "}
                                    <span className="text-emerald-800 font-semibold underline">
                                        canhbao.ncsc.gov.vn
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://chongluadao.vn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block py-1 text-xs sm:text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                                >
                                    Cơ sở dữ liệu cộng đồng:{" "}
                                    <span className="text-emerald-800 font-semibold underline">
                                        chongluadao.vn
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        &copy; {year} Dự án STEM: Cẩm Nang Số
                    </p>
                    <p className="text-xs text-gray-500">
                        Nội dung mang tính giáo dục phi lợi nhuận
                    </p>
                </div>
            </div>
        </footer>
    );
}
