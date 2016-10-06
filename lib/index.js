const config = require('yajsonfig')(__dirname + '/../config.json').shortener;

function Shortener(backend) {
  this.backend = backend;
}

Shortener.prototype.add(url) {
  var slug = this._slug();
  return this.backend.exists(slug)
    .then((exits) => {
      if (exists) {
        return this.add(url);
      }
      return this.backend.put(url, slug);
    });
};

Shortener.prototype.get(slug) {
  return this.backend.get(slug);
};

Shortener.prototype._slug() {
  var short = new Array(config.length);
  short.map(() => {
    const pos = Math.random() * (config.alphabet.length - 1);
    return alphabet[pos];
  });
};
