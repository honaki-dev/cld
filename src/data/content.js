// Dữ liệu các loại lừa đảo phổ biến
export const scamTypes = [
    {
        id: "phishing",
        title: "Lừa đảo Phishing",
        shortDesc: "Giả mạo tổ chức uy tín để đánh cắp thông tin đăng nhập",
        icon: "FishSimple",
        color: "danger",
        severity: "high",
        tags: ["Email", "SMS", "Link giả"],
        signs: [
            "Email/SMS từ tên giống ngân hàng nhưng địa chỉ lạ",
            "Link có ký tự thêm: vietcom-bank.com, agribank.xyz",
            "Yêu cầu nhập OTP, mật khẩu ngay lập tức",
            "Cảnh báo 'tài khoản bị khóa' tạo áp lực thời gian",
        ],
        howToAvoid: [
            "Không click link trong email/SMS lạ",
            "Tự gõ địa chỉ ngân hàng vào trình duyệt",
            "Kiểm tra domain kỹ trước khi nhập thông tin",
            "Ngân hàng KHÔNG bao giờ hỏi OTP qua điện thoại",
        ],
        caseStudy: {
            title: "Bạn nhận được email từ 'Vietcombank'",
            scenario:
                "Email thông báo tài khoản của bạn bị đăng nhập từ nước ngoài. Yêu cầu xác minh ngay qua link đính kèm trong vòng 24h, nếu không sẽ bị khóa.",
            trapDetail: "Link dẫn đến vietcom-bank.com.verify.xyz - không phải vietcombank.com.vn thật",
            correctAction: "Gọi hotline 1800 1234 hoặc vào app chính thức để kiểm tra",
        },
    },
    {
        id: "otp-scam",
        title: "Lừa đảo OTP",
        shortDesc: "Giả làm nhân viên ngân hàng/công an xin mã OTP",
        icon: "Phone",
        color: "danger",
        severity: "high",
        tags: ["Điện thoại", "OTP", "Giả mạo"],
        signs: [
            "Gọi xưng là nhân viên ngân hàng, công an, thuế",
            "Thông báo có lệnh điều tra hoặc nợ thuế",
            "Yêu cầu cài app lạ 'để xác minh'",
            "Nói chuyện khẩn cấp, không cho suy nghĩ",
        ],
        howToAvoid: [
            "KHÔNG bao giờ đọc OTP cho bất kỳ ai",
            "Cúp máy và gọi lại số hotline chính thức",
            "Công an/ngân hàng không gọi điện xin OTP",
            "Không cài app theo yêu cầu người lạ qua điện thoại",
        ],
        caseStudy: {
            title: "Cuộc gọi từ 'Ngân hàng Nhà nước'",
            scenario:
                "Giọng nữ chuyên nghiệp gọi, nói tài khoản bạn liên quan đến đường dây rửa tiền. Cần xác minh ngay bằng cách đọc mã OTP vừa gửi.",
            trapDetail: "Họ đã thử đăng nhập vào tài khoản bạn - OTP là mã xác nhận giao dịch của CHÍNH BẠN",
            correctAction: "Không đọc OTP. Gọi lại 1900 54 54 15 (hotline ngân hàng thật)",
        },
    },
    {
        id: "job-scam",
        title: "Lừa đảo Việc làm",
        shortDesc: "Việc nhẹ lương cao, làm online tại nhà, tuyển cộng tác viên",
        icon: "Briefcase",
        color: "primary",
        severity: "medium",
        tags: ["Facebook", "Zalo", "Telegram"],
        signs: [
            "Thu nhập 5-20 triệu/ngày chỉ làm vài giờ",
            "Nhiệm vụ 'like, share, đánh giá 5 sao'",
            "Phải nộp tiền trước để 'kích hoạt nhiệm vụ'",
            "Tạo nhóm Telegram riêng với nhiều 'đồng nghiệp ảo'",
        ],
        howToAvoid: [
            "Không có việc nào lương 20 triệu/ngày chỉ click",
            "Tuyệt đối không nộp tiền trước khi nhận lương",
            "Xác minh công ty qua tìm kiếm Google độc lập",
            "Rút tiền thật trước khi làm thêm nhiệm vụ",
        ],
        caseStudy: {
            title: "Việc làm 'review sản phẩm' trên Zalo",
            scenario:
                "Được mời vào nhóm Zalo review sản phẩm, những người khác đang rút tiền đều đặn. Sau 2 nhiệm vụ đầu thắng thật 200k, đến nhiệm vụ 3 cần nộp 2 triệu để làm.",
            trapDetail: "200k ban đầu là mồi. Những 'người khác' trong nhóm đều là tài khoản giả của kẻ lừa đảo",
            correctAction: "Rút tiền ngay lần đầu. Nếu bị yêu cầu nộp tiền - đó là lừa đảo, thoát ngay",
        },
    },
    {
        id: "investment-scam",
        title: "Lừa đảo Đầu tư",
        shortDesc: "Sàn chứng khoán/crypto/forex giả, lãi suất khủng",
        icon: "ChartLine",
        color: "danger",
        severity: "high",
        tags: ["Crypto", "Forex", "Sàn giả"],
        signs: [
            "Hứa lãi 20-50%/tháng, không rủi ro",
            "Người thân/bạn bè giới thiệu (đã bị lừa trước)",
            "App sàn chỉ tải từ link riêng, không có trên Store",
            "Lợi nhuận hiển thị đẹp nhưng không rút được tiền",
        ],
        howToAvoid: [
            "Lãi hơn 10%/năm đã là rủi ro cao, 50%/tháng là lừa đảo",
            "Chỉ dùng sàn được Ủy ban Chứng khoán cấp phép",
            "Test rút tiền nhỏ trước khi nạp nhiều",
            "Không tin người lạ kết bạn rồi tư vấn đầu tư",
        ],
        caseStudy: {
            title: "Người đẹp kết bạn rồi tư vấn sàn crypto",
            scenario:
                "Người lạ kết bạn Facebook, hỏi thăm rồi chia sẻ 'sàn crypto bí mật' mà họ đang kiếm 30%/tuần. Mời tham gia cùng, ban đầu thắng thật.",
            trapDetail:
                "Sàn giả hoàn toàn, số dư ảo. Khi bạn nạp đủ số tiền lớn, họ chặn liên lạc và bỏ trốn.",
            correctAction: "Kiểm tra sàn tại sse.com.vn (Ủy ban Chứng khoán). Chặn ngay người lạ tư vấn đầu tư",
        },
    },
    {
        id: "romance-scam",
        title: "Lừa đảo Tình cảm",
        shortDesc: "Kết bạn, xây dựng tình cảm rồi mượn tiền/lừa đầu tư",
        icon: "Heart",
        color: "danger",
        severity: "medium",
        tags: ["Mạng xã hội", "Tình cảm", "Tâm lý"],
        signs: [
            "Người nước ngoài điển trai/xinh đẹp kết bạn ngẫu nhiên",
            "Nhanh chóng thể hiện tình cảm sau vài ngày nhắn tin",
            "Luôn có lý do không gặp mặt (công tác, bệnh...)",
            "Xin tiền khẩn cấp vì tai nạn, mắc kẹt ở nước ngoài",
        ],
        howToAvoid: [
            "Video call thật sự trước khi tin tưởng bất kỳ ai online",
            "Tìm kiếm ảnh của họ bằng Google Image Search",
            "Không bao giờ chuyển tiền cho người chưa gặp mặt",
            "Hỏi ý kiến người thân khi phát triển tình cảm online",
        ],
        caseStudy: {
            title: "Kỹ sư Mỹ làm việc tại Singapore",
            scenario:
                "Anh ấy kết bạn Facebook, nói làm kỹ sư dầu khí ở Singapore. Sau 2 tháng nhắn tin mỗi ngày, anh xin mượn 50 triệu vì tai nạn trên giàn khoan.",
            trapDetail:
                "Ảnh lấy từ tài khoản người khác. Không có kỹ sư nào thật. Đây là băng nhóm người Nigeria chuyên lừa đảo tình cảm.",
            correctAction: "Yêu cầu video call không báo trước. Dùng Google Lens kiểm tra ảnh profile",
        },
    },
    {
        id: "impersonation",
        title: "Giả mạo Người thân",
        shortDesc: "Hack tài khoản hoặc clone để mượn tiền bạn bè, gia đình",
        icon: "UserSwitch",
        color: "primary",
        severity: "medium",
        tags: ["Facebook", "Zalo", "Hack tài khoản"],
        signs: [
            "Bạn bè/người thân nhắn tin mượn tiền đột ngột",
            "Giọng văn khác lạ, không dùng từ quen thuộc",
            "Yêu cầu chuyển tiền gấp vì lý do khẩn cấp",
            "Không nghe điện thoại, chỉ nhắn tin",
        ],
        howToAvoid: [
            "Gọi điện trực tiếp xác nhận TRƯỚC KHI chuyển tiền",
            "Đặt câu hỏi cá nhân mà chỉ người thật biết",
            "Chuyển khoản qua số TK đã biết trước, không theo link mới",
            "Thông báo cho người thân biết tài khoản bị giả mạo",
        ],
        caseStudy: {
            title: "Tin nhắn Zalo từ 'anh trai' mượn tiền",
            scenario:
                "Tài khoản Zalo của anh trai (ảnh, tên giống hệt) nhắn: 'Em ơi cho anh mượn 5 triệu gấp, anh đang ở bệnh viện, chuyển khoản tài khoản này nhé'.",
            trapDetail:
                "Tài khoản anh trai thật đã bị hack hoặc kẻ xấu tạo clone. Số tài khoản ngân hàng là của kẻ lừa đảo.",
            correctAction: "Gọi điện số điện thoại của anh trai (không qua Zalo). Xác nhận mới chuyển tiền.",
        },
    },
];

