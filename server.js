const express = require('express');
const vhost = require('vhost');
const Redis = require('redis');

// Initializing Redis
const redisClient = Redis.createClient(6380, process.env.redis_server || 'fishry-storefront-apis.redis.cache.windows.net', {
  auth_pass: process.env.redis_auth || '24YEGZSbNo47pM2VVB26/psS2lnsFVI8RxSf5DIwT+c=',
  tls: {
    servername: process.env.redis_server || 'fishry-storefront-apis.redis.cache.windows.net'
  }
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

let crimson = null;
let classic = null;

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

app.get('/get-store-info', (req, res) => {
  console.time('redisSpeed');
  redisClient.get(req.query.domain, (err, value) => {
    res.send(value);
    console.timeEnd('redisSpeed');
  });
});
/* app.get('*', (req, res) => {
  // console.time('redisSpeed');
  // let domain = req.hostname;
  // domain = domain.substr(0, domain.indexOf('.'));
  // // res.send(domain);
  // let app = null;
  // const app2 = require(`./dist/${domain}/server`);
  // console.log('app2', app);
  // app = app2;
  // let dist = `${domain}.stgfishry.com`;
  // console.log('dist => ', dist);
  if (crimson) {
    console.log('app being served ->', crimson);
    // app.use(vhost('crimson2.stgfishry.com', crimson));
    app.use(vhost('crimson.atequator.com', crimson));
  } else {
    console.log('crap')
  }
}); */

if (crimson) {
  console.log('app', crimson);
  app.use(vhost('crimson2.stgfishry.com', crimson));
  app.use(vhost('crimson.atequator.com', crimson));
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