const express = require('express')
const Chance = require('chance')
const loadDescriptors = require('./descriptors/load_descriptors')
require('../config/config')
const {
  generateResource,
  generateListResource,
} = require('./generate')

const app = express()
const descriptors = loadDescriptors()

console.log('The following resource descriptors were loaded:')
console.log(Object.keys(descriptors))

require('../config/middleware')(app)

function makeChance(seed) {
  // strangely need to do this special check to invoke seedless version of Chance
  // without parameters to get an unseeded chance generator
  if (!seed) return new Chance()
  return new Chance(seed)
}

app.get('/item/:resourceName', (req, res, next) => {
  const { resourceName } = req.params
  const descriptor = descriptors[resourceName]
  if (!descriptor) {
    return next()
  }
  const { seed } = req.query
  const chance = makeChance(seed)
  const resource = generateResource(descriptor(chance))
  return res.send(resource)
})

app.get('/list/:resourceName', (req, res, next) => {
  const { resourceName } = req.params
  const descriptor = descriptors[resourceName]
  if (!descriptor) {
    return next()
  }
  const {
    seed,
    skip,
    limit,
    max,
  } = req.query
  const chance = makeChance(seed)
  const resource = generateListResource(descriptor(chance), {
    skip: parseInt(skip, 10) || undefined,
    limit: parseInt(limit, 10) || undefined,
    max: parseInt(max, 10) || undefined,
  })
  return res.send(resource)
})

// Global Error Handling
app.use((req, res) => res.status(404).send(`Resource not found: ${req.path}`))

module.exports = app
