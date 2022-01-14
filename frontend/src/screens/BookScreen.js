import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { listBookDetails } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const BookScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const bookDetails = useSelector(state=>state.bookDetails)
  const { loading, error, book } = bookDetails 
  
  useEffect(() => {
    dispatch(listBookDetails(match.params.id))
  }, [dispatch, match])
  
  const addToWishlistHandler = () => {
    history.push(`/cart/${match.params.id}`)
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
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
      }
    </>
  )
}

export default BookScreen
