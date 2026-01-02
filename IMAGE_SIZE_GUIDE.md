# 📸 HƯỚNG DẪN KÍCH THƯỚC ẢNH TỐI ƯU

## 🎯 TÓM TẮT NHANH

| Ảnh | Kích thước gốc tối thiểu | Tỉ lệ khung hình | Format | Dung lượng tối đa |
|-----|--------------------------|------------------|---------|-------------------|
| **couple-main.jpg** | 700×900px | 7:9 (dọc) | JPEG/WebP | 150KB |
| **couple-small.jpg** | 400×500px | 4:5 (dọc) | JPEG/WebP | 80KB |

---

## 📐 CHI TIẾT TỪNG ẢNH

### 1. **couple-main.jpg** (Ảnh chính - Photo Large)

#### Kích thước hiển thị trên website:
```css
Desktop:  350×450px
Tablet:   280×360px
Mobile:   250×320px
Mobile S: 220×280px
```

#### Kích thước gốc khuyên dùng:
```
Tối thiểu: 700×900px (2x retina)
Tối ưu:    1050×1350px (3x retina, cho màn hình 4K)
Tối đa:    1400×1800px (không cần lớn hơn)
```

#### Tỉ lệ khung hình:
- **7:9** (chiều cao dài hơn chiều rộng)
- Ví dụ: 700×900, 1050×1350, 1400×1800

#### Yêu cầu nội dung:
- ✅ Ảnh chân dung (portrait)
- ✅ Chụp từ đầu đến vai/ngực
- ✅ Mặt ở 1/3 phía trên (vì có `object-position: center top`)
- ⚠️ **QUAN TRỌNG:** Không để đầu bị cắt (border-radius 50% sẽ làm tròn ảnh)

#### Format & Quality:
```
Format:   JPEG (80-85% quality) hoặc WebP (85% quality)
Profile:  sRGB
Dung lượng: 100-150KB (sau khi optimize)
```

---

### 2. **couple-small.jpg** (Ảnh phụ - Photo Small)

#### Kích thước hiển thị trên website:
```css
Desktop:  200×250px
Tablet:   160×200px
Mobile:   140×180px
Mobile S: 120×150px
```

#### Kích thước gốc khuyên dùng:
```
Tối thiểu: 400×500px (2x retina)
Tối ưu:    600×750px (3x retina)
Tối đa:    800×1000px (không cần lớn hơn)
```

#### Tỉ lệ khung hình:
- **4:5** (chiều cao dài hơn chiều rộng)
- Ví dụ: 400×500, 600×750, 800×1000

#### Yêu cầu nội dung:
- ✅ Ảnh chân dung (portrait)
- ✅ Có thể là ảnh đôi hoặc cận cảnh gương mặt
- ✅ Mặt ở trung tâm hoặc 1/3 phía trên
- ⚠️ Ảnh sẽ được crop tròn (border-radius 50%)

#### Format & Quality:
```
Format:   JPEG (80-85% quality) hoặc WebP (85% quality)
Profile:  sRGB
Dung lượng: 60-80KB (sau khi optimize)
```

---

## 🎨 HƯỚNG DẪN CHỌN ẢNH

### Cho **couple-main.jpg** (ảnh lớn):
✅ **NÊN:**
- Ảnh chân dung, chụp từ đầu đến vai/ngực
- Gương mặt rõ nét, ánh sáng đẹp
- Background đơn giản hoặc blur
- Trang phục lịch sự (áo cưới, vest, áo dài...)
- Biểu cảm tự nhiên, cười nhẹ

❌ **KHÔNG NÊN:**
- Ảnh toàn thân (sẽ bị crop mất phần dưới)
- Nhiều người (chỉ nên 1-2 người)
- Background quá rối (phân tán sự chú ý)
- Ảnh tối, mờ, pixelated
- Chụp từ xa (mặt quá nhỏ)

### Cho **couple-small.jpg** (ảnh nhỏ):
✅ **NÊN:**
- Ảnh cận mặt hoặc ảnh đôi ngọt ngào
- Có thể là ảnh vui vẻ, thoải mái hơn
- Tương phản với ảnh chính (nếu ảnh chính nghiêm túc, ảnh này có thể vui hơn)

