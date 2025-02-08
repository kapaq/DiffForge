const express = require('express');
const path = require('path');
const diff = require('diff'); // Import the 'diff' package

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(express.json());

// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to compare two code snippets
app.post('/compare', (req, res) => {
  const { code1, code2 } = req.body;

  if (!code1 || !code2) {
    return res.status(400).json({ message: 'Both code snippets must be provided.' });
  }

  // Perform the diff comparison using diff.diffLines instead of diffWords
  const changes = diff.diffLines(code1, code2); // Compare line by line

  // Format the result for response, color code added and removed lines
  let highlightedCode = '<pre style="font-family: monospace;">';

  changes.forEach(part => {
    if (part.added) {
      highlightedCode += `<div class="highlight-added">${part.value}</div>`;
    } else if (part.removed) {
      highlightedCode += `<div class="highlight-removed">${part.value}</div>`;
    } else {
      highlightedCode += `<div>${part.value}</div>`;
    }
  });

  highlightedCode += '</pre>';

  // Send the diff results as a response
  res.json({ highlightedCode });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
