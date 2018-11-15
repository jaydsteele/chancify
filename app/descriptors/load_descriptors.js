const fs = require('fs')
const _ = require('lodash')
const path = require('path')

// returns true if filename is a file (and not a directory)
function isFile(filename) {
  return fs.lstatSync(path.join(__dirname, filename)).isFile()
}

// returns true if filename is a test file
function isTestFile(filename) {
  return _.endsWith(filename, '.test.js')
}

// return true if filename is this file
function isThisFile(filename) {
  return path.join(__dirname, filename) === __filename
}

/**
 * Load all of the descriptor functions in app/descriptors into a hashmap
 * for lookup, in the following format:
 * descriptors = {
 *   sample_user_1: function() {...}
 * }
 * @returns A hashmap of the resource descriptors
 */
function loadDescriptors() {
  const allFiles = fs.readdirSync(__dirname)
  const descriptors = _.chain(allFiles)
    .filter(file => (isFile(file) && !isTestFile(file) && !isThisFile(file)))
    .map(file => ({
      name: path.basename(file, '.js'),
      func: require(path.join(__dirname, file)) // eslint-disable-line
    }))
    .keyBy('name')
    .mapValues(object => object.func)
    .value()
  return descriptors
}

module.exports = loadDescriptors
