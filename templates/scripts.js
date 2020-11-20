module.exports = (scripts) => `
  <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>

  ${scripts.map((script) => {
    return `<script src="/${script}.js"></script>`;
  }).join('\n')}

  <script>
    ${scripts.map((script) => `
      ReactDOM.hydrate(
        React.createElement(${script}),
        document.getElementById('${script}')
      );`
    )}
  </script>
`;