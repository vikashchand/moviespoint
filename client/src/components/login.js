import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";




import { useFormik } from "formik";
import { login } from "../assets/Schemas/index"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import work from '../assets/work.jpg';


import './login.css';
const Login = ({ history }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState(false);
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
      
      const response = await fetch("https://moviespoint-dmby.vercel.app/api/users/login", {
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
    <div className="container">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Login</h1>
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
          <div className="modal-right">
            <img src={work} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Login;
