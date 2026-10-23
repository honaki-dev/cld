export const scamTypes = [
    {
        id: "phishing",
        title: "Giả mạo website & email (Phishing)",
        shortDesc:
            "Lập website và gửi email giả danh ngân hàng, cơ quan nhà nước để chiếm đoạt thông tin đăng nhập",
        icon: "FishSimple",
        color: "danger",
        severity: "high",
        tags: ["Email giả", "SMS Brandname", "Link độc hại"],
        signs: [
            "Tên người gửi gần giống ngân hàng nhưng địa chỉ email có đuôi lạ (@vietcom-bank.xyz, @gmail.com)",
            "Tên miền đường link chèn thêm ký tự: vietcombank.com.vn.verify-otp.net hoặc agribank-portal.top",
            "Nội dung mang tính đe dọa: Cảnh báo tài khoản bị khóa trong 24 giờ để ép người dùng bấm link ngay",
            "Giao diện trang đích yêu cầu nhập toàn bộ mật khẩu, mã OTP và thông tin thẻ thanh toán",
        ],
        howToAvoid: [
            "Không nhấp vào bất kỳ đường link nào gửi qua tin nhắn SMS hoặc email chưa được đối soát",
            "Tự nhập trực tiếp tên miền chính thức của ngân hàng vào thanh địa chỉ của trình duyệt",
            "Kiểm tra kỹ tên miền gốc: Các trang web ngân hàng Việt Nam thường có đuôi .com.vn hoặc .vn",
            "Cài đặt và giao dịch hoàn toàn trên ứng dụng ngân hàng di động chính thức",
        ],
        caseStudy: {
            title: "Cảnh báo email giả danh Vietcombank yêu cầu xác thực tài khoản",
            scenario:
                "Bạn nhận được email thông báo tài khoản đang bị xâm nhập từ nước ngoài, yêu cầu bấm vào đường link đính kèm trong 24 giờ để xác minh, nếu không tài khoản sẽ bị đóng băng vĩnh viễn.",
            trapDetail:
                "Đường link thực tế dẫn đến vietcom-bank.com.verify.xyz, hoàn toàn không phải trang vietcombank.com.vn chính thức.",
            correctAction:
                "Không bấm vào đường link. Mở ứng dụng ngân hàng chính thức để kiểm tra hoặc gọi hotline in trên mặt sau thẻ ATM.",
        },
    },
    {
        id: "otp-scam",
        title: "Cuộc gọi chiếm đoạt mã OTP",
        shortDesc:
            "Mạo danh công an, kiểm sát viên hoặc nhân viên ngân hàng gọi điện đe dọa và yêu cầu đọc mã OTP",
        icon: "Phone",
        color: "danger",
        severity: "high",
        tags: ["Cuộc gọi đe dọa", "Chiếm đoạt OTP", "Mạo danh công an"],
        signs: [
            "Kẻ gọi tự xưng là cán bộ công an, viện kiểm sát, cán bộ thuế hoặc tổng đài ngân hàng",
            "Thông báo bạn liên quan đến đường dây rửa tiền, mua bán trái phép hoặc có lệnh bắt giam",
            "Thúc ép giữ máy liên tục, cấm không được ngắt cuộc gọi hoặc trao đổi với người thân",
            "Yêu cầu đọc mã OTP vừa gửi về điện thoại với lý do 'xác minh tài khoản sạch'",
        ],
        howToAvoid: [
            "Tuyệt đối không đọc hoặc chuyển tiếp mã xác thực OTP cho bất kỳ ai dưới mọi hình thức",
            "Ghi nhớ: Cơ quan công an và viện kiểm sát không làm việc hay yêu cầu chuyển tiền qua điện thoại",
            "Chủ động cúp máy ngay lập tức khi phát hiện cuộc gọi có dấu hiệu đe dọa hoặc thúc ép",
            "Không làm theo hướng dẫn chuyển tiền vào bất kỳ 'tài khoản tạm giữ của cơ quan điều tra'",
        ],
        caseStudy: {
            title: "Cuộc gọi mạo danh cán bộ điều tra yêu cầu kiểm tra dòng tiền",
            scenario:
                "Người tự xưng cán bộ điều tra Bộ Công An gọi đến thông báo số CCCD của bạn liên quan đến vụ án ma túy xuyên quốc gia, yêu cầu kê khai số dư và đọc mã OTP gửi về máy để chứng minh không nhận hối lộ.",
            trapDetail:
                "Kẻ gian đang tự thao tác đăng nhập tài khoản của bạn. Mã OTP gửi về chính là lệnh ủy quyền chuyển toàn bộ số dư của bạn sang tài khoản kẻ lừa đảo.",
            correctAction:
                "Cúp máy ngay. Ngân hàng và công an không bao giờ hỏi mã OTP của công dân.",
        },
    },
    {
        id: "job-scam",
        title: "Bẫy tuyển cộng tác viên online",
        shortDesc:
            "Mồi chài làm nhiệm vụ review đơn hàng, thả tim nhận hoa hồng rồi ép nạp tiền cọc tăng dần",
        icon: "Briefcase",
        color: "primary",
        severity: "medium",
        tags: ["Việc làm online", "Thả tim TikTok", "Nhiệm vụ Shopee"],
        signs: [
            "Hứa hẹn việc nhẹ lương cao từ 500.000đ đến 2.000.000đ mỗi ngày chỉ với vài thao tác trên điện thoại",
            "Cho phép rút tiền hoa hồng thật ở 1 đến 2 nhiệm vụ đầu tiên nhằm tạo lòng tin tuyệt đối",
            "Đến đơn hàng giá trị lớn, kẻ lừa đảo báo lỗi hệ thống và ép nạp thêm tiền cọc để nhận lại cả gốc lẫn lãi",
            "Đưa nạn nhân vào nhóm chat Telegram với nhiều thành viên giả liên tục khoe ảnh nhận tiền thành công",
        ],
        howToAvoid: [
            "Ghi nhớ nguyên tắc: Công ty tuyển dụng chân chính không bao giờ bắt ứng viên nạp tiền cọc trước",
            "Dừng ngay mọi thao tác ngay khi nhận được yêu cầu nạp tiền để kích hoạt nhiệm vụ tiếp theo",
            "Rút toàn bộ số tiền hiện có và rời khỏi tất cả các nhóm chat lôi kéo trên Telegram, Zalo",
            "Tìm hiểu kỹ thông tin pháp nhân doanh nghiệp qua Cổng thông tin quốc gia về đăng ký doanh nghiệp",
        ],
        caseStudy: {
            title: "Tuyển cộng tác viên xử lý đơn hàng Shopee Mall hưởng hoa hồng 30%",
            scenario:
                "Bạn được mời làm nhiệm vụ tạm ứng tiền mua đơn hàng ảo trên Shopee Mall. Hai đơn đầu 100.000đ và 300.000đ bạn đều được hoàn gốc kèm hoa hồng 30% rất nhanh. Đến đơn thứ ba trị giá 3.000.000đ, hệ thống báo bạn thao tác sai cú pháp và yêu cầu nạp thêm 6.000.000đ để gỡ lệnh khóa.",
            trapDetail:
                "Tiền hoa hồng ban đầu chỉ là mồi nhử. Các tài khoản cùng làm nhiệm vụ trong nhóm đều là tài khoản ảo do kẻ gian điều hành để tạo hiệu ứng tâm lý bầy đàn.",
            correctAction:
                "Không nạp thêm bất kỳ khoản tiền nào. Chấp nhận cắt lỗ số tiền đã chuyển và báo cáo tài khoản lừa đảo cho cơ quan chức năng.",
        },
    },
    {
        id: "investment-scam",
        title: "Bẫy sàn đầu tư tài chính & Tiền ảo",
        shortDesc:
            "Vẽ ra sàn giao dịch chứng khoán quốc tế hoặc tiền mã hóa với lời hứa bao lỗ và sinh lời khủng",
        icon: "ChartLine",
        color: "danger",
        severity: "high",
        tags: ["Sàn ảo", "Lợi nhuận cao", "Chứng khoán quốc tế"],
        signs: [
            "Cam kết lợi nhuận phi thực tế: 15% đến 30% mỗi tuần, cam kết hoàn vốn 100% không rủi ro",
            "Chuyên gia tự xưng liên tục khoe ảnh nhà lầu, xe sang và đưa ra chỉ báo 'đọc lệnh chắc thắng'",
            "Ứng dụng sàn không có mặt trên App Store hay Google Play, chỉ hướng dẫn cài bằng file link ngoài",
            "Bảng điện tử hiển thị lãi tăng rất nhanh nhưng khi đặt lệnh rút tiền thì bị đòi đủ loại phí phạt",
        ],
        howToAvoid: [
            "Hiểu rõ quy luật tài chính: Lợi nhuận kỳ vọng cao luôn đi kèm rủi ro lớn, cam kết bao lỗ 100% là bẫy lừa",
            "Chỉ mở tài khoản và giao dịch tại các công ty chứng khoán được Ủy ban Chứng khoán Nhà nước cấp phép",
            "Tuyệt đối không cài đặt ứng dụng từ các đường link chia sẻ ngoài các kho ứng dụng chính thức",
            "Chặn ngay các tài khoản người lạ nhắn tin tư vấn đầu tư tài chính sinh lời nhanh",
        ],
        caseStudy: {
            title: "Người lạ kết bạn gợi ý tham gia sàn tiền mã hóa sinh lời 25% mỗi tuần",
            scenario:
                "Một tài khoản xinh đẹp kết bạn làm quen qua mạng xã hội, tâm sự hàng ngày rồi giới thiệu bản thân đang có đội ngũ chuyên gia kéo tài khoản sàn crypto quốc tế. Họ hướng dẫn bạn nạp thử 5 triệu đồng và bảng điều khiển hiển thị tài khoản tăng lên 7 triệu đồng chỉ sau hai ngày.",
            trapDetail:
                "Toàn bộ bảng giá và số dư trên sàn đều do kẻ gian lập trình điều khiển từ hậu đài. Khi số tiền nạp đạt hàng trăm triệu đồng, kẻ gian sẽ khóa tài khoản và biến mất.",
            correctAction:
                "Từ chối mọi lời mời đầu tư từ người lạ trên mạng xã hội. Kiểm tra danh sách sàn giao dịch hợp pháp trên ssc.gov.vn.",
        },
    },
    {
        id: "romance-scam",
        title: "Bẫy lừa đảo tình cảm online",
        shortDesc:
            "Tạo dựng hồ sơ doanh nhân thành đạt, gắn kết tình cảm sâu đậm rồi viện lý do khẩn cấp để vay tiền",
        icon: "Heart",
        color: "danger",
        severity: "medium",
        tags: ["Tình cảm mạng", "Gửi quà ngoại tệ", "Tống tiền tình cảm"],
        signs: [
            "Hồ sơ mạng xã hội bóng bẩy: Bác sĩ quân y, kỹ sư giàn khoan, doanh nhân độc thân đang sống ở nước ngoài",
            "Chủ động bày tỏ tình cảm yêu đương rất nhanh chỉ sau vài ngày nhắn tin qua mạng",
            "Luôn tìm lý do né tránh gọi video đối thoại trực tiếp hoặc chỉ mở camera vài giây rồi tắt",
            "Đột ngột viện lý do khẩn cấp: Gặp tai nạn, hàng gửi tặng bị giữ ở hải quan cần tiền nộp phí giải cứu",
        ],
        howToAvoid: [
            "Luôn yêu cầu gọi video call rõ nét và đối thoại trực tiếp trước khi đặt niềm tin vào bất kỳ ai trên mạng",
            "Sử dụng công cụ tìm kiếm hình ảnh (Google Lens) để kiểm tra xem ảnh đại diện có bị đánh cắp hay không",
            "Tuyệt đối không chuyển tiền hoặc gửi thông tin cá nhân cho người chưa từng gặp mặt ngoài đời thực",
            "Chia sẻ với bạn bè hoặc người thân khi phát hiện đối phương bắt đầu hỏi mượn tiền hoặc nhờ nhận kiện hàng lạ",
        ],
        caseStudy: {
            title: "Kỹ sư nước ngoài gửi gói quà triệu USD bị hải quan tạm giữ",
            scenario:
                "Một người tự xưng là kỹ sư dầu khí người Anh nhắn tin làm quen qua mạng xã hội suốt 3 tháng. Anh ta ngỏ ý gửi về Việt Nam một kiện hàng chứa đồ trang sức và 500.000 USD tiền mặt để chuẩn bị làm đám cưới. Sau đó, một người tự xưng nhân viên hải quan sân bay gọi điện yêu cầu bạn nộp 30 triệu đồng tiền phí kiểm định hải quan để nhận quà.",
            trapDetail:
                "Kiện hàng và câu chuyện tình cảm hoàn toàn không có thật. Nhân viên hải quan gọi điện chính là đồng bọn của kẻ lừa đảo.",
            correctAction:
                "Không nộp bất kỳ khoản phí nào. Cơ quan hải quan không bao giờ yêu cầu chuyển tiền vào tài khoản cá nhân qua điện thoại.",
        },
    },
    {
        id: "impersonation",
        title: "Mạo danh người thân vay tiền gấp",
        shortDesc:
            "Chiếm quyền điều khiển tài khoản Facebook, Zalo hoặc dùng công nghệ Deepfake giọng nói để vay tiền khẩn cấp",
        icon: "UserSwitch",
        color: "primary",
        severity: "medium",
        tags: ["Hack nick Facebook", "Deepfake video", "Nhờ chuyển khoản"],
        signs: [
            "Tài khoản người thân hoặc bạn bè nhắn tin hỏi mượn tiền bất ngờ với lý do cấp bách: Cấp cứu, tai nạn, nộp học phí",
            "Văn phong trò chuyện gượng gạo, từ ngữ khác hẳn thói quen giao tiếp hàng ngày",
            "Né tránh nghe cuộc gọi thoại, viện cớ sóng yếu, đang họp hoặc camera điện thoại bị hỏng",
            "Cung cấp số tài khoản ngân hàng thụ hưởng mang tên người lạ hoàn toàn, không trùng tên người thân",
        ],
        howToAvoid: [
            "Bắt buộc gọi điện thoại trực tiếp vào số điện thoại viễn thông của người thân để nghe giọng xác nhận",
            "Đặt câu hỏi kiểm tra về các kỷ niệm hoặc thông tin riêng tư mà chỉ hai người mới biết",
            "Tuyệt đối không chuyển tiền vào tài khoản lạ đứng tên người khác dù người nhắn giải thích lý do gì",
            "Thông báo cho người thân và bạn bè chung ngay khi phát hiện tài khoản có dấu hiệu bị chiếm quyền",
        ],
        caseStudy: {
            title: "Tin nhắn Messenger mượn 10 triệu đồng từ tài khoản của bạn thân",
            scenario:
                "Tài khoản Facebook của bạn thân nhắn tin: 'Bạn ơi chuyển khoản giúp mình 10 triệu vào số tài khoản này được không, mình đang thanh toán tiền viện phí gấp mà tài khoản ngân hàng của mình bị lỗi ứng dụng'.",
            trapDetail:
                "Tài khoản Facebook của người bạn đã bị kẻ xấu đánh cắp qua link độc hại. Số tài khoản nhận tiền là tài khoản rác của kẻ lừa đảo.",
            correctAction:
                "Dừng lại, gọi ngay số điện thoại cá nhân thông thường của bạn mình để đối soát. Nếu gọi không được, tuyệt đối không chuyển tiền.",
        },
    },
];

