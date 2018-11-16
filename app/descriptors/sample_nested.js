/**
 * A sample descriptor that returns a more complex nested object template.
 */
module.exports = function sampleNested(chance) {
  return {
    id: () => chance.guid(),
    model: () => chance.word(),
    codename: () => chance.animal(),
    url: () => chance.url(),
    details: {
      country: () => chance.country(),
      shortDescription: () => chance.sentence(),
      description: () => chance.paragraph(),
    },
  }
}