❌ **KHÔNG NÊN:**
- Cùng ảnh với couple-main (nhàm chán)
- Ảnh quá xa (vì ảnh nhỏ nên cần cận cảnh)

---

## 🔧 CÁCH RESIZE & OPTIMIZE ẢNH

### Option 1: Dùng Online Tool (Khuyên dùng - Dễ nhất)

#### Squoosh.app (Google, miễn phí)
1. Truy cập: https://squoosh.app/
2. Kéo thả ảnh gốc vào
3. **Left panel (Original):**
   - Xem kích thước gốc
4. **Right panel (Optimized):**
   - Resize:
     - Width: 700px (cho main) hoặc 400px (cho small)
     - Height: auto (giữ tỉ lệ)
     - Method: Lanczos3
   - Compress:
     - Format: JPEG hoặc WebP
     - Quality: 85
5. Download → Save as `couple-main.jpg` hoặc `couple-small.jpg`

#### ImageOptim (macOS)
```bash
# Install
brew install imageoptim

# Optimize
imageoptim couple-main.jpg couple-small.jpg
```

---

### Option 2: Dùng ImageMagick (CLI - Cho dev)

```bash
# Install
brew install imagemagick  # macOS
sudo apt install imagemagick  # Ubuntu/Debian

# Resize couple-main.jpg
convert input-main.jpg \
  -resize 700x900^ \
  -gravity center \
  -extent 700x900 \
  -quality 85 \
  -sampling-factor 4:2:0 \
  -strip \
  couple-main.jpg

# Resize couple-small.jpg
convert input-small.jpg \
  -resize 400x500^ \
  -gravity center \
  -extent 400x500 \
  -quality 85 \
  -sampling-factor 4:2:0 \
  -strip \
  couple-small.jpg
```

Giải thích các options:
- `-resize 700x900^`: Resize về 700×900, crop nếu cần
- `-gravity center`: Crop từ trung tâm
- `-extent 700x900`: Đảm bảo output đúng kích thước
- `-quality 85`: Chất lượng JPEG 85%
- `-sampling-factor 4:2:0`: Optimize chroma subsampling
- `-strip`: Xóa metadata (EXIF) để giảm dung lượng

---

### Option 3: Dùng Photoshop

1. Mở ảnh trong Photoshop
2. **Image → Image Size:**
   - Width: 700px (main) hoặc 400px (small)
   - Height: auto (check "Constrain Proportions")
   - Resample: Bicubic Sharper
3. **Crop nếu cần:**
   - Crop Tool → Ratio: 7:9 (main) hoặc 4:5 (small)
   - Align face to top 1/3
4. **Export:**
   - File → Export → Save for Web (Legacy)
   - Format: JPEG
   - Quality: 80-85
   - Optimized: checked
   - Progressive: checked

---

## ✅ CHECKLIST KIỂM TRA ẢNH

Trước khi upload ảnh vào website, verify:

### Kích thước:
- [ ] **couple-main.jpg**: 700×900px đến 1400×1800px
- [ ] **couple-small.jpg**: 400×500px đến 800×1000px
- [ ] Tỉ lệ khung hình đúng (7:9 và 4:5)

### Chất lượng:
- [ ] Ảnh rõ nét, không bị mờ/pixelated
- [ ] Ánh sáng tốt, không quá tối/quá sáng
- [ ] Màu sắc tự nhiên (sRGB profile)

### Dung lượng:
- [ ] **couple-main.jpg**: < 150KB
- [ ] **couple-small.jpg**: < 80KB
- [ ] Tổng cộng < 230KB

### Nội dung:
- [ ] Gương mặt rõ ràng, không bị che
- [ ] Đầu không bị cắt ở phía trên
- [ ] Phù hợp với tone trang trọng của wedding website

### Test trên website:
- [ ] Hiển thị đẹp trên desktop
- [ ] Hiển thị đẹp trên mobile
- [ ] Border-radius tròn không làm mất phần quan trọng
- [ ] Load nhanh (< 1s trên 3G)

