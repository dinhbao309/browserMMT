# 🌐 BCH Browser

Web browser đơn giản được xây dựng bằng Electron với đầy đủ tính năng tìm kiếm và lịch sử.

![Browser Screenshot](https://via.placeholder.com/800x400?text=BCH+Browser)

## ✨ Tính năng

- 🔍 **Tìm kiếm thông minh**: Tự động phân biệt URL và từ khóa tìm kiếm
- 📜 **Lịch sử tìm kiếm**: Lưu và hiển thị 5 trang gần nhất
- 🌐 **Render đầy đủ**: Hiển thị trang web như Chrome (JavaScript, CSS, images)
- ⬅️ **Navigation**: Back, Forward, Refresh, Home
- 🎨 **Giao diện đẹp**: Thiết kế minimalist giống Google

## 🚀 Cài đặt

### Yêu cầu
- Node.js 16+ ([Download](https://nodejs.org/))
- npm (đi kèm với Node.js)

### Bước 1: Clone repository
```bash
git clone https://github.com/YOUR_USERNAME/bch-browser.git
cd bch-browser
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy ứng dụng
```bash
npm start
```

Hoặc double-click file `start.bat` (Windows)

## 📖 Cách sử dụng

1. **Tìm kiếm**: Nhập từ khóa vào ô search → Tự động tìm trên Google
2. **Truy cập URL**: Nhập `github.com` hoặc `https://github.com`
3. **Xem lịch sử**: Click vào ô search để xem 5 trang gần nhất
4. **Navigation**: Dùng các nút ←, →, ⟳, 🏠

## 🏗️ Cấu trúc project

```
WebBrowser/
├── src/
│   ├── main.js              # Electron main process
│   └── ui/
│       ├── index.html       # Giao diện chính
│       ├── styles.css       # Styling
│       └── browser.js       # Controller logic
├── .gitignore
├── package.json
├── start.bat               # Windows shortcut
└── README.md
```

## 🛠️ Công nghệ sử dụng

- **Electron**: Desktop app framework
- **Chromium WebView**: Render engine
- **localStorage**: Lưu lịch sử tìm kiếm
- **Vanilla JavaScript**: Không dùng framework

## 📝 Scripts

```bash
npm start       # Chạy ứng dụng
npm run dev     # Chạy ở chế độ development
```

## 🎯 Tính năng nổi bật

### 1. Tìm kiếm thông minh
```javascript
Input: "github"        → https://www.google.com/search?q=github
Input: "github.com"    → https://github.com
Input: "localhost:3000" → http://localhost:3000
```

### 2. Lịch sử tìm kiếm
- Lưu tự động mọi trang truy cập
- Hiển thị 5 items gần nhất
- Xóa từng item hoặc xóa tất cả
- Tìm kiếm trong lịch sử

### 3. Navigation
- Back/Forward với history stack
- Refresh trang hiện tại
- Home về trang chủ

## 🐛 Troubleshooting

### Lỗi: "Cannot find module 'electron'"
```bash
npm install
```

### Lỗi: "Electron failed to install correctly"
```bash
npm uninstall electron
npm install --save-dev electron
```

### App không mở được
- Kiểm tra Node.js version: `node --version` (cần >= 16)
- Xóa `node_modules` và cài lại: `npm install`

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập

## 👨‍💻 Tác giả

Bài tập môn Mạng Máy Tính

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/)
- [Chromium](https://www.chromium.org/)

---

⭐ Nếu thấy hữu ích, hãy star repo này!
