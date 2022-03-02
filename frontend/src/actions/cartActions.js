import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (id) => async(dispatch, getState) => {
  const { data } = await axios.get(`/api/books/${id}`)
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      book: data._id,
      title: data.title,
      coverImg: data.coverImg,
      author: data.author,
      country: data.country,
      year: data.publishDate,
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) =>{
  dispatch({
    type: CART_REMOVE_ITEM,
    payload:id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}