import {toast} from 'react-toastify'

export function addToGuestCart(currCatId, cat) {
  //add to guest cart
  const guestCart = window.localStorage
  //if guestCart has nothing in it just add the object plus the quantity
  if (guestCart.length === 0) {
    //add the stringified cat to localStorage
    const guestCartCats = JSON.stringify([cat])
    guestCart.setItem('cart', guestCartCats)
    toast.info(`${cat.firstName} ${cat.lastName} added to guest cardboard box!`)
  } else {
    //if guestcart already has something in it, get the localstorage data
    //deconstruct the data and insert the new cat then add it back to localstorage
    let guestCartCats = guestCart.getItem('cart')
    let guestCartCatsArr = JSON.parse(guestCartCats)
    //check to see if cat is already in the cart. Only add the cat if
    //it is not in the cart.
    console.log('carts array from localStorage', guestCartCatsArr)
    let catDetected = false
    for (let i = 0; i < guestCartCatsArr.length; i++) {
      console.log('forloop check', guestCartCatsArr[i])
      if (currCatId === guestCartCatsArr[i].id) {
        catDetected = true
        break
      }
    }
    //if the cat is not already in the guest cart, add it
    if (!catDetected) {
      guestCartCatsArr = [...guestCartCatsArr, cat]
      console.log('post add cat arr', guestCartCatsArr)
      guestCart.setItem('cart', JSON.stringify(guestCartCatsArr))
      toast.info(
        `${cat.firstName} ${cat.lastName} added to guest cardboard box!`
      )
    } else {
      //helpful message if Cat is already in the cart
      toast.info(
        `${cat.firstName} ${cat.lastName} is already in guest cardboard box!`,
        {autoClose: 3000}
      )
    }
  }
}

export function guestCartIncrease(catId, quantity) {
  const guestCart = window.localStorage
  let catsArr = JSON.parse(guestCart.getItem('cart'))
  //increase the quantity of the corresponding cat object
  catsArr[catId - 1].productOrder.quantity = quantity + 1
  guestCart.setItem('cart', JSON.stringify(catsArr))
  return catsArr
}

export function guestCartDecrease(catId, quantity) {
  const guestCart = window.localStorage
  let catsArr = JSON.parse(guestCart.getItem('cart'))
  //decrease the quantity of the corresponding cat object
  if (quantity > 1) {
    catsArr[catId - 1].productOrder.quantity = quantity - 1
    guestCart.setItem('cart', JSON.stringify(catsArr))
    return catsArr
  }
}

export function guestCartRemove(catId) {
  const guestCart = window.localStorage
  let catsArr = JSON.parse(guestCart.getItem('cart'))
  //remove the cat from the array
  catsArr.splice(catId - 1, 1)
  guestCart.setItem('cart', JSON.stringify(catsArr))
  return catsArr
}
