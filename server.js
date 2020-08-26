const express = require('express');
const path = require('path');
const app = express();
const port = 8880;

// fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});