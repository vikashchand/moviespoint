import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = ({ history }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { username, password } = loginData;
  
    try {
      
      const response = await fetch("http://localhost:9000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      // const response = await fetch("http://http://localhost:5000/api/users/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ username, password }),
      // });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const authToken = data.token; // Assuming the server responds with an authToken
        localStorage.setItem('authToken', authToken); // Store authToken in sessionStorage
        localStorage.setItem('userId', data.userId); // Store authToken in sessionStorage
        
        setTimeout(() => {
            window.location.href = "/";
          }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
