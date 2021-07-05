import React, { useState } from "react";
import "./Dashboard.scss";
import axios from 'axios';

export default function DoctorDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      Welcome doctor a
    </div>
  );
}