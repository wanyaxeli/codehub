import React,{useState,useEffect,useContext} from 'react'
import { jwtDecode } from 'jwt-decode';
import { context } from '../App';
import axios from 'axios';
export default function FeesPayment() {
  const [token,settoken]=useState('')
  const [user_id,setUserId]=useState('')
  const {setStudent}=useContext(context)
  async function getToken(){
    try{
        const token= localStorage.getItem('token') // No need to await
        if (token){
          settoken(token)
          try {
            const decode = jwtDecode(token);
            const { exp, role, user_id } = decode;
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
   const url=`https://api.codingscholar.com/getstudent/${user_id}`
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
