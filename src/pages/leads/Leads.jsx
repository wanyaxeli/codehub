import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function Leads() {
    const[data,setData]=useState([])
    function getLeads(){
        const url = 'https://api.codingscholar.com/leads/';
        axios.get(url)
        .then(res=>{
            console.log(res.data)
            const data=res.data
            data.forEach(item=>{
                
                const date=new Date(item.time)
                const day=date.getDate()
                const hour=date.getHours()
                const minutes=date.getMinutes()
                const month=date.getMonth() + 1
                const yeah=date.getFullYear()
                const fulldate=`${day}/${month}/${yeah}:${hour}:${minutes}`
                setData(pre=>([...pre,{...item,...{fulldate:fulldate}}]))
            })
            // setData(data)
        })
        .catch(error=>console.log(error))
    }
    const handleFollowedUp =(item)=>{
    console.log(item)
    const id=item.id
    const url =`https://api.codingscholar.com/update_followed_up/${id}`
    axios.post(url)
    .then(res=>console.log(
        console.log(res.data)
    ))
    .catch(error=>console.log(error))
    }
    useEffect(()=>{
     getLeads()
    },[])
  return (
    <div className='LeadsWrapper'>
        <table>
            <thead>
                <tr>
                    <th>student </th>
                    <th>course</th>
                    <th>email</th>
                    <th>phone number</th>
                    <th>country</th>
                    <th>trial booked</th>
                    <th>Date</th>
                    <th>followed</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,i)=>{
                    return(
                 <tr key={i}>
                    <td>{item.student_name}</td>
                    <td>{item.course_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.country}</td>
                    {item.booked_class===false?<td>false</td>:<td>True</td>}
                    <td>{item.fulldate}</td>
                    <td><div className='check'>
                    <input
                        type="checkbox"
                        checked={item.referred}
                        onChange={() => handleFollowedUp(item)}
                    />    
                    </div></td>
                </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}
