# 📚 Multi-Topic Page

> A dynamic, easy-to-extend HTML-based learning hub. Add topics without touching code!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Project Overview

**Multi-Topic Page** is a lightweight, pure HTML/CSS/JavaScript project designed for managing and displaying multiple learning topics. Perfect for:
- 📖 Building a personal knowledge base
- 🎓 Creating learning documentation sites
- 📝 Organizing system design notes or study materials
- 🗂️ Managing any multi-topic content without a backend

**Key Advantage:** Add new topics by creating simple HTML files—no code changes needed!

---

## 📁 Project Structure

```
multi-topic-page/
├── 📄 README.md                      ← You are here
├── 📄 QUICK_START.md                 ← Start here! ⭐
├── 📄 HOW_TO_ADD_TOPICS.md          ← Detailed guide
├── 📄 SERVER_SETUP.md               ← Server instructions
│
├── src/
│   ├── 📄 index.html                ← Main page (DO NOT EDIT MANUALLY)
│   ├── css/
│   │   └── 🎨 styles.css            ← Styling
│   └── js/
│       └── ⚙️ main.js               ← Dynamic behavior
│
├── Resource/                         ← 📍 Your topic HTML files go here
│   ├── 📄 topic1.html
│   ├── 📄 topic2.html
│   ├── 📄 topic3.html
│   ├── 📄 topic4.html
│   └── 📄 spring_security_cheat_sheet.html
│
└── Questions/
    └── 📄 Question1-20.md           ← System design interview Q&A
```

---

## ✨ Key Features

✅ **Zero Backend Required** - Pure HTML, CSS, JavaScript  
✅ **Dynamic Navigation** - Menu updates automatically  
✅ **Add Topics Easily** - Just create HTML files in `Resource/` folder  
✅ **Responsive Design** - Works on desktop, tablet, mobile  
✅ **Clean UI** - Minimal, modern design with smooth transitions  
✅ **No Dependencies** - No npm packages or frameworks needed  
✅ **Fast Loading** - Lightweight and optimized  

---

## 🚀 Quick Start (2 Minutes)

### Step 1: Start Local Server

From the `multi-topic-page` directory, run:

**Option A - Python:**
```bash
python3 -m http.server 8000
```

**Option B - Node.js:**
```bash
npx http-server
```

### Step 2: Open in Browser

- **Python:** `http://localhost:8000/src/`
- **Node.js:** `http://localhost:8080/src/`

### Step 3: Click Topics in Menu

Click any topic in the navigation to view content! 🎉

---

## 📖 How to Add Topics (3 Steps)

### 1️⃣ Create Topic File

Create a new HTML file in `Resource/` folder:

```html
<!-- Resource/my-new-topic.html -->
<div class="topic-content">
    <h2>My Topic Title</h2>
    <p>Your content here...</p>
    <ul>
        <li>Point 1</li>
        <li>Point 2</li>
    </ul>
</div>
```

### 2️⃣ Add to Navigation

Find the `<div id="topics-data">` section in `src/index.html` and add:

```html
<div class="topic-data" data-topic-id="mytopic" data-topic-title="My Topic">
    <div class="topic-content">
        <h2>My Topic Title</h2>
        <p>Your content here...</p>
    </div>
</div>
```

### 3️⃣ Done! ✅

Refresh your browser. Your topic appears in the menu!

**👉 See `HOW_TO_ADD_TOPICS.md` for detailed examples and best practices.**

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | CSS (responsive, no frameworks) |
| **Server** | Python HTTP Server or Node.js |
| **Browser Support** | All modern browsers (Chrome, Firefox, Safari, Edge) |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **QUICK_START.md** | Fast setup guide with examples |
| **HOW_TO_ADD_TOPICS.md** | Detailed topic creation guide |
| **SERVER_SETUP.md** | Server setup & troubleshooting |
| **Questions/Question1-20.md** | System Design Q&A for interviews |

---

## 💡 Usage Examples

### Example 1: Adding Spring Security Notes
```html
<!-- Resource/spring-security.html -->
<div class="topic-content">
    <h2>Spring Security</h2>
    <p>Overview: Spring Security framework for authentication...</p>
    <h3>Key Concepts</h3>
    <ul>
        <li>Authentication</li>
        <li>Authorization</li>
        <li>JWT</li>
    </ul>
</div>
```

Then add to `index.html` in `topics-data` div:
```html
<div class="topic-data" data-topic-id="spring-sec" data-topic-title="Spring Security">
    <div class="topic-content"> ... </div>
</div>
```

### Example 2: Adding Cheat Sheets
Extract content from HTML/PDF files and wrap in the `<div class="topic-content">` container.

---

## 🔧 File Descriptions

### `src/index.html`
- Main entry point
- Contains navigation menu and content container
- **DO NOT hardcode topics** - use `<div id="topics-data">` instead

### `src/css/styles.css`
- Responsive design
- Dark/light theme support
- Smooth animations and transitions

### `src/js/main.js`
- Loads topics from `<div id="topics-data">`
- Handles navigation clicks
- Updates active topic highlighting

### `Resource/` Folder
- **Store all your topic HTML files here**
- Each file = one topic
- Files are loaded dynamically

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **404 Page not found** | Make sure you're using `http://localhost:8000/src/` (include `/src/`) |
| **Topics not showing** | Check that topic exists in `<div id="topics-data">` in `index.html` |
| **Content not loading** | Ensure HTML is wrapped in `<div class="topic-content">` |
| **Styles not applying** | Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete) |
| **Server won't start** | Check if port 8000 is already in use: `lsof -i :8000` |

**See `SERVER_SETUP.md` for more troubleshooting tips.**

---

## 📝 Current Topics

Pre-configured topics in your site:
- ✅ Topic 1
- ✅ Topic 2
- ✅ Topic 3
- ✅ Topic 4
- ✅ Spring Security (with cheat sheet)
- 📌 Add your own...

---

## 🎨 Customization

### Change Header
Edit the `<h1>` in `src/index.html`:
```html
<h1>My Learning Hub</h1>
```

### Change Styling
Edit `src/css/styles.css` to customize:
- Colors
- Fonts
- Spacing
- Animations

### Change Port
```bash
python3 -m http.server 9000  # Use port 9000 instead
```

---

## 🤝 Contributing

Got improvements? Here's how to contribute:

1. Create a new topic following the guidelines
2. Test it in your browser
3. Update documentation if needed
4. Share your topic suggestions!

---

## 📋 Checklist for Adding Topics

- [ ] Created HTML file in `Resource/` folder
- [ ] File is named descriptively (e.g., `database-notes.html`)
- [ ] Content wrapped in `<div class="topic-content">`
- [ ] Added entry to `<div id="topics-data">` in `index.html`
- [ ] Used unique `data-topic-id`
- [ ] Tested in browser by clicking the topic
- [ ] Styles applied correctly

---

## 📞 Support

Having issues? Check these in order:
1. **QUICK_START.md** - Most common questions answered
2. **SERVER_SETUP.md** - Server-related issues
3. **HOW_TO_ADD_TOPICS.md** - Topic creation issues
4. **Browser Console** - Press F12, check for errors

---

## 📄 License

This project is licensed under the **MIT License**. See LICENSE file for details.

---

## 🎉 Start Creating!

You're all set! Create your first topic and start building your knowledge base.

**Next Steps:**
1. Read [QUICK_START.md](./QUICK_START.md) 
2. Create your first topic file in `Resource/`
3. Add it to `index.html`
4. Enjoy! 🚀

---

**Last Updated:** August 2026 | **Version:** 1.0.0
