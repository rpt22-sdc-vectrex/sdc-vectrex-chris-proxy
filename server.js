const newrelic = require('newrelic');
const React = require('react');
const ReactDom = require('react-dom/server');
const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 80;

app.use(cors());

const modules = require('./templates/module-config.json');

const Template = require('./templates/main');
const Scripts = require('./templates/scripts');
const Divs = require('./templates/divs');

app.use(express.static(__dirname + '/public'));

const renderComponents = (components) => {
  return Object.keys(components).map((item) => {
    const component = React.createElement(components[item]);
    return ReactDom.renderToString(component);
  })
}

// fall through to index.html
app.get('**', (req, res) => {
  const components = renderComponents(modules);
  res.send(Template(
    'SDC-Vectrex-Chris-Proxy',
    Divs(...components),
    Scripts(Object.keys(modules))
  ));
  // res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log('Proxy Connected!')
});