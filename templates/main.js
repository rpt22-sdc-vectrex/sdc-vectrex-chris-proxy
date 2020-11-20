module.exports = (title, body, scripts) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/styles.css">
  <title>${title}</title>
</head>
<body>
  ${body}
</body>
  ${scripts}
</html>
`;