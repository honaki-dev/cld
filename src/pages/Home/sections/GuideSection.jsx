import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
    HourglassMedium, CheckCircle, Megaphone,
    Warning, PhoneCall, ChatsTeardrop,
    Prohibit, ArrowRight, Lightbulb,
    FileText,
} from "@phosphor-icons/react";

const stages = [
    {
        id: 1,
        step: "01",
        shortTitle: "Dừng lại 5 phút",
        fullTitle: "Dừng lại và hít thở - Phá vỡ bẫy tâm lý thúc ép",
        tag: "Tâm lý học phòng thủ",
        color: "blue",
        theme: {
            bg: "bg-blue-500",
            text: "text-blue-600",
            border: "border-blue-500",
            lightBg: "bg-blue-50",
            lightBorder: "border-blue-100",
            badge: "bg-blue-100 text-blue-700",
        },
        desc: "Mọi cuộc gọi hay tin nhắn lừa đảo đều cố ý tạo ra cảm giác hoảng loạn, sợ hãi hoặc lòng tham với giới hạn thời gian gấp gáp (15 phút, ngay bây giờ).",
        trapSignal: "Đe dọa khóa tài khoản ngân hàng, khởi tố công an hoặc yêu cầu đóng phạt ngay qua điện thoại.",
        ruleOfThumb: "Quy tắc 5 phút: Ngắt cuộc gọi, đặt điện thoại xuống, uống một ngụm nước để lấy lại bình tĩnh.",
        mockType: "alert",
    },
    {
        id: 2,
        step: "02",
        shortTitle: "Khóa kín OTP & CCCD",
        fullTitle: "Giữ kín tuyệt đối mã OTP, mật khẩu và ảnh CCCD",
        tag: "Bảo vệ danh tính",
        color: "orange",
        theme: {
            bg: "bg-orange-500",
            text: "text-orange-600",
            border: "border-orange-500",
            lightBg: "bg-orange-50",
            lightBorder: "border-orange-100",
            badge: "bg-orange-100 text-orange-700",
        },
        desc: "Mã OTP (One Time Password) là bước bảo vệ cuối cùng của tài khoản ngân hàng. Tiết lộ OTP đồng nghĩa với việc cho phép kẻ xấu rút sạch tiền trong tài khoản.",
        trapSignal: "Kẻ mạo danh tự nhận là cán bộ ngân hàng/công an và yêu cầu 'đọc mã xác nhận để hủy lệnh chuyển tiền'.",
        ruleOfThumb: "Ngân hàng và công an không bao giờ yêu cầu người dân cung cấp OTP qua điện thoại dưới bất kỳ hình thức nào.",
        mockType: "sms",
    },
    {
        id: 3,
        step: "03",
        shortTitle: "Xác minh 2 chiều",
        fullTitle: "Tra cứu độc lập - Xác minh từ nguồn chính thức",
        tag: "Đối soát nguồn tin",
        color: "emerald",
        theme: {
            bg: "bg-emerald-500",
            text: "text-emerald-600",
            border: "border-emerald-500",
            lightBg: "bg-emerald-50",
            lightBorder: "border-emerald-100",
            badge: "bg-emerald-100 text-emerald-700",
        },
        desc: "Tuyệt đối không dùng số điện thoại hoặc đường link được gửi trong tin nhắn nghi vấn. Luôn tự tay mở trình duyệt để tìm số hotline chính thức.",
        trapSignal: "Tin nhắn SMS có tên hiển thị ngân hàng nhưng đính kèm đường link lạ (vietcom-bank.xyz, bidv-verify.com).",
        ruleOfThumb: "Gọi lại số hotline in trên mặt sau thẻ ATM của bạn hoặc đến trực tiếp phòng giao dịch gần nhất.",
        mockType: "dialer",
    },
    {
        id: 4,
        step: "04",
        shortTitle: "Báo cáo & Ngăn chặn",
        fullTitle: "Báo cáo khẩn cấp tới cơ quan chức năng và ngân hàng",
        tag: "Hành động chặn đứng",
        color: "rose",
        theme: {
            bg: "bg-rose-500",
            text: "text-rose-600",
            border: "border-rose-500",
            lightBg: "bg-rose-50",
            lightBorder: "border-rose-100",
            badge: "bg-rose-100 text-rose-700",
        },
        desc: "Nếu lỡ chuyển tiền hoặc cung cấp thông tin, từng phút trôi qua đều quý giá. Liên hệ ngay hotline ngân hàng để phong tỏa tài khoản và gửi tố giác.",
        trapSignal: "Chần chừ, xấu hổ không dám nói với người thân khiến kẻ xấu tiếp tục tống tiền hoặc thao túng tài sản.",
        ruleOfThumb: "Chụp ảnh lưu toàn bộ tin nhắn, số tài khoản nhận tiền và gọi 113 hoặc gửi phản ánh tại canhbao.ncsc.gov.vn.",
        mockType: "report",
    },
];

