import React from "react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="Navbar">
            <div className="foodLogo">
                <h1 onClick={()=>navigate("/")}>FoodShare</h1>
            </div>
            <div className="Nav-links">
                <h3 onClick={()=>{console.log("Navigating to login");  navigate("/login")}}>Donar Login</h3>
                <h3>NGO Login</h3>
                <h3 onClick={()=>{console.log("Navigating to Sign Up");  navigate("/signup")}}>Sign Up</h3>
                <h3>My Donations</h3>
                <h3>My Claims</h3>
            </div>
        </div>
    )
}