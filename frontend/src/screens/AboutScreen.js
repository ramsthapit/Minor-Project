import React from 'react'
import { Card, Col, Row, Button, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const AboutScreen = () => {
  return (
  <>

  
  <div className='kitaab-section'>
    <Navbar bg = 'dark' margin='left'>
      <Row className='m-1'>  
        <Col sm={12} md={6} lg={7} xl={7}>
          <h1> About Kitaab </h1>
          <h2>A new way to choose where the reader is in control</h2>
          <p> Searching book sites usually means keying in an author’s name or a book title. But if you know the name already, your search is likely to turn up books you’ve already heard about. No surprises there.</p>
          <p>How about if you didn’t need an author name at all? If you could start with what you as a reader are looking for right now? You can get similar books you have read on. Do you want a book that’s easy going or more of a challenge to get your teeth into?</p>
        </Col>
        <Col sm={12} md={6} lg={5} xl={5}>
          <Card className='my-3 rounded' >
            <Card.Img src='../images/books.jpg' variant='top' width="250" height="325"  />
          </Card>
        </Col>
      </Row>
    </Navbar>
  </div>
        
  <div className="my-3">
    <h1> Our Teams </h1>
        <Row>

          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 rounded'>
              <Card.Img variant="top" src="../images/Jaya.jpeg" width="193" height="450"/>
              <Card.Body>
                <Card.Title>Jaya Shrestha</Card.Title>
                <Card.Text>
                  <b>Member</b><br/>
                  <Link>jayastha243@gmail.com</Link>
                </Card.Text>
                
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </Col>


          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 rounded">
              <Card.Img variant="top" src="../images/Monika.jpeg" width="193" height="450"/>
              <Card.Body>
                <Card.Title>Monika Gautam</Card.Title>
                <Card.Text>
                  <b>Member</b><br/>
                  <Link>gautammonika489@gmail.com</Link>
                </Card.Text>
                
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </Col>


          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 rounded'>
              <Card.Img variant="top" src="../images/Ram.jpeg" width="193" height="450"/>
              <Card.Body>
                <Card.Title>Ram Sthapit</Card.Title>
                <Card.Text>
                  <b>Member</b><br/>
                  <Link>ramsthapit50@gmail.com</Link>
                </Card.Text>
                
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </Col>

          
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 rounded'>
              <Card.Img variant="top" src="../images/Shreejana.jpeg" width="193" height="450" />
              <Card.Body>
                <Card.Title>Shreejana B.C.</Card.Title>
                <Card.Text>
                  <b>Member</b><br/>
                  <Link>seerubc1999@gmail.com</Link>
                </Card.Text>
                
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </Col>


    </Row>
  </div>

  <div className='Rating-section'>
    <Navbar bg= "primary" >
      <Row className='m-1'>
        <Col sm={12} md={6} lg={6} xl={5}>
          <Card className='my-3 rounded' >
            <Card.Img src='../images/bg.jpg' variant='top' width="250" height="325"  />
          </Card>
        </Col>
            
        <Col sm={12} md={6} lg={6} xl={7}>
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