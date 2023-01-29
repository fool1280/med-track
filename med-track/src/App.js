import "./App.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import ToggleButton from 'react-bootstrap/ToggleButton';


function ModalForPill() {
    const [show, setShow] = useState(false);
    const [querySearch, setQuerySearch] = useState("");
    const [updated, setUpdated] = useState(querySearch);
    const [listAllDrugs, setListAllDrugs] = useState([]);

    const handleClose = () => {
        setShow(false);
        setQuerySearch("");
        setUpdated("");
    };
    const handleShow = () => setShow(true);
    const handleChange = (event) => {
        setQuerySearch(event.target.value);
    };
    const handleClick = () => {
        setUpdated(querySearch);
    };

    const fetchData = useCallback(async () => {
        const data = await fetch(
            "http://127.0.0.1:8000/search-a-medicine?query=" + updated
        );
        const json = await data.json();
        setListAllDrugs(json);

        console.log("Query: ", updated);
    }, [updated]);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Search
            </Button>

            <Modal className="modal-xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>List of common mediciations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type={"text"}
                        defaultValue=""
                        onChange={handleChange}
                        placeholder={"Symptoms, name, etc..."}
                    />
                    <button onClick={handleClick}>Search</button>
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
                            {listAllDrugs.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td
                                            style={{
                                                wordBreak: "keep-all",
                                            }}
                                        >
                                            {listAllDrugs[index]["name"]}
                                        </td>
                                        <td
                                            style={{
                                                wordBreak: "keep-all",
                                            }}
                                        >
                                            {listAllDrugs[index]["desc"]}
                                        </td>
                                        <td
                                            style={{
                                                wordBreak: "keep-all",
                                                minWidth: 120,
                                            }}
                                        >
                                            {listAllDrugs[index]["max_per_day"]}
                                        </td>
                                        <td
                                            style={{
                                                wordBreak: "keep-all",
                                            }}
                                        >
                                            {listAllDrugs[index][
                                                "symptoms"
                                            ].join(", ")}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ModalForSchedule() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [checkArray, setCheckArray] = useState([])
    const [data, setData] = useState([{'name': 'asdf;lkj', 'num': 4}, {'name': 'fdf', 'num':1}]);
    
    const medTime=[];
    for (let i = 0; i < data.length; i++) {
        let n = data[i]['num'];
        if (n === 1) {
            medTime.push({"name": data[i]["name"], "time": 12});
        }
        else {
            for (let j = 0;j < n; j++) {
                medTime.push({"name": data[i]["name"], "time": Math.round(8 + 14 / (n - 1) * j)})
            }
        }
    }

    medTime.sort((a, b) => a["time"] - b["time"]);
    // useEffect(() => {
        
    // }, [checkArray])

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          My Schedule
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>My Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Time</th>
                            {/* <th>Done</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {medTime.map((item, index) => {
                            return (
                                <tr>
                                    <th>{index+1}</th>
                                    <th>{item['name']}</th>
                                    <th>{item['time']+":00"}</th>
                                    {/* <th>
                                    <ToggleButton
                                        className="mb-2"
                                        id="toggle-check"
                                        type="checkbox"
                                        variant="outline-primary"
                                        checked={checkArray[index]}
                                        value="1"
                                        onClick={() =>{
                                            let temp = checkArray;
                                            temp[index] = true;
                                            setCheckArray(temp);
                                        }}
                                        >
                                        Checked
                                    </ToggleButton>
                                    </th> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}

function App() {
    return (
        <div className="page">
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
            <div className="mid">
                <div className="left">
                    <div className="title">Med Tracker</div>
                    <div className="description">
                        The fastest way to recovery
                    </div>
                </div>
                <div className="longDescription">
                    <div className="form">
                        <Card style={{ width: "30rem" }}>
                            <Card.Body>
                                <Card.Title>Scheduling</Card.Title>
                                <Card.Text>
                                    Say goodbye to forgotten pills and hello to
                                    a fun and healthy life with our app! Our
                                    reminders and rewards system will turn you
                                    into a medication-taking pro in no time.
                                    Sign up now and let the good times roll
                                    (while feeling great, of course!)
                                </Card.Text>
                                {localStorage.getItem("email") === null ? "" : <ModalForSchedule/>}
                                
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="form">
                        <Card style={{ width: "30rem" }}>
                            <Card.Body>
                                <Card.Title>Pill Suggestion</Card.Title>
                                <Card.Text>
                                    Feeling sick? Let our app be your personal
                                    pharmacist! Search your symptoms, find the
                                    perfect meds and get better in no time!
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
