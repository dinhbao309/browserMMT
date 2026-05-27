# Project Structure

## Directory Layout

```
web-browser/
├── src/                          # Source code
│   ├── main.js                   # Electron main process entry point
│   ├── network/                  # Network layer
│   │   └── http-client.js        # HTTP/HTTPS client with raw sockets
│   ├── parser/                   # Content parsing
│   │   └── html-parser.js        # HTML parser and text extraction
│   ├── renderer/                 # Content rendering
│   │   └── page-renderer.js      # DOM element creation and rendering
│   └── ui/                       # User interface
│       ├── index.html            # Main UI layout
│       ├── styles.css            # UI styling
│       └── browser.js            # Browser controller and event handlers
├── docs/                         # Documentation (empty)
├── node_modules/                 # Dependencies
├── .kiro/                        # Kiro configuration
│   └── steering/                 # AI assistant guidance
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Dependency lock file
├── README-JS.md                  # Main documentation (English)
└── HUONG_DAN_JS.md              # Detailed guide (Vietnamese)
```

## Module Responsibilities

### Main Process (`src/main.js`)
- Electron application lifecycle management
- Browser window creation and configuration
- Entry point for the desktop application

### Network Layer (`src/network/`)
**http-client.js**:
- Raw TCP socket creation (`net.connect`)
- TLS socket wrapping for HTTPS (`tls.connect`)
- HTTP request building (manual string construction)
- HTTP response parsing (status line, headers, body)
- Timeout and error handling

### Parser Layer (`src/parser/`)
**html-parser.js**:
- HTML tag extraction using regex
- Content type identification (title, headings, paragraphs, links)
- HTML entity decoding
- Tag stripping and text cleaning
- Fallback to plain text when parsing fails

### Renderer Layer (`src/renderer/`)
**page-renderer.js**:
- DOM element creation from parsed content
- Dynamic content rendering
- Styling application

### UI Layer (`src/ui/`)
**index.html**: Main application layout with address bar, navigation buttons, content area, and status bar

**styles.css**: Modern styling with gradients, shadows, and responsive design

**browser.js**: 
- User interaction handling (Go button, Enter key, navigation buttons)
- History management (back/forward navigation)
- URL normalization (auto-adding http://)
- Loading state management
- Integration of network, parser, and renderer layers

## Data Flow

1. **User Input** → UI layer captures URL from address bar
2. **URL Normalization** → browser.js adds protocol if missing
3. **HTTP Request** → http-client.js creates socket and sends request
4. **Response Parsing** → http-client.js parses HTTP response
5. **HTML Parsing** → html-parser.js extracts content elements
6. **Rendering** → page-renderer.js creates DOM elements
7. **Display** → UI updates with rendered content

## File Naming Conventions

- Lowercase with hyphens: `http-client.js`, `html-parser.js`
- Descriptive names indicating purpose
- `.js` extension for all JavaScript files
- `.md` extension for documentation

## Import/Export Pattern

All modules use CommonJS:
```javascript
// Export
module.exports = ClassName;

// Import
const ClassName = require('./path/to/module');
```

## Configuration Files

- **package.json**: Project metadata, scripts, and dependencies
- **package-lock.json**: Exact dependency versions (auto-generated)
- No build configuration (Electron handles bundling)

## Documentation Structure

- **README-JS.md**: Feature overview, installation, usage, architecture explanation
- **HUONG_DAN_JS.md**: Detailed Vietnamese guide with demos, troubleshooting, and exam tips
- **Code comments**: Vietnamese inline documentation
