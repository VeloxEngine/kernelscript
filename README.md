# KERNELSCRIPT // Engineering Journal & Systems Architecture

> A high-performance, technical blog platform built with pure HTML5, vanilla CSS3, and modern client-side JavaScript. Default dark mode, stark white typography, responsive grid layout, real-time client-side search, and a complete suite of engineering publications and legal specifications.

---

## ⚡ Features

- **Dark Mode Architecture**: Technical obsidian palette (`#07080b`), high-contrast white headings, and muted steel text.
- **Client-Side Live Search**: Instant interactive search across titles, excerpts, and topic tags with keyboard shortcut (`/` to focus).
- **Category Filter Tabs**: Dynamic filtering for *Python & Automation*, *Browser Stealth*, *Hardware*, *Local AI*, and *Privacy*.
- **Post Reader Experience**: Dedicated reading view with sticky gradient progress bar, interactive Table of Contents, breadcrumbs, and terminal-style code blocks with copy-to-clipboard functionality.
- **Full Legal Compliance Suite**: Dedicated Privacy Policy (GDPR/CCPA compliant), Terms of Service (MIT code license), and FTC-compliant Affiliate & Hardware Risk Disclaimer.
- **Zero Framework Bloat**: Pure vanilla web standards. Zero external runtime dependencies. Instant loading and universal browser compatibility.

---

## 📚 Publications Index

1. **Introduction to Writing Python Automation Scripts** (`posts/python-automation-scripts.html`) — 918 words
2. **How Anti-Detect Browsers Work: A Technical Overview** (`posts/how-anti-detect-browsers-work.html`) — 902 words
3. **Optimizing Your Local Hardware Setup for Heavy Workloads** (`posts/optimizing-local-hardware-heavy-workloads.html`) — 867 words
4. **Running Local AI Models vs. Cloud Execution: Pros & Cons** (`posts/running-local-ai-vs-cloud-execution.html`) — 768 words
5. **Automating Repetitive Browser Tasks with JavaScript** (`posts/automating-repetitive-browser-tasks-javascript.html`) — 932 words
6. **Managing Multiple Digital Profiles Securely** (`posts/managing-multiple-digital-profiles-securely.html`) — 788 words
7. **The Best Command-Line Tools for Power Users** (`posts/best-command-line-tools-power-users.html`) — 825 words
8. **Configuring Hardware Specifications for Seamless Multitasking** (`posts/configuring-hardware-seamless-multitasking.html`) — 838 words
9. **Privacy Protocols: Keeping Your Digital Footprint Minimal** (`posts/privacy-protocols-digital-footprint.html`) — 849 words
10. **Building Your Own Custom Productivity Scripts** (`posts/building-custom-productivity-scripts.html`) — 878 words

---

## 📂 Repository Structure

```
├── index.html                   # Main feed & blog grid
├── privacy.html                 # Comprehensive Privacy Policy
├── terms.html                   # Terms of Service
├── disclaimer.html              # Affiliate & Information Disclaimer
├── assets/
│   ├── css/
│   │   ├── style.css            # Design system, layout & tokens
│   │   └── post.css             # Reader typography, code blocks & TOC
│   └── js/
│       ├── main.js              # Search, category filters & dispatch form
│       └── post.js              # Reading progress bar & copy button
└── posts/                       # 10 peer-reviewed technical articles
```

---

## 🚀 Running Locally

Open `index.html` directly in any web browser, or serve via any static HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js npx
npx serve .
```

---

## 📜 License

Content & articles &copy; 2026 KERNELSCRIPT. All source code snippets provided in publications are licensed under the [MIT License](terms.html).
