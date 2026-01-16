import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Clarity from "@microsoft/clarity";

const PROJECT_ID="v0tsv9c9n7"

export default function useClarityPageView(){
    const location =useLocation()

    useEffect(()=>{
        Clarity.init(PROJECT_ID)        
    },[])

    useEffect(()=>{
        Clarity.event("pageView")
    },[location])
}