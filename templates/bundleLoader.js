const fs = require('fs');
const util = require('util')
const fetch = require('node-fetch');
const path = require('path');
const bundleDir = path.join(__dirname, '../public');

module.exports = (modules) => {
  Object.entries(modules).forEach((service) => {
    fetch(service[1])
      .then((response) => response.text())
      .then((data) => {
        fs.writeFile(`${bundleDir}/${service[0]}.js`, (data), 'utf8', (err) => {
          if (err) {
            console.log('error fetching bundle')
          }
        })
      })
      .catch((err) => console.log(err))
    })
  }

