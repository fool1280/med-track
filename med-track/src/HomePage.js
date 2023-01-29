import './HomePage.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
function BasicExample() {
  return (
    <div class="page">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container style={{paddingLeft: 10, paddingRight: 10, margin: 0, maxWidth: 2000}}>
          <Navbar.Brand href="#home">Med Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Home</Nav.Link>
              <Nav.Link href="#pricing">Schedule</Nav.Link>
              <Nav.Link href="#bruh">Pill Finder</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Login</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div class="mid">
        <div class="left">
          <div class="title">Med Tracker</div>
          <div class="description">The fastest way to recovery</div>
        </div>
        <div class="longDescription">
          <div class="form">
            <Card style={{ width: '30rem' }}>
              <Card.Body>
                <Card.Title>Scheduling</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Do you ever forget to take your medication? Our app will track all the medicine you need to take and remind you throughout the day. Feel the satisfaction of doing the right thing, while getting better one pill at a time. Make an account now to get started.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>

          <div class="form">
            <Card style={{ width: '30rem' }}>
              <Card.Body>
                <Card.Title>Pill Suggestion</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Feeling sick and don't know what medication to take? Simply conduct a search with any of your symptoms and get everything you need to know for a speedy recovery. Our database contains a large variety of medications with their pros and cons as well as maximum dosages of each.
                </Card.Text>
                <Card.Link href="#"></Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicExample;