# Hướng dẫn chi tiết - Web Browser JavaScript

## 🎯 Cài đặt từ đầu

### Bước 1: Cài Node.js

1. Truy cập: https://nodejs.org/
2. Download phiên bản LTS (Long Term Support)
3. Cài đặt (Next → Next → Finish)
4. Kiểm tra:
   ```bash
   node --version
   npm --version
   ```

### Bước 2: Cài đặt project

```bash
# Di chuyển vào thư mục project
cd web-browser

# Cài đặt Electron và dependencies
npm install
```

### Bước 3: Chạy ứng dụng

```bash
npm start
```

## 🖥️ Demo cho giảng viên

### Kịch bản 1: Khởi động và giới thiệu

```bash
npm start
```

**Giải thích**:
- Electron khởi tạo cửa sổ desktop app
- Load giao diện HTML/CSS
- Khởi tạo HTTP client với socket

### Kịch bản 2: Test HTTP Request

1. Nhập: `http://example.com`
2. Click **Go**

**Giải thích**:
- Tạo TCP socket connection đến example.com:80
- Gửi HTTP GET request
- Nhận response qua socket
- Parse HTTP headers và body
- Render HTML lên UI

### Kịch bản 3: Test HTTPS

1. Nhập: `https://example.com`
2. Click **Go**

**Giải thích**:
- Tạo TLS socket connection đến example.com:443
- Wrap socket với SSL context
- Gửi encrypted request
- Nhận encrypted response
- Decrypt và parse

### Kịch bản 4: Navigation

1. Truy cập nhiều trang
2. Click **Back** ←
3. Click **Forward** →
4. Click **Refresh** ⟳

**Giải thích**:
- History array lưu URLs
- historyIndex track vị trí hiện tại
- Navigation buttons update state

## 📖 Giải thích code chi tiết

### 1. HTTP Client (`src/network/http-client.js`)

```javascript
// Tạo socket connection
const socket = net.connect({ host, port });

// Khi kết nối thành công
socket.on('connect', () => {
    // Build HTTP request
    const request = `GET ${path} HTTP/1.1\r\n` +
                   `Host: ${host}\r\n` +
                   `Connection: close\r\n\r\n`;
    
    // Gửi request
    socket.write(request);
});

// Nhận response
socket.on('data', (chunk) => {
    responseData += chunk.toString();
});

// Khi kết thúc
socket.on('end', () => {
    // Parse response
    const response = this.parseResponse(responseData);
    resolve(response);
});
```

**Kiến thức**:
- TCP socket connection
- HTTP request format
- HTTP response parsing
- Event-driven programming

### 2. HTML Parser (`src/parser/html-parser.js`)

```javascript
// Extract title
const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);

// Extract headings
const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
while ((match = h1Regex.exec(html)) !== null) {
    content.push({
        type: 'heading',
        level: 1,
        content: this.cleanText(match[1])
    });
}
```

**Kiến thức**:
- Regular expressions
- HTML structure
- Text parsing

### 3. Page Renderer (`src/renderer/page-renderer.js`)

```javascript
createElement(element) {
    switch (element.type) {
        case 'heading':
            domElement = document.createElement(`h${element.level}`);
            domElement.textContent = element.content;
            break;
        // ...
    }
    return domElement;
}
```

**Kiến thức**:
- DOM manipulation
- Dynamic content rendering

## 🔍 Phân tích HTTP Request/Response

### HTTP Request gửi đi:

```
GET / HTTP/1.1
Host: example.com
User-Agent: SimpleWebBrowser/1.0
Accept: text/html,text/plain,*/*
Connection: close

```

**Giải thích từng dòng**:
- `GET / HTTP/1.1`: Method GET, path /, HTTP version 1.1
- `Host: example.com`: Tên domain
- `User-Agent`: Thông tin browser
- `Accept`: Loại content chấp nhận
- `Connection: close`: Đóng connection sau response
- Dòng trống: Kết thúc headers

### HTTP Response nhận về:

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256

<!DOCTYPE html>
<html>
...
</html>
```

**Giải thích**:
- `HTTP/1.1 200 OK`: Status line (version, code, reason)
- Headers: Content-Type, Content-Length, etc.
- Dòng trống: Phân cách headers và body
- Body: HTML content

## 🎨 Tùy chỉnh giao diện

### Thay đổi màu sắc (`src/ui/styles.css`):

```css
/* Màu primary */
.go-btn {
    background: #4a90e2; /* Đổi màu này */
}

/* Màu link */
.rendered-content a {
    color: #4a90e2; /* Đổi màu này */
}
```

### Thay đổi font:

```css
body {
    font-family: 'Arial', sans-serif; /* Đổi font */
}
```

## 🐛 Xử lý lỗi thường gặp

### 1. "Cannot find module 'electron'"

**Nguyên nhân**: Chưa cài dependencies

**Giải pháp**:
```bash
npm install
```

### 2. "ECONNREFUSED" hoặc "ETIMEDOUT"

**Nguyên nhân**: 
- Không có internet
- Website down
- Firewall block

**Giải pháp**:
- Kiểm tra internet
- Thử website khác
- Tắt firewall tạm thời

### 3. "Parse error"

**Nguyên nhân**: HTML không hợp lệ

**Giải pháp**:
- Thử website đơn giản hơn
- Cải thiện HTML parser

## 📊 So sánh Python vs JavaScript

| Tiêu chí | Python | JavaScript |
|----------|--------|------------|
| **UI** | Tkinter (cơ bản) | Electron (đẹp) |
| **Socket** | `socket` module | `net` module |
| **Async** | Sync | Async/Promise |
| **Deployment** | .py files | .exe build |
| **Learning curve** | Dễ hơn | Khó hơn |

## 🚀 Mở rộng thêm

### 1. Thêm POST request

```javascript
post(url, data) {
    const request = `POST ${path} HTTP/1.1\r\n` +
                   `Host: ${host}\r\n` +
                   `Content-Type: application/json\r\n` +
                   `Content-Length: ${data.length}\r\n` +
                   `\r\n${data}`;
    // ...
}
```

### 2. Hiển thị images

```javascript
// Parse img tags
const imgRegex = /<img[^>]*src=["']([^"']*)["'][^>]*>/gi;
// Download và display images
```

### 3. Cookies

```javascript
// Lưu cookies từ Set-Cookie header
// Gửi lại trong Cookie header
```

## 📝 Câu hỏi ôn tập

1. **TCP socket hoạt động như thế nào?**
2. **HTTP request gồm những phần nào?**
3. **Sự khác biệt giữa HTTP và HTTPS?**
4. **TLS/SSL mã hóa như thế nào?**
5. **Tại sao cần parse HTML?**

## 💡 Tips cho báo cáo

1. **Vẽ sơ đồ** luồng hoạt động
2. **Chụp ảnh** demo từng bước
3. **Giải thích** code quan trọng
4. **So sánh** với browser thật
5. **Đề xuất** cải tiến

## 🎓 Kết luận

Project này giúp hiểu:
- ✅ Socket programming
- ✅ HTTP protocol
- ✅ Client-server architecture
- ✅ Network layers
- ✅ Web technologies

Chúc bạn thành công! 🎉
