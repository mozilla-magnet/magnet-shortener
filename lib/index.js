const config = require('yajsonfig')(__dirname + '/../config.json').shortener;

function Shortener(backend) {
  this.backend = backend;
}

Shortener.prototype.add = function(url) {
  var slug = this._slug();
  return this.backend.exists(slug)
    .then((exists) => {
      if (exists) {
        return this.add(url);
      }
      return this.backend.put(url, slug);
    });
};

Shortener.prototype.get = function(slug) {
  return this.backend.get(slug);
};

Shortener.prototype._slug = function() {
  const slug = Array.apply(null, Array(config.length)).map(() => {
    const pos = Math.floor(Math.random() * (config.alphabet.length - 1));
    return config.alphabet[pos];
  });

  return slug.join('');
};

module.exports = Shortener;
