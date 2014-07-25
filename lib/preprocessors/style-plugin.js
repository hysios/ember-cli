'use strict';

var path         = require('path');
var Plugin       = require('./plugin');
var requireLocal = require('../utilities/require-local');
var merge        = require('lodash-node/modern/objects/merge');
var defaults     = require('lodash-node/modern/objects/defaults');

function StylePlugin () {
  this.type = 'css';
  this._superConstructor.apply(this, arguments);
}

StylePlugin.prototype = Object.create(Plugin.prototype);
StylePlugin.prototype.constructor = StylePlugin;
StylePlugin.prototype._superConstructor = Plugin;

StylePlugin.prototype.toTree = function(tree, inputPath, outputPath, options) {
  options = options || {};

  options = defaults(options, {
  	name: 'app', 
  	output: this.applicationName
  });

  var input = path.join(inputPath, options.name + '.' + this.getExt(inputPath, options.name));
  var output = path.join(outputPath, options.output + '.css');

  return requireLocal(this.name).call(null, [tree], input, output, merge({}, this.options, options));
};


module.exports = StylePlugin;