// Dữ liệu quiz
export const quizData = [
    {
        id: 1,
        category: "Phishing",
        difficulty: "easy",
        question: "Bạn nhận được email từ 'support@vietcom-bank.com.vn.verify.info' yêu cầu xác minh tài khoản. Bạn sẽ làm gì?",
        options: [
            { id: "a", text: "Click vào link trong email và nhập thông tin để xác minh" },
            { id: "b", text: "Gọi hotline ngân hàng để hỏi, không click link" },
            { id: "c", text: "Chuyển tiếp email cho người thân" },
            { id: "d", text: "Trả lời email hỏi thêm thông tin" },
        ],
        correctAnswer: "b",
        explanation:
            "Domain 'vietcom-bank.com.vn.verify.info' không phải của Vietcombank thật (phải là vietcombank.com.vn). Luôn gọi hotline chính thức thay vì click link trong email lạ.",
        tip: "Kiểm tra domain: phần sau dấu '@' phải là tên miền chính thức của tổ chức",
    },
    {
        id: 2,
        category: "OTP",
        difficulty: "easy",
        question: "Người tự xưng là nhân viên ngân hàng gọi điện nói tài khoản bạn bị đánh cắp và yêu cầu đọc mã OTP để 'khóa tài khoản khẩn cấp'. Bạn nên?",
        options: [
            { id: "a", text: "Đọc OTP để bảo vệ tài khoản ngay lập tức" },
            { id: "b", text: "Yêu cầu họ cho biết mã nhân viên rồi mới đọc" },
            { id: "c", text: "Cúp máy, gọi lại hotline chính thức của ngân hàng" },
            { id: "d", text: "Đọc OTP nhưng chỉ đọc 3 số đầu" },
        ],
        correctAnswer: "c",
        explanation:
            "Ngân hàng KHÔNG BAO GIỜ gọi điện yêu cầu OTP. OTP là mã bí mật chỉ dành cho bạn. Nếu bạn đọc OTP, kẻ xấu sẽ lập tức thực hiện giao dịch chuyển tiền.",
        tip: "OTP = Mật khẩu chỉ dùng 1 lần. Không chia sẻ với BẤT KỲ AI",
    },
    {
        id: 3,
        category: "Việc làm",
        difficulty: "medium",
        question: "Bạn được mời làm 'cộng tác viên online': like fanpage, thu nhập 500k/buổi 2 tiếng. Nhiệm vụ đầu tiên cần nộp 200k 'phí kích hoạt'. Đây là dấu hiệu gì?",
        options: [
            { id: "a", text: "Việc bình thường, phí kích hoạt là lệ phí hành chính" },
            { id: "b", text: "Có thể là lừa đảo, cần nộp ít để test trước" },
            { id: "c", text: "Đây là dấu hiệu lừa đảo - việc thật không thu phí người lao động" },
            { id: "d", text: "Cần hỏi thêm thông tin công ty rồi quyết định" },
        ],
        correctAnswer: "c",
        explanation:
            "Không có công ty tuyển dụng hợp lệ nào thu phí của người lao động trước khi làm việc. Yêu cầu 'phí kích hoạt' là dấu hiệu lừa đảo 100%.",
        tip: "Nguyên tắc vàng: Công ty trả tiền cho bạn, không phải ngược lại",
    },
    {
        id: 4,
        category: "Đầu tư",
        difficulty: "medium",
        question: "Người bạn mới quen online giới thiệu sàn crypto với lợi nhuận 15%/tuần, không rủi ro, đã kiếm được 50 triệu. Bạn sẽ?",
        options: [
            { id: "a", text: "Nạp tiền ngay vì bạn đã làm được" },
            { id: "b", text: "Nạp số ít để test, thắng thì nạp thêm" },
            { id: "c", text: "Không tham gia - lãi 15%/tuần là bất khả thi và không có đầu tư nào không rủi ro" },
            { id: "d", text: "Hỏi thêm người trong nhóm xem họ thế nào" },
        ],
        correctAnswer: "c",
        explanation:
            "15%/tuần = 780%/năm. Không có khoản đầu tư hợp pháp nào cho lợi nhuận như vậy. Đây là mô hình Ponzi hoặc sàn ảo. Những người trong nhóm 'đã thắng' đều là tài khoản giả.",
        tip: "Lợi nhuận càng cao, rủi ro càng lớn. Lãi 10%/năm đã là tốt, lãi 15%/tuần là lừa đảo",
    },
    {
        id: 5,
        category: "Giả mạo",
        difficulty: "easy",
        question: "Tài khoản Zalo của người bạn thân nhắn tin mượn 3 triệu gấp vì tai nạn xe. Bước ĐÚNG nhất là?",
        options: [
            { id: "a", text: "Chuyển tiền ngay vì bạn thân đang cần" },
            { id: "b", text: "Chuyển 1 triệu trước, hỏi thêm rồi chuyển nốt" },
            { id: "c", text: "Gọi điện trực tiếp cho bạn để xác nhận, không qua Zalo" },
            { id: "d", text: "Nhắn lại hỏi thêm thông tin qua Zalo" },
        ],
        correctAnswer: "c",
        explanation:
            "Tài khoản Zalo có thể bị hack hoặc clone. Cách xác minh duy nhất đáng tin là gọi điện thoại thật. Nếu đúng là bạn cần giúp, bạn sẽ nghe máy.",
        tip: "Trước khi chuyển tiền cho ai: GỌI ĐIỆN xác nhận, không nhắn tin xác nhận",
    },
    {
        id: 6,
        category: "Phishing",
        difficulty: "hard",
        question: "Link nào sau đây có thể là link ngân hàng THẬT?",
        options: [
            { id: "a", text: "vietcombank.com.vn.secure-login.net" },
            { id: "b", text: "https://www.vietcombank.com.vn" },
            { id: "c", text: "vietcombankk.com.vn" },
            { id: "d", text: "vietcombank-online.com" },
        ],
        correctAnswer: "b",
        explanation:
            "Chỉ 'https://www.vietcombank.com.vn' là domain chính thức. Các link còn lại: (a) có 'secure-login.net' sau - đây mới là domain thật; (c) có 'kk' thay vì 'k'; (d) thêm '-online' không có trong domain thật.",
        tip: "Domain thật kết thúc tại .com.vn hoặc .vn - mọi thứ sau đó đều đáng ngờ",
    },
    {
        id: 7,
        category: "Tổng hợp",
        difficulty: "medium",
        question: "Bạn nhận được SMS: 'Tai khoan Agribank cua ban co nguy co bi khoa. Truy cap http://agribnk-verify.com de cap nhat'. Dấu hiệu lừa đảo ở đây là?",
        options: [
            { id: "a", text: "Chỉ có domain lạ" },
            { id: "b", text: "SMS không dấu tiếng Việt và domain giả mạo" },
            { id: "c", text: "Chỉ vì SMS không dấu" },
            { id: "d", text: "Tin nhắn này có vẻ thật" },
        ],
        correctAnswer: "b",
        explanation:
            "Có 2 dấu hiệu: (1) Agribank luôn gửi SMS có dấu tiếng Việt đầy đủ từ đầu số chính thức; (2) 'agribnk-verify.com' không phải domain của Agribank (phải là agribank.com.vn). Cả hai đều là dấu hiệu lừa đảo.",
        tip: "Ngân hàng Việt Nam gửi SMS có dấu và từ đầu số cố định đã đăng ký",
    },
    {
        id: 8,
        category: "Tình cảm",
        difficulty: "hard",
        question: "Người bạn quen online 3 tháng, chưa gặp mặt, bây giờ gửi link tải app đầu tư mà 'chỉ họ mới biết'. Bạn nên?",
        options: [
            { id: "a", text: "Tải app vì người thân giới thiệu thì đáng tin" },
            { id: "b", text: "Tải nhưng chỉ nạp ít tiền thử" },
            { id: "c", text: "Từ chối - người chưa gặp mặt giới thiệu app đầu tư là dấu hiệu lừa đảo" },
            { id: "d", text: "Hỏi họ kiếm được bao nhiêu rồi quyết định" },
        ],
        correctAnswer: "c",
        explanation:
            "Kết hợp 2 dấu hiệu nguy hiểm: (1) Người chưa từng gặp mặt; (2) Link tải app riêng không qua App Store/Google Play. Đây là dấu hiệu đặc trưng của lừa đảo tình cảm kết hợp lừa đảo đầu tư.",
        tip: "App hợp lệ có trên App Store/Google Play với đánh giá thật. App chỉ có link riêng là app giả",
    },
    {
        id: 9,
        category: "OTP",
        difficulty: "hard",
        question: "Bạn đang đăng nhập ngân hàng online thì nhận OTP nhưng bạn KHÔNG thực hiện giao dịch nào. Điều này nghĩa là?",
        options: [
            { id: "a", text: "Hệ thống tự gửi OTP định kỳ để kiểm tra" },
            { id: "b", text: "Tài khoản của bạn đang bị ai đó cố đăng nhập - thay mật khẩu ngay" },
            { id: "c", text: "OTP gửi nhầm, bỏ qua" },
            { id: "d", text: "Báo cho ngân hàng sau khi nhận thêm OTP lần nữa" },
        ],
        correctAnswer: "b",
        explanation:
            "OTP chỉ gửi khi có ai đó đang thực hiện hành động. Nếu bạn không làm gì mà nhận OTP - tài khoản bạn đang bị tấn công. Thay mật khẩu NGAY và gọi hotline ngân hàng.",
        tip: "Nhận OTP không mong đợi = Có người đang xâm nhập tài khoản bạn",
    },
    {
        id: 10,
        category: "Tổng hợp",
        difficulty: "medium",
        question: "Cách nào KHÔNG giúp bảo vệ bạn khỏi lừa đảo?",
        options: [
            { id: "a", text: "Bật xác thực 2 yếu tố (2FA) cho tài khoản quan trọng" },
            { id: "b", text: "Dùng mật khẩu khác nhau cho mỗi tài khoản" },
            { id: "c", text: "Chia sẻ OTP cho nhân viên hỗ trợ kỹ thuật qua điện thoại" },
            { id: "d", text: "Kiểm tra URL trước khi nhập thông tin đăng nhập" },
        ],
        correctAnswer: "c",
        explanation:
            "Chia sẻ OTP là hành động nguy hiểm nhất. Hỗ trợ kỹ thuật THẬT không bao giờ cần OTP của bạn. Các phương án a, b, d đều là cách bảo vệ tốt.",
        tip: "OTP và mật khẩu là bí mật tuyệt đối - không chia sẻ ngay cả với nhân viên hỗ trợ",
    },
];

