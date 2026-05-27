# Product Overview

## Simple Web Browser

A lightweight educational web browser built with JavaScript and Electron for a Computer Networking course project. The browser demonstrates fundamental networking concepts by implementing HTTP/HTTPS protocols from scratch using raw TCP sockets.

## Core Purpose

Educational tool to understand:
- TCP socket programming
- HTTP protocol implementation
- Client-server architecture
- Network layer operations
- Basic web rendering

## Key Features

- **Raw Socket Implementation**: HTTP requests built from scratch using Node.js `net` module (no axios/fetch)
- **Protocol Support**: HTTP and HTTPS (TLS) connections
- **HTML Parsing**: Basic extraction of headings, paragraphs, and links
- **Modern UI**: Desktop application with Electron featuring address bar, navigation buttons, and history management
- **Vietnamese Documentation**: All comments and documentation in Vietnamese for local students

## Target Audience

Computer Science students learning network programming fundamentals.

## Known Limitations

- No JavaScript execution
- No image rendering
- Basic CSS styling only
- GET requests only (no POST/PUT/DELETE)
- Simple HTML parsing (no complex DOM manipulation)
