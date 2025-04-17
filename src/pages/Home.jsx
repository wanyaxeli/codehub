import React from 'react'
import Banner from '../Components/Banner'
import Benefit from '../Components/Benefit'
import Courses from '../Components/Courses'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import ParentsComments from '../Components/ParentsComments'

export default function Home() {
  return (
   <div className='HomeWrapper'>
    <Header/>
    <Banner/>
    <Courses/>
    <Benefit/>
    <ParentsComments/>
    <Footer/>
   </div>
  )
}
