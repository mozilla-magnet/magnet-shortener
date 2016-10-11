const config = require('../../config.json').magnetcontentapi;
const fetch = require('node-fetch');

module.exports = {
  'get': function(slug) {
    return fetch(config.endpoint.replace(':slug', slug), {
      headers: {
        'x-apikey': config.apiKey
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.canonical_url;
    });
  },
  supportsAdmin: function() {
    return false;
  }
};
