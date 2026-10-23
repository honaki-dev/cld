import { Link } from "react-router-dom";
import CaseStudySection from "../Home/sections/CaseStudySection";
import {
    ShieldCheck,
    ArrowRight,
    Brain,
    Info,
    Warning,
} from "@phosphor-icons/react";

export default function CaseStudiesPage() {
    return (
        <div className="min-h-[100dvh] bg-white text-gray-950 py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
                        <ShieldCheck size={14} weight="fill" />
                        <span>Môi trường mô phỏng thực chiến</span>
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
                        Phòng Điều Tra:{" "}
                        <span className="text-emerald-600">
                            Tình Huống Thực Tế
                        </span>
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                        Đặt bạn vào vai người trong cuộc đối diện trực tiếp với
                        tin nhắn, cuộc gọi và email giả mạo tinh vi. Lựa chọn
                        cách xử lý để bóc trần cạm bẫy và đo lường phản xạ an
                        toàn số của chính mình.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white border border-gray-200 shadow-xs rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Info size={18} weight="bold" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-950 mb-0.5">
                                Soi kỹ chi tiết bằng chứng
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Kiểm tra địa chỉ email gửi, đuôi tên miền, số
                                tài khoản nhận tiền và văn phong hối thúc.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-xs rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                            <Warning size={18} weight="bold" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-950 mb-0.5">
                                Một quyết định: Hai ngã rẽ
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Mỗi lựa chọn phản ánh đúng hậu quả tài chính
                                thực tế: Mất trắng tài sản hoặc an toàn 100%.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-xs rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Brain size={18} weight="bold" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-950 mb-0.5">
                                Đúc kết quy tắc vàng
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Sau mỗi tình huống, hệ thống phân tích chi tiết
                                bẫy tâm lý và cách phòng thủ vững chắc.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gray-50/60 p-2 sm:p-6 shadow-sm">
                    <CaseStudySection isStandalone={true} />
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
                    <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                        Muốn kiểm tra lại kiến thức tổng quát? Hãy thử sức với
                        bài trắc nghiệm 10 câu hỏi.
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                            to="/quiz"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                        >
                            <span>Làm bài trắc nghiệm</span>
                            <ArrowRight size={14} weight="bold" />
                        </Link>
                        <Link
                            to="/scams"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold transition-all border border-gray-200 shadow-xs active:scale-[0.98]"
                        >
                            <span>Xem cẩm nang thủ đoạn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
