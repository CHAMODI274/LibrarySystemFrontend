import React from 'react'
import './Home.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Icon1 from '../assets/Icon1.png'
import Icon2 from '../assets/Icon2.png'
import Icon3 from '../assets/Icon3.png'

export default function Home() {
  return (
    <>
    <section className='home'>
        <h1>Manage Your Library With Ease</h1>
        <p>Efficient tools for organizing resources and handling daily library tasks.</p>

        {/* Cards Section */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={Icon1} />
              <Card.Body>
                <Card.Title>Catalog Management</Card.Title>
                <Card.Text>
                  Add, update, and organize books, periodicals, and other resources in the library collection.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={Icon2} />
              <Card.Body>
                <Card.Title>Member & Loan Tracking</Card.Title>
                <Card.Text>
                  Track member records, borrowed books, due dates, and overdue returns.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={Icon3} />
              <Card.Body>
                <Card.Title>Administrative Tools</Card.Title>
                <Card.Text>
                  Manage staff accounts, generate reports, and oversee all library operations efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </section>


    </> 
    // The <>...</> syntax is a React Fragment — it lets you return multiple elements without adding an extra <div> wrapper.
  )
}
