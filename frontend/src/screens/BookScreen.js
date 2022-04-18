import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { createBookReview, listBookDetails, listBookRecommend } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ScrollToTop from "react-scroll-to-top";
import { BOOK_CREATE_REVIEW_RESET } from '../constants/bookContants'
import Ratings from '../components/Ratings'
import ReadMore from '../components/ReadMore'


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

  const bookRecommend = useSelector(state=>state.bookRecommend)
  const { loading:loadingRecommend, error:errorRecommend, books } = bookRecommend 

  useEffect(() => {

    if (successBookReview)
    {
      setRating(0)
      setComment('')
      dispatch({type:BOOK_CREATE_REVIEW_RESET})
    }
    dispatch(listBookDetails(match.params.id))
    dispatch(listBookRecommend(match.params.id))
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
              <Image src={book.coverImg} alt={book.title} fluid />
              { <Ratings 
             
             value={book.rating} 
             text={`${book.numRatings} reviews`} 
             color='#d52a7a'
             
         /> }
            </Col>
            <Col md={6}>
              <ListGroup varient='flush'>
              <ListGroup.Item>
              <h1>{book.title}</h1>
                  <b> Author: </b>{book.author}<br/>
                  <b> isbn: </b> {book.isbn}<br/>
                  <b> Genres: </b> {book.genres}<br/>
                
                  <b> Language: </b> {book.language}<br/>
                
                  <b> Publisher: </b> {book.publisher}<br/>
               
                  <b> BookForm: </b> {book.bookForm}<br/>
              
                  <b> Pages: </b> {book.pages}<br/>
                
                  <b> Series: </b> {book.series}<br/>
                  <br/>
              
                  <b> Description: </b> {(book.description !== undefined) && <ReadMore children={book.description}/>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <Button
                  onClick={addToWishlistHandler}
                  className='btn-block'
                  variant="warning"
                  type='button'>
                  Add to Wishlist
                </Button>
              </ListGroup>
              <ListGroup>
                <Button variant="secondary" className='btn-block'
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `https://www.google.com/search?q=${book.title} buy online book`;
                  }}>
                  BUY
                </Button>
              </ListGroup>
               
            </Col>
          </Row>
          <Row>
            <h1>Recommended Books</h1>
            {loadingRecommend ? <Loader /> : errorRecommend ? <Message variant='danger'>{errorRecommend} </Message> :
              (
                books.map(book => (
                  <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                    <Card className='my-3 rounded'>
                      <Link to={`/book/${book._id}`}>
                        <Card.Img src={book.coverImg} varient='top' width="193" height="450" />
                      </Link>
                    </Card>
                  </Col>
                ))
              )} 
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
      <ScrollToTop smooth color="#6f00ff" height='20' width='20'/>
    </>
  )
}

export default BookScreen
