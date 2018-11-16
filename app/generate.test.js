const { assert } = require('chai')
const _ = require('lodash')
const {
  generateResource,
  generateListResource,
} = require('./generate')

describe('generate', () => {
  describe('generateResource', () => {
    it('should return undefined with no params', () => {
      assert.equal(generateResource(), undefined)
    })
    it('should return simple objects properly', () => {
      assert.equal(generateResource(1), 1)
      assert.equal(generateResource('somestring'), 'somestring')
    })
    it('should return empty object when template is empty', () => {
      assert.deepEqual(generateResource({}), {})
    })
    it('should return objects with constant values properly', () => {
      assert.deepEqual(generateResource({
        value: 1,
        greeting: 'hello',
      }), {
        value: 1,
        greeting: 'hello',
      })
    })
    it('should return objects with function values properly', () => {
      assert.deepEqual(generateResource({
        value: () => 1,
        greeting: () => 'hello',
      }), {
        value: 1,
        greeting: 'hello',
      })
    })
    it('should return deep objects properly', () => {
      assert.deepEqual(generateResource({
        value: () => 1,
        subObject: {
          greeting: () => 'hello',
          anotherSubObject: {
            greeting: 'hello2',
            array: () => [1, 2, 3],
          },
        },
      }), {
        value: 1,
        subObject: {
          greeting: 'hello',
          anotherSubObject: {
            greeting: 'hello2',
            array: [1, 2, 3],
          },
        },
      })
    })
  })
  describe('generateListResource', () => {
    const options = {
      max: 10,
      limit: 10,
      skip: 0,
    }
    it('should generate an empty list with an undefined template', () => {
      assert.deepEqual(generateListResource(), [])
    })
    it('should generate an array of simple items properly', () => {
      const template = 1
      const value = template
      assert.deepEqual(generateListResource(template, options), _.times(options.limit, () => value))
    })
    it('should generate an array of functions properly', () => {
      const template = () => 1
      const value = 1
      assert.deepEqual(generateListResource(template, options), _.times(options.limit, () => value))
    })
    it('should generate an array of objects properly', () => {
      const template = {
        value: 1,
        valueFunc: () => 5,
        greeting: 'hello',
        greetingFunc: () => 'hello2',
      }
      const value = {
        value: 1,
        valueFunc: 5,
        greeting: 'hello',
        greetingFunc: 'hello2',
      }
      assert.deepEqual(generateListResource(template, options), _.times(options.limit, () => value))
    })
    it('should page properly', () => {
      let value = 0
      function incrementer() {
        const result = value
        value += 1
        return result
      }
      const template = { value: incrementer }
      let listResource = generateListResource(template, {
        max: 100,
        limit: 10,
        skip: 0,
      })
      assert.equal(listResource.length, 10)
      assert.equal(listResource[0].value, 0)
      assert.equal(listResource[9].value, 9)

      // reset the incrementer and try again with different page options
      value = 0
      listResource = generateListResource(template, {
        max: 100,
        limit: 20,
        skip: 30,
      })
      assert.equal(listResource.length, 20)
      assert.equal(listResource[0].value, 30)
      assert.equal(listResource[9].value, 39)

      // reset the incrementer and try paging off the end
      value = 0
      listResource = generateListResource(template, {
        max: 10,
        limit: 10,
        skip: 5,
      })
      assert.equal(listResource.length, 5)
      assert.equal(listResource[0].value, 5)
      assert.equal(listResource[4].value, 9)
    })
    it('should throw when max list resource size is too big', () => {
      assert.throws(() => {
        generateListResource({ someValue: 1 }, {
          max: 1000000000,
        })
      })
    })
  })
})
