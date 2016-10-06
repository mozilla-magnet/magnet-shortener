#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const Shortener = require('../lib');
const inMemory = require('../lib/backends/memory.js');

const shortener = new Shortener(inMemory);

const urls = process.argv.slice(2).map((url) => {
  return shortener.add(url);
});

var final = null;
Promise.all(urls).then((results) => {
  final = results;
  console.log("Shortened to");
  console.log(results);
}).then(() => {
  final = final.map((slug) => {
    return shortener.get(slug);
  });
  Promise.all(final).then((results) => {
    console.log("Resolved urls");
    console.log(results);
  });
});
