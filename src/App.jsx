import React from "react";
import { Routes, Route } from "react-router-dom";
import "./FormComponent.css";
import ImportFile from "./ImportFile";
import FormComponent from "./FormComponent";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<FormComponent />} />
      <Route path="/import" element={<ImportFile/>}/>
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  );
}
