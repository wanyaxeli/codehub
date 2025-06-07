import React from 'react'
import Banner from '../Components/Banner'
import Benefit from '../Components/Benefit'
import Courses from '../Components/Courses'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import ParentsComments from '../Components/ParentsComments'
import { Helmet } from 'react-helmet-async';
export default function Home() {
  return (
   <div className='HomeWrapper'>
    <Helmet>
        <title>Home - codingscholar</title>
        <meta name="description" content="Welcome to codingscholar -Let your kid learn coding with experts!" />
        <meta name="keywords" content="coding,coding for kids, education, online classes,online classes for kids, programming for kids, programming" />
        <link rel="canonical" href="https://www.codingscholar.com/" />
      </Helmet>
    <Header/>
    <Banner/>
    <Courses/>
    <Benefit/>
    <ParentsComments/>
    <Footer/>
   </div>
  )
}
