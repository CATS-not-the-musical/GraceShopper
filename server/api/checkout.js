const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51ISqVbEIZ6XqI4oD93Tw6LZ5Bd98wOlnmv60mlttXLhOG5OmPlpV73HyNncWbO25tNWEiUPzQhHA3uix5kIoTIAn005MzaRMKn'
)

router.post("/checkout", async(req, res, next)=>{
  console.log("Request:", req.body)
let error;
  let status;


  try {
    const {items, token} = req.body

    const customer = await
    stripe.customers.create({
        email: token.email,
        source: tokem.id
      });

    }

})
