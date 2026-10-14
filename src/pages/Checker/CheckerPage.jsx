import { useState } from "react";
import { motion } from "motion/react";
import {
    MagnifyingGlass,
    Globe,
    Envelope,
    Phone,
    CheckCircle,
    XCircle,
    Warning,
    Spinner,
    ShieldCheck,
    ShieldWarning,
    CalendarBlank,
    Clock,
    Info,
    ArrowSquareOut,
} from "@phosphor-icons/react";

// --- TIỆN ÍCH HỖ TRỢ TRUY VẤN API MIỄN PHÍ ---

function extractDomain(rawInput) {
    let clean = rawInput.trim().toLowerCase();
    try {
        if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
            clean = "https://" + clean;
        }
        return new URL(clean).hostname;
    } catch {
        return rawInput.trim().toLowerCase().replace(/\/.*$/, "");
    }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timer);
        return response;
    } catch (err) {
        clearTimeout(timer);
        throw err;
    }
}

// --- THUẬT TOÁN KIỂM TRA URL & TÊN MIỀN ---
async function checkUrl(url) {
    const domain = extractDomain(url);
    const reasons = [];
    const info = [];
    let riskScore = 0; // 0 - 100

    // 1. Phân tích Heuristic & Đuôi tên miền (TLD rủi ro cao)
    const highRiskTlds =
        /\.(xyz|top|tk|ml|ga|cf|gq|club|work|click|buzz|rest|cam|live|fit|online|site|icu|vip)$/i;
    if (highRiskTlds.test(domain)) {
        reasons.push(
            "Đuôi tên miền giá rẻ thường xuyên bị tội phạm mạng lợi dụng để tạo web lừa đảo",
        );
        riskScore += 25;
    }

    // Kiểm tra giả mạo thương hiệu lớn tại Việt Nam
    const brandPatterns = [
        {
            regex: /vietcom|vcb/i,
            brand: "Vietcombank",
            official: "vietcombank.com.vn",
        },
        {
            regex: /techcom/i,
            brand: "Techcombank",
            official: "techcombank.com.vn",
        },
        { regex: /bidv/i, brand: "BIDV", official: "bidv.com.vn" },
        { regex: /agri/i, brand: "Agribank", official: "agribank.com.vn" },
        {
            regex: /mbbank|quan-doi/i,
            brand: "MB Bank",
            official: "mbbank.com.vn",
        },
        { regex: /vpbank/i, brand: "VPBank", official: "vpbank.com.vn" },
        { regex: /acb/i, brand: "ACB", official: "acb.com.vn" },
        { regex: /zalopay/i, brand: "ZaloPay", official: "zalopay.vn" },
        { regex: /momo/i, brand: "MoMo", official: "momo.vn" },
        { regex: /vnpost|buudien/i, brand: "VNPost", official: "vnpost.vn" },
        {
            regex: /congan|bocongan|dichvucong/i,
            brand: "Cổng dịch vụ công / Bộ Công An",
            official: "dichvucong.gov.vn",
        },
    ];

    for (const b of brandPatterns) {
        if (
            b.regex.test(domain) &&
            !domain.endsWith(b.official) &&
            !domain.endsWith(".gov.vn")
        ) {
            reasons.push(
                `Nghi vấn mạo danh thương hiệu ${b.brand} (Tên miền chính thức là ${b.official})`,
            );
            riskScore += 50;
            break;
        }
    }

    // Từ khóa bẫy tâm lý lừa đảo
    const scamKeywords =
        /(login|verify|secure|update|confirm|banking|account|xac-thuc|dang-nhap|khoa-the|nhan-qua|quatang|daugia|sodothuong)/i;
    if (scamKeywords.test(domain)) {
        reasons.push(
            "Tên miền chứa từ khóa nhạy cảm (đăng nhập, xác thực, ngân hàng, trúng thưởng)",
        );
        riskScore += 20;
    }

    // Kiểm tra định dạng IP hoặc nhiều subdomain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
        reasons.push(
            "Trang web dùng trực tiếp địa chỉ IP số thay vì tên miền chữ chuẩn",
        );
        riskScore += 30;
    } else if (domain.split(".").length > 4) {
        reasons.push(
            "Cấu trúc tên miền chứa quá nhiều cấp con (subdomain bất thường)",
        );
        riskScore += 15;
    }

    // 2. Tra cứu Google Public DNS DoH API (Miễn phí, không key, CORS mở)
    let dnsIps = [];
    let isDomainAlive = false;
    try {
        const dnsRes = await fetchWithTimeout(
            `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`,
            {},
            3500,
        );
        if (dnsRes.ok) {
            const dnsData = await dnsRes.json();
            if (dnsData.Status === 3) {
                reasons.push(
                    "Tên miền không tồn tại trên DNS toàn cầu (NXDOMAIN, có thể đã bị nhà mạng/tổ chức đình chỉ)",
                );
                riskScore += 20;
            } else if (dnsData.Status === 0 && dnsData.Answer) {
                isDomainAlive = true;
                dnsIps = dnsData.Answer.filter((a) => a.type === 1)
                    .map((a) => a.data)
                    .slice(0, 3);
                info.push(`Máy chủ phân giải IP: ${dnsIps.join(", ")}`);
            }
        }
    } catch {
        // Dự phòng khi mạng chập chờn
    }

    // 3. Tra cứu Cloudflare Security DNS 1.1.1.2 (Quét mã độc / Phishing)
    try {
        const cfRes = await fetchWithTimeout(
            `https://security.cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
            { headers: { Accept: "application/dns-json" } },
            3500,
        );
        if (cfRes.ok) {
            const cfData = await cfRes.json();
            if (
                cfData.Answer &&
                cfData.Answer.some((a) => a.data === "0.0.0.0")
            ) {
                reasons.push(
                    "CẢNH BÁO ĐỎ: Tên miền bị hệ thống an ninh Cloudflare 1.1.1.2 chặn do phát hiện mã độc hoặc phishing",
                );
                riskScore += 50;
            }
        }
    } catch {
        // Bỏ qua lỗi timeout
    }

    // 4. Tra cứu ICANN RDAP (Tuổi thọ tên miền - Domain Age)
    let domainAgeText = null;
    let registrarName = null;
    try {
        const rdapRes = await fetchWithTimeout(
            `https://rdap.org/domain/${encodeURIComponent(domain)}`,
            {
                headers: {
                    Accept: "application/rdap+json, application/json",
                },
            },
            4000,
        );
        if (rdapRes.ok) {
            const rdapData = await rdapRes.json();
            const events = rdapData.events || [];
            const regEvent = events.find((e) => e.eventAction === "registration");
            if (regEvent && regEvent.eventDate) {
                const regDate = new Date(regEvent.eventDate);
                const ageDays = Math.floor(
                    (Date.now() - regDate.getTime()) / (1000 * 60 * 60 * 24),
                );
                if (ageDays < 30) {
                    reasons.push(
                        `Tên miền cực mới: Đăng ký ${ageDays} ngày trước (Hơn 85% web lừa đảo vừa lập dưới 30 ngày)`,
                    );
                    riskScore += 45;
                    domainAgeText = `${ageDays} ngày (Cực kỳ mới)`;
                } else if (ageDays < 90) {
                    reasons.push(
                        `Tên miền mới đăng ký: ${ageDays} ngày trước (Dưới 3 tháng)`,
                    );
                    riskScore += 20;
                    domainAgeText = `${ageDays} ngày (< 3 tháng)`;
                } else {
                    const ageYears = (ageDays / 365.25).toFixed(1);
                    domainAgeText = `${ageYears} năm (Đăng ký từ ${regDate.toLocaleDateString("vi-VN")})`;
                    info.push(`Tên miền hoạt động lâu năm: ${domainAgeText}`);
                }
            }

            const registrarEntity = (rdapData.entities || []).find((e) =>
                (e.roles || []).includes("registrar"),
            );
            if (
                registrarEntity &&
                registrarEntity.vcardArray &&
                registrarEntity.vcardArray[1]
            ) {
                const fn = registrarEntity.vcardArray[1].find(
                    (item) => item[0] === "fn",
                );
                if (fn && fn[3]) {
                    registrarName = fn[3];
                }
            }
        }
    } catch {
        // ccTLD như .vn do VNNIC quản lý, RDAP quốc tế sẽ chuyển hướng
    }

    const isDangerous = riskScore >= 45 || reasons.length >= 2;
    const isSuspicious = !isDangerous && (riskScore >= 20 || reasons.length === 1);

    return {
        input: url,
        domain,
        isDangerous,
        isSuspicious,
        isSafe: !isDangerous && !isSuspicious,
        riskScore: Math.min(riskScore, 100),
        reasons,
        info,
        domainAgeText,
        registrarName,
        isDomainAlive,
        ips: dnsIps,
        checklegitUrl: `https://checklegit.com.vn/search?q=${encodeURIComponent(domain)}`,
        chongluadaoUrl: `https://chongluadao.vn/analyze/?q=${encodeURIComponent(domain)}`,
    };
}

