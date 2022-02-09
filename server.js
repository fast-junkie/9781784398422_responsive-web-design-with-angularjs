const debug = require('debug')('angularjs');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
const appName = '9781784398422_responsive-web-design-with-angularjs';
const port = process.env.PORT || 2112;

debug('Booting... %o', appName);
app.use(logger('dev'));

// Base...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Export
if (require.main === module) {
  app.listen(port, () => {
    console.info(`Express started on port:${port}.`);
  });
} else {
  module.exports = app;
}
