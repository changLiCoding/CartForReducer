import data from './data'

const reducer = (state, action) => {
  if(action.type === 'CLEAR_CART') {
    return {...state, cart: []}
  } 
  if(action.type === 'REMOVE_FROM_CART') {
    const newCartItem = data.filter((item) => item.id !== action.payload)
    return {...state, cart: newCartItem}
  } 
  if (action.type === 'ADD_MORE_ITEM') {
    let newAddedCartItems = state.cart.map((cartItem) => {
      if(cartItem.id === action.payload) {
        return {...cartItem, amount: cartItem.amount +1}
      }
        return cartItem;
    })
    return {...state, cart: newAddedCartItems};
  } 
  if (action.type === 'DECREASE_LESS_ITEM') {
    let newDecreasedCartItems = state.cart.map((cartItem) => {
      if(cartItem.id === action.payload) {
        return {...cartItem, amount: cartItem.amount - 1}
      } 
        return cartItem;
    }).filter((cartItem) => cartItem.amount !== 0)
    return {...state, cart: newDecreasedCartItems};
  } 
  if (action.type === 'TOTAL_AND_AMOUNT') {
    // const totalAmount = state.cart.reduce((acc, cartItem) => {
    //   acc = acc + cartItem.amount
    //   return acc
    // },0)
    // console.log(totalAmount);
    // const totalCost = state.cart.reduce((acc, cartItem) => {
    //   const {price, amount} = cartItem;
    //   const singleItemCost = amount * price;
    //   acc = acc + singleItemCost;
    //   acc = parseFloat(acc.toFixed(2));
    //   return acc;
    // }, 0)
    // console.log(totalCost);

    let {total, amount} = state.cart.reduce((acc, cartItem) => {
      const {price, amount} = cartItem;
      acc.amount = acc.amount + amount;
      const singleCartCost = price * amount;
      acc.total = acc.total + singleCartCost;
      return acc
    }, {total: 0, amount: 0})
    total = parseFloat(total.toFixed(2));
    return {...state, total, amount}
  } 

  if(action.type === 'FETCHED_DATA') {
    return {...state,loading: false, cart: action.payload}
  } 
  
  if(action.type === 'FETCH_LOADING') {
    return {...state, loading: true}
  }
  
  throw new Error ('No Matching Value')
}

export default reducer