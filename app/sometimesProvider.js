/**
 * A convenience function that creates a function for a particular chance instance.
 * This generated function will give you either the provided value or undefined
 * at the supplied probability ratio.
 * For example, calling it multiple times will yield the following:
 * const sometimes = sometimesProvider(someChanceObject)
 * sometimes(25, 'hello') ==> undefined
 * sometimes(25, 'hello') ==> undefined
 * sometimes(25, 'hello') ==> 'hello'
 * sometimes(25, 'hello') ==> undefined
 * @param {*} chance the chance object to generate random values from
 * @returns the sometimes function that performs the random selection
 */
const sometimesProvider = chance => (likelihood, value) => {
  if (chance.bool({ likelihood })) {
    return value
  }
  return undefined
}

module.exports = sometimesProvider
