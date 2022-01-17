import {BOOK_CREATE_REVIEW_FAIL, BOOK_CREATE_REVIEW_REQUEST, BOOK_CREATE_REVIEW_RESET, BOOK_CREATE_REVIEW_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS} from '../constants/bookContants'

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type){
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state
  }
}

export const bookDetailsReducer = (state = { book: {reviews:[]} }, action) => {
  switch (action.type){
    case BOOK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state
  }
}

export const bookReviewCreateReducer = (state = {}, action) => {
  switch (action.type){
    case BOOK_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case BOOK_CREATE_REVIEW_SUCCESS:
      return { loading: false, success:true };
    case BOOK_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
