import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import {Row, Col, ListGroup, ListGroupItem, Image, Button} from 'react-bootstrap'
import Message from '../components/Message'
// import ScrollToTop from "react-scroll-to-top";
import { Link } from 'react-router-dom'

const CartScreen = ({match}) => {

  const bookId = match.params.id

  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  
  useEffect(() => {
    if (bookId)
    {
      dispatch(addToCart(bookId))
    }
    
  }, [dispatch, match, bookId])

  const removeFormCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Wish List</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your Wish list is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroupItem key ={item.book}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.coverImg} alt={item.title} fluid rounded/>
                    </Col>
                    <Col md={4}>
                      <Link to={`/book/${item.book}`} >{item.title} </Link>
                    </Col>
                    <Col md={6}>
                      Author: {item.author}
                    </Col>
                    <Col md={1}>
                      <Button type='button' variant='danger' onClick={()=> removeFormCartHandler(item.book)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
           </ListGroup> 
        )}
      </Col>
    </Row>
  )
}

export default CartScreen
 