export const quizData = [
    {
        id: 1,
        category: "Phishing",
        difficulty: "easy",
        question:
            "Bạn nhận được email từ địa chỉ 'support@vietcom-bank.com.vn.verify.info' yêu cầu cập nhật hồ sơ khách hàng. Hành động đúng nhất là gì?",
        options: [
            {
                id: "a",
                text: "Bấm vào đường link trong email để kiểm tra và điền thông tin",
            },
            {
                id: "b",
                text: "Xóa email, không bấm link và chủ động gọi hotline ngân hàng xác minh",
            },
            { id: "c", text: "Chuyển tiếp email cho bạn bè nhờ kiểm tra giúp" },
            {
                id: "d",
                text: "Trả lời lại email để xin thêm giấy tờ chứng minh",
            },
        ],
        correctAnswer: "b",
        explanation:
            "Tên miền gốc của email này là 'verify.info', không phải tên miền chính thức của Vietcombank (vietcombank.com.vn). Luôn xóa email nghi vấn và liên hệ trực tiếp tổng đài ngân hàng.",
        tip: "Mẹo đối soát: Tên miền hợp lệ của tổ chức luôn nằm ngay trước dấu gạch chéo đầu tiên hoặc kết thúc ở đuôi .vn",
    },
    {
        id: 2,
        category: "Mã OTP",
        difficulty: "easy",
        question:
            "Một người tự xưng là nhân viên kỹ thuật ngân hàng gọi điện yêu cầu đọc mã OTP để 'hủy giao dịch chuyển tiền bị lỗi'. Bạn nên làm gì?",
        options: [
            {
                id: "a",
                text: "Đọc ngay mã OTP để tránh bị mất tiền trong tài khoản",
            },
            {
                id: "b",
                text: "Yêu cầu người gọi đọc đúng mã nhân viên rồi mới cung cấp",
            },
            {
                id: "c",
                text: "Cúp máy ngay lập tức vì ngân hàng không bao giờ hỏi mã OTP",
            },
            { id: "d", text: "Chỉ đọc 3 chữ số đầu của mã OTP để thăm dò" },
        ],
        correctAnswer: "c",
        explanation:
            "Mã OTP là chìa khóa bảo vệ cuối cùng của tài khoản. Ngân hàng tuyệt đối không bao giờ yêu cầu khách hàng cung cấp OTP qua điện thoại dưới bất kỳ lý do nào.",
        tip: "Quy tắc vàng: Đọc mã OTP cho người khác đồng nghĩa với việc bạn tự tay chuyển tiền cho kẻ gian",
    },
    {
        id: 3,
        category: "Việc làm",
        difficulty: "medium",
        question:
            "Bạn được mời làm cộng tác viên online với thu nhập 1.000.000đ mỗi ngày, nhưng nhiệm vụ đầu tiên bắt buộc nạp 300.000đ tiền cọc. Đây là dấu hiệu gì?",
        options: [
            {
                id: "a",
                text: "Quy trình tuyển dụng thông thường để đảm bảo trách nhiệm",
            },
            {
                id: "b",
                text: "Cơ hội tốt, nên nạp thử số tiền nhỏ xem có rút được không",
            },
            {
                id: "c",
                text: "Bẫy lừa đảo: Doanh nghiệp hợp pháp không thu tiền của người lao động",
            },
            {
                id: "d",
                text: "Nên hỏi ý kiến người quản lý nhóm rồi mới đưa tiền",
            },
        ],
        correctAnswer: "c",
        explanation:
            "Không có công ty chân chính nào thu phí của người xin việc trước khi làm việc. Bất kỳ công việc nào yêu cầu nạp tiền để nhận đơn hàng đều là cạm bẫy chiếm đoạt tài sản.",
        tip: "Ghi nhớ: Bạn đi làm để nhận lương, không phải để nộp tiền cho người tuyển dụng",
    },
    {
        id: 4,
        category: "Đầu tư",
        difficulty: "medium",
        question:
            "Một người bạn quen qua mạng xã hội giới thiệu sàn đầu tư tiền ảo với mức lãi 20% mỗi tuần và cam kết bảo hiểm vốn 100%. Bạn phản ứng thế nào?",
        options: [
            {
                id: "a",
                text: "Nạp tiền ngay vì bạn bè đã có người kiếm được tiền",
            },
            {
                id: "b",
                text: "Nạp số tiền nhỏ trước, nếu có lãi mới nạp khoản tiền lớn",
            },
            {
                id: "c",
                text: "Từ chối tham gia vì mức lãi suất này là phi thực tế và lừa đảo",
            },
            { id: "d", text: "Nhờ người đó đầu tư hộ bằng tài khoản của họ" },
        ],
        correctAnswer: "c",
        explanation:
            "Mức lãi 20% mỗi tuần tương đương hơn 1000% mỗi năm, điều không tồn tại trong nền kinh tế thực. Mọi sàn cam kết lợi nhuận khủng kèm bảo hiểm vốn đều là mô hình Ponzi lừa đảo.",
        tip: "Nguyên tắc tài chính: Lợi nhuận kỳ vọng càng cao thì rủi ro càng lớn. Cam kết bao lỗ là bẫy lừa",
    },
    {
        id: 5,
        category: "Giả mạo",
        difficulty: "easy",
        question:
            "Tài khoản Zalo của người thân nhắn tin mượn 5 triệu đồng vì đang bị tai nạn kẹt viện phí. Bạn cần thực hiện bước nào trước tiên?",
        options: [
            {
                id: "a",
                text: "Chuyển khoản ngay lập tức vì việc cứu người là ưu tiên hàng đầu",
            },
            {
                id: "b",
                text: "Chuyển trước 2 triệu đồng rồi nhắn tin hỏi thêm sau",
            },
            {
                id: "c",
                text: "Gọi điện thoại trực tiếp qua mạng viễn thông để xác nhận giọng nói",
            },
            {
                id: "d",
                text: "Hỏi thêm số tài khoản của bệnh viện rồi mới chuyển",
            },
        ],
        correctAnswer: "c",
        explanation:
            "Tài khoản mạng xã hội rất dễ bị chiếm quyền điều khiển hoặc làm giả hình ảnh. Cách duy nhất để đối soát là gọi trực tiếp vào số điện thoại viễn thông của người thân trước khi giao dịch.",
        tip: "Quy tắc an toàn: Không bao giờ chuyển tiền chỉ dựa trên tin nhắn văn bản mạng xã hội",
    },
    {
        id: 6,
        category: "Phishing",
        difficulty: "hard",
        question:
            "Trong các địa chỉ web dưới đây, đâu là cổng thông tin chính thức của ngân hàng Vietcombank?",
        options: [
            { id: "a", text: "https://vietcombank.com.vn.ebank-portal.net" },
            { id: "b", text: "https://www.vietcombank.com.vn" },
            { id: "c", text: "https://vietcombank-online-banking.com" },
            { id: "d", text: "https://vietcombankk.com.vn" },
        ],
        correctAnswer: "b",
        explanation:
            "Chỉ có 'https://www.vietcombank.com.vn' là tên miền hợp pháp của Vietcombank. Các tên miền còn lại chèn thêm subdomain hoặc sai chính tả nhằm đánh lừa người dùng không để ý.",
        tip: "Quan sát tên miền: Tên miền hợp lệ của các ngân hàng lớn tại Việt Nam luôn có đuôi .com.vn hoặc .vn",
    },
    {
        id: 7,
        category: "Tổng hợp",
        difficulty: "medium",
        question:
            "Tin nhắn SMS từ đầu số thông báo: 'Tai khoan cua ban bi khoa, vui long truy cap link http://bidv-ebank.xyz de xac thuc'. Dấu hiệu bất thường gồm những gì?",
        options: [
            { id: "a", text: "Chỉ do sử dụng giao thức chưa bảo mật http" },
            {
                id: "b",
                text: "SMS không dấu tiếng Việt, dùng tên miền đuôi .xyz và hối thúc người dùng",
            },
            { id: "c", text: "Tin nhắn hoàn toàn bình thường từ nhà mạng" },
            { id: "d", text: "Chỉ do đường link không có hình ảnh minh họa" },
        ],
        correctAnswer: "b",
        explanation:
            "Ngân hàng chính thức luôn gửi tin nhắn có dấu tiếng Việt đầy đủ và không bao giờ yêu cầu khách hàng đăng nhập tài khoản qua các tên miền quốc tế giá rẻ như .xyz hay .top.",
        tip: "Dấu hiệu nhận biết: Kẻ lừa đảo dùng thiết bị phát sóng giả mạo (trạm BTS giả) để phát tán SMS độc hại",
    },
    {
        id: 8,
        category: "Tình cảm",
        difficulty: "hard",
        question:
            "Một người bạn quen qua mạng 2 tháng, chưa từng gặp mặt, gửi đường link ngoài hướng dẫn tải ứng dụng đầu tư nội bộ. Bạn nên làm gì?",
        options: [
            {
                id: "a",
                text: "Tải ứng dụng vì bạn bè quen lâu ngày đã tạo được sự tin tưởng",
            },
            {
                id: "b",
                text: "Tải về xem thử nhưng không đăng ký thông tin cá nhân",
            },
            {
                id: "c",
                text: "Từ chối tải ứng dụng và cắt liên lạc vì đây là thủ đoạn lừa đảo tinh vi",
            },
            { id: "d", text: "Gửi ứng dụng cho người thân dùng thử trước" },
        ],
        correctAnswer: "c",
        explanation:
            "Sự kết hợp giữa quen biết qua mạng chưa từng gặp mặt và việc dụ dỗ cài đặt ứng dụng ngoài kho ứng dụng chính thức là kịch bản kinh điển của các đường dây lừa đảo xuyên biên giới.",
        tip: "Bảo vệ thiết bị: Ứng dụng hợp pháp luôn được kiểm duyệt trên App Store hoặc Google Play",
    },
    {
        id: 9,
        category: "Mã OTP",
        difficulty: "hard",
        question:
            "Bạn bất ngờ nhận được tin nhắn chứa mã OTP xác nhận giao dịch ngân hàng dù bạn không hề thực hiện thao tác nào. Điều này có nghĩa là gì?",
        options: [
            {
                id: "a",
                text: "Ngân hàng gửi mã thử nghiệm định kỳ, có thể bỏ qua",
            },
            {
                id: "b",
                text: "Tài khoản của bạn đã bị lộ mật khẩu và kẻ gian đang cố gắng rút tiền",
            },
            {
                id: "c",
                text: "Tin nhắn bị gửi nhầm số điện thoại, không cần lo lắng",
            },
            { id: "d", text: "Hệ thống ngân hàng đang gặp sự cố nghẽn mạng" },
        ],
        correctAnswer: "b",
        explanation:
            "Mã OTP chỉ phát sinh khi có người đã nhập đúng tên đăng nhập và mật khẩu tài khoản của bạn. Khi nhận được OTP bất thường, hãy đổi mật khẩu ngay và liên hệ tổng đài ngân hàng để khóa tài khoản khẩn cấp.",
        tip: "Hành động cấp thiết: Lập tức đăng nhập vào app chính thức để đổi mật khẩu và bật tính năng khóa thẻ",
    },
    {
        id: 10,
        category: "Tổng hợp",
        difficulty: "medium",
        question:
            "Trong các thói quen dưới đây, thói quen nào khiến tài khoản của bạn đối mặt với rủi ro cao nhất?",
        options: [
            {
                id: "a",
                text: "Kích hoạt tính năng xác thực hai yếu tố (2FA) qua ứng dụng",
            },
            {
                id: "b",
                text: "Sử dụng cùng một mật khẩu dễ nhớ cho tất cả các tài khoản mạng xã hội và ngân hàng",
            },
            {
                id: "c",
                text: "Chủ động kiểm tra kỹ tên miền thanh toán trước khi nhập thông tin thẻ",
            },
            {
                id: "d",
                text: "Gọi điện thoại trực tiếp cho người gửi để xác thực lại thông tin chuyển khoản",
            },
        ],
        correctAnswer: "b",
        explanation:
            "Dùng chung mật khẩu tạo ra nguy cơ bị sập bẫy dây chuyền. Khi một dịch vụ nhỏ bị lộ dữ liệu, kẻ gian sẽ dùng thông tin đó để mở khóa toàn bộ tài khoản ngân hàng và email quan trọng của bạn.",
        tip: "Nguyên tắc bảo mật: Sử dụng mật khẩu ngẫu nhiên trên 12 ký tự và không bao giờ dùng chung cho nhiều dịch vụ",
    },
];

