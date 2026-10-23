import { Link } from "react-router-dom";
import { stemProjectInfo } from "../../data/content";
import {
    ShieldCheck,
    Cpu,
    Student,
    Heart,
    ArrowSquareOut,
    CheckCircle,
    BookOpen,
} from "@phosphor-icons/react";

const faqList = [
    {
        q: "Dự án Cẩm Nang Số có thu phí người dùng không?",
        a: "Không. Cẩm Nang Số là dự án STEM giáo dục vì cộng đồng hoàn toàn phi lợi nhuận. Toàn bộ cẩm nang, công cụ kiểm tra và bài trắc nghiệm đều được mở miễn phí trọn đời cho toàn thể nhân dân.",
    },
    {
        q: "Công cụ kiểm tra liên kết hoạt động dựa trên cơ chế nào?",
        a: "Công cụ ứng dụng giao thức mở RDAP để tra cứu trực tiếp ngày đăng ký tên miền từ cơ quan quản lý tên miền quốc tế ICANN, kết hợp DNS DoH (DNS over HTTPS) của Google và Cloudflare Security 1.1.1.2 để đối soát máy chủ và phát hiện các tên miền vừa lập dưới 30 ngày.",
    },
    {
        q: "Thông tin tôi nhập vào trình tạo đơn tố giác có bị lưu lại trên máy chủ không?",
        a: "Tuyệt đối không. Toàn bộ thông tin bạn điền vào trình tạo đơn tố giác chỉ xử lý tạm thời trên trình duyệt của riêng thiết bị bạn (Client-side) và biến mất khi bạn đóng tab. Chúng tôi không lưu trữ bất kỳ thông tin cá nhân nào.",
    },
    {
        q: "Làm thế nào để nhà trường hoặc doanh nghiệp có thể sử dụng cẩm nang này?",
        a: "Bạn hoàn toàn có thể sử dụng tài liệu, nội dung tình huống và bài trắc nghiệm của Cẩm Nang Số làm tài liệu ngoại khóa, bài giảng an toàn thông tin hoặc tập huấn nội bộ mà không cần xin cấp phép bản quyền thương mại.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-[100dvh] bg-gray-50 py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                        <Student size={14} weight="fill" />
                        <span>Dự án giáo dục STEM cộng đồng</span>
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
                        Về Dự Án{" "}
                        <span className="text-emerald-600">Cẩm Nang Số</span>
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                        Sáng kiến giáo dục khoa học công nghệ nhằm xây dựng lá
                        chắn tri thức số, trang bị kỹ năng nhận diện và phản xạ
                        an toàn thông tin cho mọi công dân Việt Nam.
                    </p>
                </div>

                <div className="mb-16">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-6">
                        3 Trụ cột cốt lõi của dự án
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                                <Cpu size={24} weight="bold" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2">
                                Công nghệ tiên tiến
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Ứng dụng các giao thức đối soát mạng thời gian
                                thực (RDAP, Google DoH, Cloudflare Security) để
                                hỗ trợ người dùng phân tích độ tin cậy của link
                                và liên hệ.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <BookOpen size={24} weight="bold" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2">
                                Thực tiễn & Thực chiến
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Mô phỏng tình huống thực tế và bài kiểm tra phản
                                xạ tâm lý giúp người học thấu suốt bản chất cạm
                                bẫy thay vì chỉ tiếp thu lý thuyết khô khan.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                                <Heart size={24} weight="fill" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-2">
                                Phi lợi nhuận & Mở
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Phục vụ hoàn toàn miễn phí cho học sinh, sinh
                                viên, người cao tuổi và các gia đình Việt Nam
                                nhằm giảm thiểu thiệt hại xã hội từ tội phạm
                                công nghệ cao.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 md:p-10 shadow-xs mb-16">
                    <div className="max-w-2xl mb-8">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2">
                            Nguồn dữ liệu kiểm chứng và đối soát
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Cẩm nang được tổng hợp, đối chiếu và cập nhật liên
                            tục từ các cơ quan quản lý an toàn thông tin quốc
                            gia và các cơ sở dữ liệu phòng chống lừa đảo uy tín
                            tại Việt Nam.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stemProjectInfo.verifiedSources.map((source) => (
                            <a
                                key={source.name}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck
                                        size={18}
                                        weight="fill"
                                        className="text-emerald-600 shrink-0"
                                    />
                                    <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-emerald-900 transition-colors">
                                        {source.name}
                                    </span>
                                </div>
                                <ArrowSquareOut
                                    size={14}
                                    className="text-gray-400 group-hover:text-emerald-600 shrink-0 ml-2"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 text-center mb-8">
                        Câu hỏi thường gặp
                    </h2>
                    <div className="space-y-4">
                        {faqList.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs"
                            >
                                <h3 className="text-sm sm:text-base font-bold text-gray-950 mb-2 flex items-start gap-2">
                                    <CheckCircle
                                        size={18}
                                        weight="fill"
                                        className="text-emerald-600 shrink-0 mt-0.5"
                                    />
                                    <span>{faq.q}</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-6">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl bg-emerald-600 text-white p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                        Cùng chung tay lan tỏa cẩm nang an toàn số
                    </h2>
                    <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
                        Hãy chia sẻ trang web này cho ông bà, cha mẹ và bạn bè
                        để mỗi người đều được trang bị phản xạ tự vệ số vững
                        vàng.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/quiz"
                            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-6 py-3 rounded-xl bg-white text-emerald-800 text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-50 active:scale-[0.98] transition-all"
                        >
                            Thử thách trắc nghiệm phản xạ
                        </Link>
                        <Link
                            to="/scams"
                            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-bold hover:bg-emerald-900 active:scale-[0.98] transition-all"
                        >
                            Khám phá thư viện thủ đoạn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
