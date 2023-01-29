import "./App.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';


function ListDrugs() {
    const a = [{"name":"ethan", "description": "dumba", "maxPerDay": 0, "symptoms": "kkk"},
    {"name":"ethasdflkja;sdlkfja;sldfj;alskdfj;al;dfalksjdf;klj;kj;fk;ajsdlkfja;lksdfjlk;asdjflk;asjdf;lkajsdf;lkajsdflk;asdf;lkj;lkjan", "description": "dumasdfasdfasdffasdj;flkjasdl;fkjalk;sdfja;lksdfj;laksdjflkajsdf;lkajsd;flkjas;dlfkjalk;sdfj;lkjasdfasdfhflaksdhflkajshdflkjahsdflkhalsdkfhalksdfhb", "maxPerDay": 1, "symptoms": "kkdfa;lskdfj;alksdjf;laksjdf;lkajdf;lkajsdf;lkjads;lfkjal;skdjf;alksdjf;laksjdf;lkajsdf;lkjasd;lfkja;sldkfj;lkj;kjk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkk"},
    {"name":"ethan", "description": "dumb", "maxPerDay": 1, "symptoms": "kkkasdfasdfasdf;jlkj;lkj;lk"},];
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Medication</th>
            <th>Description</th>
            <th>Max per day</th>
            <th>Symptoms</th>
          </tr>
        </thead>
        <tbody>
            {a.map((item, index) => {
                return (<tr>
                    <td>{ index + 1}</td>
                    <td style = {{wordBreak: "break-all"}}>
                        {a[index]["name"]}
                    </td>
                    <td style = {{wordBreak: "break-all"}}>
                        {a[index]["description"]}
                    </td>
                    <td style = {{wordBreak: "break-all", minWidth: 120}}>
                        {a[index]["maxPerDay"]}
                    </td>
                    <td style = {{wordBreak: "break-all"}}>
                        {a[index]["symptoms"]}
                    </td>
                </tr>)
            })}
        </tbody>
      </Table>
    );
  }
  
function ModalForPill() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Search
            </Button>

            <Modal className="modal-xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input/>
                    <ListDrugs/>
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
    return (
        <div class="page">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        margin: 0,
                        maxWidth: 2000,
                    }}
                >
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
            <div class="mid">
                <div class="left">
                    <div class="title">Med Tracker</div>
                    <div class="description">The fastest way to recovery</div>
                </div>
                <div class="longDescription">
                    <div class="form">
                        <Card style={{ width: "30rem" }}>
                            <Card.Body>
                                <Card.Title>Scheduling</Card.Title>
                                <Card.Text>
                                    Do you ever forget to take your medication?
                                    Our app will track all the medicine you need
                                    to take and remind you throughout the day.
                                    Feel the satisfaction of doing the right
                                    thing, while getting better one pill at a
                                    time. Make an account now to get started.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>

                    <div class="form">
                        <Card style={{ width: "30rem" }}>
                            <Card.Body>
                                <Card.Title>Pill Suggestion</Card.Title>
                                <Card.Text>
                                    Feeling sick and don't know what medication
                                    to take? Simply conduct a search with any of
                                    your symptoms and get everything you need to
                                    know for a speedy recovery. Our database
                                    contains a large variety of medications with
                                    their pros and cons as well as maximum
                                    dosages of each.
                                </Card.Text>
                                <ModalForPill />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
