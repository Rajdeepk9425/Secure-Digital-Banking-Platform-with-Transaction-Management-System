import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./LoginPage.css";
import toast from "react-hot-toast";

const LoginPage = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [flag, setFlag] = useState(true);



    const validateLogin = (e) => {

        e.preventDefault();

        validateUser(
            loginData.username,
            loginData.password
        )
            .then((response) => {

                const role = String(response.data);

                if (role === "Admin") {

                    navigate("/admin-menu");

                } else if (role === "Customer") {

                    navigate("/customer-menu");

                } else {

                    setFlag(false);

                }

            })
            .catch((error) => {

                console.error(error);

                setFlag(false);

            });
    };



    const onChangeHandler = (event) => {

        setFlag(true);

        const { name, value } = event.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };



    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};

        let isValid = true;


        if (!loginData.username.trim()) {

            tempErrors.username =
                "User Name is required";

            isValid = false;

        }


        if (!loginData.password.trim()) {

            tempErrors.password =
                "Password is required";

            isValid = false;

        }


        setErrors(tempErrors);


        if (isValid) {

            validateLogin(event);

        }

    };


   

    const registerNewUser = () => {

        navigate("/register");

    };


    return (

        <div className="fincore-login-page">

            <div className="fincore-login-card">



                <div className="fincore-login-brand">

                    <div className="login-bank-icon">
                        🏦
                    </div>

                    <h1>
                        FinCore
                    </h1>

                    <p className="login-brand-subtitle">
                        Digital Banking
                    </p>


                    <div className="login-gold-line"></div>


                    <p className="login-brand-description">
                        Secure, simple and smarter banking
                        designed for your everyday financial needs.
                    </p>


                    <div className="login-feature-list">

                        <div>
                            <span>✓</span>
                            Secure Banking
                        </div>

                        <div>
                            <span>✓</span>
                            Easy Transactions
                        </div>

                        <div>
                            <span>✓</span>
                            24/7 Account Access
                        </div>

                    </div>

                </div>



                <div className="fincore-login-form-panel">


                    <div className="login-form-header">

                        <div className="login-small-icon">
                            🔐
                        </div>

                        <div>

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Sign in to your FinCore account
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleValidation}>



                        <div className="login-form-group">

                            <label className="fincore-label">
                                User Name
                            </label>

                            <div className="login-input-wrapper">

                                <span className="login-input-icon">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    className="login-input"
                                    value={loginData.username}
                                    onChange={onChangeHandler}
                                />

                            </div>


                            {errors.username && (

                                <div className="fincore-error">
                                    ⚠ {errors.username}
                                </div>

                            )}

                        </div>


                  

                        <div className="login-form-group">

                            <label className="fincore-label">
                                Password
                            </label>

                            <div className="login-input-wrapper">

                                <span className="login-input-icon">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className="login-input"
                                    value={loginData.password}
                                    onChange={onChangeHandler}
                                />

                            </div>


                            {errors.password && (

                                <div className="fincore-error">
                                    ⚠ {errors.password}
                                </div>

                            )}

                        </div>


                       

                        {!flag && (

                            <div className="login-invalid-message">

                                <span>
                                    !
                                </span>

                                Invalid User ID or Password

                            </div>

                        )}



                        <button
                            type="submit"
                            className="login-submit-btn"
                        >
                            🔐 Sign In
                        </button>

                    </form>


                  
                    <div className="login-register-section">

                        <p>
                            Don't have an account?
                        </p>

                        <button
                            type="button"
                            className="login-register-btn"
                            onClick={registerNewUser}
                        >
                            Create New Account
                        </button>

                    </div>


                    <div className="login-security-text">
                        🔒 Your information is protected
                    </div>

                </div>

            </div>


         

            <div className="login-footer">

                © 2026 FinCore Digital Banking

            </div>

        </div>

    );
};

export default LoginPage;