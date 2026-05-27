# Simple Web Browser (JavaScript/Electron)

Web Browser đơn giản được xây dựng bằng JavaScript và Electron cho môn Mạng Máy Tính.

## 🚀 Tính năng

### 1. Network Layer (Lớp Mạng)
- ✅ Socket connection với Node.js `net` module
- ✅ HTTP GET requests từ đầu
- ✅ Parse HTTP responses
- ✅ Hỗ trợ HTTP và HTTPS (TLS)
- ✅ Timeout handling

### 2. HTML Parser
- ✅ Parse HTML tags
- ✅ Extract headings, paragraphs, links
- ✅ Clean và format content
- ✅ Fallback to plain text

### 3. Page Renderer
- ✅ Render dynamic content
- ✅ Beautiful styling
- ✅ Smooth scrolling

### 4. User Interface
- ✅ Modern UI với Electron
- ✅ Address bar
- ✅ Navigation buttons (Back, Forward, Refresh)
- ✅ Loading indicator
- ✅ Status bar
- ✅ History management

## 📦 Cài đặt

### Yêu cầu
- Node.js 16+ (Download: https://nodejs.org/)
- npm (đi kèm với Node.js)

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Chạy ứng dụng

```bash
npm start
```

## 🎯 Cách sử dụng

1. **Nhập URL**: Gõ địa chỉ vào address bar
   - Ví dụ: `example.com`
   - Hoặc: `http://example.com`
   - Hoặc: `https://example.com`

2. **Nhấn Enter** hoặc click **Go**

3. **Navigation**:
   - ← Back: Quay lại
   - → Forward: Tiến tới
   - ⟳ Refresh: Tải lại

## 📁 Cấu trúc dự án

```
web-browser/
├── src/
│   ├── main.js                    # Electron main process
│   ├── network/
│   │   └── http-client.js        # HTTP client với socket
│   ├── parser/
│   │   └── html-parser.js        # HTML parser
│   ├── renderer/
│   │   └── page-renderer.js      # Page renderer
│   └── ui/
│       ├── index.html            # UI chính
│       ├── styles.css            # Styles
│       └── browser.js            # Browser controller
├── package.json
└── README-JS.md
```

## 🔧 Kiến thức áp dụng

### 1. Socket Programming
```javascript
// Tạo TCP socket
const socket = net.connect({ host, port });

// Gửi data
socket.write(request);

// Nhận data
socket.on('data', (chunk) => {
    responseData += chunk.toString();
});
```

### 2. HTTP Protocol
```javascript
// HTTP Request format
GET /path HTTP/1.1
Host: example.com
User-Agent: SimpleWebBrowser/1.0
Connection: close
```

### 3. TLS/SSL
```javascript
// Wrap socket với TLS
const socket = tls.connect({ 
    host, 
    port, 
    rejectUnauthorized: false 
});
```

## 🌐 Websites để test

- `http://example.com`
- `http://info.cern.ch`
- `https://example.com`
- `http://motherfuckingwebsite.com`

## ⚠️ Hạn chế

- Không hỗ trợ JavaScript execution
- Không hiển thị images
- CSS styling cơ bản
- Chỉ hỗ trợ GET requests

## 🎓 Điểm nổi bật cho bài tập

1. **Socket Programming thuần túy** - Không dùng axios/fetch
2. **HTTP Protocol implementation** - Tự build request/response
3. **Modern UI** - Đẹp và professional với Electron
4. **Code structure tốt** - Dễ đọc, dễ maintain
5. **Comments đầy đủ** - Tiếng Việt dễ hiểu

## 📝 Build executable (Optional)

Để tạo file .exe:

```bash
npm install --save-dev electron-builder
```

Thêm vào `package.json`:
```json
"build": {
  "appId": "com.student.webbrowser",
  "win": {
    "target": "nsis"
  }
}
```

Chạy:
```bash
npm run build
```

## 🐛 Troubleshooting

### Lỗi "Cannot find module 'electron'"
```bash
npm install
```

### Lỗi "ECONNREFUSED"
- Kiểm tra internet connection
- Website có thể đang down

### Lỗi "ETIMEDOUT"
- Tăng timeout trong http-client.js
- Thử website khác

## 📚 Tài liệu tham khảo

- Node.js Net Module: https://nodejs.org/api/net.html
- HTTP Protocol: https://developer.mozilla.org/en-US/docs/Web/HTTP
- Electron: https://www.electronjs.org/

## 👨‍💻 Tác giả

Bài tập môn Mạng Máy Tính

## 📄 License

MIT License
