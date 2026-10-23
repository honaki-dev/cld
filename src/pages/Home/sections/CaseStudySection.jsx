import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
    FishSimple,
    Phone,
    Briefcase,
    ChartLine,
    Heart,
    UserSwitch,
    ShieldCheck,
    WarningOctagon,
    ArrowRight,
    ArrowCounterClockwise,
    EnvelopeSimple,
    PhoneCall,
    ChatCircleDots,
    LockKey,
    CheckCircle,
    XCircle,
    Warning,
} from "@phosphor-icons/react";

const caseScenarios = [
    {
        id: "phishing",
        tabTitle: "Email Phishing",
        scamCategory: "Lừa đảo Phishing",
        icon: FishSimple,
        channelType: "email",
        channelLabel: "Hộp thư đến: Email giả mạo",
        senderName: "VCB Digibank Support",
        senderAddress: "alert@vietcom-bank.com.verify.xyz",
        subject:
            "[KHẨN CẤP] Cảnh báo đăng nhập trái phép tài khoản VCB Digibank",
        time: "02:14 Hôm nay",
        avatarBg: "bg-emerald-600",
        avatarText: "VCB",
        hookMessage:
            "Kính gửi quý khách, hệ thống ghi nhận phiên đăng nhập lạ từ địa chỉ IP: 185.220.101.4 (Moscow, Nga). Nhằm bảo vệ số dư tài khoản, quý khách vui lòng bấm vào liên kết dưới đây để xác thực danh tính trong vòng 24 giờ. Quá thời hạn trên, tài khoản sẽ bị phong tỏa vĩnh viễn.",
        suspiciousLink: "https://vietcom-bank.com.verify.xyz/auth-vcb",
        tacticTag: "Đe dọa khóa tài khoản: Áp lực thời gian",
        choices: [
            {
                id: "mistake",
                label: "Click vào link xác thực ngay để không bị khóa thẻ",
                isCorrect: false,
                consequenceBadge: "Sập bẫy Phishing",
                lossDetail: "Mất tài khoản VCB & toàn bộ tiền trong thẻ",
                explanation:
                    "Liên kết dẫn tới trang web giả mạo có giao diện sao chép 100% Vietcombank. Khi bạn nhập thông tin đăng nhập và OTP, kẻ gian lập tức chiếm quyền và chuyển sạch tiền trong vài giây.",
            },
            {
                id: "correct",
                label: "Không click link. Mở app VCB Digibank chính thức hoặc gọi hotline 1900 54 54 13",
                isCorrect: true,
                consequenceBadge: "Phòng thủ chuẩn xác",
                lossDetail: "0 VNĐ: Tài khoản an toàn 100%",
                explanation:
                    "Ngân hàng không bao giờ gửi link yêu cầu đăng nhập qua email hoặc SMS. Việc tự mở ứng dụng độc lập trên điện thoại là thói quen vàng giúp bạn vô hiệu hóa bẫy giả mạo.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Tạo cảm giác sợ hãi mất tiền và áp lực thời hạn 24 giờ để nạn nhân hành động vội vã mà không kịp soi xét.",
            redFlag:
                "Tên miền 'vietcom-bank.com.verify.xyz' có đuôi .xyz, trong khi tên miền chuẩn của Vietcombank là 'vietcombank.com.vn'.",
            goldenRule:
                "Không bao giờ click vào liên kết nhận được qua email hoặc SMS để đăng nhập ngân hàng.",
        },
    },
    {
        id: "otp-scam",
        tabTitle: "Giả Công An & OTP",
        scamCategory: "Đoạt mã OTP",
        icon: Phone,
        channelType: "call",
        channelLabel: "Cuộc gọi đến: Giả danh cơ quan pháp luật",
        senderName: "Cán bộ CSĐT: Trần Văn Nam",
        senderAddress: "Đầu số tổng đài ảo: 024.7777.xxxx",
        subject: "Cuộc gọi thoại qua giao thức VoIP",
        time: "10:30 Sáng",
        avatarBg: "bg-red-600",
        avatarText: "CA",
        hookMessage:
            "Tôi là Đại úy Nam, cán bộ Cục CSĐT Tội phạm ma túy. Số CCCD của anh/chị đang đứng tên một tài khoản liên quan đến đường dây rửa tiền xuyên quốc gia 40 tỷ đồng. Cơ quan chức năng yêu cầu anh/chị hợp tác ngay. Tôi vừa gửi lệnh tạm giữ tài sản, anh/chị đọc ngay mã xác thực 6 số vừa gửi về máy để đối chiếu niêm phong!",
        suspiciousLink: null,
        tacticTag: "Đe dọa khởi tố hình sự: Uy hiếp tâm lý",
        choices: [
            {
                id: "mistake",
                label: "Đọc ngay 6 số OTP để chứng minh mình trong sạch",
                isCorrect: false,
                consequenceBadge: "Bị chiếm quyền tài khoản",
                lossDetail:
                    "Mất trắng toàn bộ tiền tiết kiệm và hạn mức thấu chi",
                explanation:
                    "Mã OTP 6 số đó thực chất là mã xác nhận lệnh chuyển tiền do chính kẻ gian đang thao tác trên tài khoản của bạn. Đọc mã OTP đồng nghĩa với việc bạn tự mở két sắt đưa tiền cho kẻ lừa đảo.",
            },
            {
                id: "correct",
                label: "Cúp máy ngay lập tức. Công an không làm việc qua điện thoại hay đòi OTP",
                isCorrect: true,
                consequenceBadge: "Xử lý tuyệt đối an toàn",
                lossDetail: "0 VNĐ: Kẻ gian thất bại",
                explanation:
                    "Cơ quan công an, viện kiểm sát làm việc luôn gửi giấy triệu tập trực tiếp tại trụ sở. Không có cơ quan pháp luật hay ngân hàng nào có quyền đòi mã OTP của người dân.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Dùng danh xưng công an và các tội danh đặc biệt nghiêm trọng (rửa tiền, ma túy) để đẩy nạn nhân vào trạng thái hoảng loạn tột độ.",
            redFlag:
                "Làm việc qua điện thoại, hối thúc đọc mã bí mật OTP và cấm không cho nói với người thân.",
            goldenRule:
                "Mã OTP là mật khẩu dùng một lần của riêng bạn. Bất kỳ ai hỏi OTP đều là lừa đảo.",
        },
    },
    {
        id: "job-scam",
        tabTitle: "Việc Làm CTV Online",
        scamCategory: "Việc làm online",
        icon: Briefcase,
        channelType: "telegram",
        channelLabel: "Nhóm Telegram: Tuyển CTV Đơn Hàng VIP",
        senderName: "Trưởng nhóm: Hoàng Mai Trang (Shopee Mall VIP)",
        senderAddress: "Telegram Group: @CTV_NhiemVu_Cap12",
        subject: "Nhiệm vụ nhận hoa hồng tức thì",
        time: "14:15 Hôm nay",
        avatarBg: "bg-amber-600",
        avatarText: "SP",
        hookMessage:
            "Chúc mừng bạn đã hoàn thành 2 đơn hàng đầu tiên và rút thành công 200.000đ về ATM! Bây giờ bạn đã đủ điều kiện nâng cấp lên Đơn Hàng VIP 3. Chỉ cần nạp cọc kích hoạt 2.000.000đ làm nhiệm vụ trong 10 phút, hệ thống sẽ tự động hoàn gốc kèm hoa hồng 35% (tổng nhận 2.700.000đ). Cả nhóm ai cũng vừa rút tiền xong nè bạn!",
        suspiciousLink: null,
        tacticTag: "Mồi nhử tiền nhỏ: Thao túng tâm lý bầy đàn",
        choices: [
            {
                id: "mistake",
                label: "Nạp 2.000.000đ vì 2 lần trước đã rút được tiền thật về tài khoản",
                isCorrect: false,
                consequenceBadge: "Mắc bẫy Chi Phí Chìm",
                lossDetail:
                    "Mất 2.000.000đ và bị ép nạp thêm 10tr, 50tr để 'cứu lệnh'",
                explanation:
                    "200.000đ ban đầu là miếng mồi nhử. Các tài khoản khoe tiền trong nhóm thực chất là nick ảo cùng một đường dây. Khi bạn nạp 2 triệu, chúng sẽ báo 'lỗi lệnh' và ép nạp thêm tiền lớn hơn.",
            },
            {
                id: "correct",
                label: "Dừng lại ngay lập tức, giữ 200.000đ mồi và thoát nhóm Telegram",
                isCorrect: true,
                consequenceBadge: "Bắt bài kẻ lừa đảo",
                lossDetail: "Bảo toàn tài chính, không mất tiền oan",
                explanation:
                    "Nguyên tắc cốt lõi: Doanh nghiệp chân chính không bao giờ yêu cầu người tìm việc phải nạp tiền cọc trước để nhận lương. Nhận diện sớm giúp bạn không dính vào vòng xoáy nạp tiền vô tận.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Cho nạn nhân ăn mồi nhỏ để tạo lòng tin vững chắc, sau đó dùng các tài khoản chim mồi tạo hiệu ứng tâm lý 'ai cũng kiếm được tiền'.",
            redFlag:
                "Hoa hồng phi lý (35% chỉ trong 10 phút) và yêu cầu nộp tiền cọc để kích hoạt nhiệm vụ.",
            goldenRule:
                "Bất kỳ công việc online nào bắt nạp tiền trước đều là bẫy lừa đảo.",
        },
    },
    {
        id: "investment-scam",
        tabTitle: "Sàn Đầu Tư Ảo",
        scamCategory: "Đầu tư sinh lời cao",
        icon: ChartLine,
        channelType: "chat",
        channelLabel: "Tin nhắn Messenger: Người lạ tư vấn tài chính",
        senderName: "Jessica Hoàng (Chuyên gia Quỹ AI-Trading)",
        senderAddress: "Facebook: Jessica Hoang Financial",
        subject: "Lời mời tham gia nhóm tín hiệu bí mật",
        time: "21:05 Tối qua",
        avatarBg: "bg-blue-600",
        avatarText: "JH",
        hookMessage:
            "Chào anh, em theo dõi trang anh thấy anh rất cầu tiến! Bên em đang có bot AI trade coin trên sàn quốc tế Bit-GlobalX.vip, lợi nhuận cam kết 5%/ngày (150%/tháng) hoàn toàn tự động, rủi ro 0%. Em có một suất nội bộ trải nghiệm, anh nạp thử 1.000.000đ theo em đánh vài lệnh là thấy tiền về ngay!",
        suspiciousLink: "https://bit-globalx.vip/register?ref=VIP888",
        tacticTag: "Cam kết siêu lợi nhuận: Bẫy Ponzi công nghệ cao",
        choices: [
            {
                id: "mistake",
                label: "Nạp thử 1.000.000đ trải nghiệm vì số tiền nhỏ, có bot AI lo",
                isCorrect: false,
                consequenceBadge: "Bẫy nuôi lợn (Pig Butchering)",
                lossDetail:
                    "Ban đầu lãi ảo 10 triệu, sau đó nạp tiền trăm triệu thì bị chặn",
                explanation:
                    "Sàn giao dịch này hoàn toàn do kẻ gian lập trình. Biểu đồ nến và số dư tài khoản đều được chúng chỉnh tay ở máy chủ hậu đài. Khi bạn nạp nhiều tiền, sàn sẽ viện cớ 'đóng thuế' để không cho rút.",
            },
            {
                id: "correct",
                label: "Từ chối và tra cứu sàn tại website Ủy ban Chứng khoán Nhà nước (ssc.gov.vn)",
                isCorrect: true,
                consequenceBadge: "Tỉnh táo giữ vốn",
                lossDetail: "0 VNĐ: Thoát bẫy sàn lừa đảo",
                explanation:
                    "Trong kinh tế học, không có kênh đầu tư hợp pháp nào mang lại 150%/tháng mà không có rủi ro. Việc kiểm tra tính pháp lý qua cơ quan quản lý giúp bạn chặn đứng bẫy Ponzi.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Đánh trúng lòng tham và tâm lý FOMO (sợ bỏ lỡ cơ hội đổi đời) bằng thuật ngữ thời thượng như AI, Bot Trade, Suất nội bộ.",
            redFlag:
                "Cam kết lợi nhuận 5%/ngày (gấp hàng chục lần lãi suất ngân hàng cả năm) và app cài qua link lạ không có trên App Store/CH Play.",
            goldenRule:
                "Lợi nhuận càng cao thì rủi ro càng lớn. Lời hứa 'bao lỗ, lãi khủng' 100% là lừa đảo.",
        },
    },
    {
        id: "romance-scam",
        tabTitle: "Bẫy Tình Cảm",
        scamCategory: "Lừa đảo tình cảm online",
        icon: Heart,
        channelType: "instagram",
        channelLabel: "Tin nhắn Instagram: Bạn bè quen qua mạng",
        senderName: "David Chen (Kỹ sư Giàn khoan Hàng hải)",
        senderAddress: "Instagram: @david_chen_offshore",
        subject: "Tin nhắn tâm sự lúc nửa đêm",
        time: "23:45 Hôm qua",
        avatarBg: "bg-rose-600",
        avatarText: "DC",
        hookMessage:
            "Em yêu, 3 tháng qua trò chuyện cùng em là lúc anh hạnh phúc nhất. Hôm nay giàn khoan ngoài khơi Singapore gặp sự cố bão lớn, tài khoản anh đang bị phong tỏa theo quy chế an toàn biển. Anh đang cần gấp 35.000.000đ đóng phí cảng vụ để được về đất liền bay về Việt Nam gặp em. Về tới nơi anh sẽ hoàn trả gấp đôi cho em...",
        suspiciousLink: null,
        tacticTag: "Thao túng cảm xúc: Kịch bản éo le lâm ly",
        choices: [
            {
                id: "mistake",
                label: "Chuyển tiền giúp đỡ vì yêu thương và thấy đối phương đang gặp nạn thật",
                isCorrect: false,
                consequenceBadge: "Mắc bẫy lừa tình xuyên lục địa",
                lossDetail:
                    "Mất 35.000.000đ và tiếp tục bị vòi thêm tiền bảo lãnh",
                explanation:
                    "Người đàn ông hào hoa này không có thật. Kẻ lừa đảo sử dụng ảnh của người khác trên mạng. Tiền của bạn ngay khi chuyển đi sẽ bị rút sạch qua hệ thống tài khoản rác.",
            },
            {
                id: "correct",
                label: "Yêu cầu video call trực tiếp ngay lập tức, dùng Google Lens tìm kiếm ảnh đại diện",
                isCorrect: true,
                consequenceBadge: "Bóc trần danh tính giả",
                lossDetail: "0 VNĐ: Nhận diện kẻ mạo danh",
                explanation:
                    "Kẻ lừa đảo tình cảm luôn né tránh video call rõ mặt với đủ lý do: đường truyền yếu, bảo mật quân đội. Tìm kiếm ảnh qua Google Lens sẽ lập tức cho thấy ảnh profile bị đánh cắp từ tài khoản người khác.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Dành hàng tháng trời nhắn tin chăm sóc, tâm sự hàng ngày để xây dựng niềm tin và tình cảm bền chặt trước khi tung đòn vay tiền khẩn cấp.",
            redFlag:
                "Người quen qua mạng chưa từng gặp mặt ngoài đời, luôn có lý do không video call được và vẽ kịch bản bi kịch ở nước ngoài.",
            goldenRule:
                "Tuyệt đối không gửi tiền cho người chưa từng gặp mặt trực tiếp ngoài đời thực.",
        },
    },
    {
        id: "impersonation",
        tabTitle: "Giả Mạo Người Thân",
        scamCategory: "Hack tài khoản người quen",
        icon: UserSwitch,
        channelType: "zalo",
        channelLabel: "Tin nhắn Zalo: Nick người thân bị chiếm đoạt",
        senderName: "Anh Hai (Tài khoản Zalo gia đình)",
        senderAddress: "Zalo: Nguyen Van Minh",
        subject: "Tin nhắn khẩn cấp qua Zalo",
        time: "08:12 Sáng nay",
        avatarBg: "bg-indigo-600",
        avatarText: "AH",
        hookMessage:
            "Út ơi, anh đang trên đường đưa bạn đồng nghiệp vào viện cấp cứu ở Chợ Rẫy, đang thiếu tiền viện phí gấp mà app ngân hàng anh bị lỗi hạn mức. Em chuyển giúp anh 8.000.000đ vào số tài khoản này với: STK: 1029384756, MB Bank, NGUYEN VAN TUAN (Bác sĩ tiếp nhận). Anh đang trong phòng cấp cứu không nghe máy được đâu, chuyển xong nhắn anh gấp nhé!",
        suspiciousLink: null,
        tacticTag: "Lợi dụng tình thâm: Giả vờ không nghe máy",
        choices: [
            {
                id: "mistake",
                label: "Chuyển khoản 8 triệu ngay vì lo cho người thân và sợ trễ cấp cứu",
                isCorrect: false,
                consequenceBadge: "Chuyển tiền cho kẻ trộm tài khoản",
                lossDetail:
                    "Mất 8.000.000đ vào tài khoản trung gian của kẻ gian",
                explanation:
                    "Tài khoản Zalo của người thân đã bị hack hoặc kẻ xấu tạo tài khoản giả mạo giống hệt ảnh và tên. Câu dặn 'không tiện nghe máy' chính là để ngăn bạn gọi điện xác thực.",
            },
            {
                id: "correct",
                label: "Bấm gọi ngay số điện thoại di động thông thường (SIM) của anh trai để xác nhận",
                isCorrect: true,
                consequenceBadge: "Chặn đứng bẫy mạo danh",
                lossDetail: "0 VNĐ: Giúp người thân phát hiện nick bị hack",
                explanation:
                    "Chỉ một cuộc gọi trực tiếp qua sóng viễn thông SIM là bạn lập tức làm sáng tỏ sự việc. Khi gọi cho người thân thật, họ sẽ cho biết tài khoản Zalo của họ vừa bị chiếm đoạt.",
            },
        ],
        trapBreakdown: {
            psychology:
                "Đánh vào tình cảm ruột thịt và dựng bối cảnh tai nạn hiểm nghèo để nạn nhân hoảng hốt chuyển tiền mà không kịp suy nghĩ.",
            redFlag:
                "Số tài khoản nhận tiền mang tên người lạ (không phải tên người thân) và nại lý do để từ chối nhận cuộc gọi thoại.",
            goldenRule:
                "Nhận tin nhắn mượn tiền từ bất kỳ ai: Phải gọi điện nghe thấy giọng nói thật trước khi chuyển khoản.",
        },
    },
];

export default function CaseStudySection({ isStandalone = false }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const shouldReduceMotion = useReducedMotion();

    const tabBarRef = useRef(null);

    const currentCase = caseScenarios[activeIdx];
    const currentAnswer = userAnswers[currentCase.id];
    const isAnswered = currentAnswer !== undefined;
    const selectedChoiceIdx = isAnswered ? currentAnswer.choiceIdx : null;
    const currentChoice = isAnswered
        ? currentCase.choices[selectedChoiceIdx]
        : null;

    useEffect(() => {
        if (tabBarRef.current && window.innerWidth < 640) {
            const activeBtn = tabBarRef.current.children[activeIdx];
            if (activeBtn) {
                const container = tabBarRef.current;
                const left =
                    activeBtn.offsetLeft -
                    (container.clientWidth - activeBtn.clientWidth) / 2;
                container.scrollTo({ left, behavior: "smooth" });
            }
        }
    }, [activeIdx]);

    const handleSelectCase = (idx) => {
        setActiveIdx(idx);
    };

    const handleChooseOption = (choiceIdx) => {
        if (isAnswered) return;

        const choice = currentCase.choices[choiceIdx];
        setUserAnswers((prev) => ({
            ...prev,
            [currentCase.id]: {
                choiceIdx,
                isCorrect: choice.isCorrect,
            },
        }));
    };

    const handleRetryCase = () => {
        setUserAnswers((prev) => {
            const next = { ...prev };
            delete next[currentCase.id];
            return next;
        });
    };

    const handleNextCase = () => {
        const nextIdx = (activeIdx + 1) % caseScenarios.length;
        handleSelectCase(nextIdx);
    };

    const answeredCount = Object.keys(userAnswers).length;
    const safeCount = Object.values(userAnswers).filter(
        (a) => a.isCorrect,
    ).length;
    const trappedCount = answeredCount - safeCount;

    return (
        <section
            id="case-study"
            className={
                isStandalone
                    ? "py-2 sm:py-4 bg-transparent text-gray-950 relative"
                    : "py-16 md:py-24 bg-white text-gray-950 relative border-t border-gray-100"
            }
        >
            <div
                className={
                    isStandalone
                        ? "w-full relative z-10"
                        : "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10"
                }
            >
                {!isStandalone && (
                    <div className="text-center mb-10 md:mb-12">
                        <motion.h2
                            initial={
                                shouldReduceMotion
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 12 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight"
                        >
                            Phòng Điều Tra:{" "}
                            <span className="text-emerald-600">
                                Thực Hành Xử Lý Tình Huống
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={
                                shouldReduceMotion
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 12 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="mt-3 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed"
                        >
                            Đối mặt với các kịch bản lừa đảo được mô phỏng từ hồ
                            sơ thực tế. Đọc kỹ tin nhắn và chọn phương án xử lý
                            chuẩn xác.
                        </motion.p>
                    </div>
                )}

                <div
                    className={`flex justify-center ${
                        isStandalone ? "mb-6" : "mb-8 -mt-6"
                    }`}
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 text-xs sm:text-sm text-gray-700">
                        <span className="text-gray-500">Tiến độ bài học:</span>
                        <span className="font-bold text-emerald-700 font-mono">
                            {answeredCount}/{caseScenarios.length}
                        </span>
                        <span>đã đưa ra quyết định</span>
                        {answeredCount > 0 && (
                            <span className="flex items-center gap-2.5 pl-2.5 border-l border-gray-300">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                                    <CheckCircle size={15} weight="fill" />{" "}
                                    {safeCount} an toàn
                                </span>
                                {trappedCount > 0 && (
                                    <span className="inline-flex items-center gap-1 text-red-700 font-semibold">
                                        <XCircle size={15} weight="fill" />{" "}
                                        {trappedCount} sập bẫy
                                    </span>
                                )}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mb-8 flex justify-center">
                    <div
                        ref={tabBarRef}
                        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none select-none max-w-full justify-start sm:justify-center sm:flex-wrap"
                    >
                        {caseScenarios.map((item, idx) => {
                            const IconComponent = item.icon;
                            const isActive = idx === activeIdx;
                            const answer = userAnswers[item.id];
                            const isCaseAnswered = answer !== undefined;
                            const isCaseCorrect =
                                isCaseAnswered && answer.isCorrect;

                            let borderBadgeClass =
                                "border-gray-200 text-gray-700 bg-white hover:text-gray-950 hover:border-gray-300 shadow-xs";

                            if (isActive) {
                                borderBadgeClass =
                                    "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20";
                            } else if (isCaseAnswered) {
                                borderBadgeClass = isCaseCorrect
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-400"
                                    : "bg-red-50 text-red-800 border-red-300 hover:border-red-400";
                            }

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectCase(idx)}
                                    className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border cursor-pointer ${borderBadgeClass}`}
                                >
                                    <IconComponent
                                        size={16}
                                        weight={isActive ? "bold" : "regular"}
                                    />
                                    <span>{item.tabTitle}</span>

                                    {isCaseAnswered && (
                                        <span className="shrink-0 flex items-center">
                                            {isCaseCorrect ? (
                                                <CheckCircle
                                                    size={16}
                                                    weight="fill"
                                                    className={
                                                        isActive
                                                            ? "text-white"
                                                            : "text-emerald-400"
                                                    }
                                                />
                                            ) : (
                                                <XCircle
                                                    size={16}
                                                    weight="fill"
                                                    className={
                                                        isActive
                                                            ? "text-white"
                                                            : "text-red-400"
                                                    }
                                                />
                                            )}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCase.id}
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -12 }
                        }
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden"
                    >
                        <div className="hidden sm:flex px-5 py-3 border-b border-gray-200 items-center justify-between text-xs bg-gray-50/90">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                <span className="ml-2 font-mono text-xs text-gray-500 hidden sm:inline">
                                    Mô phỏng các tình huống thực tế
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-white border border-gray-200 text-xs text-gray-700 font-medium shadow-xs">
                                    {currentCase.channelLabel}
                                </span>
                                <span className="text-gray-400 font-mono text-xs">
                                    {activeIdx + 1}/{caseScenarios.length}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 sm:p-7 md:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-200 mb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-sm shrink-0 ${currentCase.avatarBg}`}
                                    >
                                        {currentCase.avatarText}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-950 text-base leading-tight">
                                                {currentCase.senderName}
                                            </h3>
                                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 border border-red-200 text-red-700">
                                                Chưa xác minh
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                                            {currentCase.senderAddress}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                                    <LockKey
                                        size={14}
                                        className="text-gray-400"
                                    />
                                    <span>{currentCase.time}</span>
                                </div>
                            </div>

                            <div className="mb-7">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    {currentCase.channelType === "email" && (
                                        <EnvelopeSimple
                                            size={15}
                                            className="text-emerald-600"
                                        />
                                    )}
                                    {currentCase.channelType === "call" && (
                                        <PhoneCall
                                            size={15}
                                            className="text-emerald-600"
                                        />
                                    )}
                                    {(currentCase.channelType === "telegram" ||
                                        currentCase.channelType === "chat" ||
                                        currentCase.channelType === "zalo" ||
                                        currentCase.channelType ===
                                            "instagram") && (
                                        <ChatCircleDots
                                            size={15}
                                            className="text-emerald-600"
                                        />
                                    )}
                                    <span>Nội dung tin nhắn nhận được:</span>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 relative">
                                    {currentCase.subject && (
                                        <div className="text-xs font-semibold text-gray-600 pb-3 mb-3 border-b border-gray-200 flex items-center gap-2">
                                            <span className="text-gray-400">
                                                Chủ đề:
                                            </span>
                                            <span className="text-gray-900 font-medium">
                                                {currentCase.subject}
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-sans">
                                        {currentCase.hookMessage}
                                    </p>

                                    {currentCase.suspiciousLink && (
                                        <div className="mt-4 p-3 rounded-xl bg-red-50/80 border border-red-200 flex items-center justify-between gap-3">
                                            <div className="truncate min-w-0 flex-1">
                                                <div className="text-xs font-semibold text-red-700">
                                                    Liên kết đính kèm trong tin
                                                    nhắn:
                                                </div>
                                                <div className="font-mono text-xs text-red-600 underline underline-offset-2 truncate">
                                                    {currentCase.suspiciousLink}
                                                </div>
                                            </div>
                                            <span className="text-xs px-2.5 py-0.5 rounded bg-red-100 border border-red-200 text-red-800 font-semibold shrink-0">
                                                Độc hại
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-medium">
                                            Thủ đoạn kẻ gian áp dụng:
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                                            <Warning size={13} weight="bold" />
                                            {currentCase.tacticTag}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <h4 className="text-sm sm:text-base font-bold text-gray-950 flex items-center gap-2">
                                        <span>
                                            Quyết định xử lý của bạn là gì?
                                        </span>
                                        <span className="text-xs font-normal text-gray-500">
                                            {isAnswered
                                                ? ""
                                                : "(Chọn 1 phương án phản xạ)"}
                                        </span>
                                    </h4>

                                    {isAnswered && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleRetryCase}
                                                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-emerald-50 border border-emerald-200"
                                                title="Làm lại tình huống này"
                                            >
                                                <ArrowCounterClockwise
                                                    size={13}
                                                    weight="bold"
                                                />
                                                <span>Làm lại</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {currentCase.choices.map(
                                        (choice, choiceIdx) => {
                                            const isSelected =
                                                selectedChoiceIdx === choiceIdx;

                                            let cardStyle =
                                                "bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-gray-900 cursor-pointer shadow-xs active:scale-[0.99]";

                                            if (isAnswered) {
                                                if (isSelected) {
                                                    cardStyle = choice.isCorrect
                                                        ? "bg-emerald-50/70 border-2 border-emerald-500 text-emerald-950 shadow-sm cursor-default"
                                                        : "bg-red-50/70 border-2 border-red-500 text-red-950 shadow-sm cursor-default";
                                                } else {
                                                    cardStyle = choice.isCorrect
                                                        ? "bg-emerald-50/30 border-2 border-emerald-300 text-emerald-900 cursor-default"
                                                        : "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-60 cursor-default";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={choice.id}
                                                    type="button"
                                                    disabled={isAnswered}
                                                    onClick={() =>
                                                        handleChooseOption(
                                                            choiceIdx,
                                                        )
                                                    }
                                                    className={`text-left p-3.5 sm:p-4.5 rounded-2xl border transition-all relative flex flex-col justify-between min-h-[88px] sm:min-h-[96px] ${cardStyle}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span
                                                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                                                                isAnswered &&
                                                                isSelected
                                                                    ? choice.isCorrect
                                                                        ? "bg-emerald-600 text-white"
                                                                        : "bg-red-600 text-white"
                                                                    : "bg-gray-100 border border-gray-300 text-gray-700"
                                                            }`}
                                                        >
                                                            {choiceIdx === 0
                                                                ? "A"
                                                                : "B"}
                                                        </span>
                                                        <span className="text-sm sm:text-base font-medium leading-snug">
                                                            {choice.label}
                                                        </span>
                                                    </div>

                                                    {isAnswered && (
                                                        <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
                                                            <span
                                                                className={`font-semibold flex items-center gap-1 ${
                                                                    choice.isCorrect
                                                                        ? "text-emerald-700"
                                                                        : "text-red-700"
                                                                }`}
                                                            >
                                                                {choice.isCorrect ? (
                                                                    <>
                                                                        <CheckCircle
                                                                            size={
                                                                                15
                                                                            }
                                                                            weight="fill"
                                                                        />
                                                                        Hành
                                                                        động An
                                                                        Toàn
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <XCircle
                                                                            size={
                                                                                15
                                                                            }
                                                                            weight="fill"
                                                                        />
                                                                        Sập Bẫy
                                                                        Lừa Đảo
                                                                    </>
                                                                )}
                                                            </span>
                                                            {isSelected && (
                                                                <span className="text-xs text-gray-500 font-mono">
                                                                    (Lựa chọn
                                                                    của bạn)
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            </div>

                            <AnimatePresence>
                                {isAnswered && currentChoice && (
                                    <motion.div
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 1 }
                                                : { opacity: 0, height: 0 }
                                        }
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { opacity: 0, height: 0 }
                                        }
                                        transition={{
                                            duration: 0.28,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="space-y-4 pt-2"
                                    >
                                        <div
                                            className={`p-5 rounded-2xl border ${
                                                currentChoice.isCorrect
                                                    ? "bg-emerald-50 border-emerald-300"
                                                    : "bg-red-50 border-red-300"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3.5">
                                                {currentChoice.isCorrect ? (
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                                                        <ShieldCheck
                                                            size={24}
                                                            weight="fill"
                                                            className="text-emerald-700"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center shrink-0">
                                                        <WarningOctagon
                                                            size={24}
                                                            weight="fill"
                                                            className="text-red-700"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <h5
                                                            className={`text-base font-bold ${
                                                                currentChoice.isCorrect
                                                                    ? "text-emerald-900"
                                                                    : "text-red-900"
                                                            }`}
                                                        >
                                                            {currentChoice.isCorrect
                                                                ? "BẠN ĐÃ XỬ LÝ CHÍNH XÁC: AN TOÀN TUYỆT ĐỐI!"
                                                                : "BẠN ĐÃ SẬP BẪY LỪA ĐẢO NGUY HIỂM!"}
                                                        </h5>
                                                        <span
                                                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                                                                currentChoice.isCorrect
                                                                    ? "bg-emerald-200/80 text-emerald-900"
                                                                    : "bg-red-200/80 text-red-900"
                                                            }`}
                                                        >
                                                            {
                                                                currentChoice.lossDetail
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2">
                                                        {
                                                            currentChoice.explanation
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                                                    Bẫy tâm lý kẻ gian giăng ra
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                    {
                                                        currentCase
                                                            .trapBreakdown
                                                            .psychology
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <div className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">
                                                    Dấu hiệu bóc trần (Red Flag)
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                    {
                                                        currentCase
                                                            .trapBreakdown
                                                            .redFlag
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                                                    Quy tắc vàng phòng thủ
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                    {
                                                        currentCase
                                                            .trapBreakdown
                                                            .goldenRule
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={handleRetryCase}
                                                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-300 hover:border-gray-400 active:scale-[0.98] shadow-xs"
                                            >
                                                <ArrowCounterClockwise
                                                    size={16}
                                                />
                                                <span>
                                                    Làm lại tình huống này
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleNextCase}
                                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                                            >
                                                <span>
                                                    Tình huống tiếp theo
                                                </span>
                                                <ArrowRight
                                                    size={16}
                                                    weight="bold"
                                                />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-center gap-2 mt-8">
                    {caseScenarios.map((item, i) => {
                        const isCurrent = i === activeIdx;
                        const answer = userAnswers[item.id];
                        const isCaseAnswered = answer !== undefined;
                        const isCaseCorrect =
                            isCaseAnswered && answer.isCorrect;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelectCase(i)}
                                className="py-3 px-1.5 flex items-center justify-center cursor-pointer group"
                                aria-label={`Xem tình huống ${i + 1}`}
                            >
                                <span
                                    className={`h-2 rounded-full transition-all block ${
                                        isCurrent
                                            ? "w-8 bg-emerald-500"
                                            : isCaseAnswered
                                              ? isCaseCorrect
                                                  ? "w-2.5 bg-emerald-500"
                                                  : "w-2.5 bg-red-500"
                                              : "w-2 bg-gray-300 group-hover:bg-gray-400"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
