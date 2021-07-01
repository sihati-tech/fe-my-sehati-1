import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axiosInstance from '../../services/httpInterceptor' 
import "./Dashboard.scss";
import axios from 'axios';

export default function DoctorDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      Welcome doctors
    </div>
  );
}