/**
 * Browser Controller - Sử dụng Electron WebView
 * Hiển thị trang web đầy đủ như trình duyệt thật
 */

class Browser {
    constructor() {
        this.searchHistory = this.loadHistory();
        this.initElements();
        this.attachEventListeners();
        this.setupWebView();
    }
    
    loadHistory() {
        try {
            const history = localStorage.getItem('searchHistory');
            return history ? JSON.parse(history) : [];
        } catch (e) {
            return [];
        }
    }
    
    saveHistory() {
        try {
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }
    
    addToSearchHistory(url, query = null) {
        // Xóa nếu đã tồn tại
        this.searchHistory = this.searchHistory.filter(item => item.url !== url);
        
        // Thêm vào đầu
        this.searchHistory.unshift({
            url: url,
            query: query || url, // Lưu từ khóa tìm kiếm gốc
            timestamp: Date.now()
        });
        
        // Giới hạn 50 items
        if (this.searchHistory.length > 50) {
            this.searchHistory = this.searchHistory.slice(0, 50);
        }
        
        this.saveHistory();
    }
    
    clearHistory() {
        this.searchHistory = [];
        this.saveHistory();
        this.hideHistoryDropdown();
    }
    
    deleteHistoryItem(url) {
        this.searchHistory = this.searchHistory.filter(item => item.url !== url);
        this.saveHistory();
        this.showHistoryDropdown();
    }
    
    initElements() {
        // Navigation elements
        this.backBtn = document.getElementById('back-btn');
        this.forwardBtn = document.getElementById('forward-btn');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.homeBtn = document.getElementById('home-btn');
        this.addressBar = document.getElementById('address-bar');
        this.goBtn = document.getElementById('go-btn');
        
        // Content elements
        this.webview = document.getElementById('webview');
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.statusText = document.getElementById('status-text');
    }
    
    setupWebView() {
        // Ẩn webview ban đầu, hiện welcome screen
        this.webview.style.display = 'none';
        this.welcomeScreen.style.display = 'flex';
        
        // WebView events
        this.webview.addEventListener('did-start-loading', () => {
            this.setStatus('Đang tải...');
        });
        
        this.webview.addEventListener('did-stop-loading', () => {
            this.updateNavigationButtons();
        });
        
        this.webview.addEventListener('did-finish-load', () => {
            const url = this.webview.getURL();
            this.addressBar.value = url;
            this.setStatus(`Đã tải: ${url}`);
            this.updateNavigationButtons();
        });
        
        this.webview.addEventListener('did-fail-load', (event) => {
            if (event.errorCode !== -3) { // -3 là abort, bỏ qua
                this.setStatus(`Lỗi: ${event.errorDescription}`);
            }
        });
        
        this.webview.addEventListener('page-title-updated', (event) => {
            document.title = event.title + ' - BCH Browser';
        });
        
        this.webview.addEventListener('new-window', (event) => {
            // Mở link mới trong cùng webview
            this.loadPage(event.url);
        });
    }
    
    attachEventListeners() {
        // Navigation buttons
        this.backBtn.addEventListener('click', () => this.goBack());
        this.forwardBtn.addEventListener('click', () => this.goForward());
        this.refreshBtn.addEventListener('click', () => this.refresh());
        this.homeBtn.addEventListener('click', () => this.goHome());
        
        // Address bar
        this.addressBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigate();
            }
        });
        
        this.goBtn.addEventListener('click', () => this.navigate());
        
        // Home search box
        const homeSearch = document.getElementById('home-search');
        const homeSearchBtn = document.getElementById('home-search-btn');
        const historyDropdown = document.getElementById('history-dropdown');
        const clearHistoryBtn = document.getElementById('clear-history-btn');
        
        if (homeSearch) {
            homeSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.navigateFromHome();
                }
            });
            
            homeSearch.addEventListener('focus', () => {
                this.showHistoryDropdown();
            });
            
            homeSearch.addEventListener('input', () => {
                this.showHistoryDropdown();
            });
        }
        
        if (homeSearchBtn) {
            homeSearchBtn.addEventListener('click', () => {
                this.navigateFromHome();
            });
        }
        
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clearHistory();
            });
        }
        
        // Click outside to close dropdown
        document.addEventListener('click', (e) => {
            if (historyDropdown && !e.target.closest('.search-box-wrapper')) {
                this.hideHistoryDropdown();
            }
        });
        
        // Focus address bar khi click
        this.addressBar.addEventListener('focus', () => {
            this.addressBar.select();
        });
    }
    
    showHistoryDropdown() {
        const dropdown = document.getElementById('history-dropdown');
        const historyList = document.getElementById('history-list');
        const homeSearch = document.getElementById('home-search');
        
        if (!dropdown || !historyList) return;
        
        // Lấy 5 items gần nhất
        const recentHistory = this.searchHistory.slice(0, 5);
        
        // Filter theo input nếu có
        const searchTerm = homeSearch ? homeSearch.value.toLowerCase() : '';
        const filteredHistory = searchTerm 
            ? recentHistory.filter(item => {
                const query = item.query || item.url;
                return query.toLowerCase().includes(searchTerm);
            })
            : recentHistory;
        
        if (filteredHistory.length === 0) {
            historyList.innerHTML = '<div class="history-empty">Chưa có lịch sử tìm kiếm</div>';
        } else {
            historyList.innerHTML = filteredHistory.map(item => {
                const timeAgo = this.getTimeAgo(item.timestamp);
                const displayText = item.query || item.url; // Hiển thị từ khóa thay vì URL
                return `
                    <div class="history-item" data-url="${this.escapeHtml(item.url)}" data-query="${this.escapeHtml(displayText)}">
                        <svg class="history-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <div class="history-text">
                            <div class="history-url">${this.escapeHtml(displayText)}</div>
                            <div class="history-time">${timeAgo}</div>
                        </div>
                        <button class="history-delete" data-url="${this.escapeHtml(item.url)}" title="Xóa">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            }).join('');
            
            // Attach click events
            historyList.querySelectorAll('.history-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (!e.target.closest('.history-delete')) {
                        const query = item.getAttribute('data-query');
                        if (homeSearch) homeSearch.value = query;
                        this.navigateFromHome();
                    }
                });
            });
            
            historyList.querySelectorAll('.history-delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const url = btn.getAttribute('data-url');
                    this.deleteHistoryItem(url);
                });
            });
        }
        
        dropdown.style.display = 'block';
    }
    
    hideHistoryDropdown() {
        const dropdown = document.getElementById('history-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
    
    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return 'Vừa xong';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} ngày trước`;
        
        const date = new Date(timestamp);
        return date.toLocaleDateString('vi-VN');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    navigateFromHome() {
        const homeSearch = document.getElementById('home-search');
        if (homeSearch && homeSearch.value.trim()) {
            this.addressBar.value = homeSearch.value.trim();
            this.hideHistoryDropdown();
            this.navigate();
        }
    }
    
    navigate() {
        let input = this.addressBar.value.trim();
        
        if (!input) {
            this.setStatus('Vui lòng nhập URL hoặc từ khóa tìm kiếm!');
            return;
        }
        
        let url = this.processInput(input);
        this.loadPage(url, input); // Truyền input gốc làm query
    }
    
    processInput(input) {
        // Nếu đã có protocol, dùng luôn
        if (input.startsWith('http://') || input.startsWith('https://')) {
            return input;
        }
        
        // Nếu có dấu chấm và không có khoảng trắng, coi như URL
        if (input.includes('.') && !input.includes(' ')) {
            return 'https://' + input;
        }
        
        // Nếu là localhost hoặc IP
        if (input.startsWith('localhost') || /^\d+\.\d+\.\d+\.\d+/.test(input)) {
            return 'http://' + input;
        }
        
        // Còn lại coi như search query
        const searchQuery = encodeURIComponent(input);
        return `https://www.google.com/search?q=${searchQuery}`;
    }
    
    loadPage(url, query = null) {
        // Ẩn welcome screen, hiện webview
        this.welcomeScreen.style.display = 'none';
        this.webview.style.display = 'inline-flex';
        
        // Lưu vào lịch sử với từ khóa gốc
        this.addToSearchHistory(url, query);
        
        // Load URL
        this.webview.loadURL(url);
        this.addressBar.value = url;
        this.setStatus(`Đang tải ${url}...`);
    }
    
    goBack() {
        if (this.webview.canGoBack()) {
            this.webview.goBack();
        }
    }
    
    goForward() {
        if (this.webview.canGoForward()) {
            this.webview.goForward();
        }
    }
    
    refresh() {
        if (this.webview.style.display !== 'none') {
            this.webview.reload();
        }
    }
    
    goHome() {
        this.webview.style.display = 'none';
        this.welcomeScreen.style.display = 'flex';
        this.addressBar.value = '';
        this.setStatus('Ready');
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        this.backBtn.disabled = !this.webview.canGoBack();
        this.forwardBtn.disabled = !this.webview.canGoForward();
    }
    
    setStatus(text) {
        this.statusText.textContent = text;
    }
}

// Khởi tạo browser khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.browser = new Browser();
});
