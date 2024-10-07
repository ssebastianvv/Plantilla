"use client"
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SelectLanguage():React.ReactElement{
    const router = useRouter();
    const handleClick = (e:any):void =>{
        Cookies.set("locale",e.target.value);
        router.refresh();
    }
    return(
        <div>
            <button value={"en"} onClick={(e)=>handleClick(e)}>En</button>
            <button value={"es"} onClick={(e)=>handleClick(e)}>Es</button>
        </div>
    )
}