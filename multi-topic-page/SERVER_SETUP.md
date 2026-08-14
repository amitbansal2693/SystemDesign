# Running the Multi-Topic Site

Since we're using `fetch()` to load files, you need to run a local web server. Here are the easiest ways:

## Option 1: Using Python (Recommended)

If you have Python installed, run one of these commands from the `multi-topic-page` directory:

**Python 3.x:**
```bash
python3 -m http.server 8000
```

**Python 2.x (older):**
```bash
python -m SimpleHTTPServer 8000
```

Then open in your browser: `http://localhost:8000/src/`

## Option 2: Using Node.js

If you have Node.js installed, you can use `http-server`:

```bash
# Install globally (one time)
npm install -g http-server

# Run it
http-server
```

Then open in your browser: `http://localhost:8080/src/`

## Option 3: Using Node.js with npx (No install needed)

```bash
npx http-server
```

## Option 4: Using Live Server in VS Code

1. Install the "Live Server" extension in VS Code
2. Right-click on `src/index.html`
3. Select "Open with Live Server"

## Verify It's Working

Once the server is running and you open the site:
1. You should see "Multi-Topic Navigation" as the title
2. The navigation menu should show: Topic 1, Topic 2, Topic 3, Topic 4
3. Clicking on each topic should load and display the content
4. The active topic link should be bold and red

## Adding Your First Custom Topic

1. Edit `topics.json` to add your new topic
2. Create a new HTML file in `Resource/` folder
3. Refresh your browser - the new topic should appear!

For detailed instructions, see `HOW_TO_ADD_TOPICS.md`

