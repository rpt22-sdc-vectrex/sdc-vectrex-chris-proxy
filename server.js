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
    server: 'http://etsy-header.rvrita.com/',
  },
  {
    paths: [ '/footer-bundle.js' ],
    server: 'http://etsy-footer.rvrita.com/',
  },
  {
    paths: ['/sdc-vectrex-chris-shipping-prod.js' ],
    server: 'http://54.151.125.123:7100',
  },
];

proxyRoutes.forEach(route => {
  const { server, paths } = route;
  const handler = (req, res) => {
    const url = server + req.url;
    axios.get(url)
    .then((response) => {
      const { data } = response;
      res.set('Cache-Control', 'max-age=3600'); // browser should cache for 1 hour
      res.send(data);
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

app.use(express.static(__dirname + '/public'));

// fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// {
//   paths: [ '/reviews/*', '/review-summary/*', '/review-list/*', '/reviews-pictures/*', '/reviews-bundle.js' ],
//   server: 'http://localhost:8888/',
// },
// {
//   paths: [ '/pictures', '/pictures/*', '/reviewPhotos/*', '/pictures.bundle.js' ],
//   server: 'http://13.56.229.226',
// },
// {
//   paths: [ '/itemDetails/*', '/info/*', '/bundle.js' ],
//   server: 'http://ec2-3-133-108-106.us-east-2.compute.amazonaws.com',
// },