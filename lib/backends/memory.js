var memory = {};
module.exports = {
  'put': function(url, slug) {
    memory[slug] = url;
    return Promise.resolve(slug);
  },
  'delete': function(slug) {
    const url = memory[slug] || null;
    if (url) {
      delete memory[slug];
    }
    return Promise.resolve(url);
  },
  'exists': function(slug) {
    return Promise.resolve(memory[slug] != null);
  },
  'get': function(slug) {
    return Promise.resolve(memory[slug]);
  }
}
