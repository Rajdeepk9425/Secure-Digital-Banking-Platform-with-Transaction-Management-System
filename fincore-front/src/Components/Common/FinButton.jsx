import React from "react";

const FinButton = ({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false
}) => {


    return (

        <button

            type={type}

            className={`fincore-btn-${variant}`}

            onClick={onClick}

            disabled={disabled}

        >

            {children}

        </button>

    );

};


export default FinButton;