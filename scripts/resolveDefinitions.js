var path = require('path');
var fs = require('fs');

var root = 'lib';
var fictiveRoot = 'lib/@types';

var testRegEx = /\.d\.ts$/;
var importRegEx = /from '(.*)';/gm;
var pathRegEx = /@source(.*)';/;

function processFile(fileName) {
  var fileContent = fs.readFileSync(fileName).toString();
  var matches = fileContent.match(importRegEx);
  var filePath = fileName.replace(/[^\/]*\.d\.ts/, '');
  var someChange = false;

  if (!matches) return;

  for (var i = 0; i < matches.length; i++) {
    var originalImport = matches[i];
    var _path = originalImport.match(pathRegEx);
    if (!_path) continue;

    // Get full path from root of import
    var _fullPath = fictiveRoot + _path[1];
    var diff = path.relative(filePath, _fullPath);
    if (diff[0] !== '.') diff = './' + diff;

    // Create from text
    var newImport = 'from \'' + diff + '\';';

    // Replace import
    fileContent = fileContent.replace(originalImport, newImport);
    someChange = true;
  }

  if (someChange) {
    console.log('Resolving file ', fileName);
    // Write changes
    fs.writeFileSync(path.resolve(fileName), fileContent);
  }
}

function parseFolder(parent) {
  var files = fs.readdirSync(parent);
  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(parent, files[i]);
    var stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      parseFolder(filePath);
    }

    if (stats.isFile()) {
      if (testRegEx.test(filePath)) {
        processFile(filePath);
      }
    }
  }
}

parseFolder(root);