function MockArtifact({ type }) {
    if (type === "alert") {
        return (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 text-white p-5 shadow-lg font-sans relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-red-400 font-bold">
                        <Warning size={15} weight="fill" />
                        CẢNH BÁO TÂM LÝ
                    </span>
                    <span className="font-mono text-gray-500">BẪY THÚC ÉP</span>
                </div>
                <div className="my-5 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400 mb-3 border border-red-500/20">
                        <HourglassMedium size={24} weight="bold" />
                    </div>
                    <p className="text-sm font-bold text-red-300">"Tài khoản sẽ bị khóa sau 15:00 phút!"</p>
                    <p className="text-xs text-gray-400 mt-1">Kẻ gian muốn bạn hành động theo bản năng sợ hãi</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle size={15} weight="fill" />
                        Giải pháp: Đặt máy xuống 5 phút
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Bình tĩnh</span>
                </div>
            </div>
        );
    }

    if (type === "sms") {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                        <ChatsTeardrop size={16} weight="fill" className="text-orange-500" />
                        <span className="font-bold text-gray-800">Tin nhắn SMS giả danh</span>
                    </div>
                    <span className="font-mono text-gray-400">10:42 AM</span>
                </div>
                <div className="space-y-3">
                    <div className="bg-gray-100 rounded-xl rounded-tl-none p-3.5 text-xs text-gray-700 leading-relaxed border border-gray-200/80">
                        <p className="font-semibold text-gray-900 mb-1">Mã xác thực VCB OTP: 839201</p>
                        <p>Tuyệt đối KHÔNG chia sẻ mã này. Đọc mã đồng nghĩa với việc bạn đồng ý giao dịch 25.000.000 VNĐ.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
                        <Prohibit size={18} weight="bold" className="text-red-500 shrink-0" />
                        <span>Kẻ lừa đảo đang giả danh gọi xin mã này. KHÔNG ĐỌC!</span>
                    </div>
                </div>
            </div>
        );
    }

    if (type === "dialer") {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                        <PhoneCall size={16} weight="fill" className="text-emerald-500" />
                        <span className="font-bold text-gray-800">Đối chiếu nguồn chính thức</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Xác minh</span>
                </div>
                <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-red-800">Số gọi đến lạ (VoIP)</p>
                            <p className="text-xs text-red-600 font-mono mt-0.5">024.7777.xxxx</p>
                        </div>
                        <span className="text-xs text-red-600 font-bold bg-white px-2 py-1 rounded border border-red-200">
                            Không gọi lại
                        </span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-emerald-800">Hotline mặt sau thẻ ATM</p>
                            <p className="text-xs text-emerald-700 font-mono mt-0.5">1900 54 54 13</p>
                        </div>
                        <span className="text-xs text-emerald-700 font-bold bg-white px-2 py-1 rounded border border-emerald-200">
                            Chính chủ
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (type === "report") {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                        <Megaphone size={16} weight="fill" className="text-rose-500" />
                        <span className="font-bold text-gray-800">CỔNG BÁO CÁO KHẨN CẤP</span>
                    </div>
                    <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">24/7</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                    <a
                        href="tel:113"
                        className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center text-center hover:bg-rose-100 transition-colors group"
                    >
                        <PhoneCall size={20} weight="fill" className="text-rose-600 mb-1 group-hover:scale-105 transition-transform" />
                        <span className="text-xs font-bold text-rose-900">Gọi khẩn cấp 113</span>
                        <span className="text-xs text-rose-600">Công an toàn quốc</span>
                    </a>
                    <a
                        href="https://canhbao.ncsc.gov.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center text-center hover:bg-blue-100 transition-colors group"
                    >
                        <FileText size={20} weight="fill" className="text-blue-600 mb-1 group-hover:scale-105 transition-transform" />
                        <span className="text-xs font-bold text-blue-900">canhbao.ncsc.gov.vn</span>
                        <span className="text-xs text-blue-600">Cổng an ninh mạng</span>
                    </a>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <strong>Hồ sơ cần lưu:</strong> Ảnh chụp màn hình giao dịch chuyển khoản, số tài khoản thụ hưởng của kẻ gian, thời gian và số điện thoại liên lạc.
                </div>
            </div>
        );
    }

    return null;
}

