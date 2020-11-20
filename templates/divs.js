module.exports = (header, footer, shipping) => `
  <div id=header>${header}</div>
    <div id="content">
      <div id="left-col">
        <div id="pictures"></div>
        <div id="reviews"></div>
      </div>
      <div id="right-col">
        <div id="details"></div>
        <div id=shipping>${shipping}</div>
      </div>
    </div>
  <div id=footer>${footer}</div>
`;