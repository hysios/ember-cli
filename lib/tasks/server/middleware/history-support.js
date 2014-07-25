'use strict';

// Used in serve-files middleware

var path = require('path');

module.exports = function() {
  return function(req, res, next) {
    var hasHTMLHeader = req.accepts('html') === 'html';
    var hasNoFileExtension = path.extname(req.path) === '';
    var isForTests = /^\/tests/.test(req.path);
    var isForAdmin = /^\/admin/.test(req.path);

    if (req.method === 'GET' && hasHTMLHeader && hasNoFileExtension) {
      if (isForTests) {
      	req.url = '/tests/index.html';
      } else if (isForAdmin) {
      	req.url = '/admin/index.html';
      } else {
      	req.url = '/index.html';
      }

    }


    next();
  };
};
