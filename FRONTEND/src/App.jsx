import React from "react";
import {Routes,Route} from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/HeroSection/Hero";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";

export default function App(){
  return(
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}
