# Technology Stack

## Runtime & Framework

- **Node.js**: 16+ required
- **Electron**: ^42.3.0 (desktop application framework)
- **JavaScript**: ES6+ syntax with Node.js modules

## Core Libraries

### Built-in Node.js Modules
- `net`: Raw TCP socket connections
- `tls`: SSL/TLS encrypted connections
- `url`: URL parsing (using WHATWG URL API)
- `path`: File path operations

### External Dependencies
- `electron`: Desktop UI framework (dev dependency)

## Architecture Patterns

### Module Organization
- **CommonJS modules**: Using `require()` and `module.exports`
- **Class-based architecture**: ES6 classes for main components
- **Event-driven programming**: Socket event handlers (`connect`, `data`, `end`, `error`)
- **Promise-based async**: HTTP client returns Promises

### Key Design Patterns
- **Separation of concerns**: Network, parsing, rendering, and UI layers are isolated
- **Raw protocol implementation**: No high-level HTTP libraries (educational requirement)
- **Fallback rendering**: Plain text display when HTML parsing fails

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start application
npm start

# Start in dev mode
npm run dev
```

### Testing
```bash
# No automated tests currently
# Manual testing with these URLs:
# - http://example.com
# - http://info.cern.ch
# - https://example.com
```

### Building
```bash
# Optional: Build executable (requires electron-builder)
npm install --save-dev electron-builder
npm run build
```

## Code Conventions

### Comments
- All code comments in Vietnamese
- JSDoc-style function documentation
- Inline comments for complex logic

### Naming
- `camelCase` for variables and functions
- `PascalCase` for classes
- Descriptive names (e.g., `buildRequest`, `parseResponse`)

### Error Handling
- Promise rejection for async errors
- Socket error events with descriptive messages
- Timeout handling (default 10 seconds)

## Configuration

### Electron Settings
- Node integration enabled (`nodeIntegration: true`)
- Context isolation disabled (`contextIsolation: false`)
- Window size: 1200x800

### Network Settings
- Default timeout: 10 seconds
- HTTP port: 80
- HTTPS port: 443
- TLS certificate validation disabled (`rejectUnauthorized: false`)
