import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { createBookReview, listBookDetails } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { BOOK_CREATE_REVIEW_RESET } from '../constants/bookContants'


const BookScreen = ({ match, history }) => {
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const bookDetails = useSelector(state=>state.bookDetails)
  const { loading, error, book } = bookDetails 
  
  const userLogin = useSelector(state=>state.userLogin)
  const { userInfo } = userLogin 
  
  const bookReviewCreate = useSelector(state=>state.bookReviewCreate)
  const {
    loading: loadingBookReview,
    error: errorBookReview,
    success: successBookReview,
  } = bookReviewCreate 

  useEffect(() => {

    if (successBookReview)
    {
      setRating(0)
      setComment('')
      dispatch({type:BOOK_CREATE_REVIEW_RESET})
    }
    dispatch(listBookDetails(match.params.id))
  }, [dispatch, match, successBookReview])
  
  const addToWishlistHandler = () => {
    history.push(`/cart/${match.params.id}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createBookReview(
      match.params.id, {
        rating,
        comment
      }
    ))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
        <div>
          <Row>
            <Col md={3} >
              <Image src={book.image} alt={book.title} fluid/>
            </Col>
            <Col md={6}>
              <ListGroup varient='flush'>
                <ListGroup.Item>
                  <h1>{book.title}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  Author: {book.author}
                </ListGroup.Item>
                <ListGroup.Item>
                  Country: {book.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  Language: {book.language}
                </ListGroup.Item>
                <ListGroup.Item>
                  Year: {book.year}
                </ListGroup.Item>
                <ListGroup.Item>
                  Pages: {book.page}
                </ListGroup.Item>
                <ListGroupItem>
                  Description:<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <Button
                  onClick={addToWishlistHandler}
                  className='btn-block'
                  variant="light"
                  type='button'>
                  Add to Wishlist
                </Button>
                <Button variant="warning" className='btn-block'>BUY</Button>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1>Reviews</h1>
              {book.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

              <ListGroup>
                {book.reviews.map((review)=>(
                  <ListGroupItem key={review._id}>
                    <h2><strong>{review.name}</strong></h2>
                    <p>Rating: {review.rating}</p> 
                    <p>{review.createdAt.substring(0, 10)} </p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <ListGroup>
                <ListGroupItem>
                  <h4>Write a review</h4>
                  {loadingBookReview && <Loader />}
                  {successBookReview && <Message variant='success'>Review Submited</Message>}
                  {errorBookReview && <Message variant='danger'>{errorBookReview}</Message>}
                  
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label><br/>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e)=> setRating(e.target.value)}
                        >
                          <option value='' id='option'>Select...</option>
                          <option value='1' id='option'>1 - Poor</option>
                          <option value='2' id='option'>2 - Fair</option>
                          <option value='3' id='option'>3 - Good</option>
                          <option value='4' id='option'>4 - Very Good</option>
                          <option value='5' id='option'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='5'
                          value={comment}
                          onChange={(e)=> setComment(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingBookReview}
                        type='submit'
                        variant='primary'
                      >
                        SUBMIT
                      </Button>
                    </Form>
                  ) : (
                     <Message variant='info'>Please <Link to='/login'>Login</Link> </Message> 
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
        
      }
    </>
  )
}

export default BookScreen