---

## 🎯 VÍ DỤ THỰC TẾ

### Ảnh gốc từ nhiếp ảnh gia:
```
Ảnh gốc: 6000×4000px (24MP), 8MB
```

### Sau khi resize cho web:
```
couple-main.jpg:  700×900px, 120KB  ✅
couple-small.jpg: 400×500px, 65KB   ✅
Total:            185KB              ✅
```

### Performance impact:
```
Old (ảnh gốc):     8MB → Load time: 15s (3G) ❌
New (optimized):   185KB → Load time: 0.4s (3G) ✅
Savings:           -97.7% 🚀
```

---

## 🖼️ LAYOUT HIỂN THỊ

Ảnh sẽ hiển thị như thế này trên website:

```
┌─────────────────────────────────────┐
│  Hero Section                       │
│                                     │
│  [Tên cô dâu & chú rể]              │
│                                     │
│           ┌──────────┐              │
│           │          │  ← Main      │
│           │  couple  │    (lớn)     │
│           │   -main  │              │
│           │          │              │
│           │          │  ┌──────┐    │
│           └──────────┘  │couple│ ←  │
│                         │-small│ Small
│                         └──────┘    │
└─────────────────────────────────────┘
```

**Chú ý:**
- Ảnh nhỏ (couple-small) đè lên ảnh lớn (couple-main)
- Cả 2 đều có border tròn (border-radius: 50%)
- Ảnh lớn ở bên trái, ảnh nhỏ ở góc dưới bên phải

---

## 🔥 PRO TIPS

### 1. Tối ưu cho Retina Display:
Dùng ảnh 2x kích thước hiển thị để đảm bảo sắc nét trên màn hình Retina:
```
Display: 350×450px → Source: 700×900px
Display: 200×250px → Source: 400×500px
```

### 2. WebP cho hiệu năng tốt hơn:
```html
<picture>
  <source srcset="couple-main.webp" type="image/webp">
  <img src="couple-main.jpg" alt="...">
</picture>
```
WebP tiết kiệm ~30% dung lượng so với JPEG cùng chất lượng.

### 3. Lazy loading:
```html
<img src="couple-main.jpg" loading="lazy" alt="...">
```
Chỉ load ảnh khi user scroll đến.

### 4. Blur placeholder (LQIP):
Tạo ảnh cực nhỏ (20×25px, ~2KB) để hiện trong lúc load ảnh chính:
```bash
convert couple-main.jpg \
  -resize 20x25 \
  -quality 50 \
  couple-main-placeholder.jpg
```

---

## 📞 TROUBLESHOOTING

### Vấn đề: Ảnh bị mờ trên màn hình Retina
**Giải pháp:** Tăng kích thước gốc lên 2x (700×900 → 1400×1800)

### Vấn đề: File size quá lớn
**Giải pháp:**
- Giảm quality xuống 80% (thay vì 85%)
- Convert sang WebP
- Crop bớt phần không cần thiết

### Vấn đề: Mặt bị cắt khi hiển thị tròn
**Giải pháp:**
- Đảm bảo mặt ở trung tâm ảnh
- Chọn ảnh chụp xa hơn một chút (có space xung quanh mặt)

### Vấn đề: Ảnh bị vỡ layout trên mobile
**Giải pháp:**
- Verify tỉ lệ khung hình đúng (7:9 và 4:5)
- Không dùng ảnh ngang (landscape)

---

## ✅ KẾT LUẬN

**Kích thước khuyên dùng cho production:**

```bash
couple-main.jpg:  700×900px (tỉ lệ 7:9), JPEG 85%, ~120KB
couple-small.jpg: 400×500px (tỉ lệ 4:5), JPEG 85%, ~65KB
```

**Cách nhanh nhất:**
1. Chọn 2 ảnh đẹp (portrait, rõ mặt)
2. Upload lên https://squoosh.app/
3. Resize về 700×900 và 400×500
4. Quality: 85%, Format: JPEG
5. Download và rename
6. Done! 🎉

Happy wedding! 💑
