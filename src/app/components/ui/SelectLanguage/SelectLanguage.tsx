"use client";
import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function SelectLanguage(): React.ReactElement {
    const router = useRouter();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault(); // Previene el comportamiento por defecto
        const newLocale = e.currentTarget.value;
        Cookies.set("locale", newLocale);
        console.log("Locale set to:", newLocale); // Verifica el valor
        router.refresh();
    };

    return (
        <div>
            <button value={"en"} onClick={handleClick}>En</button>
            <button value={"es"} onClick={handleClick}>Es</button>
        </div>
    );
}
