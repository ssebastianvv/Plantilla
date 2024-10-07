"use client";
import GroupInput from "../../components/ui/GroupInput/GroupInput";
import Button from "../ui/Button/Button";
import { IFormDataLogin } from "../../interface/formDataLogin";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";

interface FormLoginProps {
    onClose: () => void;
}

export default function FormLogin({ onClose }: FormLoginProps): React.ReactElement {
    const translation = useTranslations("LoginView");
    const { data: session } = useSession();
    
    const initialFormData: IFormDataLogin = {
        username: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormDataLogin>(initialFormData);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null); // Resetear error antes de iniciar sesión

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.username,
            password: formData.password,
        });

        if (res?.error) {
            setError("Inicio de sesión fallido. Verifica tus credenciales."); // Manejo de error
        } else {
            onClose(); // Cerrar modal al iniciar sesión exitosamente
            window.location.href = "/posts"; // Redirigir a la vista de posts
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
        <form onSubmit={handleLogin}>
            <h2>{translation("title")}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
            <GroupInput
                label={translation("username")}
                type="text"
                onChange={handleChange}
                name="username"
                value={formData.username}
            />
            <GroupInput
                label={translation("password")}
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />
            <Button label={translation("buttonLogin")} type="submit" onClick={handleLogin} />
        </form>
    );
}
