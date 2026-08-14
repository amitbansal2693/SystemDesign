# Quick Start Guide

## 🎉 System Overview

✅ **Pure HTML/CSS/JavaScript**: No server needed! Open directly in browser!

### Directory Structure
```
multi-topic-page/
├── src/
│   ├── index.html              ← Main page with all topics embedded
│   ├── css/styles.css          ← Styling
│   └── js/main.js              ← Navigation logic
└── Resource/                   ← Store images and assets here
```

## 🚀 How to Run

Just open the file directly - NO SERVER NEEDED!

**macOS/Linux:**
```bash
open /path/to/src/index.html
```

**Or simply:**
- Double-click `src/index.html` in Finder
- Drag and drop into your browser
- Right-click → Open with → Browser

## ➕ How to Add a New Topic

### Step 1: Open `src/index.html`
Find the section that says `<div id="topics-data">` (around line 38)

### Step 2: Add Your Topic
Copy this template and paste it inside `<div id="topics-data">`:

```html
<!-- Your Topic Title -->
<div class="topic-data" data-topic-id="my-topic" data-topic-title="My Topic">
    <div class="topic-content">
        <h2>My Topic Title</h2>
        <p>Your content goes here...</p>
        <p>You can add multiple paragraphs, lists, images, etc.</p>
        
        <h3>Subsection</h3>
        <ul>
            <li>Point 1</li>
            <li>Point 2</li>
            <li>Point 3</li>
        </ul>
    </div>
</div>
```

**Important:**
- Change `data-topic-id` to a unique identifier (no spaces, use hyphens)
- Change `data-topic-title` to what you want to appear in the menu
- Keep `data-topic-id` values unique!

### Step 3: Refresh Browser
Save the file and refresh your browser. Your new topic appears in the menu! 🎯

## 📋 How It Works

1. **index.html** stores all topic content in a hidden `<div id="topics-data">`
2. **main.js** reads the topics and creates navigation menu links
3. **JavaScript** shows/hides content when you click menu items
4. **CSS** handles styling and animations

## 🖼️ Adding Images

1. Save images to the `Resource/` folder
2. Reference them in your topics:

```html
<img src="../Resource/my-image.png" alt="Image description">
```

## 🎨 Styling Your Content

Wrap your content in `<div class="topic-content">` and use standard HTML:

```html
<div class="topic-content">
    <h2>Title</h2>
    <p>Paragraph text</p>
    <h3>Subtitle</h3>
    <ul>
        <li>List item</li>
    </ul>
    <blockquote>Quote text</blockquote>
    <code>code example</code>
</div>
```

All standard HTML elements are automatically styled!

## ✅ Example Topics

Already in the file:
- Topic 1
- Topic 2
- Topic 3
- Topic 4

You can edit these or add more following the template above.

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Topics not showing | Make sure `data-topic-id` is unique |
| Menu not working | Check for syntax errors in HTML |
| Images not loading | Use correct path: `../Resource/imagename.png` |
| Styles look wrong | Make sure content is wrapped in `<div class="topic-content">` |
| Browser won't open file | Some older browsers block local files. Right-click → Open With → Chrome/Firefox |

## 💡 Tips

- Use meaningful `data-topic-id` values (e.g., `spring-boot`, `system-design`)
- Keep topic content between the `<div class="topic-content">` tags
- Don't modify anything outside the `<div id="topics-data">` unless you know what you're doing
- Topics appear in the menu in the order they appear in the HTML

---

**That's it! Pure HTML/CSS/JavaScript - no servers, no build tools, no complications!** 🚀

