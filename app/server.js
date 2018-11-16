const express = require('express')
const Chance = require('chance')
const path = require('path')
const loadDescriptors = require('./load_descriptors')

require('../config/config')
const {
  generateResource,
  generateListResource,
} = require('./generate')

const app = express()
const descriptorDir = path.join(__dirname, 'descriptors')
const descriptors = loadDescriptors(descriptorDir)

console.log('The following resource descriptors were loaded:')
console.log(Object.keys(descriptors))

require('../config/middleware')(app)

// Get the chance object for the request, using the seed value if it has been
// provided.
function getChance(req) {
  // need to do this special check to invoke seedless version of Chance
  // without parameters to get an unseeded chance generator
  const { seed } = req.query
  if (!seed) return new Chance()
  return new Chance(seed)
}

// Get the resource descriptor function call for this request from the resourceName
// Relies on the :resourceName param in the request URL being there
function getDescriptor(req) {
  const { resourceName } = req.params
  return descriptors[resourceName]
}

// Get the options for the list resource (paging)
function getListResourceOptions(req) {
  return {
    skip: parseInt(req.query.skip, 10) || undefined,
    limit: parseInt(req.query.limit, 10) || undefined,
    max: parseInt(req.query.max, 10) || undefined,
  }
}

// the endpoint for a single resource item
app.get('/item/:resourceName', (req, res, next) => {
  const chance = getChance(req)
  const descriptor = getDescriptor(req)
  if (!descriptor) {
    return next()
  }
  const resource = generateResource(descriptor(chance))
  return res.send(resource)
})

// the endpoint for pages lists of a resource item
app.get('/list/:resourceName', (req, res, next) => {
  const chance = getChance(req)
  const descriptor = getDescriptor(req)
  if (!descriptor) {
    return next()
  }
  const options = getListResourceOptions(req)
  const resource = generateListResource(descriptor(chance), options)
  return res.send(resource)
})

// Global Error Handling
app.use((req, res) => res.status(404).send(`Resource not found: ${req.path}`))

module.exports = app
