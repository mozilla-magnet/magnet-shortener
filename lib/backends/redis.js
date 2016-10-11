const createClient = require('then-redis').createClient
const config = require('yajsonfig')(__dirname + '/../../config.json').redis;

const db = createClient(config);

module.exports = {
  'put': function(url, slug) {
    return db.set(slug, url).
    then(() => {
      return slug;
    });
  },
  'delete': function(slug) {
    return db.get(slug).
    then((url) => {
      if (url) {
        return db.del(slug).
          then(() => {
            return url;
          });
      }
      return Promise.resolve(null);
    });
  },
  'exists': function(slug) {
    return db.get(slug).
    then((url) => {
      return url != null && url != undefined;
    });
  },
  'get': function(slug) {
    return db.get(slug);
  },
  supportsAdmin: function() {
    return true;
  }
}
