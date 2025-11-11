import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
export default function ClassGroups() {
    const initialState= {name:"",grade:'',firstLesson:'',secondLesson:''}
    const [values,setValues]=useState(initialState)
    const [student,setStudent]=useState('')
    const location =useLocation()
    const handleEnroll =()=>{
 
    }
   useEffect(()=>{
   const {state} = location
   if(state){
   
    setStudent(state)
   }
   },[])
  return (
    <div className='ClassGroupsWrapper'>
       <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Grade</th>
                <th>First Lesson</th>
                <th>Second Lesson</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>elias </td>
                <td>wanyama</td>
                <td>3 </td>
                <td>monday</td>
                <td>friday</td>
                <td><button onClick={handleEnroll}>enroll</button></td>
            </tr>
            <tr>
                <td>erick</td>
                <td>nyongesa</td>
                <td>3 </td>
                <td>tuesday</td>
                <td>wednesday</td>
                <td><button>enroll</button></td>
            </tr>
            <tr>
                <td>evans </td>
                <td>wachiye</td>
                <td>3 </td>
                <td>monday</td>
                <td>friday</td>
                <td><button>enroll</button></td>
            </tr>
        </tbody>
       </table>
    </div>
  )
}