export default function GuideSection() {
    const [activeIdx, setActiveIdx] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const active = stages[activeIdx];

    return (
        <section id="guide" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header without tag */}
                <div className="max-w-3xl mb-10 md:mb-12">
                    <motion.h2
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight"
                    >
                        Khi nghi ngờ lừa đảo, thực hiện{" "}
                        <span className="text-orange-500">4 bước tuần tự này</span>
                    </motion.h2>
                    <motion.p
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                        className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed"
                    >
                        Nhấp vào từng chặng trên tiến trình dưới đây để xem phân tích và mô phỏng thực tế cách xử lý.
                    </motion.p>
                </div>

                {/* Horizontal Timeline Progress Track */}
                <div className="relative mb-8 md:mb-10">
                    {/* Background Progress Rail */}
                    <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-1 bg-gray-100 rounded-full z-0" />
                    {/* Active Progress Fill */}
                    <div
                        className="hidden md:block absolute top-7 left-[8%] h-1 bg-orange-500 rounded-full transition-all duration-300 z-0"
                        style={{ width: `${(activeIdx / (stages.length - 1)) * 84}%` }}
                    />

                    {/* Stage Nodes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 relative z-10">
                        {stages.map((stage, idx) => {
                            const isSelected = activeIdx === idx;
                            const isPassed = activeIdx > idx;

                            return (
                                <button
                                    key={stage.id}
                                    type="button"
                                    onClick={() => setActiveIdx(idx)}
                                    className={`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer bg-white relative ${
                                        isSelected
                                            ? "border-orange-500 shadow-md ring-2 ring-orange-500/20 -translate-y-0.5"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-xs"
                                    }`}
                                    aria-pressed={isSelected}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                        <div
                                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-sans font-bold text-xs sm:text-sm transition-colors shadow-xs ${
                                                isSelected
                                                    ? "bg-orange-500 text-white"
                                                    : isPassed
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {stage.step}
                                        </div>
                                        <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">
                                            Chặng {stage.step}
                                        </span>
                                    </div>
                                    <p className={`text-xs sm:text-sm font-bold transition-colors line-clamp-1 ${isSelected ? "text-gray-950" : "text-gray-700"}`}>
                                        {stage.shortTitle}
                                    </p>
                                    <span className="text-[11px] sm:text-xs text-gray-500 mt-0.5 block truncate">
                                        {stage.tag}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Stage Detailed Showcase Container */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-gray-50 rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-7 md:p-8 shadow-xs"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                            {/* Left Breakdown Details - 7 cols on tablet/desktop */}
                            <div className="md:col-span-7 space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${active.theme.badge}`}>
                                        Giai đoạn {active.step}/04
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 font-mono">
                                        {active.tag}
                                    </span>
                                </div>

                                <h3 className="font-sans text-xl md:text-2xl font-extrabold text-gray-950">
                                    {active.fullTitle}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {active.desc}
                                </p>

                                <div className="space-y-3 pt-2">
                                    {/* Trap Signal Warning Box */}
                                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                                        <Warning size={18} weight="fill" className="text-amber-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-amber-950 mb-0.5">Dấu hiệu nhận diện cái bẫy:</strong>
                                            <span>{active.trapSignal}</span>
                                        </div>
                                    </div>

                                    {/* Defense Rule Box */}
                                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
                                        <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-emerald-950 mb-0.5">Mệnh lệnh hành động bắt buộc:</strong>
                                            <span>{active.ruleOfThumb}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Stage Trigger */}
                                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                                        <Lightbulb size={15} weight="fill" className="text-orange-500" />
                                        Nhấp chọn các mốc trên để xem từng chặng
                                    </span>
                                    {activeIdx < stages.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveIdx((prev) => Math.min(prev + 1, stages.length - 1))}
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                                        >
                                            Chặng tiếp theo
                                            <ArrowRight size={14} weight="bold" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Right Realistic Mock Artifact - 5 cols on tablet/desktop, centered on mobile */}
                            <div className="md:col-span-5 w-full max-w-md mx-auto md:max-w-none">
                                <MockArtifact type={active.mockType} />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