// --- THUẬT TOÁN KIỂM TRA EMAIL ---
async function checkEmail(email) {
    const cleanEmail = email.trim().toLowerCase();
    const parts = cleanEmail.split("@");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        return {
            input: email,
            invalid: true,
            error: "Định dạng email chưa đúng cấu trúc chuẩn (Ví dụ: name@domain.com)",
        };
    }

    const username = parts[0];
    const emailDomain = parts[1];
    const reasons = [];
    const info = [];
    let isDangerous = false;
    let isSuspicious = false;

    // 1. Kiểm tra Email rác / tạm thời (Disposable/Temp Mail)
    const disposableDomains = [
        "mailinator.com",
        "tempmail.com",
        "temp-mail.org",
        "10minutemail.com",
        "guerrillamail.com",
        "sharklasers.com",
        "yopmail.com",
        "throwawaymail.com",
        "trashmail.com",
        "dispostable.com",
        "getnada.com",
        "maildrop.cc",
        "fakeinbox.com",
        "generator.email",
        "mohmal.com",
        "inboxkitten.com",
    ];
    if (
        disposableDomains.some(
            (d) => emailDomain === d || emailDomain.endsWith("." + d),
        )
    ) {
        reasons.push(
            "Đây là dịch vụ email tạm thời / rác (Disposable Mail) thường được kẻ gian dùng để ẩn danh khi lập tài khoản lừa đảo",
        );
        isDangerous = true;
    }

    // 2. Kiểm tra Mạo danh thương hiệu qua Email miễn phí
    const freeProviders = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "icloud.com",
    ];
    const sensitiveNames = [
        "vietcombank",
        "techcombank",
        "bidv",
        "agribank",
        "mbbank",
        "tpbank",
        "vpbank",
        "cskh",
        "hotro",
        "security",
        "dichvucong",
        "congan",
        "shopee",
        "lazada",
        "tiki",
    ];
    if (freeProviders.includes(emailDomain)) {
        if (sensitiveNames.some((name) => username.includes(name))) {
            reasons.push(
                `Địa chỉ mạo danh: Đặt tên tổ chức/ngân hàng ('${username}') nhưng lại dùng hòm thư miễn phí (@${emailDomain}). Ngân hàng và cơ quan chính thống luôn dùng email đuôi miền riêng!`,
            );
            isDangerous = true;
        } else {
            info.push(`Email thuộc nhà cung cấp công cộng uy tín (@${emailDomain})`);
        }
    }

    // 3. Tra cứu máy chủ nhận thư (Bản ghi MX) qua Google Public DNS DoH
    let hasMx = false;
    let mxHosts = [];
    try {
        const mxRes = await fetchWithTimeout(
            `https://dns.google/resolve?name=${encodeURIComponent(emailDomain)}&type=MX`,
            {},
            3500,
        );
        if (mxRes.ok) {
            const mxData = await mxRes.json();
            if (
                mxData.Status === 0 &&
                mxData.Answer &&
                mxData.Answer.length > 0
            ) {
                hasMx = true;
                mxHosts = mxData.Answer.filter((a) => a.type === 15)
                    .map((a) => a.data.replace(/^\d+\s+/, ""))
                    .slice(0, 2);
                info.push(
                    `Tên miền có máy chủ nhận thư hợp lệ (Bản ghi MX: ${mxHosts.join(", ")})`,
                );
            } else if (mxData.Status === 3 || !mxData.Answer) {
                reasons.push(
                    "Tên miền này KHÔNG có máy chủ nhận thư (Không có bản ghi MX). Hòm thư không thể nhận phản hồi, dấu hiệu rõ ràng của spam hoặc phishing!",
                );
                isDangerous = true;
            }
        }
    } catch {
        // fallback
    }

    if (!isDangerous && reasons.length > 0) {
        isSuspicious = true;
    }

    return {
        input: email,
        username,
        domain: emailDomain,
        isDangerous,
        isSuspicious,
        isSafe: !isDangerous && !isSuspicious,
        reasons,
        info,
        hasMx,
        mxHosts,
        hibpUrl: "https://haveibeenpwned.com",
        chongluadaoUrl: `https://chongluadao.vn/analyze/?q=${encodeURIComponent(cleanEmail)}`,
    };
}

