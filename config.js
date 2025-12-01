// ============================================
// FILE CẤU HÌNH THIỆP CƯỚI
// Chỉnh sửa các thông tin dưới đây theo thông tin của bạn
// ============================================

const weddingConfig = {
  // THÔNG TIN CÔ DÂU & CHÚ RỂ
  bride: {
    fullName: "Nguyễn Thị Lan Anh",
    nickName: "Lan Anh",
    parents: "Con ông Nguyễn Văn A & bà Trần Thị B",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },

  groom: {
    fullName: "Trần Văn Nam",
    nickName: "Nam",
    parents: "Con ông Trần Văn C & bà Lê Thị D",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },

  // NGÀY CƯỚI
  wedding: {
    date: "2025-12-20", // Định dạng: YYYY-MM-DD
    dayOfWeek: "Thứ Bảy",
    lunarDate: "Ngày 20 tháng 11 năm Ất Tỵ", // Âm lịch
  },

  // SỰ KIỆN - LỄ THÀNH HÔN
  ceremony: {
    time: "09:00",
    endTime: "11:00",
    date: "2025-12-20",
    location: "Nhà thờ Thánh Tâm",
    address: "123 Đường Lê Duẩn, Thành phố Vinh, Nghệ An",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.2973!2d105.6881!3d18.6762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzM0LjMiTiAxMDXCsDQxJzE3LjIiRQ!5e0!3m2!1svi!2s!4v1234567890"
  },

  // SỰ KIỆN - TIỆC CƯỚI
  reception: {
    time: "18:30",
    endTime: "21:30",
    date: "2025-12-20",
    location: "Nhà hàng Hồng Phát",
    address: "456 Đường Quang Trung, Thành phố Vinh, Nghệ An",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.2973!2d105.6881!3d18.6762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzM0LjMiTiAxMDXCsDQxJzE3LjIiRQ!5e0!3m2!1svi!2s!4v1234567890"
  },

  // CÂU CHUYỆN TÌNH YÊU
  loveStory: {
    enable: true, // true = hiển thị, false = ẩn
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
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop"
    ]
  },

  // PHÙ DÂU & PHÙ RỂ
  bridalParty: {
    enable: true,
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
      bride: "0901234567",
      groom: "0907654321"
    },
    email: "cuoi.lananh.nam@gmail.com",
    rsvpDeadline: "2025-12-01",
    rsvpFormUrl: "https://docs.google.com/forms/d/e/your-form-id/viewform", // Link Google Form
  },

  // THÔNG TIN NGÂN HÀNG (để nhận mừng cưới)
  banking: {
    enable: true,
    accounts: [
      {
        bank: "Vietcombank",
        accountNumber: "1234567890",
        accountName: "NGUYEN THI LAN ANH",
        qrCode: "https://img.vietqr.io/image/VCB-1234567890-compact.png?amount=&addInfo=Mung%20cuoi"
      },
      {
        bank: "Techcombank",
        accountNumber: "0987654321",
        accountName: "TRAN VAN NAM",
        qrCode: "https://img.vietqr.io/image/TCB-0987654321-compact.png?amount=&addInfo=Mung%20cuoi"
      }
    ]
  },

  // ÂM NHẠC NỀN
  music: {
    enable: false, // true = tự động phát nhạc, false = tắt
    autoplay: false, // true = tự động phát khi vào trang
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Link nhạc MP3
  },

  // BACKGROUND & MÀU SẮC
  theme: {
    primaryColor: "#d4a574", // Màu vàng gold
    secondaryColor: "#8b7355", // Màu nâu đất
    backgroundColor: "#fdf8f3", // Màu nền be nhạt
    heroBackground: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=1080&fit=crop", // Ảnh nền header
    // Hoặc dùng gradient:
    // heroBackground: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
  },

  // GIAO DIỆN
  ui: {
    showCountdown: true, // Hiển thị đếm ngược
    showLoveStory: true, // Hiển thị câu chuyện tình yêu
    showGallery: true, // Hiển thị album ảnh
    showBridalParty: true, // Hiển thị phù dâu/phù rể
    showGuestbook: true, // Hiển thị sổ lưu bút
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