// Checklist an toàn mạng
export const safetyChecklist = [
    {
        category: "Mật khẩu & Tài khoản",
        icon: "Lock",
        color: "info",
        items: [
            { id: "pwd-1", text: "Dùng mật khẩu khác nhau cho mỗi tài khoản quan trọng" },
            { id: "pwd-2", text: "Mật khẩu dài ít nhất 12 ký tự, có chữ hoa, số, ký tự đặc biệt" },
            { id: "pwd-3", text: "Bật xác thực 2 yếu tố (2FA) cho ngân hàng, email, mạng xã hội" },
            { id: "pwd-4", text: "Không dùng ngày sinh, tên, số điện thoại làm mật khẩu" },
            { id: "pwd-5", text: "Đổi mật khẩu ngay nếu nghi ngờ bị lộ" },
        ],
    },
    {
        category: "Giao dịch ngân hàng",
        icon: "CreditCard",
        color: "safe",
        items: [
            { id: "bank-1", text: "Tự gõ địa chỉ ngân hàng, không click link trong email/SMS" },
            { id: "bank-2", text: "Kiểm tra URL bắt đầu bằng https:// và đúng tên miền" },
            { id: "bank-3", text: "Không thực hiện giao dịch qua wifi công cộng" },
            { id: "bank-4", text: "Gọi hotline xác nhận nếu nhận OTP không mong đợi" },
            { id: "bank-5", text: "Bật thông báo SMS/email cho mọi giao dịch" },
        ],
    },
    {
        category: "Mạng xã hội",
        icon: "Users",
        color: "primary",
        items: [
            { id: "social-1", text: "Đặt tài khoản ở chế độ riêng tư, hạn chế thông tin công khai" },
            { id: "social-2", text: "Không chấp nhận kết bạn với người không quen biết" },
            { id: "social-3", text: "Kiểm tra ảnh người lạ bằng Google Image Search" },
            { id: "social-4", text: "Không đăng thông tin cá nhân: CMND, địa chỉ, lịch trình" },
            { id: "social-5", text: "Xác minh bằng điện thoại trước khi chuyển tiền theo yêu cầu online" },
        ],
    },
    {
        category: "Thiết bị & Phần mềm",
        icon: "DeviceMobile",
        color: "info",
        items: [
            { id: "device-1", text: "Cập nhật hệ điều hành và ứng dụng thường xuyên" },
            { id: "device-2", text: "Chỉ tải app từ App Store hoặc Google Play chính thức" },
            { id: "device-3", text: "Không cài app từ link lạ, file APK không rõ nguồn gốc" },
            { id: "device-4", text: "Không cho người lạ điều khiển máy tính từ xa (AnyDesk, TeamViewer)" },
            { id: "device-5", text: "Xóa ngay ứng dụng lạ nếu bị cài mà không biết" },
        ],
    },
    {
        category: "Khi nghi ngờ bị lừa",
        icon: "Warning",
        color: "danger",
        items: [
            { id: "action-1", text: "Dừng mọi giao dịch ngay lập tức" },
            { id: "action-2", text: "Liên hệ ngân hàng hotline để khóa thẻ/tài khoản" },
            { id: "action-3", text: "Báo cáo tại canhbao.ncsc.gov.vn (Trung tâm ứng cứu mạng quốc gia)" },
            { id: "action-4", text: "Lưu lại bằng chứng: ảnh chụp màn hình, số điện thoại, tài khoản nhận tiền" },
            { id: "action-5", text: "Trình báo cơ quan công an gần nhất" },
        ],
    },
];

