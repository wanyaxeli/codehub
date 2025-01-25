import React,{useState,useContext} from 'react'
import pic from '../assets/student.jpg'
import { context } from '../App'
export default function ClassBooking() {
    const {value,email,CountryCode}=useContext(context)
    const initialState={date:'',time:""}
    console.log('value',value)
    console.log('coede',CountryCode)
    console.log('email',email)
    const [booking,setBooking]=useState(initialState)
    const handleChange=(e)=>{
    const {name,value}=e.target
    console.log('name',name)
    setBooking(pre=>({...pre,[name]:value}))
    }
    const handleBook=()=>{
        const data={phone_number:value,
        time:booking.time,date:booking.date,countryCode:CountryCode}
    }
  return (
    <div className='RegisterWRapper'>
        <div className='RegisterContainer'>
            <aside>
                <div className='registerLogoWRapper'></div>
                <div className='studentComment'>
                    <div className='innerstudentComment'>
                        <div className='quoteHolder'>
                            <p></p>
                        </div>
                        <div className='studentQuote'> 
                            <p>My teacher at Codehub was the best guide I could've asked for as they really customized the classes to match my learning style.</p>
                        </div>
                        <div className='studentPicholder'>
                            <div className='studentPic'>
                                <img  src={pic}/>
                            </div>
                        </div>
                    </div>
                    <div className='copywrightHolder'>
                        <p><span><i className="fa fa-copyright" aria-hidden="true"></i></span> 2025 CodeHub.</p>
                    </div>
                </div>
            </aside>
            <main>
            <div className='registerLogoWRapper rightSideLogo'>
                <div className='rightSideLogoLeft'></div>
                <div className='rightSideLogoRight'>
                    <ul>
                        <li>Are you are teacher </li>
                        <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                    </ul>
                </div>
            </div>
            <div className='RegisterFormWrapper'>
               <div className='InnerBookingWrapper'>
                 <h3>Book a free lesson to enter the wonderful world of coding</h3>
                 <p className='timezone'>This will in recorded in your country's time zone</p>
                 <div className='timeSeletorWrapper'>
                    <p>Select a date</p>
                    <input onChange={handleChange} name='date'  value={booking.date} type='date'/>
                    <p>Select a time </p>
                    <input onChange={handleChange} name='time' value={booking.time} type='time'/>
                 </div>
                 <div className='bookBtnWrapper'>
                    <button onClick={handleBook}>book now</button>
                 </div>
               </div>
            </div>
            </main>
        </div>
    </div>
  )
}
