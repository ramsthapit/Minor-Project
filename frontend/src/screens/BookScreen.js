import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { listBookDetails } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const BookScreen = ({ match }) => {
  const dispatch = useDispatch()

  const bookDetails = useSelector(state=>state.bookDetails)
  const { loading, error, book } = bookDetails 
  
  useEffect(() => {
    dispatch(listBookDetails(match.params.id))
  }, [dispatch, match])
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
        <Row>
          <Col md={6} >
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
                Pages: {book.pages}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' variant="light" type ='button'>Add to Wishlist</Button>
              </ListGroup.Item>
              <Button variant="warning" size="lg">BUY</Button>
            </ListGroup>
          </Col>
        </Row>
      }
    </>
  )
}

export default BookScreen
