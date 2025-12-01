# 💒 Thiệp Cưới Online - Wedding Invitation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Thiệp cưới online đẹp mắt, responsive và dễ dùng. Chỉ cần chỉnh sửa file config, không cần biết code!

## ✨ Tính năng

- 🎨 **Giao diện đẹp mắt** - Thiết kế hiện đại, thanh lịch
- 📱 **Responsive** - Hiển thị hoàn hảo trên mọi thiết bị
- ⏱️ **Countdown Timer** - Đếm ngược đến ngày cưới
- 📸 **Gallery** - Album ảnh cưới với lightbox
- 💑 **Love Story** - Timeline câu chuyện tình yêu
- 🗺️ **Google Maps** - Tích hợp bản đồ địa điểm
- 💝 **Guestbook** - Sổ lưu bút online
- 🎵 **Music Player** - Phát nhạc nền (tùy chọn)
- 💰 **Banking Info** - Hiển thị QR code nhận mừng
- ⚙️ **Easy Config** - Cấu hình đơn giản qua file `config.js`
- 🚀 **No Build Required** - Mở file HTML là chạy ngay
- 🌐 **Deploy dễ dàng** - GitHub Pages, Netlify, Vercel

## 🚀 Bắt đầu nhanh

### 1. Clone hoặc Download project

```bash
git clone https://github.com/your-username/wedding.git
cd wedding
```

### 2. Chỉnh sửa file `config.js`

Mở file `config.js` và thay đổi thông tin:

```javascript
const weddingConfig = {
  bride: {
    fullName: "Tên Cô Dâu",
    nickName: "Tên Gọi",
    avatar: "link-anh.jpg"
  },
  groom: {
    fullName: "Tên Chú Rể",
    nickName: "Tên Gọi",
    avatar: "link-anh.jpg"
  },
  wedding: {
    date: "2025-12-20",  // Định dạng YYYY-MM-DD
    // ... các thông tin khác
  }
}
```

### 3. Mở thiệp

- Mở file `index.html` bằng trình duyệt
- Hoặc dùng Live Server trong VS Code

### 4. Deploy lên web

Xem hướng dẫn chi tiết trong [HUONGDAN.md](HUONGDAN.md)

## 📁 Cấu trúc thư mục

```
wedding/
├── index.html          # File HTML chính
├── config.js           # ⭐ File cấu hình - CHỈ SỬA FILE NÀY
├── style.css           # CSS styling
├── script.js           # JavaScript logic
├── README.md           # File này
└── HUONGDAN.md         # Hướng dẫn chi tiết tiếng Việt
```

## 📖 Hướng dẫn chi tiết

Xem [HUONGDAN.md](HUONGDAN.md) để biết:
- Cách cấu hình chi tiết
- Cách thêm ảnh
- Cách tùy chỉnh màu sắc
- Cách deploy lên web
- Câu hỏi thường gặp

## 🎨 Demo

[Xem demo tại đây](https://your-username.github.io/wedding)

## 📸 Screenshots

![Hero Section](https://via.placeholder.com/800x400?text=Hero+Section)
![Gallery](https://via.placeholder.com/800x400?text=Gallery+Section)
![Timeline](https://via.placeholder.com/800x400?text=Love+Story+Timeline)

## 🛠️ Tech Stack

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (No frameworks!)
- Google Fonts
- Google Maps Embed API

## 🌟 Tính năng nổi bật

### Countdown Timer
Đếm ngược đến ngày cưới với animation đẹp mắt

### Love Story Timeline
Kể câu chuyện tình yêu của bạn qua các mốc thời gian

### Photo Gallery
Album ảnh với lightbox, click để xem ảnh lớn

### Guestbook
Khách mời có thể gửi lời chúc trực tiếp trên thiệp

### QR Banking
Hiển thị QR code để khách dễ dàng chuyển khoản mừng cưới

## 📱 Responsive Design

Thiệp tự động điều chỉnh để hiển thị đẹp trên:
- 📱 Mobile (iPhone, Android)
- 📱 Tablet (iPad, Android tablets)
- 💻 Desktop (All screen sizes)

## 🎯 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🚀 Deploy

### GitHub Pages (Free)

```bash
# 1. Push code lên GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/wedding.git
git push -u origin main

# 2. Enable GitHub Pages trong Settings > Pages
# 3. Truy cập: https://your-username.github.io/wedding
```

### Netlify / Vercel

Kéo thả folder vào Netlify hoặc Vercel để deploy tức thì!

## 📝 Customization

### Thay đổi màu sắc

Trong `config.js`:

```javascript
theme: {
  primaryColor: "#d4a574",      // Màu chính
  secondaryColor: "#8b7355",    // Màu phụ
  backgroundColor: "#fdf8f3"    // Màu nền
}
```

### Bật/tắt các section

```javascript
ui: {
  showCountdown: true,      // Đếm ngược
  showLoveStory: true,      // Câu chuyện tình yêu
  showGallery: true,        // Album ảnh
  showBridalParty: true,    // Phù dâu/phù rể
  showGuestbook: true       // Sổ lưu bút
}
```

## ❓ FAQ

**Q: Tôi không biết code, có dùng được không?**
A: Có! Bạn chỉ cần sửa file `config.js`, không cần biết code.

**Q: Thiệp có miễn phí không?**
A: Hoàn toàn miễn phí! Dùng thoải mái, không giới hạn.

**Q: Có thể thêm video không?**
A: Có, xem hướng dẫn trong [HUONGDAN.md](HUONGDAN.md)

**Q: Deploy có mất phí không?**
A: Không! GitHub Pages, Netlify, Vercel đều miễn phí.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📄 License

This project is [MIT](LICENSE) licensed.

## 💖 Credits

- Design inspiration from various wedding invitation themes
- Images from [Unsplash](https://unsplash.com)
- Icons from Unicode emoji

## 🎉 Showcase

Nếu bạn dùng thiệp này cho đám cưới, hãy gửi link cho tôi!

---

**Made with ❤️ for your special day**

⭐ Nếu thấy hữu ích, hãy cho project một star nhé!
