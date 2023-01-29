import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  return (
  <div>

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



    <Form className="main">
      <div className="sub">
        <div className="Login">
          <span className="font">
            Sign Up
          </span>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <span className="font">
          <Form.Label>Username:</Form.Label>
          </span>
          <div className="box">
          <Form.Control type="email" placeholder="username" className="box"/>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <span className="font">
          <Form.Label>Password:</Form.Label>
          </span>
          <div className="box">
          <Form.Control type="password" placeholder="password" className="box"/>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <span className="font">
          <Form.Label>Confim Password:</Form.Label>
          </span>
          <div className="box">
          <Form.Control type="password" placeholder="confirm password" className="box"/>
          </div>
        </Form.Group>

        <div className="Button">
        <Button variant="primary" type="submit">
          Sign up
        </Button>
        </div>

      </div>
    </Form>



      </div>
  );
}

export default App;
