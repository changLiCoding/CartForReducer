import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {cart: [], loading: false, total: 0, amount: 0};

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems);

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }  
  const addMoreinCart = (id) => {
    dispatch({type: 'ADD_MORE_ITEM', payload: id})
  }
  const decreaseLessinCart = (id) => {
    dispatch({type: 'DECREASE_LESS_ITEM', payload: id})
  }
  const removeFromCart = (id) => {
    dispatch({type: 'REMOVE_FROM_CART', payload: id});
  }

  const fetchData = async () => {
    dispatch({type: 'FETCH_LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'FETCHED_DATA', payload: cart})

    return cart;
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    dispatch({type: 'TOTAL_AND_AMOUNT'})

  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeFromCart,
        addMoreinCart,
        decreaseLessinCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
