import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  return (
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

        <div className="Button">
        <Button variant="primary" type="submit">
          Login
        </Button>
        </div>

      </div>
    </Form>
  );
}

export default App;
