module.exports = (title, body, scripts) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/styles.css">
  <title>${title}</title>
</head>
<body>
<div id=header></div>
    <div id="content">
      <div id="left-col">
        <div id="pictures"></div>
        <div id="reviews"></div>
      </div>
      <div id="right-col">
        <div id="details"></div>
        ${body}
      </div>
    </div>
  <div id=footer></div>
  ${scripts}
</html>
`;