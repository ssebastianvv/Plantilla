import React from 'react';

interface FormProps {
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;