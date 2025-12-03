// ============================================
// FILE CẤU HÌNH THIỆP CƯỚI
// Chỉnh sửa các thông tin dưới đây theo thông tin của bạn
// ============================================

const weddingConfig = {
  // THÔNG TIN CÔ DÂU & CHÚ RỂ
  bride: {
    fullName: "Đặng Phương Anh",
    nickName: "Bell",
    parents: "Con ông Đặng Hoàng Sơn & bà Võ Thị Mai",
    avatar: "images/bride.jpg"
  },

  groom: {
    fullName: "Lê Anh Nam",
    nickName: "NamLee",
    parents: "Con ông Lê Minh Dương & bà Nguyễn Thị Huyền Nga",
    avatar: "images/groom.jpg"
  },

  // NGÀY CƯỚI
  wedding: {
    date: "2026-01-08", // Định dạng: YYYY-MM-DD
    dayOfWeek: "Thứ Năm",
    lunarDate: "Ngày 09 tháng 12 năm Ất Tỵ", // Âm lịch
  },

  // SỰ KIỆN - Lễ Vu Quy (nhà gái)
  ceremony: {
    title: "Lễ Vu Quy (nhà gái)",
    time: "09:00",
    endTime: "11:00",
    date: "2026-01-08",
    location: "Tư gia nhà gái",
    address: "240 Nguyễn Sinh Cung, Nghi Hương, Vinh, Nghệ An, Vietnam",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4658.926614734316!2d105.70552544939423!3d18.788365297762194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139d3f26a93c429%3A0xb2351ed7acfeab86!2zMjQwIE5ndXnhu4VuIFNpbmggQ3VuZywgTmdoaSBIxrDGoW5nLCBWaW5oLCBOZ2jhu4cgQW4sIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1764741736097!5m2!1sen!2s"
  },

  // SỰ KIỆN - Lễ Thành Hôn (nhà trai)
  reception: {
    title: "Lễ Thành Hôn (nhà trai)",
    time: "18:00",
    endTime: "21:00",
    date: "2026-01-08",
    location: "Khách sạn Summer Cửa Lò",
    address: "268 Bình Minh, Nghi Hương, Vinh, Nghệ An",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4658.651657270418!2d105.72318636605215!3d18.798302308673257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139d47f34094fff%3A0x171f14c4ef9366c2!2sSummer%20Cua%20Lo%20Hotel!5e0!3m2!1sen!2s!4v1764741475962!5m2!1sen!2s"
  },

  // CÂU CHUYỆN TÌNH YÊU
  loveStory: {
    enable: false, // true = hiển thị, false = ẩn
    timeline: [
      {
        year: "2020",
        title: "Lần đầu gặp gỡ",
        description: "Chúng tôi gặp nhau lần đầu tại quán cà phê gần trường đại học. Một buổi chiều mưa bất chợt, một cái dù được chia sẻ đã nối liền hai trái tim.",
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop"
      },
      {
        year: "2021",
        title: "Tình yêu nảy nở",
        description: "Sau nhiều lần gặp gỡ, chúng tôi nhận ra rằng đây là người đặc biệt dành cho mình. Tình yêu bắt đầu từ những điều giản dị nhất.",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop"
      },
      {
        year: "2023",
        title: "Lời cầu hôn",
        description: "Dưới bầu trời đầy sao, anh đã quỳ gối cầu hôn em. Và em đã nói 'Có' với ánh mắt hạnh phúc rưng rưng.",
        image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&h=400&fit=crop"
      },
      {
        year: "2025",
        title: "Về chung một nhà",
        description: "Và giờ đây, chúng tôi sẵn sàng bước vào chặng đường mới - cùng nhau xây dựng tổ ấm hạnh phúc.",
        image: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=400&fit=crop"
      }
    ]
  },

  // ALBUM ẢNH CƯỚI
  gallery: {
    enable: true,
    photos: [
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop", category: "prewedding" },
      { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop", category: "prewedding" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop", category: "ceremony" },
      { url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop", category: "ceremony" },
      { url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop", category: "party" },
      { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop", category: "party" }
    ]
  },

  // PHÙ DÂU & PHÙ RỂ
  bridalParty: {
    enable: false,
    bridesmaids: [
      { name: "Nguyễn Thị Mai", role: "Phù dâu", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Trần Thị Thu", role: "Phù dâu", avatar: "https://i.pravatar.cc/150?img=5" }
    ],
    groomsmen: [
      { name: "Lê Văn Hùng", role: "Phù rể", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Phạm Văn Đức", role: "Phù rể", avatar: "https://i.pravatar.cc/150?img=13" }
    ]
  },

  // THÔNG TIN LIÊN HỆ & RSVP
  contact: {
    phone: {
      bride: "0382854527",
      groom: "0857520328"
    },
    email: "",
    rsvpDeadline: "2025-12-15",
    rsvpFormUrl: "https://forms.gle/1ww3Zn5nnQagJ1fG6", // Link Google Form
  },

  // THÔNG TIN NGÂN HÀNG (để nhận mừng cưới)
  banking: {
    enable: true,
    accounts: [
      {
        bank: "Vietcombank",
        accountNumber: "1027277521",
        accountName: "LE ANH NAM",
        qrCode: "https://img.vietqr.io/image/VCB-1234567890-compact.png?amount=&addInfo=Mung%20cuoi"
      },
      {
        bank: "Vietcombank",
        accountNumber: "1027277521",
        accountName: "LE ANH NAM",
        qrCode: "https://img.vietqr.io/image/TCB-0987654321-compact.png?amount=&addInfo=Mung%20cuoi"
      }
    ]
  },

  // ÂM NHẠC NỀN
  music: {
    enable: true, // true = tự động phát nhạc, false = tắt
    autoplay: false, // true = tự động phát khi vào trang
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Link nhạc MP3
  },

  // BACKGROUND & MÀU SẮC
  theme: {
    primaryColor: "#d4a574", // Màu vàng gold
    secondaryColor: "#8b7355", // Màu nâu đất
    backgroundColor: "#fdf8f3", // Màu nền be nhạt
    heroBackground: "images/binhLieu.jpg", // Ảnh nền trang chủ (hero section)
    // Có thể dùng URL từ Google Drive, Unsplash, hoặc file local
    // Ví dụ: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=1080&fit=crop"
    // Hoặc dùng gradient: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
  },

  // TIMELINE NGÀY CƯỚI
  weddingDayTimeline: {
    enable: true,
    events: [
      { time: "09:00", title: "Đón khách", icon: "🎊", description: "Đón tiếp khách mời" },
      { time: "09:30", title: "Lễ thành hôn", icon: "💒", description: "Nghi lễ truyền thống" },
      { time: "11:00", title: "Chụp ảnh lưu niệm", icon: "📸", description: "Chụp ảnh cùng cô dâu chú rể" },
      { time: "18:00", title: "Tiệc cưới", icon: "🥂", description: "Tiệc chiêu đãi khách mời" },
      { time: "19:30", title: "First Dance", icon: "💃", description: "Điệu nhảy đầu tiên" },
      { time: "21:00", title: "Kết thúc", icon: "🎆", description: "Cảm ơn và tạm biệt" }
    ]
  },

  // WEATHER (Thời tiết)
  weather: {
    enable: true,
    city: "Vinh, Nghe An", // Tên thành phố
    apiKey: "", // OpenWeatherMap API key (tùy chọn, để trống sẽ dùng dữ liệu giả)
  },

  // FAQ (Câu hỏi thường gặp)
  faq: {
    enable: true,
    questions: [
      {
        question: "Tôi có thể mang theo người thân không?",
        answer: "Vâng, bạn có thể mang theo người thân. Vui lòng thông báo số lượng người đi cùng khi xác nhận tham dự."
      },
      {
        question: "Dress code là gì?",
        answer: "Dress code: Semi-formal hoặc Cocktail attire. Vui lòng tránh mặc màu trắng (dành cho cô dâu) và màu đen toàn bộ."
      },
      {
        question: "Có chỗ đỗ xe không?",
        answer: "Có, nhà hàng có bãi đỗ xe rộng rãi cho khách mời. Vui lòng xuất trình thiệp mời để được hỗ trợ đỗ xe miễn phí."
      },
      {
        question: "Tôi cần xác nhận tham dự trước khi nào?",
        answer: "Vui lòng xác nhận tham dự trước ngày 15/12/2025 để chúng tôi chuẩn bị chu đáo."
      },
      {
        question: "Có menu vegetarian không?",
        answer: "Có, chúng tôi có menu chay. Vui lòng thông báo khi xác nhận tham dự để chúng tôi sắp xếp."
      }
    ]
  },

  // GALLERY CATEGORIES
  galleryCategories: {
    enable: true,
    categories: [
      { id: "all", name: "Tất cả", icon: "🖼️" },
      { id: "prewedding", name: "Pre-wedding", icon: "💕" },
      { id: "ceremony", name: "Lễ cưới", icon: "💒" },
      { id: "party", name: "Tiệc cưới", icon: "🎉" }
    ]
  },

  // GOOGLE SHEETS API - GUESTBOOK
  guestbook: {
    enable: true,
    apiUrl: "https://script.google.com/macros/s/AKfycbymy5rUu_UMKCWqdWXHhLwj7ccFnZQz2hTOjhdhJgUSxbYwQGNTTG-QM7atLE14lOdtLA/exec", // URL của Google Apps Script Web App (xem hướng dẫn trong Code.gs)
    // Sau khi deploy Code.gs, paste URL vào đây
    // Ví dụ: "https://script.google.com/macros/s/AKfycbx.../exec"
    pageSize: 20, // Số comment hiển thị mỗi lần load
    maxLength: 500, // Độ dài tối đa của comment
    autoRefresh: true, // Tự động refresh sau mỗi 30s
    refreshInterval: 30000 // Thời gian refresh (ms)
  },

  // GIAO DIỆN
  ui: {
    showCountdown: false, // Hiển thị đếm ngược (đã có ở hero section)
    showLoveStory: false, // Hiển thị câu chuyện tình yêu
    showGallery: true, // Hiển thị album ảnh
    showBridalParty: false, // Hiển thị phù dâu/phù rể
    showGuestbook: true, // Hiển thị sổ lưu bút
    showWeddingTimeline: true, // Hiển thị timeline ngày cưới
    showWeather: true, // Hiển thị thời tiết
    showFAQ: true, // Hiển thị FAQ
    animation: true, // Bật hiệu ứng animation
    particles: true // Hiệu ứng hạt rơi
  },

  // THÔNG ĐIỆP
  messages: {
    welcome: "Trân trọng kính mời",
    invitation: "Đến dự tiệc cưới của chúng tôi",
    thankyou: "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!",
    footer: "Cảm ơn bạn đã ghé thăm thiệp cưới của chúng tôi ❤️"
  }
};

// Export để sử dụng
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weddingConfig;
}
