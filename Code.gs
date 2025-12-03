/* ============================================
   GOOGLE APPS SCRIPT - GUESTBOOK BACKEND
   ============================================

   HƯỚNG DẪN DEPLOY:
   1. Truy cập https://script.google.com/
   2. Tạo New Project
   3. Copy toàn bộ code này vào
   4. Thay đổi ADMIN_SECRET thành mật khẩu mạnh của bạn
   5. (Optional) Thêm WEBHOOK_URL nếu muốn nhận thông báo
   6. Deploy > New deployment > Select type: Web app
   7. Execute as: Me
   8. Who has access: Anyone
   9. Copy URL và cập nhật vào config.js (guestbookApiUrl)

   API ENDPOINTS:
   - GET: Lấy danh sách comment
     + ?since=<ISO timestamp> - Lọc comment mới hơn timestamp
     + ?page=1&pageSize=100 - Phân trang
   - POST: Thêm comment mới
     + Body JSON: {name: "Tên", comment: "Lời nhắn"}
   - Admin hide: GET ?action=hide&id=<id>&secret=<ADMIN_SECRET>
   - Admin unhide: GET ?action=unhide&id=<id>&secret=<ADMIN_SECRET>
*/

const SHEET_NAME = "Comments";
const ADMIN_SECRET = "REPLACE_WITH_STRONG_SECRET"; // <-- ⚠️ THAY ĐỔI NÀY KHI DEPLOY!
const WEBHOOK_URL = ""; // Optional: Telegram/Discord webhook để nhận thông báo comment mới

/**
 * Lấy hoặc tạo sheet Comments
 */
function _getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "timestamp", "name", "comment", "status"]); // Header
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4CAF50");
    headerRange.setFontColor("#FFFFFF");
  }
  return sheet;
}

/**
 * GET Request Handler
 * Lấy danh sách comment hoặc thực hiện admin actions
 */
function doGet(e) {
  const params = e.parameter || {};
  const since = params.since; // ISO timestamp string
  const page = parseInt(params.page || "1", 10);
  const pageSize = parseInt(params.pageSize || "100", 10);
  const action = params.action;
  const id = params.id;
  const secret = params.secret;

  // Admin actions: hide/unhide
  if (action && (action === "hide" || action === "unhide")) {
    if (secret !== ADMIN_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({error: "unauthorized"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = _getSheet();
    const data = sheet.getDataRange().getValues();

    // Tìm và cập nhật status
    for (let r = 1; r < data.length; r++) {
      if (String(data[r][0]) === String(id)) {
        sheet.getRange(r + 1, 5).setValue(action === "hide" ? "hidden" : "visible");
        return ContentService
          .createTextOutput(JSON.stringify({ok: true}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({error: "not_found"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Read comments
  const sheet = _getSheet();
  const values = sheet.getDataRange().getValues();
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {
      id: row[0],
      timestamp: row[1],
      name: row[2],
      comment: row[3],
      status: row[4] || "visible"
    };

    // Skip hidden comments
    if (obj.status === "hidden") continue;

    // Filter by timestamp if provided
    if (since) {
      try {
        if (new Date(obj.timestamp) <= new Date(since)) continue;
      } catch (e) {}
    }

    rows.push(obj);
  }

  // Sort by timestamp ascending (oldest first)
  rows.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Pagination
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const paged = rows.slice(start, start + pageSize);

  const lastTimestamp = total ? rows[rows.length - 1].timestamp : null;
  const version = total; // Simple version: count of visible rows

  const response = {
    version,
    lastTimestamp,
    total,
    page,
    pageSize,
    data: paged
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST Request Handler
 * Thêm comment mới
 */
function doPost(e) {
  try {
    // Parse request body
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const name = String(body.name || "").trim();
    const comment = String(body.comment || "").trim();

    // Validation
    if (!name || !comment) {
      return ContentService
        .createTextOutput(JSON.stringify({error: "invalid", message: "Name and comment are required"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (name.length > 100) {
      return ContentService
        .createTextOutput(JSON.stringify({error: "invalid", message: "Name too long (max 100 chars)"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (comment.length > 500) {
      return ContentService
        .createTextOutput(JSON.stringify({error: "invalid", message: "Comment too long (max 500 chars)"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Add to sheet
    const sheet = _getSheet();
    const id = Utilities.getUuid();
    const ts = new Date().toISOString();
    sheet.appendRow([id, ts, name, comment, "visible"]);

    // Optional: Send webhook notification
    if (WEBHOOK_URL) {
      try {
        const payload = {
          text: `📝 Comment mới từ ${name}\n\n${comment}\n\n🕐 ${ts}`
        };
        UrlFetchApp.fetch(WEBHOOK_URL, {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify(payload),
          muteHttpExceptions: true
        });
      } catch (webhookError) {
        // Ignore webhook errors
        console.error("Webhook error:", webhookError);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ok: true, id, timestamp: ts}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({error: "exception", message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - Run this to test the script
 */
function testSetup() {
  const sheet = _getSheet();
  Logger.log("Sheet created/found: " + sheet.getName());

  // Add sample comment
  const sampleId = Utilities.getUuid();
  const sampleTs = new Date().toISOString();
  sheet.appendRow([sampleId, sampleTs, "Test User", "This is a test comment", "visible"]);

  Logger.log("Sample comment added with ID: " + sampleId);
}
