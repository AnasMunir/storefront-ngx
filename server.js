const express = require('express');
const vhost = require('vhost');

let crimson = null;
let classic = null;
// const classic = require('./dist/classic/server');
try {
  const crimsonApp = require('./dist/crimson/server');
  crimson = crimsonApp
} catch (error) {
  console.error('crimson dist error', error);
}
try {
  const classicApp = require('./dist/classic/server');
  classic = classicApp
} catch (error) {
  console.error('classic dist error', error);
}

const app = express();
const PORT = process.env.PORT || 8080;

if (crimson) {
  app.use(vhost('crimson2.stgfishry.com', crimson));
}
if (classic) {
  app.use(vhost('classic2.stgfishry.com', classic));
}
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
/* server.on('connection', (socket) => {
  console.log('address object', socket.address());
  console.log('remote address', socket.remoteAddress);
});*/