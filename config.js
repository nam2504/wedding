/* ==========================================
   WEDDING CONFIGURATION FILE

   This is the ONLY file you need to edit to customize your wedding website.
   All content, images, and settings are centralized here.

   Instructions:
   1. Replace all text content with your own information
   2. Update image URLs to point to your wedding photos
   3. Customize colors in style.css if needed (see CSS variables)
   4. No need to touch index.html unless you want to add new sections

   ========================================== */

const WEDDING_CONFIG = {
  // ==========================================
  // COUPLE INFORMATION
  // ==========================================
  couple: {
    groom: "Lê Anh Nam",            // Groom's name
    bride: "Đặng Phương Anh",       // Bride's name
    groomShort: "Anh Nam",          // Short name for couple section (optional)
    brideShort: "Phương Anh",       // Short name for couple section (optional)
  },

  // ==========================================
  // WEDDING DATE
  // ==========================================
  date: {
    display: "18 | 01 | 2025",                  // Date shown on the page
    full: "2025-01-18T11:00:00",                 // Full date for countdown (YYYY-MM-DDTHH:MM:SS)
  },

  // ==========================================
  // HERO SECTION
  // ==========================================
  hero: {
    subtitle: "CHÚNG TÔI CƯỚI",     // Text above names
  },

  // ==========================================
  // CEREMONIES & EVENTS
  // You can add multiple ceremonies here
  // ==========================================
  ceremonies: [
    {
      title: "Lễ Vu Quy",
      time: "18:00, Thứ Bảy",
      date: "2026-01-17",
      location: "Nhà Văn hóa Khối Trần Phú",
      address: "Nhà Văn hóa Khối Trần Phú, Phường Cửa Lò, Nghệ An",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.231193967155!2d105.7076409!3d18.787847400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139d38034fdd9e5%3A0xe26be39c0ba58af6!2zTmjDoCBWxINuIGjDs2EgS2jhu5FpIFRy4bqnbiBQaMO6!5e0!3m2!1sen!2s!4v1767331317578!5m2!1sen!2s"
    },
    {
      title: "Lễ Thành Hôn",
      time: "11:00, Chủ Nhật",
      date: "2026-01-18",
      location: "Sân Bóng Đá Cỏ Nhân Tạo Nghi Hương",
      address: "Khu đô thị Nguyễn Sinh Cung, Phường Cửa Lò, Nghệ An",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1323.1273496568042!2d105.72615641439221!3d18.789295120629202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139d3b9d4a3dfa5%3A0x5a351550a7cdf587!2zU8OibiBCw7NuZyDEkMOhIEPhu48gTmjDom4gVOG6oW8gTmdoaSBIxrDGoW5n!5e0!3m2!1sen!2s!4v1767337404478!5m2!1sen!2s"
    }
  ],

  // ==========================================
  // RSVP & GUESTBOOK LINKS
  // ==========================================
  rsvp: {
    guestbookLink: "https://forms.gle/your-google-form-id",      // Google Form or guestbook link
    confirmLink: "https://forms.gle/1ww3Zn5nnQagJ1fG6",           // RSVP confirmation link
  },

  // ==========================================
  // BANKING INFORMATION FOR GIFTS
  // Add QR codes for wedding gifts
  // ==========================================
  banking: {
    groom: {
      bank: "Vietcombank",
      accountName: "Lê Anh Nam",
      accountNumber: "1027277521",
      qrCode: "images/qr-wedding.png",
      // You can generate QR codes at: https://vietqr.io
    }
  },

  // ==========================================
  // IMAGES & ASSETS
  // Replace these with your own image URLs
  //
  // Options for image hosting:
  // 1. Local: Put images in /images/ folder
  //    Example: "images/couple.jpg"
  // 2. Google Drive: Use direct link
  //    Example: "https://drive.google.com/uc?id=YOUR_FILE_ID"
  // 3. Imgur, Cloudinary, or other image hosting services
  //
  // IMPORTANT: For hero photos, use images that show full faces
  // Avoid cropping the bride or groom's head
  // ==========================================
  assets: {
    // Hero section photos
    heroMainPhoto: "images/couple-main.jpg",                    // Main large photo
    heroSecondaryPhoto: "images/couple-small.jpg",              // Smaller secondary photo

    // Individual photos
    groomPhoto: "images/groom.jpg",                             // Groom solo photo
    bridePhoto: "images/bride.jpg",                             // Bride solo photo
    groomPhotoZoom: 30,                                         // Zoom groom photo by % (default: 15)

    // Gift section photo
    giftCouplePhoto: "images/couple-gift.jpg",                  // Photo shown in gift section
  },

  // ==========================================
  // PHOTO GALLERY
  // Gallery config moved to gallery-config.js
  // Run ./update-gallery.sh to refresh
  // ==========================================
  // Gallery is loaded from gallery-config.js automatically

  // ==========================================
  // TEXT MESSAGES
  // Customize all text content here
  // ==========================================
  messages: {
    welcomeTitle: "Trân trọng kính mời",                            // Welcome section title
    welcome: "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có thêm một niềm hạnh phúc!",

    eventSubtitle: "Sự hiện diện của bạn là niềm vinh dự của chúng tôi!", // Text below countdown

    gift: "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!",
  },

  // ==========================================
  // BACKGROUND MUSIC (Optional)
  // ==========================================
  music: {
    enabled: false,                                             // Set to true to enable music
    autoplay: false,                                            // Set to true for auto-play (may be blocked by browsers)
    url: "music/wedding-song.mp3",                              // Path to your music file
    // You can use:
    // - Local file: "music/song.mp3"
    // - External URL: "https://example.com/song.mp3"
  }
};

// ==========================================
// DO NOT EDIT BELOW THIS LINE
// ==========================================
// Make config available globally
window.WEDDING_CONFIG = WEDDING_CONFIG;
