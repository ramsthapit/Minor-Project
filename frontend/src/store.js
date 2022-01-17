import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { bookDetailsReducer, bookListReducer, bookReviewCreateReducer } from './reducers/bookReducers'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducer'

const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookReviewCreate: bookReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')): []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