// --- THUẬT TOÁN KIỂM TRA SỐ ĐIỆN THOẠI & ĐẦU SỐ ---
async function checkPhone(phone) {
    const raw = phone.trim();
    let clean = raw.replace(/[\s\-.()]/g, "");
    if (clean.startsWith("+84")) {
        clean = "0" + clean.slice(3);
    } else if (clean.startsWith("84") && clean.length >= 11) {
        clean = "0" + clean.slice(2);
    }

    const reasons = [];
    const info = [];
    let isDangerous = false;
    let isSuspicious = false;
    let carrier = null;
    let phoneType = "Số di động";

    // 1. Kiểm tra đầu số quốc tế lừa đảo Wangiri / Vệ tinh
    if (raw.startsWith("+") && !raw.startsWith("+84")) {
        phoneType = "Số quốc tế";
        const highRiskPrefixes = [
            {
                code: "+881",
                name: "Dịch vụ Vệ tinh toàn cầu (Globalstar Satellite)",
            },
            {
                code: "+882",
                name: "Dịch vụ Viễn thông quốc tế (Thuraya Satellite)",
            },
            { code: "+883", name: "Dịch vụ Vệ tinh Inmarsat" },
            { code: "+224", name: "Guinea (Châu Phi)" },
            { code: "+252", name: "Somalia (Châu Phi)" },
            { code: "+231", name: "Liberia (Châu Phi)" },
            { code: "+232", name: "Sierra Leone (Châu Phi)" },
            { code: "+247", name: "Ascension Island" },
            { code: "+370", name: "Lithuania (Litva)" },
            { code: "+371", name: "Latvia (Lát-vi-a)" },
            { code: "+381", name: "Serbia" },
        ];

        const matchRisk = highRiskPrefixes.find((p) => raw.startsWith(p.code));
        if (matchRisk) {
            reasons.push(
                `CẢNH BÁO LỪA ĐẢO WANGIRI: Đầu số từ ${matchRisk.name}. Kẻ gian thường nháy máy một hồi để dụ người nhận gọi lại nhằm trừ cước viễn thông quốc tế cực đắt (lên tới hàng trăm nghìn đồng/phút)!`,
            );
            isDangerous = true;
        } else {
            reasons.push(
                "Cuộc gọi từ số điện thoại quốc tế lạ. Tuyệt đối không gọi lại nếu là cuộc gọi nhỡ không rõ danh tính!",
            );
            isSuspicious = true;
        }
    } else {
        // Số điện thoại Việt Nam
        const viettel = [
            "086",
            "096",
            "097",
            "098",
            "032",
            "033",
            "034",
            "035",
            "036",
            "037",
            "038",
            "039",
        ];
        const vinaphone = [
            "088",
            "091",
            "094",
            "081",
            "082",
            "083",
            "084",
            "085",
        ];
        const mobifone = [
            "089",
            "090",
            "093",
            "070",
            "076",
            "077",
            "078",
            "079",
        ];
        const vietnamobile = ["092", "056", "058"];
        const gmobile = ["099", "059"];
        const itelecom = ["087"];
        const wintel = ["055"];

        const prefix3 = clean.slice(0, 3);
        const prefix2 = clean.slice(0, 2);

        if (clean.length === 10 && prefix2 === "0") {
            if (viettel.includes(prefix3)) carrier = "Viettel";
            else if (vinaphone.includes(prefix3)) carrier = "VNPT VinaPhone";
            else if (mobifone.includes(prefix3)) carrier = "MobiFone";
            else if (vietnamobile.includes(prefix3)) carrier = "Vietnamobile";
            else if (gmobile.includes(prefix3)) carrier = "Gmobile";
            else if (itelecom.includes(prefix3))
                carrier = "iTelecom (Mạng di động ảo MVNO)";
            else if (wintel.includes(prefix3))
                carrier = "Wintel (Mạng di động ảo MVNO)";

            if (carrier) {
                info.push(`Nhà mạng phân bổ quy chuẩn: ${carrier}`);
            } else {
                reasons.push(
                    "Đầu số không khớp với dải số di động quy chuẩn của các nhà mạng viễn thông Việt Nam",
                );
                isSuspicious = true;
            }
        } else if (
            clean.startsWith("02") &&
            (clean.length === 11 || clean.length === 10)
        ) {
            phoneType = "Số máy bàn cố định";
            const landlinePrefix = clean.slice(0, 3);
            if (landlinePrefix === "024")
                info.push("Số cố định khu vực Hà Nội (Mã vùng 024)");
            else if (landlinePrefix === "028")
                info.push("Số cố định khu vực TP. Hồ Chí Minh (Mã vùng 028)");
            else if (landlinePrefix === "023")
                info.push("Số cố định khu vực miền Trung (Đà Nẵng / Huế / ...)");
            else info.push("Số điện thoại bàn cố định nội địa");
        } else if (clean.startsWith("1900") || clean.startsWith("1800")) {
            phoneType = "Tổng đài dịch vụ cước";
            info.push(
                "Đầu số tổng đài doanh nghiệp (1900 có thu cước / 1800 miễn phí)",
            );
        } else {
            reasons.push("Độ dài hoặc cấu trúc số điện thoại chưa đúng chuẩn");
            isSuspicious = true;
        }

        info.push(
            "MỆNH LỆNH AN TOÀN: Công an, Viện kiểm sát, Tòa án TUYỆT ĐỐI không làm việc hoặc yêu cầu chuyển tiền qua điện thoại.",
        );
    }

    return {
        input: phone,
        normalized: clean,
        phoneType,
        carrier,
        isDangerous,
        isSuspicious,
        isSafe: !isDangerous && !isSuspicious,
        reasons,
        info,
        checklegitUrl: `https://checklegit.com.vn/search?q=${encodeURIComponent(clean)}`,
        chongluadaoUrl: `https://chongluadao.vn/analyze/?q=${encodeURIComponent(clean)}`,
        ncscUrl: "https://canhbao.ncsc.gov.vn",
    };
}

