import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRecords from "./AddRecords";
import HealthRecords from "./HealthRecodePage";
import Update from "./Update";
import Allrecords from "./ViewPage";
import Header from "../Header"; // Ensure Header is imported

function HealthRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HealthRecords />} />
        <Route path="/add" element={<AddRecords />} />
        <Route path="/update" element={<Update/>} />
        <Route path="/Allrecords" element={<Allrecords />} />
       </Routes>
    </>
  );
}

export default HealthRoute;