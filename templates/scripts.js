module.exports = (scripts) => `
  <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
  <script src="http://etsy-footer.rvrita.com/footer-bundle.js"></script>
  <script src="http://etsy-header.rvrita.com/header-bundle.js"></script>

  ${scripts.map((script) => {
    return `<script src="/${script}.js"></script>`;
    }).join('\n')
  }

  <script>
    ${scripts.map((script) => `
      ReactDOM.hydrate(
        React.createElement(${script}),
        document.getElementById('${script}')
      );`
    )}
  </script>
`;