
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center p-6 border-b border-secondary">
            <h1 className="text-3xl md:text-4xl font-bold text-light-text">
                Prompt Enhancer for Coding
            </h1>
            <p className="mt-2 text-md md:text-lg text-dark-text">
                Transform your simple ideas into structured, detailed prompts for AI.
            </p>
        </header>
    );
};

export default Header;
