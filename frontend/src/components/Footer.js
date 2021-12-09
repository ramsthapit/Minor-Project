import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container absolute>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Book Finder
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