const tabs = [
    {
        id: "url",
        label: "Website",
        fullLabel: "Kiểm tra Website",
        icon: Globe,
        placeholder: "Nhập tên miền hoặc link, ví dụ: vietcom-bank.com.verify.xyz",
    },
    {
        id: "email",
        label: "Email",
        fullLabel: "Kiểm tra Email",
        icon: Envelope,
        placeholder: "Nhập địa chỉ email, ví dụ: support@vietcom-bank.xyz",
    },
    {
        id: "phone",
        label: "Số ĐT",
        fullLabel: "Số điện thoại",
        icon: Phone,
        placeholder: "Nhập số điện thoại, ví dụ: 0912345678 hoặc +224...",
    },
];

function ResultCard({ result, type }) {
    if (!result) return null;

    if (result.invalid) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900"
            >
                <div className="flex items-start gap-3">
                    <Warning size={22} weight="fill" className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-base">Thông tin nhập chưa hợp lệ</h3>
                        <p className="text-sm mt-1 text-amber-800">{result.error}</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    let statusBg = "border-emerald-200 bg-emerald-50/70";
    let statusText = "text-emerald-900";
    let StatusIcon = CheckCircle;
    let iconColor = "text-emerald-600";
    let title = "Chưa phát hiện dấu hiệu lừa đảo nguy hiểm";

    if (result.isDangerous) {
        statusBg = "border-red-200 bg-red-50/80";
        statusText = "text-red-900";
        StatusIcon = XCircle;
        iconColor = "text-red-600";
        title = "CẢNH BÁO: Phát hiện nhiều dấu hiệu rủi ro cao!";
    } else if (result.isSuspicious) {
        statusBg = "border-amber-200 bg-amber-50/80";
        statusText = "text-amber-900";
        StatusIcon = Warning;
        iconColor = "text-amber-600";
        title = "CẦN LƯU Ý: Tồn tại yếu tố nghi vấn";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 rounded-2xl border p-5 sm:p-6 ${statusBg}`}
        >
            <div className="flex items-start gap-3.5">
                <StatusIcon size={26} weight="fill" className={`${iconColor} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h3 className={`text-base sm:text-lg font-bold ${statusText}`}>
                            {title}
                        </h3>
                        {type === "url" && result.riskScore > 0 && (
                            <span
                                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                    result.isDangerous
                                        ? "bg-red-100 text-red-700"
                                        : "bg-amber-100 text-amber-800"
                                }`}
                            >
                                Mức rủi ro: {result.riskScore}/100
                            </span>
                        )}
                    </div>

                    {/* Metadata summary bar */}
                    <div className="flex flex-wrap gap-2 my-2.5">
                        {type === "url" && (
                            <>
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs max-w-full break-all">
                                    <Globe size={13} className="shrink-0" />
                                    <span>{result.domain}</span>
                                </span>
                                {result.domainAgeText && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs">
                                        <Clock size={13} className="text-orange-500 shrink-0" />
                                        <span>Tuổi thọ tên miền: {result.domainAgeText}</span>
                                    </span>
                                )}
                                {result.registrarName && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs break-all">
                                        <CalendarBlank size={13} className="shrink-0" />
                                        <span>Nhà đăng ký: {result.registrarName}</span>
                                    </span>
                                )}
                            </>
                        )}

                        {type === "email" && (
                            <>
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs max-w-full break-all">
                                    <Envelope size={13} className="shrink-0" />
                                    <span>{result.input}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs">
                                    {result.hasMx ? (
                                        <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                                    ) : (
                                        <ShieldWarning size={13} className="text-red-500 shrink-0" />
                                    )}
                                    <span>{result.hasMx ? "Máy chủ nhận thư hợp lệ" : "Không có máy chủ nhận thư (Không thể gửi lại)"}</span>
                                </span>
                            </>
                        )}

                        {type === "phone" && (
                            <>
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs">
                                    <Phone size={13} className="shrink-0" />
                                    <span>{result.normalized}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs">
                                    <span>Loại: {result.phoneType}</span>
                                </span>
                                {result.carrier && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-white/90 px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs">
                                        <span>Mạng: {result.carrier}</span>
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    {/* Dấu hiệu cảnh báo nguy hiểm */}
                    {result.reasons && result.reasons.length > 0 && (
                        <div className="mt-3.5 space-y-1.5">
                            <p className="text-xs font-bold text-red-900 uppercase tracking-wide">
                                Dấu hiệu nhận biết bất thường:
                            </p>
                            <ul className="space-y-1.5">
                                {result.reasons.map((r) => (
                                    <li
                                        key={r}
                                        className="text-xs sm:text-sm text-red-800 flex items-start gap-2 bg-red-100/60 p-2 rounded-lg"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Dấu hiệu xác thực / thông tin kỹ thuật */}
                    {result.info && result.info.length > 0 && (
                        <div className="mt-3.5 space-y-1.5">
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                Kết quả đối soát hệ thống:
                            </p>
                            <ul className="space-y-1">
                                {result.info.map((inf) => (
                                    <li
                                        key={inf}
                                        className="text-xs sm:text-sm text-gray-700 flex items-start gap-2"
                                    >
                                        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                        <span>{inf}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Quick action verification links */}
                    <div className="mt-5 pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
                        {type === "url" && (
                            <>
                                <a
                                    href={result.chongluadaoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-xs"
                                >
                                    <span>Quét sâu trên ChongLuaDao.vn</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                                <a
                                    href={result.checklegitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    <span>Tra cứu CheckLegit</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                            </>
                        )}

                        {type === "email" && (
                            <>
                                <a
                                    href={result.chongluadaoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-xs"
                                >
                                    <span>Tra cứu trên ChongLuaDao.vn</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                                <a
                                    href={result.hibpUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    <span>Tra cứu dữ liệu rò rỉ HaveIBeenPwned</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                            </>
                        )}

                        {type === "phone" && (
                            <>
                                <a
                                    href={result.checklegitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-xs"
                                >
                                    <span>Báo cáo trên CheckLegit</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                                <a
                                    href={result.chongluadaoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    <span>Xem cảnh báo ChongLuaDao</span>
                                    <ArrowSquareOut size={14} />
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CheckerPage() {
    const [activeTab, setActiveTab] = useState("url");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const tab = tabs.find((t) => t.id === activeTab);

    const handleTabChange = (id) => {
        setActiveTab(id);
        setInput("");
        setResult(null);
    };

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            let res;
            if (activeTab === "url") res = await checkUrl(input.trim());
            else if (activeTab === "email") res = await checkEmail(input.trim());
            else res = await checkPhone(input.trim());
            setResult(res);
        } catch {
            setResult({
                invalid: true,
                error: "Không thể hoàn thành kiểm tra lúc này, vui lòng kiểm tra kết nối mạng và thử lại.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-gray-50 py-10 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shrink-0 shadow-xs">
                        <MagnifyingGlass size={22} weight="bold" />
                    </div>
                    <div>
                        <h1 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">
                            Công cụ kiểm tra lừa đảo
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Tra cứu thời gian thực tuổi thọ tên miền, máy chủ DNS, bản ghi email và đầu số viễn thông
                        </p>
                    </div>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xs p-4 sm:p-6 md:p-8">
                    {/* Tabs */}
                    <div role="tablist" aria-label="Hình thức kiểm tra" className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-gray-100 rounded-2xl mb-6">
                        {tabs.map((t) => {
                            const Icon = t.icon;
                            const isActive = activeTab === t.id;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => handleTabChange(t.id)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                        isActive
                                            ? "bg-white text-gray-950 shadow-xs"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon size={16} weight={isActive ? "fill" : "regular"} className="shrink-0" />
                                    <span className="hidden sm:inline">{t.fullLabel}</span>
                                    <span className="sm:hidden">{t.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleCheck} className="space-y-4">
                        <div>
                            <label htmlFor="checker-input" className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                                Nhập thông tin cần đối soát:
                            </label>
                            <input
                                id="checker-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={tab?.placeholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base font-bold transition-all shadow-md shadow-orange-500/20 active:scale-[0.99] cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Spinner size={18} className="animate-spin" />
                                    <span>Đang tra cứu dữ liệu an ninh mạng...</span>
                                </>
                            ) : (
                                <>
                                    <MagnifyingGlass size={18} weight="bold" />
                                    <span>Bắt đầu kiểm tra</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Result */}
                    <ResultCard result={result} type={activeTab} />
                </div>
            </div>
        </div>
    );
}
