import React,{useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function BookingLoading() {
    const { name, token } = useParams();
    const navigate=useNavigate()
    useEffect(() => {
        // Send the token to the backend to verify it
        const verifyToken = async () => {
          if(token){
            try {
                const response = await fetch("http://127.0.0.1:8000/verify-class-token/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ token }),
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log("Verified email:", data.email);
                //   setBookingId(name)
                  const  codeName = name;
                  const numberFromId = codeName.replace(/\D/g, ""); // Removes all non-digit characters
              
                  const codeNameInt = parseInt(numberFromId, 10);
                //   setCode(codeNameInt)
                  // Redirect to a form or auto-fill the email field
                    // navigate(`/Trial Class/${name}`)
                    navigate(`/Trial Class/${name}`,{state:{id:codeNameInt,code:codeNameInt,role:'student',booking_id:name}})
                } else {
                  console.error("Invalid or expired token.");
                  navigate("/error");
                }
              } catch (error) {
                console.error("Error verifying token:", error);
                navigate("/Error");
              }
          }
        };
    
        verifyToken();
      }, [token]);
  return (
    <div className='BookingLoadingWrapper'>
        <p>Loading...</p>
        <span></span>
    </div>
  )
}
