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
import Form from "react-bootstrap/Form";

function ModalForPill() {
    const [show, setShow] = useState(false);
    const [querySearch, setQuerySearch] = useState("");
    const [updated, setUpdated] = useState(querySearch);
    const [listAllDrugs, setListAllDrugs] = useState([]);
    const [data, setData] = useState([]);
    const username = "admin@gmail.com";

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
    const handleUpdateForm = (medicine_name, key, value) => {
        let newData = data;
        if (medicine_name in newData === false) {
            newData[medicine_name] = [0, 0]; // [stopped_date, times_of_day]
        }
        console.log("Medicine name:", medicine_name);
        console.log("Key:", key);
        console.log("Value:", value);
        if (key === "stopped_date") {
            newData[medicine_name][0] = Date.parse(value);
        }
        if (key === "times_of_day") {
            newData[medicine_name][1] = value;
        }
        setData(newData);
    };

    const handleCloseAndSubmit = () => {
        handleClose();
        for (let key in data) {
            if (data[key][1] === 0 || data[key][0] === 0) {
                continue;
            }
            let record = {
                username: username,
                medicine: key,
                times_of_day: data[key][1],
                stopped_date: data[key][0],
            };
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ record }),
            };
            fetch("http://127.0.0.1:8000/add-medicine", requestOptions).then(
                (response) => console.log(response)
            );
        }
        setData([]);
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
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td
                                            style={{
                                                wordBreak: "keep-all",
                                            }}
                                        >
                                            <Form>
                                                <span>
                                                    {
                                                        listAllDrugs[index][
                                                            "name"
                                                        ]
                                                    }
                                                </span>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Amount per day"
                                                        max={
                                                            listAllDrugs[index][
                                                                "max_per_day"
                                                            ]
                                                        }
                                                        step="1"
                                                        min="0"
                                                        onChange={(e) =>
                                                            handleUpdateForm(
                                                                listAllDrugs[
                                                                    index
                                                                ]["name"],
                                                                "times_of_day",
                                                                e.target
                                                                    .valueAsNumber
                                                            )
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <span>
                                                        Select finish date:
                                                    </span>
                                                    <Form.Control
                                                        type="date"
                                                        min={new Date()
                                                            .toISOString()
                                                            .slice(0, 10)}
                                                        onChange={(e) =>
                                                            handleUpdateForm(
                                                                listAllDrugs[
                                                                    index
                                                                ]["name"],
                                                                "stopped_date",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Form.Group>
                                            </Form>
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
                    <Button variant="primary" onClick={handleCloseAndSubmit}>
                        Submit
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

function SigninForm() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onChange={(event) => {
            console.log(1);     
        }}> 
          Submit
        </Button>
      </Form>
    );
}
function SignupForm() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBa  sicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
                        value="this.value.val"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
  
function Login() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SigninForm/>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  function Signup() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Signup
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignupForm/>
          </Modal.Body>
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
                            <Login/>
                            <Signup/>
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
