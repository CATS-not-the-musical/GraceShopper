//const cors = require('cors') //middleware
const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51ISqVbEIZ6XqI4oD93Tw6LZ5Bd98wOlnmv60mlttXLhOG5OmPlpV73HyNncWbO25tNWEiUPzQhHA3uix5kIoTIAn005MzaRMKn'
)
const uuid = require('uuid/v4') //

router.post('/', async (req, res, next) => {
  console.log('Request:', req.body)
  let error
  let status
  try {
    const {items, token} = req.body
    //create a new user with the stripe api
    //token info given by token in stripecheckout component
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotencyKey = uuid() //makes sure users arent charged twice
    const charge = await stripe.charges.create(
      {
        amount: items.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${items.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    )
    console.log('Charge:', {charge})
    status = 'success'
  } catch (err) {
    console.log('Error:', err)
    status = 'failure'
  }
  res.json({error, status})
})
module.exports = router
