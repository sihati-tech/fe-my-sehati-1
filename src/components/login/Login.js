import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axiosInstance from '../../services/httpInterceptor' 
import { useHistory } from "react-router-dom";
import LoginPng from '../../assets/images/heart.png';
import "./Login.scss";
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL;
export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      login()
  }
  function navigateTo (url) {
    history.push(url);
  }

  function login() {
    const url = `${API_URL}/login`;
    // const url = 'http://localhost:4000/login'
    const data = {username: email, password}
    axios.post(url, data).then(response => response.data)
    .then((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('userType', JSON.stringify(result.user_type));
      const kind = result.user_type.kind;
      switch (kind) {
        case 'patients': 
          console.log('kind ', kind)
          navigateTo('/patient/dashboard')
          break;
        case 'pharmacists': 
          navigateTo('/pharmacist/dashboard')
          break;
        case 'doctors': 
          break;
        default:
          break
      }
    })
  }
  return (
    <div className="login">
    <div className="login__header">
      
    </div>
      <div className="login__body">
        <div className="login__form">
          <div className={'login__image'}>
            <img
                src={LoginPng}
                alt="un triangle aux trois côtés égaux"
                height="87px"
                width="100px" />
          </div>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button  onClick={handleSubmit.bind(this)} className="login__submit" block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </div>
    
      </div>
      </div>
  );
}