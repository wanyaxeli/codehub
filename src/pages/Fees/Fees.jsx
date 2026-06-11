import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function Fees() {
    const [Fees,setFees]=useState([])
    function GetStudentFees(){
    const url ='https://api.codingscholar.com/student_with_no_tokens/'
     axios.get(url)
     .then(res=>{
        console.log('www',res.data)
        const data=res.data
        setFees(data)
     })
     .catch(error=>console.log(error))
    }
    useEffect(()=>{
    GetStudentFees()
    },[])
  return (
    <div className='FeesWrapper'>
         <div className='FeesHeaderContainer'>
            <h2>Student with less than 3 tokens</h2>
         </div>
         <div className='feesStudentWrapper'>
                     <table>
                         <thead>
                            <tr>
                                <th>first name</th>
                                <th>second name</th>
                                <th>phone number</th>
                                <th>email</th>
                                <th>tokens</th>
                            </tr>
                         </thead>
                         <tbody>
                           {Fees.map((item,i)=>{
                            return(
                                <tr key={i}>
                                <td>{item.user.first_name} </td>
                                <td>{item.user.last_name} </td>
                                <td>{item.user.phone_number} </td>
                                <td>{item.user.email} </td>
                                <td>{item.tokens} </td>
                            </tr>
                            )
                           })}
                         </tbody>
                     </table>
            </div>
    </div>
  )
}
