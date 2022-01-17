import axios from 'axios'
import { BOOK_CREATE_REVIEW_FAIL, BOOK_CREATE_REVIEW_REQUEST, BOOK_CREATE_REVIEW_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS } from "../constants/bookContants"

export const listBooks = () => async(dispatch) => {
  try
  {
    dispatch({ type: BOOK_LIST_REQUEST })
    const { data } = await axios.get('/api/books')
    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data
    })
  }
  catch (error)
  {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const listBookDetails = (id) => async(dispatch) => {
  try
  {
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/books/${id}`)
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data
    })
  }
  catch (error)
  {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const createProductReview = (productId, review) => async(dispatch, getState) => {
  try
  {
    dispatch({ type: BOOK_CREATE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      `/api/books/${productId}/reviews/`,
      review,
      config
    )

    dispatch({
      type: BOOK_CREATE_REVIEW_SUCCESS,
      payload: data
    })
  }
  catch (error)
  {
    dispatch({
      type: BOOK_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}