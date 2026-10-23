import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
    bankHotlines,
    emergencyProtocolSteps,
    emergencyContacts,
} from "../../data/content";
import {
    Warning,
    Phone,
    ShieldCheck,
    Copy,
    Check,
    FileText,
    ArrowSquareOut,
    Buildings,
} from "@phosphor-icons/react";

export default function EmergencyPage() {
    const shouldReduceMotion = useReducedMotion();

    const [reportForm, setReportForm] = useState({
        reporterName: "",
        reporterPhone: "",
        scamDate: new Date().toISOString().split("T")[0],
        scamChannel: "Cuộc gọi mạo danh cơ quan/công an",
        suspectName: "",
        suspectBank: "",
        suspectAccount: "",
        suspectPhone: "",
        suspectLink: "",
        amountLost: "",
        description: "",
    });

    const [copied, setCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportForm((prev) => ({ ...prev, [name]: value }));
    };

    const generateComplaintText = () => {
        return `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
***

ĐƠN TỐ GIÁC TỘI PHẠM VÀ ĐỀ NGHỊ PHONG TỎA TÀI KHOẢN LỪA ĐẢO

Kính gửi:
- Cơ quan Cảnh sát điều tra Công an (Quận/Huyện): ........................................
- Ban Giám đốc Ngân hàng: ${reportForm.suspectBank || "......................................."}

TÔI TÊN LÀ: ${reportForm.reporterName || "[Họ và tên người tố cáo]"}
Số điện thoại liên hệ: ${reportForm.reporterPhone || "[Số điện thoại]"}

Tôi làm đơn này kính báo đến quý cơ quan về hành vi lừa đảo chiếm đoạt tài sản trên không gian mạng như sau:

1. THỜI GIAN VÀ HÌNH THỨC XẢY RA:
- Thời gian: Ngày ${reportForm.scamDate}
- Kênh tiếp cận của đối tượng: ${reportForm.scamChannel}

2. THÔNG TIN ĐỐI TƯỢNG VÀ TÀI KHOẢN THỤ HƯỞNG LỪA ĐẢO:
- Tên đối tượng xưng danh: ${reportForm.suspectName || "Không rõ tên thật"}
- Số điện thoại đối tượng sử dụng: ${reportForm.suspectPhone || "Không rõ"}
- Đường link / Website / Nhóm chat: ${reportForm.suspectLink || "Không có"}
- Số tài khoản nhận tiền: ${reportForm.suspectAccount || "[Số tài khoản kẻ gian]"}
- Tại Ngân hàng: ${reportForm.suspectBank || "[Ngân hàng thụ hưởng]"}
- Số tiền đã chuyển: ${reportForm.amountLost ? reportForm.amountLost + " VNĐ" : "[Số tiền cụ thể]"}

3. TÓM TẮT DIỄN BIẾN SỰ VIỆC:
${reportForm.description || "[Mô tả tóm tắt nội dung đối tượng đã dẫn dụ, ép buộc hoặc giả mạo để chiếm đoạt tiền]"}

4. YÊU CẦU ĐỀ NGHỊ:
Kính đề nghị Cơ quan Công an tiếp nhận tố giác, phối hợp với ngân hàng khẩn cấp tiến hành phong tỏa tài khoản thụ hưởng nêu trên để thu hồi tài sản và điều tra xử lý đối tượng theo đúng quy định của pháp luật.

Tôi xin cam đoan toàn bộ thông tin trình báo trên là hoàn toàn đúng sự thật.

Kèm theo đơn: Bản sao kê tài khoản ngân hàng, ảnh chụp màn hình tin nhắn, cuộc gọi đối tượng.

Ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}
Người làm đơn
(Ký và ghi rõ họ tên)`;
    };

    const handleCopyReport = () => {
        const text = generateComplaintText();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="min-h-[100dvh] bg-gray-50 py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-3">
                        <Warning size={14} weight="fill" />
                        <span>Hỗ trợ ứng phó sự cố tức thì</span>
                    </div>
                    <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
                        Cẩm nang{" "}
                        <span className="text-red-600">xử lý khẩn cấp</span>
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                        Các hành động mang tính quyết định trong 15 phút đầu khi
                        vừa chuyển tiền hoặc nghi ngờ bị lộ thông tin bảo mật,
                        danh bạ hotline ngân hàng 24/7 và trình tạo đơn tố giác
                        tội phạm.
                    </p>
                </div>

                <div className="mb-14">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">
                            Quy trình 5 bước phản ứng trong 15 phút đầu
                        </h2>
                        <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                            Ưu tiên cao nhất
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {emergencyProtocolSteps.map((stepItem) => (
                            <motion.div
                                key={stepItem.step}
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 12 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.3,
                                    delay: stepItem.step * 0.05,
                                }}
                                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                                            {stepItem.step}
                                        </span>
                                        <span
                                            className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${stepItem.badgeColor}`}
                                        >
                                            {stepItem.priority}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-950 text-sm sm:text-base leading-snug mb-2">
                                        {stepItem.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {stepItem.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-14">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 flex items-center gap-2">
                                <Buildings
                                    size={24}
                                    className="text-emerald-600"
                                />
                                <span>
                                    Hotline khẩn cấp 24/7 các ngân hàng tại Việt
                                    Nam
                                </span>
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Bấm số gọi ngay để yêu cầu khóa thẻ và tạm ngưng
                                dịch vụ ngân hàng số
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                        {bankHotlines.map((bank) => (
                            <div
                                key={bank.name}
                                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="font-bold text-gray-950 text-sm mb-1">
                                        {bank.name}
                                    </h3>
                                    <div className="text-xs text-gray-500 mb-2">
                                        {bank.appLockGuide}
                                    </div>
                                    {bank.emergencySyntax && (
                                        <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg mb-3 break-all">
                                            {bank.emergencySyntax}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <a
                                        href={`tel:${bank.hotline.replace(/\s+/g, "")}`}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                                    >
                                        <Phone size={14} weight="fill" />
                                        <span>{bank.hotline}</span>
                                    </a>
                                    <a
                                        href={bank.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-emerald-700 hover:bg-gray-50 transition-colors shrink-0"
                                        title={`Mở trang web chính thức ${bank.name}`}
                                        aria-label={`Mở trang web chính thức ${bank.name}`}
                                    >
                                        <ArrowSquareOut size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <FileText size={20} weight="bold" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-extrabold text-gray-950">
                                    Trình tạo đơn tố giác tội phạm
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Điền thông tin vụ việc để tự động kết xuất
                                    văn bản gửi cơ quan Công An
                                </p>
                            </div>
                        </div>

                        <form className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="reporterName"
                                        className="block text-xs font-bold text-gray-700 mb-1"
                                    >
                                        Họ và tên của bạn:
                                    </label>
                                    <input
                                        id="reporterName"
                                        type="text"
                                        name="reporterName"
                                        value={reportForm.reporterName}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Nguyễn Văn A"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="reporterPhone"
                                        className="block text-xs font-bold text-gray-700 mb-1"
                                    >
                                        Số điện thoại của bạn:
                                    </label>
                                    <input
                                        id="reporterPhone"
                                        type="tel"
                                        inputMode="tel"
                                        name="reporterPhone"
                                        value={reportForm.reporterPhone}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: 0912345678"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="scamDate"
                                        className="block text-xs font-bold text-gray-700 mb-1"
                                    >
                                        Ngày xảy ra sự việc:
                                    </label>
                                    <input
                                        id="scamDate"
                                        type="date"
                                        name="scamDate"
                                        value={reportForm.scamDate}
                                        onChange={handleInputChange}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="scamChannel"
                                        className="block text-xs font-bold text-gray-700 mb-1"
                                    >
                                        Kênh tiếp cận của kẻ gian:
                                    </label>
                                    <select
                                        id="scamChannel"
                                        name="scamChannel"
                                        value={reportForm.scamChannel}
                                        onChange={handleInputChange}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 bg-white"
                                    >
                                        <option value="Cuộc gọi mạo danh cơ quan/công an">
                                            Cuộc gọi mạo danh cơ quan
                                        </option>
                                        <option value="Tin nhắn SMS/Email giả mạo ngân hàng">
                                            SMS / Email giả mạo
                                        </option>
                                        <option value="Nhóm Telegram làm nhiệm vụ đơn hàng">
                                            Nhóm Telegram tuyển dụng
                                        </option>
                                        <option value="Tin nhắn Facebook / Zalo mạo danh">
                                            Tin nhắn Facebook / Zalo
                                        </option>
                                        <option value="Sàn đầu tư tài chính / App lạ">
                                            Sàn ảo / Ứng dụng lạ
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-red-600 uppercase mb-3">
                                    Thông tin kẻ gian & Tài khoản nhận tiền:
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label
                                            htmlFor="suspectBank"
                                            className="block text-xs font-bold text-gray-700 mb-1"
                                        >
                                            Ngân hàng thụ hưởng của kẻ gian:
                                        </label>
                                        <input
                                            id="suspectBank"
                                            type="text"
                                            name="suspectBank"
                                            value={reportForm.suspectBank}
                                            onChange={handleInputChange}
                                            placeholder="Ví dụ: MB Bank, Vietcombank..."
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="suspectAccount"
                                            className="block text-xs font-bold text-gray-700 mb-1"
                                        >
                                            Số tài khoản kẻ gian:
                                        </label>
                                        <input
                                            id="suspectAccount"
                                            type="text"
                                            name="suspectAccount"
                                            value={reportForm.suspectAccount}
                                            onChange={handleInputChange}
                                            placeholder="Ví dụ: 1029384756..."
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label
                                            htmlFor="suspectPhone"
                                            className="block text-xs font-bold text-gray-700 mb-1"
                                        >
                                            Số điện thoại / Nick kẻ gian:
                                        </label>
                                        <input
                                            id="suspectPhone"
                                            type="text"
                                            name="suspectPhone"
                                            value={reportForm.suspectPhone}
                                            onChange={handleInputChange}
                                            placeholder="Ví dụ: 024.7777.xxxx hoặc @telegram"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="amountLost"
                                            className="block text-xs font-bold text-gray-700 mb-1"
                                        >
                                            Số tiền bị chiếm đoạt (VNĐ):
                                        </label>
                                        <input
                                            id="amountLost"
                                            type="text"
                                            inputMode="numeric"
                                            name="amountLost"
                                            value={reportForm.amountLost}
                                            onChange={handleInputChange}
                                            placeholder="Ví dụ: 15.000.000"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-xs font-bold text-gray-700 mb-1"
                                    >
                                        Tóm tắt thủ đoạn dẫn dụ của kẻ gian:
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        name="description"
                                        value={reportForm.description}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Đối tượng gọi điện xưng cán bộ điều tra yêu cầu chuyển tiền niêm phong tài sản vào số tài khoản trên..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 leading-relaxed"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleCopyReport}
                                className="w-full min-h-[48px] py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Copy size={16} weight="bold" />
                                <span>
                                    {copied
                                        ? "Đã sao chép văn bản đơn tố giác"
                                        : "Sao chép đơn tố giác đã điền"}
                                </span>
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Bản xem trước văn bản tố giác
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyReport}
                                    className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-all cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check
                                                size={14}
                                                className="text-emerald-600"
                                            />
                                            <span className="text-emerald-700">
                                                Đã sao chép
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            <span>Sao chép toàn bộ đơn</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200 font-mono text-xs sm:text-[13px] text-gray-800 whitespace-pre-line leading-relaxed max-h-[500px] overflow-y-auto">
                                {generateComplaintText()}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                            <span>Nội dung trên chỉ mang tính tham khảo</span>
                            <span className="font-bold text-emerald-700">
                                Mẫu chuẩn hóa
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-950 mb-4">
                        Các kênh tiếp nhận phản ánh quốc gia chính thức
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {emergencyContacts.map((contact) => {
                            const isTel = contact.url.startsWith("tel:");
                            return (
                                <a
                                    key={contact.name}
                                    href={contact.url}
                                    {...(!isTel
                                        ? {
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                          }
                                        : {})}
                                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-emerald-100 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                                            {isTel ? (
                                                <Phone
                                                    size={18}
                                                    weight="fill"
                                                />
                                            ) : (
                                                <ShieldCheck
                                                    size={20}
                                                    weight="fill"
                                                />
                                            )}
                                        </div>
                                        <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-emerald-800 transition-colors">
                                            {contact.name}
                                        </span>
                                    </div>
                                    {isTel ? (
                                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                                            Gọi ngay
                                        </span>
                                    ) : (
                                        <ArrowSquareOut
                                            size={16}
                                            className="text-gray-400 group-hover:text-emerald-600 transition-colors"
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
