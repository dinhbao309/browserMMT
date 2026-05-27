/**
 * Main Process - Electron
 * Khởi tạo và quản lý cửa sổ browser
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true  // Enable webview tag
        }
        // icon: path.join(__dirname, 'assets', 'icon.png') // Bỏ icon vì chưa có file
    });

    // Load giao diện
    mainWindow.loadFile('src/ui/index.html');

    // Mở DevTools (để debug)
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Khởi động app
app.whenReady().then(createWindow);

// Quit khi tất cả windows đóng (trừ macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
