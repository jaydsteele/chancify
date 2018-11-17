const sometimesProvider = require('../sometimesProvider')

/**
 * A sample descriptor that returns a typical user object.
 * This descriptor also shows how to conditionally return some parts of the object.
 */
function sampleUser(chance) {
  const sometimes = sometimesProvider(chance)
  return {
    id: () => chance.guid(),
    firstName: () => chance.first(),
    lastName: () => chance.last(),
    birthday: () => chance.birthday({ string: true }),
    about: () => sometimes(35, chance.paragraph({ sentences: 1 })),
    ssn: () => chance.ssn({ dashes: true }),
    email: () => chance.email({ domain: 'example.com' }),
    avatar: () => sometimes(5, chance.avatar({ protocol: 'https' })),
    twitter: () => sometimes(15, chance.twitter()),
    address: () => chance.address(),
  }
}

module.exports = sampleUser
