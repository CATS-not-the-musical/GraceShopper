'use strict'

const {db} = require('../server/db')
const {User} = require('../server/db/models')
const {Cats} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const usersToCreate = 100
  //for loop to create users
  for (let i = 0; i < usersToCreate; i++) {
    await Promise.all([
      User.create({
        firstName: 'Yin',
        lastName: 'Daniel',
        email: `cody${i}@email.com`,
        password: '123',
        image: `/images/${Math.floor(Math.random() * 65)}.jpg`
      })
    ])
  }
  //for loop to create products
  const catsToCreate = 100
  for (let i = 0; i < catsToCreate; i++) {
    await Promise.all([
      Cat.create({
        name: `Paulo${i}`,
        category: 'cats',
        description:
          'cat placeholder picture. this product should not be a cat.',
        price: 15.5,
        image: `/images/S${Math.floor(Math.random() * 39)}.jpg`
      })
    ])
  }
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
