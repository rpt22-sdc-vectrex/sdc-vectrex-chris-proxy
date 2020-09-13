const express = require('express');
const path = require('path');
const app = express();
const port = 8880;
const axios = require('axios');
const cors = require('cors');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
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
    paths: [ '/reviews/*', '/review-summary/*', '/review-list/*', '/reviews-pictures/*', '/reviews-bundle.js' ],
    server: 'http://etsy-reviews.rvrita.com',
  },
  {
    paths: [ '/itemDetails/*', '/info/*', '/bundle.js' ],
    server: 'http://ec2-3-133-108-106.us-east-2.compute.amazonaws.com',
  },
  {
    paths: [ '/pictures', '/pictures/*', '/reviewPhotos/*', '/pictures.bundle.js' ],
    server: 'http://13.56.229.226',
  },
  {
    paths: [ '/shipping-api/*', '/dist/ttreit-shipping.js' ],
    server: 'http://3.95.162.236',
  },
];

proxyRoutes.forEach(route => {
  const { server, paths } = route;
  const handler = (req, res) => {
    const url = server + req.url;
    axios.get(url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
  };
  paths.forEach(path => {
    app.get(path, handler);
  });
});

app.use(express.static(__dirname + '/public')); 

// fall through to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