// Số liệu thống kê (nguồn tham khảo: Bộ Công An, VNCERT)
export const stats = [
    { value: "16.000+", target: 16000, suffix: "+", label: "Vụ lừa đảo mạng năm 2023", color: "danger" },
    { value: "3.900 tỷ", target: 3900, suffix: " tỷ", label: "Thiệt hại ước tính trong 6 tháng đầu 2023", color: "danger" },
    { value: "24", target: 24, suffix: "", label: "Hình thức lừa đảo phổ biến được ghi nhận", color: "primary" },
    { value: "91%", target: 91, suffix: "%", label: "Vụ việc bắt đầu từ điện thoại & mạng xã hội", color: "info" },
];

// Các nguồn hỗ trợ / hotline
export const emergencyContacts = [
    { name: "Cổng cảnh báo an toàn thông tin quốc gia", url: "https://canhbao.ncsc.gov.vn", icon: "ShieldCheck" },
    { name: "Chống Lừa Đảo", url: "https://chongluadao.vn", icon: "ShieldCheck" },
    { name: "CheckLegit - Kiểm tra lừa đảo", url: "https://checklegit.com.vn", icon: "MagnifyingGlass" },
    { name: "Đường dây nóng tội phạm công nghệ cao: 113", url: "tel:113", icon: "Phone" },
    { name: "Hotline an toàn thông tin: 1900 0123", url: "tel:19000123", icon: "Phone" },
];

