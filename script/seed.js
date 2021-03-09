'use strict'

const {db} = require('../server/db')
const {User} = require('../server/db')
const {Cat} = require('../server/db')
const ProductOrder = require('../server/db/models/productOrder')
const Order = require('../server/db/models/order')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //CREATE admin account
  await Promise.all([
    User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: `Admin@email.com`,
      password: 'SecretPassword',
      image: `/images/${Math.floor(Math.random() * 65)}.jpg`,
      role: 'admin'
    })
  ])

  const usersToCreate = 100
  //for loop to create users
  for (let i = 0; i < usersToCreate; i++) {
    await Promise.all([
      User.create({
        firstName: `Paulo${i}`,
        lastName: `Smith${usersToCreate - i}`,
        email: `cody${i}@email.com`,
        password: '123',
        image: `/images/${Math.floor(Math.random() * 65)}.jpg`,
        role: 'user'
      })
    ])
  }
  const catBreeds = [
    'Persian',
    'Maine Coon',
    'Bengal',
    'Bombay',
    'British Shorthair',
    'Siamese',
    'Sphynx',
    'Scottish Fold',
    'Savannah',
    'Russian Blue',
    'Himalayan',
    'Caracat',
    'Abyssinian',
    'Devon Rex'
  ]

  const catFirstNames = [
    'Rose',
    'Tulip',
    'Pansy',
    'Lily',
    'Lavender',
    'Dandelion',
    'Daisy',
    'Iris',
    'Buttercup',
    'Violet',
    'Poppy',
    'Camellia',
    'Petunia',
    'Aster',
    'Dahlia',
    'Jasmine'
  ]
  const catLastNames = [
    'Flower',
    'Fern',
    'Holly',
    'Jude',
    'Maple',
    'Ash',
    'Mulberry',
    'Magnolia',
    'Basil',
    'Rosemary',
    'Sage',
    'Peppermint',
    'Thyme',
    'Lavender',
    'Ivy',
    'Willow'
  ]

  //for loop to create cats
  const catsToCreate = 100
  for (let i = 0; i < catsToCreate; i++) {
    await Promise.all([
      Cat.create({
        breed: catBreeds[Math.floor(Math.random() * 13)],
        firstName: catFirstNames[Math.floor(Math.random() * 15)],
        lastName: catLastNames[Math.floor(Math.random() * 15)],
        adoptionStatus: 'available',
        adoptionFee: Math.floor(Math.random() * 10) + 30,
        age: Math.floor(Math.random() * 10),
        image: `/images/S${Math.floor(Math.random() * 39)}.jpg`
      })
    ])
  }
  console.log('create Order')
  const orderToCreate = 10
  for (let i = 0; i < orderToCreate; i++) {
    await Promise.all([
      Order.create({
        total: 0,
        fulfilledStatus: !(Math.floor(Math.random() * 2) > 0),
        userId: i + 1
      })
    ])
  }
  console.log('create order lines')
  const ProductToCreate = 10
  for (let i = 0; i < ProductToCreate; i++) {
    await Promise.all([
      ProductOrder.create({
        catId: i + 1,
        orderId: 1
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
