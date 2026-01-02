#!/bin/bash

# ============================================
# GENERATE STATIC MAP IMAGES SCRIPT
# Tạo ảnh map tĩnh từ Google Maps
# ============================================

echo "📍 Generating static map images for wedding website..."

# Configuration
WIDTH=600
HEIGHT=400
ZOOM=15
QUALITY=85

# Locations from config.js
LAT_VU_QUY="18.788365"
LON_VU_QUY="105.705525"

LAT_THANH_HON="18.78950"
LON_THANH_HON="105.72701"

# Output directory
OUTPUT_DIR="images"
mkdir -p "$OUTPUT_DIR"

# ============================================
# OPTION 1: Google Static Maps API
# Cần API key (free tier: 25,000 loads/month)
# Đăng ký tại: https://console.cloud.google.com/
# ============================================

read -p "Bạn có API key Google Maps không? (y/n): " has_api_key

if [ "$has_api_key" = "y" ]; then
    read -p "Nhập API key: " API_KEY

    echo "🗺️  Downloading map for Lễ Vu Quy..."
    curl -s "https://maps.googleapis.com/maps/api/staticmap?\
center=${LAT_VU_QUY},${LON_VU_QUY}\
&zoom=${ZOOM}\
&size=${WIDTH}x${HEIGHT}\
&scale=2\
&markers=color:red|${LAT_VU_QUY},${LON_VU_QUY}\
&key=${API_KEY}" \
    -o "${OUTPUT_DIR}/le-vu-quy-map.png"

    echo "🗺️  Downloading map for Lễ Thành Hôn..."
    curl -s "https://maps.googleapis.com/maps/api/staticmap?\
center=${LAT_THANH_HON},${LON_THANH_HON}\
&zoom=${ZOOM}\
&size=${WIDTH}x${HEIGHT}\
&scale=2\
&markers=color:red|${LAT_THANH_HON},${LON_THANH_HON}\
&key=${API_KEY}" \
    -o "${OUTPUT_DIR}/le-thanh-hon-map.png"

    echo "✅ Done! Map images created:"
    ls -lh "${OUTPUT_DIR}"/le-*-map.png
else
    echo ""
    echo "============================================"
    echo "🎨 OPTION 2: Manual Screenshot"
    echo "============================================"
    echo ""
    echo "Bước 1: Mở Google Maps cho từng địa điểm:"
    echo ""
    echo "📍 Lễ Vu Quy:"
    echo "   https://maps.google.com/?q=${LAT_VU_QUY},${LON_VU_QUY}"
    echo ""
    echo "📍 Lễ Thành Hôn:"
    echo "   https://maps.google.com/?q=${LAT_THANH_HON},${LON_THANH_HON}"
    echo ""
    echo "Bước 2: Screenshot từng map (Ctrl+Shift+S trên Firefox)"
    echo ""
    echo "Bước 3: Tối ưu ảnh (optional):"
    echo "   - Upload lên: https://squoosh.app/"
    echo "   - Chọn format: PNG"
    echo "   - Quality: 85"
    echo "   - Resize: 600×400px"
    echo "   - Download as:"
    echo "     * le-vu-quy-map.png"
    echo "     * le-thanh-hon-map.png"
    echo ""
    echo "Bước 4: Copy files vào folder images/"
    echo ""
    echo "============================================"
fi

echo ""
echo "📝 Next steps:"
echo "1. Verify images in images/ folder"
echo "2. Replace Events section in index.html with events-optimized.html"
echo "3. Update CSS with events-optimized.css"
echo "4. Test on mobile!"
echo ""
