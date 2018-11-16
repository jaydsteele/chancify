/**
 * A sample descriptor that returns an email string rather than an object.
 */
function sampleUser1(chance) {
  return () => chance.email({ domain: 'example.com' })
}

module.exports = sampleUser1
