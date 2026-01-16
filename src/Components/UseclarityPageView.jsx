import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Clarity from "@microsoft/clarity";

const PROJECT_ID=import.meta.env.VITE_CLARITY_PROJECT_ID

export default function useClarityPageView(){
    const location =useLocation()

    useEffect(()=>{
        Clarity.init(PROJECT_ID)        
    },[])

    useEffect(()=>{
        Clarity.event("pageView")
    },[location])
}