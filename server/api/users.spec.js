/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const {db} = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    //have to add admin role to test api routes
    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: 'somename',
        lastName: 'smith',
        role: 'admin'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)
      expect(res.body).to.be.an('object')
    })
    // it('Get /api/cats', async () => {
    //   const res = await request(app)
    //     .get('api/cats')
    //     .expect(200)
    //   expect(res.body).to.be.an('array')
    // })
    // end describe('User routes')
  })
}) //end describe('/api/users')
