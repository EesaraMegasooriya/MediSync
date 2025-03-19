import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRecords from "./AddRecords";
import HealthRecords from "./HealthRecodePage";
import Header from "../Header"; // Ensure Header is imported

function HealthRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HealthRecords />} />
        <Route path="/add" element={<AddRecords />} />
      </Routes>
    </>
  );
}

export default HealthRoute;