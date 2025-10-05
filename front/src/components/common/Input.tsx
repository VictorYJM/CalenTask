import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return(
        <input
            className="text-center bg-transparent w-full text-lg outline-none text-main"
            autoFocus
            {...props}
        />
    );
}

export default Input;