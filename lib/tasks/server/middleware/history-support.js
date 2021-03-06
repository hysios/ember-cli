'use strict';

// Used in serve-files middleware

var path = require('path');

module.exports = function() {
  return function(req, res, next) {
    var hasHTMLHeader = (req.headers.accept || []).indexOf('text/html') === 0;
    var isAsset = (req.path.indexOf('assets')>-1 && path.extname(req.path)!=='');
    var isForTests = /^\/tests/.test(req.path);

    if (req.method === 'GET' && hasHTMLHeader && !isAsset) {
      req.url = isForTests ? '/tests/index.html' : '/index.html';
    }

    next();
  };
};
