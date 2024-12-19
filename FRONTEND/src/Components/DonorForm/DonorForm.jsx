import React, { useEffect, useState } from "react";
import "./DonorForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DonorForm.css"
import { useNavigate } from "react-router-dom";

export default function DonorForm(){
    const navigate = useNavigate();
    const [userData,setUserData] = useState({})
    const [FoodDetails,setFoodDetails]=useState({
        foodName:"",
        quantity:"",
        address:{
            street:"",
            city:"",
            state:"",
            country:"",
            pinCode:"",
        }
    })

    const onChangeHandler=(e)=>{
        const {name,value} = e.target;
        if(name.includes("address")){
            const addressField = name.split(".")[1];
            setFoodDetails((prev)=>({...prev,address:{...prev.address,[addressField]:value}}))
        }else{
            setFoodDetails((prev)=>({...prev,[name]:value}))
        }
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const result = await axios.post("http://localhost:8080/donor/add",FoodDetails,{
                withCredentials: true,  
            })
            console.log(result)
            toast.success("Food Listed SuccessFully",{
                autoClose:2000
            })
            setFoodDetails({
                foodName:"",
                quantity:"",
                address:{
                    street:"",
                    city:"",
                    state:"",
                    country:"",
                    pinCode:"",
                }
            })
            navigate(`/donor/${userData._id}`)
            
        }
        catch(err){
            console.log(err)
            if (err.response && err.response.status === 401) {
                toast.error("Please log in to access this page.");
                navigate("/login");
            } else {
                toast.error("Food truck not found or failed to fetch data.");
            }
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await axios.get("http://localhost:8080/test", {
                    withCredentials: true,  
                });
                setUserData(result.data.data);
    
                // Check if the user is not logged in and navigate to login page
                if (!result.data.data) {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
                // Handle error if the request fails
                navigate("/login");
            }
        };
    
        fetchUserData(); 
        console.log(userData) // Call the async function inside useEffect
    }, []);  // Ensure navigate is added as a dependency to avoid stale closures
    

    return(
        <div className="DonorForm">
            <form onSubmit={handleSubmit}>
                <h2>List Food</h2>
                <label>Food Name</label>
                <input 
                  type="text"
                  placeholder="Enter Food Name"
                  name="foodName"
                  value={FoodDetails.foodName}
                  onChange={onChangeHandler}
                  required/>
                <label>Quantity</label>
                <input 
                  type="text"
                  placeholder="eg: 2kg, 12packets"
                  name="quantity"
                  value={FoodDetails.quantity}
                  onChange={onChangeHandler}
                  required/>
                <div className="addressDetails">
                    <div>
                        <label>Street</label>
                        <input
                          type="text"
                          placeholder="Street Name"
                          name="address.street"
                          value={FoodDetails.address.street} onChange={onChangeHandler} required/>
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="Street Name"
                          name="address.city"
                          value={FoodDetails.address.city} onChange={onChangeHandler} required/>
                    </div>
                    <div>
                        <label>State</label>
                        <input
                          type="text"
                          placeholder="Street Name"
                          name="address.state"
                          value={FoodDetails.address.state} onChange={onChangeHandler} required/>
                        <label>Country</label>
                        <input
                          type="text"
                          placeholder="Street Name"
                          name="address.country"
                          value={FoodDetails.address.country} onChange={onChangeHandler} required/>
                    </div>
                    <div>
                        <label>Pincode</label>
                        <input
                          type="text"
                          placeholder="Street Name"
                          name="address.pinCode"
                          value={FoodDetails.address.pinCode} onChange={onChangeHandler} required/>
                    </div>
                </div>
                <button type="submit">List Food</button>
            </form>
            <ToastContainer />

        </div>
    )
}