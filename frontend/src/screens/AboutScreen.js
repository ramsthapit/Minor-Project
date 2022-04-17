import React from 'react'
import { Card, Col, Row, Button, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const AboutScreen = () => {
  return (
  <>

  
  <div className='kitaab-section'>
    <Navbar bg = 'dark' margin='left'>
      <Row>  
        <Col>
          <h1> About Kitaab </h1>
          <h2>A new way to choose where the reader is in control</h2>
          <p> Searching book sites usually means keying in an author’s name or a book title. But if you know the name already, your search is likely to turn up books you’ve already heard about. No surprises there.</p>
          <p>How about if you didn’t need an author name at all? If you could start with what you as a reader are looking for right now? You can get similar books you have read on. Do you want a book that’s easy going or more of a challenge to get your teeth into?</p>
        </Col>
        <Col>
          <Card className='my-3 rounded' >
            <Card.Img src='../images/books.jpg' variant='top' width="250" height="325"  />
          </Card>
        </Col>
      </Row>
    </Navbar>
  </div>
        
  <div>
    <h1> Our Teams </h1>
        <Row>
      <Col sm={12} md={10} lg={5} xl={3}>
        <Card className='my-3 rounded' >
          <Card.Img src='../images/Monika.jpg' variant='top' width="200" height="325"  />
          <h2>  Monika Gautam </h2>
          <Card.Title as='div'><strong> Member</strong></Card.Title>    
          <Link>gautammonika489@gmail.com</Link>
          <br/>
          <p> <Button type ='btn'> Contact </Button></p>
        </Card>
      </Col>

      <Col sm={12} md={10} lg={5} xl={3}>
        <Card className='my-3 rounded' >
          <Card.Img src='../images/Jaya.jpg' variant='top'  width="200" height="325" />
          <h2>  Jaya Shrestha </h2>
          <Card.Title as='div'><strong>  Member  </strong></Card.Title>  
          <Link>  jayastha243@gmail.com</Link>
          <br/>
          <p> <Button type ='btn'> Contact </Button></p>
        </Card>
      </Col>
          
      <Col sm={12} md={10} lg={5} xl={3}>
  <Card className='my-3 rounded' >
      
            <Card.Img src='../images/Shreejana.jpg' variant='top' width="200" height="325" />
      
      
      <h2>  Shreejana B.C. </h2>
            <Card.Title as='div'><strong>  Member</strong>
            </Card.Title>
            
            <Link>  seerubc1999@gmail.com</Link>
            <br/>
          <p> <Button type ='btn'> Contact </Button></p>
          </Card>
      
      </Col>

      <Col sm={12} md={10} lg={5} xl={3}>
  <Card className='my-3 rounded' >
      
            <Card.Img src='../images/Ram.jpg' variant='top' width="200" height="325" />
      
      
      <h2>  Ram Sthapit </h2>
            <Card.Title as='div'><strong> Member </strong>
            </Card.Title>
            
            <Link>ramsthapit50@gmail.com</Link>
            <br/>
          <p> <Button type='btn'> Contact </Button></p>
          </Card>
      
      </Col>

    </Row>
  </div>

  <div className='Rating-section'>
    <Navbar bg= "primary" >
      <Row>
        <Col>
          <Card className='my-3 rounded' >
            <Card.Img src='../images/bg.jpg' variant='top' width="250" height="325"  />
          </Card>
        </Col>
            
        <Col>
          <h2> Ratings & Reviews </h2>
          <p> Users can give the ratings on the books they read and also can give reviews on the comment section and based on the ratings we recommend top rated books to our new users.</p>
        </Col>
      </Row>
    </Navbar> 
      
  </div>


</>
  
  )
}

export default AboutScreen