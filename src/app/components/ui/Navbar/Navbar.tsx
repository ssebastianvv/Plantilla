"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components"; 
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import FormLogin from "../../FormLogin/FormLogin"; 
import FormRegister from "../../FormRegister/FormRegister"; 
import { useTranslations } from "next-intl";

const StyledNav = styled.nav`
    background-color: var(--primary-color);
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
`;

const StyledButton = styled(Button)`
    margin: 0.8rem;
    width: 8rem;
    padding: 0.6rem;
    color: var(--tertiary-color);
    background-color: var(--primary-color);
`;

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
    const translation = useTranslations("NavbarView");

    const toggleModalLogin = () => {
        setModalLoginVisible(!modalLoginVisible);
    };

    const toggleModalRegister = () => {
        setModalRegisterVisible(!modalRegisterVisible);
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <>
            <StyledNav>
                {status === "authenticated" ? (
                    <StyledButton label={translation("logout")} onClick={handleLogout} />
                ) : (
                    <>
                        <StyledButton label={translation("login")} onClick={toggleModalLogin} />
                        <StyledButton label={translation("register")} onClick={toggleModalRegister} />
                    </>
                )}
            </StyledNav>

            {/* Modal de inicio de sesión */}
            {!session && (
                <Modal isVisible={modalLoginVisible} onClose={toggleModalLogin}>
                    <FormLogin onClose={toggleModalLogin} />
                </Modal>
            )}

            {/* Modal de registro */}
            {!session && (
                <Modal isVisible={modalRegisterVisible} onClose={toggleModalRegister}>
                    <FormRegister onClose={toggleModalRegister} />
                </Modal>
            )}
        </>
    );
};

export default Navbar;
