const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;
const axios = require('axios');
const cors = require('cors');

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

app.use(cors());

const proxyRoutes = [
  {
    paths: [ '/header-bundle.js' ],
    server: 'http://etsy-header.rvrita.com',
  },
  {
    paths: [ '/footer-bundle.js' ],
    server: 'http://etsy-footer.rvrita.com',
  },
  {
    paths: ['/sdc-vectrex-chris-shipping-prod.js' ],
    server: 'http://52.9.126.252',
  },
];

app.use(express.static(path.join(__dirname, 'public')));


proxyRoutes.forEach((route) => {
  const { server, paths } = route;
  const handler = (req, res) => {
    const url = server + req.url;
    console.log(url)
    axios(url)
    .then((response) => {
      const { data } = response;
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
  };
  paths.forEach((path) => {
    app.get(path, handler);
  });
});


// fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});