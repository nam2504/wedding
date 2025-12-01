# 📖 HƯỚNG DẪN SỬ DỤNG THIỆP CƯỚI ONLINE

Chào mừng bạn đến với thiệp cưới online! Đây là hướng dẫn chi tiết để bạn tùy chỉnh thiệp theo ý muốn.

## 📋 MỤC LỤC

1. [Bắt đầu nhanh](#bắt-đầu-nhanh)
2. [Cấu hình thông tin](#cấu-hình-thông-tin)
3. [Tùy chỉnh giao diện](#tùy-chỉnh-giao-diện)
4. [Thêm ảnh của bạn](#thêm-ảnh-của-bạn)
5. [Cài đặt tính năng](#cài-đặt-tính-năng)
6. [Đăng tải lên web](#đăng-tải-lên-web)
7. [Câu hỏi thường gặp](#câu-hỏi-thường-gặp)

---

## 🚀 BẮT ĐẦU NHANH

### 1. Mở file `config.js`
Tất cả thông tin của thiệp cưới được lưu trong file `config.js`. Bạn chỉ cần chỉnh sửa file này mà không cần động đến code.

### 2. Xem trước thiệp
- **Cách 1**: Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Edge...)
- **Cách 2**: Sử dụng Live Server extension trong VS Code

### 3. Các file quan trọng
```
wedding/
├── index.html      # File HTML chính (KHÔNG CẦN SỬA)
├── config.js       # ⭐ File cấu hình - CHỈ SỬA FILE NÀY
├── style.css       # File CSS (có thể tùy chỉnh nâng cao)
├── script.js       # File JavaScript (có thể tùy chỉnh nâng cao)
└── HUONGDAN.md     # File hướng dẫn này
```

---

## ⚙️ CẤU HÌNH THÔNG TIN

Mở file `config.js` và tìm các phần sau:

### 1️⃣ Thông tin cô dâu & chú rể

```javascript
bride: {
  fullName: "Nguyễn Thị Lan Anh",     // Tên đầy đủ cô dâu
  nickName: "Lan Anh",                 // Tên thường gọi
  parents: "Con ông Nguyễn Văn A & bà Trần Thị B",  // Thông tin cha mẹ
  avatar: "link-anh-co-dau.jpg"       // Link ảnh cô dâu
},

groom: {
  fullName: "Trần Văn Nam",           // Tên đầy đủ chú rể
  nickName: "Nam",                     // Tên thường gọi
  parents: "Con ông Trần Văn C & bà Lê Thị D",  // Thông tin cha mẹ
  avatar: "link-anh-chu-re.jpg"       // Link ảnh chú rể
}
```

### 2️⃣ Ngày cưới

```javascript
wedding: {
  date: "2025-12-20",                 // ⚠️ Định dạng: YYYY-MM-DD
  dayOfWeek: "Thứ Bảy",               // Thứ trong tuần
  lunarDate: "Ngày 20 tháng 11 năm Ất Tỵ"  // Âm lịch (nếu có)
}
```

### 3️⃣ Lễ thành hôn

```javascript
ceremony: {
  time: "09:00",                      // Giờ bắt đầu
  endTime: "11:00",                   // Giờ kết thúc
  date: "2025-12-20",                 // Ngày diễn ra
  location: "Nhà thờ Thánh Tâm",     // Tên địa điểm
  address: "123 Đường Lê Duẩn, TP. Vinh, Nghệ An",  // Địa chỉ chi tiết
  mapUrl: "link-google-maps-embed"    // Link Google Maps (xem hướng dẫn bên dưới)
}
```

### 4️⃣ Tiệc cưới

```javascript
reception: {
  time: "18:30",                      // Giờ bắt đầu
  endTime: "21:30",                   // Giờ kết thúc
  date: "2025-12-20",                 // Ngày diễn ra
  location: "Nhà hàng Hồng Phát",    // Tên nhà hàng
  address: "456 Đường Quang Trung, TP. Vinh, Nghệ An",  // Địa chỉ
  mapUrl: "link-google-maps-embed"    // Link Google Maps
}
```

**💡 Hướng dẫn lấy link Google Maps:**
1. Mở Google Maps
2. Tìm địa điểm của bạn
3. Click "Chia sẻ" (Share)
4. Chọn tab "Nhúng bản đồ" (Embed a map)
5. Copy đoạn code trong `src="..."`
6. Paste vào `mapUrl`

### 5️⃣ Thông tin liên hệ

```javascript
contact: {
  phone: {
    bride: "0901234567",              // SĐT cô dâu
    groom: "0907654321"               // SĐT chú rể
  },
  email: "cuoi.lananh.nam@gmail.com",  // Email
  rsvpDeadline: "2025-12-01",          // Hạn xác nhận tham dự
  rsvpFormUrl: "link-google-form"      // Link Google Form RSVP
}
```

**💡 Tạo Google Form RSVP:**
1. Truy cập [forms.google.com](https://forms.google.com)
2. Tạo form mới với các câu hỏi: Tên, SĐT, Số người tham dự, v.v.
3. Click "Gửi" > Copy link
4. Paste vào `rsvpFormUrl`

### 6️⃣ Thông tin ngân hàng (nhận mừng cưới)

```javascript
banking: {
  enable: true,                       // true = hiển thị, false = ẩn
  accounts: [
    {
      bank: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "NGUYEN THI LAN ANH",
      qrCode: "link-ma-qr.png"        // Link ảnh QR code
    }
  ]
}
```

**💡 Tạo mã QR ngân hàng:**
1. Truy cập [VietQR.io](https://vietqr.io)
2. Chọn ngân hàng, nhập STK
3. Tải mã QR về
4. Upload lên [imgur.com](https://imgur.com) hoặc dịch vụ host ảnh
5. Copy link ảnh vào `qrCode`

---

## 🎨 TÙY CHỈNH GIAO DIỆN

### Màu sắc chủ đạo

```javascript
theme: {
  primaryColor: "#d4a574",            // Màu chính (vàng gold)
  secondaryColor: "#8b7355",          // Màu phụ (nâu)
  backgroundColor: "#fdf8f3",         // Màu nền (be nhạt)
  heroBackground: "link-anh-nen.jpg"  // Ảnh nền header
}
```

**🎨 Gợi ý bảng màu:**
- **Romantic Pink**: `#ffb6c1` (hồng) + `#ff69b4` (hồng đậm)
- **Classic Gold**: `#d4a574` (vàng) + `#8b7355` (nâu)
- **Navy Elegance**: `#1e3a8a` (xanh navy) + `#60a5fa` (xanh nhạt)
- **Vintage**: `#c19a6b` (be) + `#8b4513` (nâu đất)

### Bật/tắt các section

```javascript
ui: {
  showCountdown: true,      // Đếm ngược thời gian
  showLoveStory: true,      // Câu chuyện tình yêu
  showGallery: true,        // Album ảnh
  showBridalParty: true,    // Phù dâu/phù rể
  showGuestbook: true,      // Sổ lưu bút
  animation: true,          // Hiệu ứng animation
  particles: false          // Hiệu ứng hạt rơi (tắt mặc định)
}
```

---

## 📸 THÊM ẢNH CỦA BẠN

### Cách 1: Upload ảnh lên dịch vụ host (Khuyên dùng)

1. **Imgur** (Miễn phí, không cần đăng ký):
   - Truy cập [imgur.com](https://imgur.com)
   - Click "New post" > Upload ảnh
   - Click chuột phải vào ảnh > "Copy image address"
   - Paste link vào config

2. **Google Drive**:
   - Upload ảnh lên Drive
   - Click chuột phải > "Chia sẻ" > "Mọi người có link đều có thể xem"
   - Copy link chia sẻ
   - Chuyển đổi link: `https://drive.google.com/file/d/FILE_ID/view`
     → `https://drive.google.com/uc?id=FILE_ID`

3. **GitHub** (Nếu dùng GitHub Pages):
   - Tạo folder `images/` trong project
   - Upload ảnh vào folder
   - Link ảnh: `images/ten-anh.jpg`

### Cách 2: Dùng ảnh local (Chỉ test)

```javascript
// Đặt ảnh vào cùng folder với index.html
avatar: "anh-co-dau.jpg"
```

### Gallery - Album ảnh cưới

```javascript
gallery: {
  enable: true,
  photos: [
    "link-anh-1.jpg",
    "link-anh-2.jpg",
    "link-anh-3.jpg",
    // Thêm bao nhiêu ảnh cũng được!
  ]
}
```

### Love Story - Câu chuyện tình yêu

```javascript
loveStory: {
  enable: true,
  timeline: [
    {
      year: "2020",
      title: "Lần đầu gặp gỡ",
      description: "Viết câu chuyện của bạn ở đây...",
      image: "link-anh.jpg"
    },
    // Thêm nhiều mốc thời gian...
  ]
}
```

---

## 🎵 CÀI ĐẶT TÍNH NĂNG

### Âm nhạc nền

```javascript
music: {
  enable: true,                       // Bật/tắt nhạc
  autoplay: false,                    // Tự động phát (khuyên dùng false)
  url: "link-nhac.mp3"                // Link file nhạc MP3
}
```

**💡 Lấy link nhạc:**
- Upload file MP3 lên Google Drive hoặc Dropbox
- Hoặc dùng link từ SoundCloud, YouTube MP3...

### Phù dâu & Phù rể

```javascript
bridalParty: {
  enable: true,
  bridesmaids: [
    {
      name: "Nguyễn Thị Mai",
      role: "Phù dâu",
      avatar: "link-anh.jpg"
    }
  ],
  groomsmen: [
    {
      name: "Lê Văn Hùng",
      role: "Phù rể",
      avatar: "link-anh.jpg"
    }
  ]
}
```

---

## 🌐 ĐĂNG TẢI LÊN WEB

### Cách 1: GitHub Pages (Miễn phí, Khuyên dùng)

1. **Tạo tài khoản GitHub** (nếu chưa có):
   - Truy cập [github.com](https://github.com)
   - Đăng ký tài khoản miễn phí

2. **Tạo repository mới**:
   - Click "New repository"
   - Đặt tên: `wedding-invitation`
   - Chọn "Public"
   - Click "Create repository"

3. **Upload files**:
   - Click "uploading an existing file"
   - Kéo thả tất cả files: `index.html`, `config.js`, `style.css`, `script.js`
   - Click "Commit changes"

4. **Bật GitHub Pages**:
   - Vào Settings > Pages
   - Source: chọn "main" branch
   - Click "Save"
   - Đợi 1-2 phút

5. **Lấy link thiệp**:
   - Link sẽ là: `https://your-username.github.io/wedding-invitation`
   - Chia sẻ link này cho khách mời!

### Cách 2: Netlify (Dễ hơn, có domain đẹp)

1. Truy cập [netlify.com](https://netlify.com)
2. Kéo thả toàn bộ folder vào
3. Netlify tự động deploy
4. Nhận link: `https://your-site.netlify.app`
5. (Optional) Đổi tên domain miễn phí

### Cách 3: Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Import từ GitHub hoặc kéo thả files
3. Deploy tự động
4. Nhận link: `https://your-site.vercel.app`

---

## ❓ CÂU HỎI THƯỜNG GẶP

### ❓ Làm sao thay đổi font chữ?

Mở `index.html`, tìm dòng:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display..." rel="stylesheet">
```

Thay đổi font trên [Google Fonts](https://fonts.google.com), copy link mới vào.

### ❓ Làm sao ẩn section không cần dùng?

Trong `config.js`, set `enable: false`:
```javascript
banking: {
  enable: false  // Ẩn phần thông tin ngân hàng
}
```

### ❓ Thiệp có responsive trên mobile không?

Có! Thiệp tự động responsive, hiển thị đẹp trên mọi thiết bị.

### ❓ Có thể dùng nhiều ngôn ngữ không?

Có, sửa text trong `config.js` và `messages`:
```javascript
messages: {
  welcome: "Trân trọng kính mời",
  invitation: "Đến dự tiệc cưới của chúng tôi",
  thankyou: "Cảm ơn bạn!",
  footer: "Made with ❤️"
}
```

### ❓ Làm sao thêm video vào thiệp?

Mở `index.html`, thêm section mới:
```html
<section class="video">
  <h2 class="section-title">Video cưới</h2>
  <iframe width="560" height="315"
          src="https://www.youtube.com/embed/VIDEO_ID"
          frameborder="0" allowfullscreen>
  </iframe>
</section>
```

### ❓ Thiệp có bị lỗi trên Safari không?

Không, thiệp được test trên Chrome, Firefox, Safari, Edge.

### ❓ Có thể thêm countdown đến nhiều event không?

Hiện tại countdown chỉ đếm đến ngày cưới chính. Để thêm nhiều countdown, cần chỉnh sửa `script.js`.

### ❓ Làm sao xem số người đã xác nhận tham dự?

Nếu dùng Google Form, vào "Responses" trong Form để xem danh sách.

### ❓ Có thể tích hợp chat bot không?

Có thể tích hợp Messenger, Tawk.to, hoặc các dịch vụ chat khác bằng cách thêm script vào `index.html`.

---

## 🎉 MẸO VÀ GỢI Ý

### ✅ Checklist trước khi publish:

- [ ] Đã thay đổi tên cô dâu & chú rể
- [ ] Đã cập nhật ngày cưới
- [ ] Đã thêm địa chỉ và bản đồ chính xác
- [ ] Đã upload ảnh cá nhân (không dùng ảnh demo)
- [ ] Đã tạo Google Form RSVP và link đúng
- [ ] Đã test thiệp trên mobile
- [ ] Đã kiểm tra tất cả link
- [ ] Đã test countdown timer
- [ ] Đã thêm thông tin liên hệ

### 🎨 Tạo thiệp đẹp hơn:

1. **Chọn ảnh chất lượng cao**: Tối thiểu 1920x1080px
2. **Thống nhất tone màu**: Chọn 2-3 màu chủ đạo
3. **Viết nội dung ngắn gọn**: Khách mời thường đọc qua
4. **Test trên nhiều thiết bị**: Mobile, tablet, desktop
5. **Tối ưu tốc độ**: Nén ảnh trước khi upload

### 🔥 Tính năng nâng cao:

Nếu bạn biết code, có thể thêm:
- Animation khi cuộn trang (đã có sẵn)
- Hiệu ứng hạt rơi (uncomment trong `index.html`)
- Chức năng gửi SMS mời
- Tích hợp Google Analytics
- Live chat với cô dâu chú rể

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:

1. **Đọc lại hướng dẫn** - 90% vấn đề đã được giải đáp
2. **Kiểm tra console** - Mở F12 trong trình duyệt, xem tab Console
3. **Google hoặc ChatGPT** - Hỏi về lỗi cụ thể

---

## 🎊 CHÚC MỪNG!

Bạn đã hoàn thành thiệp cưới online của mình!

Chúc bạn có một đám cưới thật hạnh phúc và trọn vẹn! 💑💐

---

**Made with ❤️ by Claude AI**

*Version 1.0 - 2025*
