import React from 'react'
import Banner from '../Components/Banner'
import Courses from '../Components/Courses'
import Header from '../Components/Header'
import ParentsComments from '../Components/ParentsComments'

export default function Home() {
  return (
   <div className='HomeWrapper'>
    <Header/>
    <Banner/>
    <Courses/>
    <ParentsComments/>
   </div>
  )
}
