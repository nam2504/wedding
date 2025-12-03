# 📝 Hướng dẫn cài đặt Google Sheets cho Guestbook

## Tổng quan
Sổ lưu bút (Guestbook) sử dụng Google Sheets làm database và Google Apps Script làm API backend. Điều này giúp bạn:
- ✅ Hoàn toàn **MIỄN PHÍ**
- ✅ Không cần server riêng
- ✅ Dễ dàng quản lý comment từ Google Sheets
- ✅ Có thể ẩn/hiện comment không phù hợp
- ✅ Nhận thông báo realtime qua Telegram/Discord (optional)

---

## 🚀 Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com/)
2. Tạo một **Spreadsheet mới**
3. Đặt tên file, ví dụ: **"Wedding Guestbook"**
4. Giữ nguyên file, script sẽ tự động tạo sheet "Comments"

---

## 🔧 Bước 2: Deploy Google Apps Script

### 2.1. Mở Script Editor

1. Trong Google Sheet vừa tạo, vào menu: **Extensions** → **Apps Script**
2. Xóa code mặc định trong file `Code.gs`

### 2.2. Copy code từ file `Code.gs`

1. Mở file [`Code.gs`](./Code.gs) trong project này
2. **Copy toàn bộ nội dung**
3. **Paste** vào Apps Script Editor

### 2.3. Cấu hình

Tìm dòng này trong code:

```javascript
const ADMIN_SECRET = "REPLACE_WITH_STRONG_SECRET";
```

**Thay đổi** thành mật khẩu mạnh của bạn:

```javascript
const ADMIN_SECRET = "MyVeryStr0ngP@ssw0rd123!";
```

⚠️ **LƯU Ý**: Mật khẩu này dùng để ẩn/xóa comment. Hãy giữ bí mật!

### 2.4. (Optional) Cấu hình Webhook

Nếu muốn nhận thông báo khi có comment mới:

**Telegram Bot:**
```javascript
const WEBHOOK_URL = "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>";
```

**Discord Webhook:**
```javascript
const WEBHOOK_URL = "https://discord.com/api/webhooks/<WEBHOOK_ID>/<WEBHOOK_TOKEN>";
```

### 2.5. Deploy

1. Click nút **💾 Save** (Ctrl+S)
2. Đặt tên project, ví dụ: "Wedding Guestbook API"
3. Click **Deploy** → **New deployment**
4. Chọn type: **Web app**
5. Cấu hình:
   - **Description**: Wedding Guestbook API v1
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
6. Click **Deploy**
7. Authorize access (chọn tài khoản Google của bạn)
8. Nếu xuất hiện cảnh báo "Google hasn't verified this app":
   - Click **Advanced**
   - Click **Go to [Project Name] (unsafe)**
   - Click **Allow**
9. **Copy URL** được cung cấp (dạng: `https://script.google.com/macros/s/AKfycbx.../exec`)

---

## ⚙️ Bước 3: Cấu hình Website

1. Mở file `config.js`
2. Tìm section `guestbook`:

```javascript
guestbook: {
  enable: true,
  apiUrl: "", // <-- Paste URL vào đây
  pageSize: 50,
  maxLength: 500,
  autoRefresh: true,
  refreshInterval: 30000
},
```

3. **Paste URL** vừa copy vào `apiUrl`:

```javascript
guestbook: {
  enable: true,
  apiUrl: "https://script.google.com/macros/s/AKfycbx.../exec",
  pageSize: 50,
  maxLength: 500,
  autoRefresh: true,
  refreshInterval: 30000
},
```

4. **Lưu file** và reload website

---

## 🧪 Bước 4: Test

### Test Comment mới

1. Mở website của bạn
2. Kéo xuống section **Sổ lưu bút**
3. Nhập tên và lời nhắn
4. Click **Gửi lời chúc**
5. Check Google Sheets - sẽ thấy dòng mới xuất hiện!

### Test API trực tiếp

**GET - Lấy danh sách comment:**
```
https://script.google.com/macros/s/AKfycbx.../exec
```

**POST - Thêm comment mới:**
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbx.../exec" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","comment":"Hello World"}'
```

---

## 🛡️ Bước 5: Quản lý Comments (Admin)

### Ẩn comment không phù hợp

```
https://script.google.com/macros/s/AKfycbx.../exec?action=hide&id=<COMMENT_ID>&secret=<ADMIN_SECRET>
```

**Ví dụ:**
```
https://script.google.com/macros/s/AKfycbx.../exec?action=hide&id=abc-123-def&secret=MyVeryStr0ngP@ssw0rd123!
```

### Hiện lại comment đã ẩn

```
https://script.google.com/macros/s/AKfycbx.../exec?action=unhide&id=<COMMENT_ID>&secret=<ADMIN_SECRET>
```

### Quản lý từ Google Sheets

Bạn cũng có thể:
1. Mở Google Sheets
2. Tìm cột **status**
3. Đổi từ `visible` → `hidden` để ẩn
4. Đổi từ `hidden` → `visible` để hiện lại

---

## 📊 Cấu trúc Google Sheet

| id | timestamp | name | comment | status |
|----|-----------|------|---------|--------|
| uuid-1 | 2025-12-03T10:30:00Z | Nguyễn Văn A | Chúc mừng hạnh phúc! | visible |
| uuid-2 | 2025-12-03T11:15:00Z | Trần Thị B | Hạnh phúc viên mãn! | visible |
| uuid-3 | 2025-12-03T12:00:00Z | Spam User | Buy now!!! | hidden |

---

## 🔄 Cập nhật Code (Update Deployment)

Nếu bạn sửa code trong Apps Script:

1. **Save** code mới
2. **Deploy** → **Manage deployments**
3. Click **✏️ Edit** (icon bút chì)
4. Chọn **New version**
5. Click **Deploy**
6. **URL giữ nguyên**, không cần update `config.js`

---

## 🐛 Troubleshooting

### ❌ Lỗi "Authorization required"

**Nguyên nhân**: Chưa authorize hoặc quyền bị thu hồi

**Giải pháp**:
1. Vào Apps Script Editor
2. Click **Run** → Chọn function `testSetup`
3. Authorize lại

### ❌ Comment không hiển thị

**Kiểm tra**:
1. `config.js` → `guestbook.enable` = `true`
2. `config.js` → `guestbook.apiUrl` đã điền đúng URL
3. Mở Console (F12) kiểm tra lỗi
4. Test API bằng trình duyệt: paste URL trực tiếp

### ❌ "Failed to load comments"

**Nguyên nhân**:
- API URL sai
- Deploy chưa public ("Anyone" access)
- Apps Script có lỗi

**Giải pháp**:
1. Check **Deploy settings** → **Who has access**: phải là **Anyone**
2. Check **Execution log** trong Apps Script để xem lỗi chi tiết

### ❌ CORS Error

**Nguyên nhân**: Website chạy từ `file://` thay vì `http://` hoặc `https://`

**Giải pháp**: Deploy website lên hosting (GitHub Pages, Vercel, Netlify...)

---

## 🎉 Xong!

Giờ bạn đã có một hệ thống Guestbook hoàn chỉnh với:
- ✅ Lưu trữ comment miễn phí trên Google Sheets
- ✅ API backend miễn phí với Google Apps Script
- ✅ Tự động refresh để hiển thị comment mới
- ✅ Công cụ quản lý comment dễ dàng
- ✅ (Optional) Nhận thông báo realtime qua Telegram/Discord

---

## 📚 Tham khảo

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)

---

**Chúc bạn thành công! 🎊**
