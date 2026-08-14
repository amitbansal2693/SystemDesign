r now# Multi-Topic Navigation Site

This is a dynamic HTML site that allows you to easily add new topics without modifying the main `index.html` file.

## How It Works

The system uses a configuration file (`topics.json`) to manage all topics. Each topic is stored as a separate HTML file in the `Resource/` folder.

### Architecture

```
multi-topic-page/
├── src/
│   ├── index.html          # Main page - loads dynamically
│   ├── css/styles.css      # Styling
│   └── js/main.js          # JavaScript for dynamic loading
├── Resource/
│   ├── topic1.html         # Topic content files
│   ├── topic2.html
│   ├── topic3.html
│   └── ...
└── topics.json             # Configuration file listing all topics
```

## How to Add a New Topic

### Step 1: Create Topic HTML File
Create a new HTML file in the `Resource/` folder. For example, create `Resource/springboot.html`:

```html
<div class="topic-content">
    <h2>Spring Boot Framework</h2>
    <p>Your content here...</p>
    <ul>
        <li>Point 1</li>
        <li>Point 2</li>
    </ul>
</div>
```

### Step 2: Update `topics.json`
Add an entry to the `topics.json` file:

```json
{
  "topics": [
    // ... existing topics ...
    {
      "id": "springboot",
      "title": "Spring Boot",
      "file": "Resource/springboot.html"
    }
  ]
}
```

### Step 3: That's It!
The navigation will automatically update and your new topic will appear in the menu.

## File Structure Details

### `topics.json`
This configuration file lists all available topics:
- `id`: Unique identifier for the topic
- `title`: Display name in the navigation menu
- `file`: Path to the HTML file relative to `topics.json`

### `Resource/` Folder
Store all your topic content HTML files here. Each file should contain only the content, not the full HTML structure (no `<html>`, `<head>`, `<body>` tags).

### `src/index.html`
The main page. It dynamically loads the navigation and content based on `topics.json`.

### `src/js/main.js`
Handles:
- Fetching `topics.json`
- Creating navigation links
- Loading topic content when clicked
- Marking the active topic

## Tips

1. **Keep files clean**: Each topic file should contain only the content, wrapped in a `<div class="topic-content">` element
2. **Naming convention**: Use lowercase filenames with hyphens (e.g., `spring-boot.html`, `system-design.html`)
3. **Styling**: Content will inherit styles from `styles.css`. You don't need to add styles for basic content
4. **Media files**: You can reference images and other media from `Resource/` folder in your topic files

## Example Topic File

```html
<div class="topic-content">
    <h2>React Basics</h2>
    <p>Introduction to React...</p>
    
    <h3>Components</h3>
    <p>React components are reusable...</p>
    
    <h3>Hooks</h3>
    <ul>
        <li>useState</li>
        <li>useEffect</li>
        <li>useContext</li>
    </ul>
</div>
```

## Troubleshooting

- **Topics not appearing**: Make sure `topics.json` is in the same directory as `src/`
- **Content not loading**: Check that the file path in `topics.json` is correct
- **Styles not applying**: Make sure your content is wrapped in a `<div class="topic-content">`

