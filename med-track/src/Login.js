import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';


function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function App() {

  // const [initialValues, setInitialValues] = useState({
  //   username:'',
  //   password:''
  // });
  // const [formValues, setFormValues] = useState([]);

  // const submitForm = () => {
  //   console.log(initialValues)
  //   setFormValues((prevFormValues) => [...prevFormValues,initialValues]);
  // };

  // useEffect(() => {
  //   localStorage.setItem("formValues",JSON.stringify(formValues));
  //   console.log(localStorage)
  // }, [formValues]);

  

  return (
  <div>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container style={{paddingLeft: 10, paddingRight: 10, margin: 0, maxWidth: 2000}}>
          <Navbar.Brand href="#home">Med Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Home</Nav.Link>
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
            Login
          </span>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <span className="font">
          <Form.Label>Username:</Form.Label>
          </span>
          <div className="box">

          <Form.Control type="email" placeholder="username" className="box" 
            // value={initialValues.username}
            // onChange={(e) =>
            //   setInitialValues({...initialValues, username: e.target.value})
            //   } 
            />

          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <span className="font">
          <Form.Label>Password:</Form.Label>
          </span>
          <div className="box">

          <Form.Control type="password" placeholder="password" className="box"
          // value={initialValues.password}
          // onChange={(e) =>
          //   setInitialValues({...initialValues, password: e.target.value})
          //   }
           />

          </div>
        </Form.Group>

        <div className="Button">
        <Button variant="primary" type="submit" 
        // onClick={submitForm}
        >
          Login
        </Button>
        </div>
      </div>
    </Form>



      </div>
  );
}



export default App;