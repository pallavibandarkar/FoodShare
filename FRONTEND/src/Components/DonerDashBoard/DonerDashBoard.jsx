import React, { useEffect, useState } from "react";
import "./DonerDashBoard.css";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import "./DonerDashBoard.css"

export default function DonerDashBoard(){
    const { id } = useParams();
    const [foodItems,setFoodItems] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    const fetchData = async(req,res)=>{
        try{
            const result = await axios.get(`http://localhost:8080/donor/fooditems/${id}`,{
                withCredentials:true
            })
            setFoodItems(result.data.data)
            setLoading(false)
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
        console.log(foodItems)
    },[]);

    return(
        <div className="DonarDashBoard">
            <div className="donor">
              <h1>Donor Dashboard</h1>
              <button onClick={() => navigate("/foodlist/donor")}>Donate Food</button>
            </div>
           {loading?(
             <p>Looadind Food Items...</p>
           ):foodItems.length === 0 ?(
            <p>No food items listed</p>
           ):(
            <div className="food-items">
                {foodItems.map((item)=>(
                    <div key={item._id} className="food-item-card">
                        <h3>Food Donated:{item.foodName}</h3>
                        <p><b>Quantity:</b>{item.quantity}</p>
                        <div className="address">
                            <p><b>Street :</b> {item.address.street}</p>
                            <p><b>City :</b> {item.address.city}</p>
                            <p><b>State :</b> {item.address.state}</p>
                            <p><b>Country :</b> {item.address.country}</p>
                            <p><b>Pincode :</b> {item.address.pinCode}</p>
                        </div>
                        <p><b>Status :</b> {item.status}</p>
                        <p><b>Claimed By :</b> {item.claimedBy?item.claimedBy:"Available to claim"}</p>
                    </div>
                ))}
            </div>
           )} 
        </div>
    )
}