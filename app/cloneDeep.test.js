const { assert } = require('chai')
const cloneDeep = require('./cloneDeep')

describe('cloneDeep', () => {
  it('should clone simple values', () => {
    assert.isUndefined(cloneDeep(undefined))
    assert.isNull(cloneDeep(null))
    assert.equal(cloneDeep(1), 1)
    assert.equal(cloneDeep('abc'), 'abc')
  })
  it('should clone simple objects', () => {
    assert.deepEqual(cloneDeep({}), {})
    assert.deepEqual(cloneDeep({
      value: 1,
    }), {
      value: 1,
    })
    assert.deepEqual(cloneDeep({
      value: 1,
      functionValue: () => 'abc',
      undefinedValue: undefined,
      undefinedFunction: () => undefined,
    }), {
      value: 1,
      functionValue: 'abc',
    })
  })
  it('should clone nested objects', () => {
    assert.deepEqual(cloneDeep({
      value: 1,
      functionValue: () => 'abc',
      undefinedValue: undefined,
      undefinedFunction: () => undefined,
      nested: {
        value: 'hello',
        undefinedValue: undefined,
        undefinedFunction: () => undefined,
      },
    }), {
      value: 1,
      functionValue: 'abc',
      nested: {
        value: 'hello',
      },
    })
  })
})
