function probability(chance, value, trueValue, falseValue) {
  if (chance.bool({ likelihood: value })) {
    return trueValue
  }
  return falseValue || null
}

function sampleUser1(chance) {
  return {
    id: () => chance.guid(),
    firstName: () => chance.first(),
    lastName: () => chance.last(),
    birthday: () => chance.birthday({ string: true }),
    about: () => probability(chance, 35, chance.paragraph({ sentences: 1 })),
    ssn: () => chance.ssn({ dashes: true }),
    email: () => chance.email({ domain: 'example.com' }),
    avatar: () => probability(chance, 45, chance.avatar({ protocol: 'https' })),
    twitter: () => probability(chance, 15, chance.twitter()),
    address: () => chance.address(),
  }
}

module.exports = sampleUser1
