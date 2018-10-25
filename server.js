const express = require('express');
const vhost = require('vhost');


const classic = require('./dist/classic/server');
const crimson = require('./dist/crimson/server');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(vhost('classic.atequator.com', classic));
app.use(vhost('crimson.atequator.com', crimson));

let server = app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
/* server.on('connection', (socket) => {
  console.log('address object', socket.address());
  console.log('remote address', socket.remoteAddress);
}); */