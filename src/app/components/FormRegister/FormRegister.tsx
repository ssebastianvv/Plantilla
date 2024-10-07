"use client";
import GroupInput from "../ui/GroupInput/GroupInput";
import Button from "../ui/Button/Button";
import { IFormDataRegister } from "../../interface/formDataRegister"; 
import { useTranslations } from "next-intl";
import { useState } from "react";
import { URL_BASE } from "@/endpoint";

interface FormRegisterProps {
    onClose: () => void;
}

export default function FormRegister({ onClose }: FormRegisterProps): React.ReactElement {
    const translation = useTranslations("RegisterView");
    const initialFormData: IFormDataRegister = {
        name: "",
        email: "",
        password: "",
        username: "",
        phone: ""
    };
    const [formData, setFormData] = useState<IFormDataRegister>(initialFormData);

    const handleRegister = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await fetch(`${URL_BASE}auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Usuario registrado exitosamente :)");
            onClose(); 
            setFormData(initialFormData); 
        } else {
            const result = await response.json();
            alert(`Error en el registro: ${result.message}`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>{translation("title")}</h2>
            <GroupInput
                label={translation("name")}
                type="text"
                onChange={handleChange}
                name="name"
                value={formData.name}
            />
            <GroupInput
                label={translation("email")}
                type="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <GroupInput
                label={translation("password")}
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />
            <GroupInput
                label={translation("username")}
                type="text"
                onChange={handleChange}
                name="username"
                value={formData.username}
            />
            <GroupInput
                label={translation("phone")}
                type="tel"
                onChange={handleChange}
                name="phone"
                value={formData.phone}
            />
            <Button label={translation("buttonRegister")} type="submit" onClick={handleRegister} />
        </form>
    );
}
