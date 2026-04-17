import React from "react";
import { useLocation } from "react-router-dom";
import CourseDetailPage from "@/Components/blogs";
// import Footer from "@/Components/Footer";
import Footer from '@/Components/layoutss/newFooter';
import Header from "@/Components/Header";
import { useEffect, useState } from 'react'
import HeaderSection from "@/Components/layoutss/code-headers";

export default function CourseBlogs(){
    const [chosencourseid,setChosenCourseId]=useState(1)
    const location=useLocation()
    // useEffect(()=>{
    //     const state=location.state
    //     console.log('state',state)
    //     setChosenCourseId(state)
    
    //   },[])
    return(
        <>
        {/* <Header/> */}
        <HeaderSection/>
        <CourseDetailPage/>
        <Footer/>
        </>
    )
}