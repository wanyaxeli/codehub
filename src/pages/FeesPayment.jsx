import React,{useState,useEffect,useContext} from 'react'
import { jwtDecode } from 'jwt-decode';
import { context } from '../App';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API } from '@/lib/api';
export default function FeesPayment() {
  const [token,settoken]=useState('')
  const {setStudent}=useContext(context)
  const {user}=useAuth()
  const user_id=user.id
  const role=user.role
   async function getToken(){
    try{
  
        if (user_id){
          
          try {

            setUserId(user_id)
          } catch (error) {
            console.error("JWT Decode Error:", error);
          }
        }
    } catch(error) {
        console.log(error);
    }
}
function Student(){
  if(token && user_id){
   // const url=`http://127.0.0.1:8000/getstudent/${user_id}`
   const url=`${API}/getstudent/${user_id}`
   axios.get(url,{headers:{
     'Authorization':`Bearer ${token}`
   }})
   .then(res=>{
     console.log('student',res.data)
     const data= res.data
     setStudent(data)
   })
   .catch(error=>console.log(error))
  }
 }
 useEffect(()=>{
  Student()
 },[token,user_id])
useEffect(()=>{
getToken()
},[])
  return (
    <div className='FeesPaymentWrapper'>
        <p>Please pay your child's fee for him/her to access the class dashboard</p>
    </div>
  )
}