export const safetyChecklist = [
    {
        category: "Mật khẩu & Tài khoản",
        icon: "Lock",
        color: "info",
        items: [
            {
                id: "pwd-1",
                text: "Đặt mật khẩu riêng biệt cho từng tài khoản quan trọng (ngân hàng, email, mạng xã hội)",
            },
            {
                id: "pwd-2",
                text: "Sử dụng mật khẩu mạnh dài trên 12 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            },
            {
                id: "pwd-3",
                text: "Bật tính năng xác thực hai yếu tố (2FA / OTP ứng dụng) cho tất cả tài khoản thiết yếu",
            },
            {
                id: "pwd-4",
                text: "Không sử dụng ngày sinh, số điện thoại hoặc họ tên để đặt mật khẩu",
            },
            {
                id: "pwd-5",
                text: "Chủ động thay đổi mật khẩu định kỳ hoặc ngay khi nhận cảnh báo đăng nhập lạ",
            },
        ],
    },
    {
        category: "Giao dịch tài chính & Ngân hàng",
        icon: "CreditCard",
        color: "safe",
        items: [
            {
                id: "bank-1",
                text: "Tự nhập tên miền ngân hàng hoặc mở app chính thức, không bấm link gửi qua SMS/email",
            },
            {
                id: "bank-2",
                text: "Đối soát kỹ tên chủ tài khoản và số tiền trước khi bấm xác nhận chuyển khoản",
            },
            {
                id: "bank-3",
                text: "Không thực hiện giao dịch tài chính hoặc đăng nhập tài khoản qua mạng Wi-Fi công cộng",
            },
            {
                id: "bank-4",
                text: "Tuyệt đối không cung cấp mã OTP, mã PIN hay mật khẩu thẻ cho bất kỳ ai",
            },
            {
                id: "bank-5",
                text: "Kích hoạt thông báo biến động số dư qua ứng dụng để theo dõi dòng tiền tức thì",
            },
        ],
    },
    {
        category: "Mạng xã hội & Quyền riêng tư",
        icon: "Users",
        color: "primary",
        items: [
            {
                id: "social-1",
                text: "Thiết lập danh sách bạn bè và thông tin cá nhân ở chế độ riêng tư",
            },
            {
                id: "social-2",
                text: "Không chia sẻ hình ảnh căn cước công dân, hộ chiếu, vé máy bay hay sao kê tài khoản",
            },
            {
                id: "social-3",
                text: "Cảnh giác và gọi điện thoại xác nhận ngay khi nhận được tin nhắn hỏi mượn tiền gấp",
            },
            {
                id: "social-4",
                text: "Sử dụng công cụ tìm kiếm hình ảnh (Google Lens) để kiểm tra các tài khoản lạ kết bạn",
            },
            {
                id: "social-5",
                text: "Không tham gia vào các hội nhóm làm nhiệm vụ kiếm tiền hoặc đầu tư sinh lời lạ",
            },
        ],
    },
    {
        category: "Bảo vệ thiết bị & Phần mềm",
        icon: "DeviceMobile",
        color: "info",
        items: [
            {
                id: "device-1",
                text: "Thường xuyên cập nhật hệ điều hành điện thoại và máy tính lên phiên bản mới nhất",
            },
            {
                id: "device-2",
                text: "Chỉ cài đặt ứng dụng từ kho chính thức (App Store trên iOS hoặc Google Play trên Android)",
            },
            {
                id: "device-3",
                text: "Tuyệt đối không cài đặt ứng dụng từ tệp APK trôi nổi hoặc qua đường link lạ",
            },
            {
                id: "device-4",
                text: "Không cấp quyền điều khiển máy tính, điện thoại từ xa cho người lạ (TeamViewer, AnyDesk)",
            },
            {
                id: "device-5",
                text: "Bật tính năng khóa màn hình tự động bằng mã PIN, vân tay hoặc nhận diện khuôn mặt",
            },
        ],
    },
    {
        category: "Quy trình ứng phó khẩn cấp",
        icon: "Warning",
        color: "danger",
        items: [
            {
                id: "action-1",
                text: "Dừng ngay mọi liên lạc và ngắt kết nối Internet của thiết bị khi nghi ngờ bị xâm nhập",
            },
            {
                id: "action-2",
                text: "Gọi ngay hotline ngân hàng để yêu cầu khóa thẻ và phong tỏa tài khoản tức thì",
            },
            {
                id: "action-3",
                text: "Chụp ảnh lưu giữ toàn bộ bằng chứng: Lịch sử tin nhắn, số điện thoại, số tài khoản thụ hưởng",
            },
            {
                id: "action-4",
                text: "Gửi phản ánh tới Cổng cảnh báo an toàn thông tin quốc gia tại địa chỉ canhbao.ncsc.gov.vn",
            },
            {
                id: "action-5",
                text: "Liên hệ cơ quan công an gần nhất hoặc gọi tổng đài 113 để trình báo sự việc",
            },
        ],
    },
];

export const stats = [
    {
        value: "16.000+",
        target: 16000,
        suffix: "+",
        label: "Vụ lừa đảo trực tuyến được ghi nhận trong năm",
        color: "danger",
    },
    {
        value: "3.900 tỷ",
        target: 3900,
        suffix: " tỷ",
        label: "Tổng thiệt hại tài chính ước tính của nạn nhân",
        color: "danger",
    },
    {
        value: "24",
        target: 24,
        suffix: "",
        label: "Thủ đoạn lừa đảo phổ biến đang được cảnh báo",
        color: "primary",
    },
    {
        value: "91%",
        target: 91,
        suffix: "%",
        label: "Số vụ việc bắt đầu từ tin nhắn và cuộc gọi mạo danh",
        color: "info",
    },
];

export const emergencyContacts = [
    {
        name: "Cổng cảnh báo an toàn thông tin quốc gia (NCSC)",
        url: "https://canhbao.ncsc.gov.vn",
        icon: "ShieldCheck",
    },
    {
        name: "Cơ sở dữ liệu phòng chống lừa đảo cộng đồng",
        url: "https://chongluadao.vn",
        icon: "ShieldCheck",
    },
    {
        name: "Cổng tra cứu tài khoản lừa đảo CheckLegit",
        url: "https://checklegit.com.vn",
        icon: "MagnifyingGlass",
    },
    {
        name: "Tổng đài Cảnh sát cơ động & Trực ban hình sự: 113",
        url: "tel:113",
        icon: "Phone",
    },
    {
        name: "Hotline phản ánh cuộc gọi rác & lừa đảo: 156",
        url: "tel:156",
        icon: "Phone",
    },
];

export const scamDirectory = [
    {
        id: "fake-bank-website",
        title: "Giả mạo website & email ngân hàng (Phishing)",
        category: "banking",
        categoryName: "Tài chính & Ngân hàng",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Người dùng ứng dụng ngân hàng số, người mua sắm trực tuyến",
        summary:
            "Kẻ gian dựng website sao chép giao diện ngân hàng và gửi link qua SMS brandname hoặc email báo động tài khoản bị khóa.",
        trapStory:
            "Nạn nhân nhận được tin nhắn SMS với tên hiển thị của ngân hàng thông báo tài khoản có giao dịch bất thường ở nước ngoài. Tin nhắn hối thúc bấm vào đường link lạ để hủy giao dịch trong vòng 10 phút. Ngay khi nhập mật khẩu và mã OTP, kẻ lừa đảo chiếm quyền và chuyển sạch tiền trong tài khoản.",
        psychology:
            "Tạo cảm giác hoảng loạn mất tiền đột ngột kèm áp lực thời gian gấp gáp để nạn nhân không kịp suy xét hay gọi hotline kiểm chứng.",
        redFlags: [
            "Tên miền không phải .com.vn chính thức (ví dụ: vietcom-bank.xyz, techcom-verify.top, vcb-online.site).",
            "Yêu cầu nhập cả mật khẩu ngân hàng và mã OTP vào biểu mẫu web.",
            "Nội dung đe dọa tài khoản sẽ bị phong tỏa vĩnh viễn nếu không xác thực ngay.",
        ],
        preventionSteps: [
            "Chỉ đăng nhập ngân hàng qua ứng dụng cài sẵn trên điện thoại hoặc tự gõ tên miền chính thức vào trình duyệt.",
            "Ngân hàng thương mại không bao giờ gửi link yêu cầu cung cấp OTP hoặc mật khẩu.",
            "Bật tính năng xác thực sinh trắc học (khuôn mặt/vân tay) cho mọi giao dịch chuyển tiền giá trị lớn.",
        ],
        emergencyAction:
            "Gọi ngay hotline ngân hàng yêu cầu khóa thẻ và tạm ngừng tính năng Internet Banking lập tức.",
    },
    {
        id: "fake-police-otp",
        title: "Mạo danh công an, viện kiểm sát đòi mã OTP",
        category: "authority",
        categoryName: "Mạo danh cơ quan",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Người cao tuổi, phụ nữ nội trợ, người ít cập nhật tin tức pháp luật",
        summary:
            "Kẻ xấu gọi điện xưng danh điều tra viên, đe dọa nạn nhân liên quan đến đường dây ma túy, rửa tiền và yêu cầu chuyển tiền niêm phong.",
        trapStory:
            "Đối tượng gọi điện thông báo số điện thoại hoặc căn cước của nạn nhân mở tài khoản nhận hàng chục tỷ tiền phạm pháp. Chúng làm giả lệnh bắt tạm giam có đóng dấu đỏ gửi qua Zalo, cấm nạn nhân nói với gia đình vì lý do bí mật điều tra, sau đó yêu cầu đọc mã OTP ngân hàng để kiểm tra dòng tiền sạch.",
        psychology:
            "Lợi dụng tâm lý sợ hãi pháp luật, sự hoang mang tột độ và cảm giác cô lập khi bị ép không được chia sẻ với người thân.",
        redFlags: [
            "Làm việc về vụ án hình sự qua điện thoại thay vì gửi giấy triệu tập trực tiếp.",
            "Yêu cầu chuyển tiền vào tài khoản cá nhân để 'phục vụ giám định điều tra'.",
            "Hối thúc đọc mã OTP hoặc tải ứng dụng bảo mật lạ có đuôi .apk.",
        ],
        preventionSteps: [
            "Khắc ghi nguyên tắc: Cơ quan công an, tòa án tuyệt đối không làm việc qua điện thoại hay mạng xã hội.",
            "Khi nhận cuộc gọi tự xưng cơ quan pháp luật đòi tiền: Dứt khoát cúp máy và báo công an phường sở tại.",
            "Không bao giờ cung cấp mã OTP cho bất kỳ ai, kể cả người xưng là cán bộ nhà nước.",
        ],
        emergencyAction:
            "Cúp máy ngay, không chuyển bất kỳ khoản tiền nào và gọi 113 hoặc đến trụ sở công an gần nhất trình báo.",
    },
    {
        id: "online-job-trap",
        title: "Bẫy việc làm cộng tác viên Shopee, TikTok nạp tiền nhận hoa hồng",
        category: "job",
        categoryName: "Việc làm online",
        riskLevel: "high",
        riskLabel: "Rủi ro cao",
        targetAudience:
            "Học sinh, sinh viên, mẹ bỉm sữa, người tìm việc làm thêm tại nhà",
        summary:
            "Hứa hẹn việc nhẹ lương cao, làm nhiệm vụ bấm like, đặt đơn ảo hưởng hoa hồng 20-30%, ban đầu cho rút tiền nhỏ để giăng bẫy tiền lớn.",
        trapStory:
            "Nạn nhân được mời vào nhóm Telegram làm nhiệm vụ chốt đơn ảo. Hai nhiệm vụ đầu nạp 200.000đ được hoàn gốc kèm hoa hồng 60.000đ rất sòng phẳng. Đến đơn thứ ba trị giá 5.000.000đ, hệ thống báo lỗi cú pháp và bắt nạp thêm 20.000.000đ để cứu lệnh. Cứ thế nạn nhân bị cuốn vào vòng xoáy nạp tiền không thể rút.",
        psychology:
            "Thao túng tâm lý chi phí chìm (tiếc tiền đã nạp nên cố nạp thêm để gỡ) và hiệu ứng đám đông từ hàng chục tài khoản chim mồi khoe ảnh nhận tiền trong nhóm.",
        redFlags: [
            "Việc làm online nhưng yêu cầu ứng viên phải nạp tiền cọc trước.",
            "Mức lợi nhuận phi thực tế: Ngồi nhà bấm điện thoại kiếm vài triệu mỗi ngày.",
            "Giao dịch qua nhóm kín Telegram và chuyển tiền vào số tài khoản cá nhân thay đổi liên tục.",
        ],
        preventionSteps: [
            "Nguyên tắc tuyển dụng: Đơn vị chân chính tuyển dụng để trả lương, không bao giờ bắt người tìm việc phải nộp tiền trước.",
            "Không tham gia vào các hội nhóm làm nhiệm vụ chốt đơn online trên mạng xã hội.",
            "Cảnh giác với mọi lời mời gọi 'việc nhẹ lương cao, không cần kinh nghiệm'.",
        ],
        emergencyAction:
            "Chặn ngay kẻ tuyển dụng, thoát nhóm Telegram, tuyệt đối không nạp thêm bất kỳ khoản tiền cứu lệnh nào.",
    },
    {
        id: "fake-investment-exchange",
        title: "Sàn đầu tư tài chính, chứng khoán quốc tế ảo cam kết lãi khủng",
        category: "banking",
        categoryName: "Tài chính & Ngân hàng",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Người có tiền nhàn rỗi muốn đầu tư sinh lời nhanh, nhà đầu tư mới",
        summary:
            "Kẻ gian lập sàn forex, tiền ảo giả mạo rồi can thiệp biểu đồ nến, ban đầu cho thắng tiền ảo sau đó chặn rút và vòi thêm phí.",
        trapStory:
            "Chuyên gia tài chính tự xưng hướng dẫn nạn nhân nạp tiền vào sàn quốc tế với cam kết bot AI bảo hiểm vốn, lãi 5-10%/ngày. Trên màn hình app, số dư tài khoản tăng vọt hàng trăm triệu. Khi nạn nhân bấm lệnh rút tiền, sàn viện cớ tài khoản chưa đóng thuế thu nhập cá nhân 20% hoặc lỗi kỹ thuật, ép nạp thêm tiền rồi đánh sập sàn.",
        psychology:
            "Kích thích lòng tham và hội chứng sợ bỏ lỡ cơ hội đổi đời (FOMO) bằng các hình ảnh sang chảnh, xe sang, bảng lãi ảo.",
        redFlags: [
            "Cam kết lợi nhuận trên 30%/tháng với lời hứa rủi ro bằng không.",
            "Sàn không có giấy phép của Ủy ban Chứng khoán Nhà nước Việt Nam.",
            "App cài đặt qua đường link lạ hoặc mã QR, không có trên App Store và Google Play.",
        ],
        preventionSteps: [
            "Kiểm tra danh sách công ty chứng khoán và sàn giao dịch được cấp phép tại ssc.gov.vn.",
            "Hiểu quy luật tài chính: Lợi nhuận kỳ vọng luôn đi đôi với mức độ rủi ro tương ứng.",
            "Tuyệt đối không nghe theo lời tư vấn tài chính từ người lạ quen qua mạng xã hội.",
        ],
        emergencyAction:
            "Ngừng ngay việc chuyển tiền đóng phí rút tiền, sao chụp toàn bộ nhật ký giao dịch và gửi đơn tố giác tới cơ quan chức năng.",
    },
    {
        id: "ai-deepfake-call",
        title: "Cuộc gọi video Deepfake khuôn mặt và giọng nói mượn tiền khẩn cấp",
        category: "tech",
        categoryName: "Công nghệ cao & AI",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Mọi người dân có người thân đi du học, công tác xa nhà hoặc sinh sống ở nước ngoài",
        summary:
            "Kẻ xấu hack Facebook/Zalo rồi dùng AI cắt ghép video call khuôn mặt và giọng nói giống hệt người thân để tạo lòng tin vay tiền gấp.",
        trapStory:
            "Nạn nhân nhận được tin nhắn mượn tiền từ Facebook của con gái đang du học. Để đề phòng, phụ huynh gọi video call thì thấy đúng mặt con gái đang vẫy tay chào, nhưng hình ảnh hơi mờ và chỉ nói được vài câu rồi tắt phụt với lý do mạng yếu. Tin tưởng đúng là con mình đang gặp tai nạn cần tiền viện phí, phụ huynh chuyển ngay 50 triệu đồng.",
        psychology:
            "Lợi dụng tình cảm gia đình thiêng liêng và tạo bối cảnh tai nạn nguy cấp khiến nạn nhân mất cảnh giác sau cuộc gọi video giả mạo.",
        redFlags: [
            "Cuộc gọi video chỉ kéo dài vài giây, hình ảnh bị nhòe, cử động miệng không khớp tiếng.",
            "Người gọi lấy cớ sóng yếu, đang trên đường hoặc phòng cấp cứu để tránh đàm thoại lâu.",
            "Số tài khoản nhận tiền mang tên người lạ, khác hoàn toàn tên người thân.",
        ],
        preventionSteps: [
            "Thiết lập một 'mật khẩu gia đình' riêng biệt (câu hỏi bí mật chỉ người thân mới biết) để đối soát khi có yêu cầu chuyển tiền.",
            "Bấm số điện thoại di động thông thường (sóng SIM viễn thông) để gọi trực tiếp thay vì chỉ liên lạc qua app mạng xã hội.",
            "Khi video call bị mờ hoặc chập chờn, yêu cầu đối phương làm một hành động cụ thể như quay một vòng hoặc giơ 3 ngón tay lên mặt.",
        ],
        emergencyAction:
            "Liên hệ ngay với người thân qua các kênh liên lạc độc lập khác để thông báo tài khoản mạng xã hội của họ đã bị chiếm đoạt.",
    },
    {
        id: "romance-pig-butchering",
        title: "Bẫy tình cảm xuyên biên giới (Romance Scam / Nuôi lợn lấy thịt)",
        category: "social",
        categoryName: "Tình cảm & Thao túng",
        riskLevel: "high",
        riskLabel: "Rủi ro cao",
        targetAudience:
            "Người độc thân, người cao tuổi cô đơn, người đang tìm kiếm bạn đời",
        summary:
            "Kẻ gian đóng vai chuyên gia thành đạt, quân nhân, kỹ sư nước ngoài, trò chuyện chăm sóc hàng tháng trời rồi dụ đầu tư hoặc mượn tiền đóng phí gửi quà.",
        trapStory:
            "Kẻ lừa đảo làm quen qua ứng dụng hẹn hò, tự xưng là kỹ sư dầu khí góa vợ ở Singapore. Sau nhiều tháng nhắn tin tâm sự tình cảm thắm thiết, đối phương gửi ảnh kiện hàng quà tặng trị giá hàng trăm nghìn USD về Việt Nam cho nạn nhân. Vài ngày sau, người tự xưng hải quan sân bay gọi điện thông báo bưu kiện chứa nhiều ngoại tệ trái phép và ép nạn nhân nộp 80 triệu đồng tiền phí lót tay.",
        psychology:
            "Khai thác triệt để nhu cầu kết nối tình cảm và sự cô đơn của con người, xây dựng lòng tin kiên trì trước khi tung đòn tài chính.",
        redFlags: [
            "Người quen qua mạng có profile hoàn hảo nhưng luôn từ chối gặp mặt trực tiếp hoặc video call rõ ràng.",
            "Thời gian quen biết ngắn nhưng bày tỏ tình cảm yêu đương mãnh liệt.",
            "Vẽ ra các kịch bản gặp sự cố ở nước ngoài hoặc gửi kiện hàng giá trị lớn rồi bắt người nhận ứng tiền trả phí.",
        ],
        preventionSteps: [
            "Nguyên tắc bất di bất dịch: Tuyệt đối không chuyển tiền cho người bạn chưa từng gặp mặt ngoài đời thực.",
            "Dùng công cụ tìm kiếm ảnh (Google Lens) để kiểm tra ảnh đại diện xem có bị đánh cắp từ tài khoản người khác không.",
            "Cơ quan hải quan không bao giờ yêu cầu chuyển tiền phí vào tài khoản cá nhân của nhân viên.",
        ],
        emergencyAction:
            "Dừng mọi giao dịch tài chính, lưu lại toàn bộ ảnh và lịch sử tin nhắn, trình báo cơ quan công an về dấu hiệu mạo danh.",
    },
    {
        id: "malicious-apk-app",
        title: "Mã độc APK giả danh ứng dụng VNeID, Thuế điện tử và Dịch vụ công",
        category: "tech",
        categoryName: "Công nghệ cao & AI",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Người dân cần cập nhật định danh VNeID mức 2, hộ kinh doanh kê khai thuế",
        summary:
            "Kẻ xấu gọi điện hướng dẫn cài đặt ứng dụng dịch vụ công qua link lạ (.apk), từ đó chiếm quyền điều khiển điện thoại và tự động rút sạch tiền ngân hàng.",
        trapStory:
            "Nạn nhân nhận cuộc gọi tự xưng cán bộ công an phường hỗ trợ kích hoạt mã định danh điện tử VNeID mức 2. Kẻ này hướng dẫn truy cập trang web dichvucong-gov.com tải tệp cài đặt định danh.apk. Sau khi cài và cấp quyền trợ năng (Accessibility Service), màn hình điện thoại nạn nhân bị đơ đen sì, trong lúc đó kẻ gian từ xa mở app ngân hàng, đọc mã OTP và chuyển sạch 200 triệu đồng.",
        psychology:
            "Lợi dụng sự thiếu hiểu biết công nghệ của người dân về các thủ tục hành chính mới và quyền hạn hệ thống trên điện thoại Android.",
        redFlags: [
            "Hướng dẫn tải ứng dụng bằng cách bấm vào link trang web thay vì tải từ Google Play hoặc App Store.",
            "Tệp tải về có đuôi mở rộng là .apk.",
            "Ứng dụng đòi cấp các quyền đặc biệt nguy hiểm như: Quyền trợ năng (Accessibility), đọc thông báo, quản lý cuộc gọi.",
        ],
        preventionSteps: [
            "Chỉ cài đặt ứng dụng từ Google Play hoặc App Store chính thống, tuyệt đối không bật tính năng 'Cài đặt từ nguồn không xác định'.",
            "Cơ quan nhà nước không bao giờ gọi điện yêu cầu người dân cài app dịch vụ công qua đường link ngoài.",
            "Cảnh giác cao độ với bất kỳ ứng dụng nào đòi hỏi quyền Trợ năng (Accessibility) vì đây là cánh cửa để kẻ gian chiếm quyền thiết bị.",
        ],
        emergencyAction:
            "Lập tức bật chế độ máy bay hoặc tháo SIM, tắt nguồn điện thoại, dùng thiết bị khác gọi ngân hàng khóa tài khoản khẩn cấp.",
    },
    {
        id: "fake-brand-sms",
        title: "Giả mạo tin nhắn SMS Brandname ngân hàng và cơ quan",
        category: "banking",
        categoryName: "Tài chính & Ngân hàng",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Tất cả chủ thuê bao di động sử dụng dịch vụ thông báo qua SMS",
        summary:
            "Kẻ gian dùng trạm phát sóng giả (trạm BTS giả) chèn tin nhắn lừa đảo vào đúng luồng tin nhắn thật của ngân hàng nhằm đánh lừa nạn nhân.",
        trapStory:
            "Tin nhắn hiển thị đúng tên người gửi là 'VIETCOMBANK' nằm chung trong hộp thư các tin báo số dư hàng ngày của ngân hàng, với nội dung: 'Tài khoản của quý khách bị trừ 15.000.000đ tại Agoda, nếu không phải quý khách bấm vào link sau để hủy'. Nạn nhân thấy tin nhắn nằm cùng luồng ngân hàng nên hoàn toàn tin tưởng, bấm link và bị chiếm đoạt tài khoản.",
        psychology:
            "Tận dụng niềm tin tuyệt đối của người dùng vào tên thương hiệu (Brandname) đã được xác thực trong lịch sử tin nhắn.",
        redFlags: [
            "Tin nhắn chứa đường dẫn liên kết rút gọn hoặc tên miền lạ (như bit.ly, tinyurl, hoặc đuôi .vip, .xyz).",
            "Hối thúc người dùng xác thực danh tính để hủy bỏ giao dịch trừ tiền bất thường.",
            "Thông điệp đánh vào tâm lý lo sợ mất tiền đột ngột.",
        ],
        preventionSteps: [
            "Ghi nhớ quy định của Ngân hàng Nhà nước: Ngân hàng không bao giờ đính kèm đường link dẫn đến trang đăng nhập trong tin nhắn SMS.",
            "Khi nhận được tin nhắn trừ tiền lạ, mở app ngân hàng chính thức trên điện thoại để kiểm tra số dư thực tế.",
            "Báo ngay cho tổng đài 156 để phản ánh tin nhắn rác, tin nhắn giả mạo nhà mạng.",
        ],
        emergencyAction:
            "Không bấm vào đường link trong tin nhắn, chụp màn hình tin nhắn và chuyển tiếp tới tổng đài 156 của Bộ Thông tin & Truyền thông.",
    },
    {
        id: "flight-ticket-travel-scam",
        title: "Lừa đảo vé máy bay giá rẻ và combo du lịch ảo",
        category: "social",
        categoryName: "Tình cảm & Đời sống",
        riskLevel: "medium",
        riskLabel: "Rủi ro trung bình",
        targetAudience:
            "Người lên kế hoạch đi du lịch, gia đình đặt tour vào các dịp lễ tết hoặc mùa hè",
        summary:
            "Lập fanpage mạo danh các đại lý du lịch uy tín, bán vé máy bay và combo phòng khách sạn giá siêu rẻ, nhận cọc xong chặn liên lạc.",
        trapStory:
            "Nạn nhân thấy fanpage 'Combo Du Lịch Phú Quốc Giá Gốc' có hàng chục nghìn lượt theo dõi và nhiều phản hồi tích cực. Nhân viên tư vấn gửi mã đặt chỗ máy bay và phòng resort 5 sao với giá giảm 50% so với thị trường. Sau khi nạn nhân chuyển khoản cọc 12 triệu đồng, đại lý lập tức hủy mã đặt chỗ và chặn tài khoản Facebook của nạn nhân.",
        psychology:
            "Khai thác tâm lý ham giá rẻ và mong muốn tiết kiệm chi phí du lịch trong các dịp cao điểm.",
        redFlags: [
            "Giá combo du lịch hoặc vé máy bay rẻ hơn 40-60% so với giá niêm yết trên website hãng.",
            "Fanpage mới đổi tên gần đây, phần lớn lượt thích và bình luận là tài khoản ảo.",
            "Yêu cầu chuyển tiền vào tài khoản cá nhân thay vì tài khoản doanh nghiệp có pháp nhân.",
        ],
        preventionSteps: [
            "Đặt vé máy bay và phòng khách sạn trực tiếp qua website chính thức của hãng hàng không hoặc nền tảng uy tín.",
            "Kiểm tra tính pháp lý của công ty lữ hành tại Cổng thông tin của Tổng cục Du lịch.",
            "Gọi điện trực tiếp đến khách sạn hoặc hãng bay để kiểm tra tính hợp lệ của mã đặt chỗ trước khi chuyển tiền.",
        ],
        emergencyAction:
            "Lưu giữ biên lai chuyển khoản, thông tin tài khoản thụ hưởng của kẻ gian để gửi đơn tố cáo đến công an địa phương.",
    },
    {
        id: "lottery-prize-trap",
        title: "Thông báo trúng thưởng xe máy, sổ tiết kiệm tri ân khách hàng",
        category: "social",
        categoryName: "Tình cảm & Đời sống",
        riskLevel: "medium",
        riskLabel: "Rủi ro trung bình",
        targetAudience:
            "Người dân vùng nông thôn, người già, người ít tiếp xúc với các chiêu trò tiếp thị",
        summary:
            "Gửi tin nhắn hoặc gọi điện chúc mừng trúng thưởng xe SH, vàng miếng, sau đó yêu cầu nộp trước thuế trước bạ, phí vận chuyển để nhận thưởng.",
        trapStory:
            "Nạn nhân nhận cuộc gọi thông báo trúng giải đặc biệt xe máy SH trị giá 85 triệu đồng trong chương trình quay số tri ân của tập đoàn thương mại điện tử. Để nhận xe về tận nhà, nạn nhân phải nộp trước 10% thuế thu nhập cá nhân (8,5 triệu đồng). Sau khi nạn nhân chuyển tiền, đối tượng tiếp tục vòi thêm phí đăng ký biển số rồi bặt vô âm tín.",
        psychology:
            "Lợi dụng lòng tham và cảm xúc vỡ òa khi ngỡ rằng mình may mắn trúng giải thưởng lớn mà không mất công sức.",
        redFlags: [
            "Trúng thưởng từ một chương trình quay số mà bản thân chưa từng tham gia.",
            "Bắt buộc người trúng giải phải nộp tiền trước mới được nhận hiện vật.",
            "Yêu cầu chuyển phí qua thẻ cào điện thoại hoặc tài khoản cá nhân không rõ ràng.",
        ],
        preventionSteps: [
            "Quy tắc vàng: Doanh nghiệp chân chính khi trao thưởng lớn sẽ khấu trừ thuế trực tiếp vào giải thưởng hoặc làm việc trực tiếp tại trụ sở.",
            "Không bao giờ chuyển tiền để nhận thưởng từ bất kỳ cuộc gọi hay tin nhắn nào.",
            "Tra cứu chương trình khuyến mại có được đăng ký với Sở Công Thương tại website cơ quan quản lý.",
        ],
        emergencyAction:
            "Dứt khoát từ chối và cúp máy, không chuyển tiền cọc hoặc mua thẻ cào nạp cho đối tượng.",
    },
    {
        id: "telegram-account-theft",
        title: "Chiếm đoạt tài khoản Telegram qua mã bình chọn và quà tặng ảo",
        category: "tech",
        categoryName: "Công nghệ cao & AI",
        riskLevel: "high",
        riskLabel: "Rủi ro cao",
        targetAudience:
            "Người dùng Telegram, thành viên các hội nhóm tiền số, cộng đồng công nghệ",
        summary:
            "Gửi link nhờ bình chọn cuộc thi ảnh hoặc tặng gói Telegram Premium, khi nạn nhân đăng nhập mã OTP Telegram thì bị cướp quyền tài khoản.",
        trapStory:
            "Một người bạn trong danh bạ nhắn tin nhờ bình chọn cho cháu gái tham gia cuộc thi tài năng qua một đường link web. Khi bấm vào, trang web yêu cầu nhập số điện thoại và mã OTP gửi về app Telegram để xác nhận lượt bình chọn. Ngay khi nhập mã, tài khoản Telegram của nạn nhân bị đá văng ra khỏi thiết bị và kẻ gian bắt đầu nhắn tin mượn tiền khắp danh bạ.",
        psychology:
            "Lợi dụng sự nể nang bạn bè, người quen và mong muốn giúp đỡ những việc nhỏ nhặt.",
        redFlags: [
            "Link bình chọn yêu cầu đăng nhập bằng mã xác thực của ứng dụng Telegram.",
            "Mã OTP gửi về thiết bị ghi rõ: 'Mã đăng nhập tài khoản', tuyệt đối không phải mã bình chọn.",
            "Tài khoản nhắn tin đột ngột gửi link lạ mà bình thường ít khi trò chuyện.",
        ],
        preventionSteps: [
            "Kích hoạt tính năng Bảo mật 2 lớp (Two-Step Verification) có mật khẩu riêng trên Telegram.",
            "Không bao giờ nhập số điện thoại và mã OTP Telegram vào bất kỳ trang web bên thứ ba nào.",
            "Thường xuyên kiểm tra danh sách thiết bị đang đăng nhập trong phần Settings -> Devices của Telegram.",
        ],
        emergencyAction:
            "Dùng điện thoại mở Telegram -> Settings -> Devices -> Terminate all other sessions để đăng xuất kẻ gian tức thì.",
    },
    {
        id: "blackmail-loan-apps",
        title: "Tín dụng đen trực tuyến và bẫy app vay tiền cắt cổ",
        category: "banking",
        categoryName: "Tài chính & Ngân hàng",
        riskLevel: "critical",
        riskLabel: "Cực kỳ nguy hiểm",
        targetAudience:
            "Người cần tiền gấp, người dính nợ xấu ngân hàng, học sinh sinh viên cần tiền đóng học phí",
        summary:
            "Quảng cáo vay tiền giải ngân trong 5 phút không cần thế chấp, nhưng ép cài app truy cập toàn bộ danh bạ và đòi nợ theo kiểu khủng bố tinh thần.",
        trapStory:
            "Nạn nhân vay 5 triệu đồng qua app vay tiền nhanh. Số tiền thực nhận chỉ 3 triệu vì bị trừ 2 triệu 'phí thẩm định', với thời hạn trả là 7 ngày. Khi đến hạn không trả kịp, số tiền phạt nhân lên gấp nhiều lần. Kẻ cho vay lấy cắp toàn bộ danh bạ trên điện thoại, ghép ảnh nạn nhân vào cáo phó hoặc nội dung đồi trụy rồi gửi cho gia đình, đồng nghiệp để ép trả nợ.",
        psychology:
            "Đánh vào thế khó khăn tài chính bế tắc của nạn nhân và sau đó dùng áp lực làm nhục danh dự để cưỡng đoạt tiền bạc.",
        redFlags: [
            "Cho vay không cần chứng minh thu nhập nhưng lãi suất và phí thực tế lên tới 500-1000%/năm.",
            "Ứng dụng vay tiền yêu cầu cấp quyền đọc toàn bộ Danh bạ, Tin nhắn SMS và Hình ảnh trên máy.",
            "Hợp đồng mập mờ, thời gian vay thực tế chỉ từ 5 đến 7 ngày.",
        ],
        preventionSteps: [
            "Chỉ vay vốn tại các ngân hàng thương mại hoặc tổ chức tín dụng được Ngân hàng Nhà nước cấp phép.",
            "Tuyệt đối không cấp quyền truy cập danh bạ và bộ nhớ ảnh cho các ứng dụng vay tiền trôi nổi.",
            "Tìm kiếm sự hỗ trợ tài chính từ gia đình hoặc các quỹ tín dụng chính sách xã hội khi gặp khó khăn.",
        ],
        emergencyAction:
            "Lưu giữ chứng cứ đe dọa, gửi đơn cầu cứu đến cơ quan công an địa phương và liên hệ các trung tâm trợ giúp pháp lý.",
    },
];

export const bankHotlines = [
    {
        name: "Vietcombank (VCB)",
        hotline: "1900 54 54 13",
        emergencySyntax: "Soạn VCB KHOATHE gửi 6167",
        website: "https://www.vietcombank.com.vn",
        appLockGuide: "Mở app VCB Digibank -> Cài đặt -> Khóa thẻ khẩn cấp",
    },
    {
        name: "Techcombank (TCB)",
        hotline: "1800 58 88 22",
        emergencySyntax: "Gọi hotline nhấn phím 1 để khóa thẻ tự động",
        website: "https://techcombank.com",
        appLockGuide:
            "Mở app Techcombank Mobile -> Tài khoản & Thẻ -> Khóa thẻ",
    },
    {
        name: "MB Bank (Ngân Hàng Quân Đội)",
        hotline: "1900 54 54 26",
        emergencySyntax: "Gọi hotline nhấn phím 1 khóa khẩn cấp",
        website: "https://www.mbbank.com.vn",
        appLockGuide: "Mở app MBBank -> Dịch vụ thẻ -> Khóa thẻ tạm thời",
    },
    {
        name: "BIDV",
        hotline: "1900 9247",
        emergencySyntax: "Soạn BIDV KHOATHE gửi 8149",
        website: "https://bidv.com.vn",
        appLockGuide: "Mở app BIDV SmartBanking -> Quản lý thẻ -> Khóa thẻ",
    },
    {
        name: "VietinBank",
        hotline: "1900 55 88 68",
        emergencySyntax: "Soạn CTG KHOATHE gửi 8149",
        website: "https://vietinbank.vn",
        appLockGuide: "Mở app VietinBank iPay -> Dịch vụ thẻ -> Khóa thẻ",
    },
    {
        name: "VPBank",
        hotline: "1900 54 54 15",
        emergencySyntax: "Gọi hotline nhấn phím 1",
        website: "https://www.vpbank.com.vn",
        appLockGuide: "Mở app VPBank NEO -> Tiện ích thẻ -> Khóa thẻ tức thì",
    },
    {
        name: "ACB",
        hotline: "1900 54 54 86",
        emergencySyntax: "Soạn ACB KHOATHE gửi 997",
        website: "https://acb.com.vn",
        appLockGuide: "Mở app ACB ONE -> Thẻ -> Khóa thẻ an toàn",
    },
    {
        name: "Agribank",
        hotline: "1900 55 88 18",
        emergencySyntax: "Soạn VBA KHOATHE gửi 8149",
        website: "https://www.agribank.com.vn",
        appLockGuide:
            "Mở app Agribank E-Mobile Banking -> Dịch vụ thẻ -> Khóa thẻ",
    },
    {
        name: "TPBank",
        hotline: "1900 58 58 85",
        emergencySyntax: "Gọi hotline nhấn phím 1",
        website: "https://tpb.vn",
        appLockGuide: "Mở app TPBank Mobile -> Quản lý thẻ -> Khóa thẻ ngay",
    },
    {
        name: "Sacombank",
        hotline: "1800 58 58 88",
        emergencySyntax: "Soạn THE KHOA gửi 8149",
        website: "https://www.sacombank.com.vn",
        appLockGuide: "Mở app Sacombank mBanking -> Thẻ -> Khóa thẻ",
    },
];

export const emergencyProtocolSteps = [
    {
        step: 1,
        title: "Khóa thẻ và phong tỏa tài khoản ngân hàng ngay",
        description:
            "Gọi ngay hotline ngân hàng hoặc dùng app khóa khẩn cấp toàn bộ thẻ tín dụng, thẻ ghi nợ và tạm ngưng giao dịch chuyển tiền điện tử.",
        priority: "Khẩn cấp cao nhất (Phút 0 - 3)",
        badgeColor: "bg-red-600 text-white",
    },
    {
        step: 2,
        title: "Đổi mật khẩu tài khoản và đăng xuất mọi thiết bị lạ",
        description:
            "Đổi ngay mật khẩu email, mạng xã hội (Facebook, Zalo, Telegram) và bật bảo mật 2 lớp qua app Google Authenticator thay vì qua SMS.",
        priority: "Ưu tiên cao (Phút 3 - 7)",
        badgeColor: "bg-amber-600 text-white",
    },
    {
        step: 3,
        title: "Sao lưu và cố định toàn bộ chứng cứ lừa đảo",
        description:
            "Chụp ảnh màn hình toàn bộ tin nhắn, số tài khoản nhận tiền, số điện thoại kẻ gian, đường link lừa đảo và sao kê chi tiết giao dịch ngân hàng.",
        priority: "Quan trọng (Phút 7 - 10)",
        badgeColor: "bg-blue-600 text-white",
    },
    {
        step: 4,
        title: "Cảnh báo ngay cho người thân và bạn bè",
        description:
            "Đăng thông báo lên trang cá nhân hoặc gọi điện cho người thân để ngăn chặn kẻ gian mượn danh bạn tiếp tục đi lừa gạt người khác.",
        priority: "Ngăn chặn lây lan (Phút 10 - 12)",
        badgeColor: "bg-emerald-600 text-white",
    },
    {
        step: 5,
        title: "Trình báo cơ quan công an và gửi phản ánh tới NCSC",
        description:
            "Mang toàn bộ chứng cứ tới trụ sở công an quận/huyện gần nhất để làm đơn tố giác, đồng thời gửi báo cáo lên Cổng canhbao.ncsc.gov.vn.",
        priority: "Xử lý pháp lý (Phút 12 - 15)",
        badgeColor: "bg-gray-800 text-white",
    },
];

export const stemProjectInfo = {
    title: "Dự án STEM: Cẩm Nang Số Phòng Chống Lừa Đảo",
    mission:
        "Xây dựng lá chắn tri thức số, trang bị kỹ năng nhận diện và phản xạ an toàn thông tin cho mọi công dân trong kỷ nguyên chuyển đổi số.",
    pillars: [
        {
            title: "Công nghệ tiên tiến (Technology-Driven)",
            description:
                "Ứng dụng các giao thức đối soát mạng thời gian thực (RDAP, Google DoH, Cloudflare Security) để hỗ trợ người dùng phân tích độ tin cậy của link và liên hệ.",
        },
        {
            title: "Thực tiễn & Thực chiến (Practical Learning)",
            description:
                "Mô phỏng tình huống thực tế và bài kiểm tra phản xạ tâm lý giúp người học thấu suốt bản chất cạm bẫy thay vì chỉ tiếp thu lý thuyết khô khan.",
        },
        {
            title: "Phi lợi nhuận & Vì cộng đồng (Non-Profit & Open)",
            description:
                "Phục vụ hoàn toàn miễn phí cho học sinh, sinh viên, người cao tuổi và các gia đình Việt Nam nhằm giảm thiểu thiệt hại xã hội từ tội phạm công nghệ cao.",
        },
    ],
    verifiedSources: [
        {
            name: "Cổng cảnh báo an toàn thông tin quốc gia NCSC",
            url: "https://canhbao.ncsc.gov.vn",
        },
        {
            name: "Cơ sở dữ liệu phi lợi nhuận ChongLuaDao.vn",
            url: "https://chongluadao.vn",
        },
        {
            name: "Cổng tra cứu tài khoản lừa đảo CheckLegit",
            url: "https://checklegit.com.vn",
        },
        {
            name: "Trung tâm ứng cứu khẩn cấp không gian mạng Việt Nam (VNCERT/CC)",
            url: "https://vncert.vn",
        },
        {
            name: "Cục An ninh mạng và phòng chống tội phạm công nghệ cao (A05 - Bộ Công An)",
            url: "https://bocongan.gov.vn",
        },
        {
            name: "Tạp chí An toàn thông tin Việt Nam",
            url: "https://antoanthongtin.vn",
        },
    ],
};
