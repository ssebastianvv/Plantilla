import React from "react";

interface ButtonProps {
    label?: string; 
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; 
    type?: "button" | "submit" | "reset"; 
    className?: string;
    children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button", 
    className,
    children,
}) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children || label} {}
        </button>
    );
};

export default Button;
