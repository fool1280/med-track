import "./App.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function ModalForPill() {
    const [show, setShow] = useState(false);
    const [querySearch, setQuerySearch] = useState("");
    const [updated, setUpdated] = useState(querySearch);
    const [listAllDrugs, setListAllDrugs] = useState([]);
    const [data, setData] = useState([]);

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
            let x = localStorage.getItem("email");
            let record = {
                username: x === null ? "admin@gmail.com" : x,
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

function ModalForSchedule(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [medTime, setMedTime] = useState([]);
    const [data, setData] = useState([]);

    // const fetchData = useCallback(async () => {
    //     let username =
    //         localStorage.getItem("email") === null
    //             ? "admin@gmail.com"
    //             : localStorage.getItem("email");
    //     console.log("Current username: ", username);
    //     const res = await fetch(
    //         "http://127.0.0.1:8000/get-record?query=" + username
    //     );
    //     const json = await res.json();
    //     setData(json);
    // }, []);

    // const convertData = useCallback(
    //     (data) => {
    //         console.log("Data: ", data);
    //         let newMedTime = [];
    //         for (let i = 0; i < data.length; i++) {
    //             console.log("Data at " + i, data[i]);
    //             let n = data[i]["times_of_day"];
    //             if (n === 1) {
    //                 newMedTime.push({ name: data[i]["medicine"], time: 12 });
    //             } else {
    //                 for (let j = 0; j < n; j++) {
    //                     newMedTime.push({
    //                         name: data[i]["medicine"],
    //                         time: Math.round(8 + (14 / (n - 1)) * j),
    //                     });
    //                 }
    //             }
    //         }
    //         console.log("NewMedTime: ", newMedTime);
    //         newMedTime.sort((a, b) => a["time"] - b["time"]);
    //         setMedTime(newMedTime);
    //         console.log("MedTime: ", medTime);
    //     },
    //     [medTime]
    // );

    // const fetchData = useCallback(async () => {
    //     // if ("email" in localStorage) {
    //     //     console.log(
    //     //         "Email in localStorage: ",
    //     //         localStorage.getItem("email")
    //     //     );
    //     //     setUsername(localStorage.getItem("email"));
    //     //     console.log("Username: ", username);
    //     // }
    //     const data = await fetch(
    //         "http://127.0.0.1:8000/search-a-medicine?query=admin@gmail.com"
    //     );
    //     const json = await data.json();
    //     setData(json);
    //     // console.log(data);
    // }, []);

    // useEffect(() => {
    //     fetchData().catch(console.error);
    // }, [fetchData]);

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
                            {data.map((item, index) => {
                                return (
                                    // <tr key={index}>
                                    //     <th>{index + 1}</th>
                                    //     <th>{item["name"]}</th>
                                    //     <th>{item["time"] + ":00"}</th>
                                    // </tr>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{item["medicine"]}</th>
                                        <th>{item["times_of_day"] + ":00"}</th>
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
    const [username, setUsername] = useState("admin@gmail.com");

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
                        <Nav className="me-auto"></Nav>
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
                                {localStorage.getItem("email") === null ? (
                                    ""
                                ) : (
                                    <ModalForSchedule />
                                )}
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
