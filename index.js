const express = require('express');
const config = require('yajsonfig')(__dirname + '/config.json').service;

const Shortener = require('./lib');
const MemoryBackend = require('./lib/backends/memory');
const RedisBackend = require('./lib/backends/redis');
//const shortener = new Shortener(MemoryBackend);
const shortener = new Shortener(RedisBackend);

const app = express();
const admin = express();

app.get('/:slug', (req, res, next) => {
  const slug = req.params['slug'].trim();
  if (!slug) {
    return res.sendStatus(404);
  }

  shortener.get(slug).then(
    (url) => {
      if (url) {
        return res.redirect(301, url);
      }

      return res.sendStatus(404);
    }).catch(
      () => {
        return res.sendStatus(404);
      });
});

admin.post('/:url', (req, res, next) => {
  const url = req.params['url'].trim();
  if (!url) {
    return res.sendStatus(403);
  }

  shortener.add(url).
    then((slug) => {
      return res.status(200).send({slug});
    });
});

app.listen(config.service_port, () => {
  console.log('Service launched at port ', config.service_port);
});

admin.listen(config.admin_port, () => {
  console.log('Admin launched at port ', config.admin_port);
});
