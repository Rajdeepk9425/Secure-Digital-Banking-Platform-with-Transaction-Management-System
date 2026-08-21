import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from "../../Services/LoginService";

import '../../DisplayView.css';
import "../../FinCorePage.css";
import "./RegisterUser.css";
import toast from "react-hot-toast";

const RegisterUser = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [bankUser, setBankUser] = useState({
        username: "",
        password: "",
        personalName: "",
        email: "",
        role: "",
    });

    const [flag, setFlag] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




    useEffect(() => {

        setFlag(false);

    }, []);




    const createNewUser = (event) => {

        event.preventDefault();

        if (bankUser.password === confirmPassword) {

            registerNewUser(bankUser)
                .then(() => {

                    setFlag(true);

                })
                .catch((error) => {

                    console.error("Registration failed:", error);

                });

        }

    };



    const onChangeHandler = (event) => {

        setFlag(false);

        const { name, value } = event.target;

        setBankUser(values => ({
            ...values,
            [name]: value
        }));

    };




    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};

        let isValid = true;



        if (!bankUser.username.trim()) {

            tempErrors.username =
                "User Name is required";

            isValid = false;

        }


   

        if (!bankUser.password.trim()) {

            tempErrors.password =
                "Password is required";

            isValid = false;

        }

        else if (
            bankUser.password.length < 5 ||
            bankUser.password.length > 10
        ) {

            tempErrors.password =
                "Password must be 5-10 characters long";

            isValid = false;

        }

        else if (
            bankUser.password !== confirmPassword
        ) {

            tempErrors.password =
                "Both passwords do not match";

            isValid = false;

        }



        if (!confirmPassword.trim()) {

            tempErrors.confirmPassword =
                "Confirm Password is required";

            isValid = false;

        }




        if (!bankUser.personalName.trim()) {

            tempErrors.personalName =
                "Personal Name is required";

            isValid = false;

        }


      

        if (!bankUser.email.trim()) {

            tempErrors.email =
                "Email is required";

            isValid = false;

        }

        else if (!emailPattern.test(bankUser.email)) {

            tempErrors.email =
                "Invalid Email Format";

            isValid = false;

        }


  

        if (!bankUser.role.trim()) {

            tempErrors.role =
                "Role is required";

            isValid = false;

        }


        setErrors(tempErrors);


        if (isValid) {

            createNewUser(event);

        }

    };


    const returnBack = () => {

        navigate('/');

    };


    return (

        <div className="fincore-register-page">


          

            <div className="fincore-register-card">


                <div className="register-brand-panel">

                    <div className="register-bank-icon">
                        🏦
                    </div>

                    <h1>
                        FinCore
                    </h1>

                    <span className="register-brand-subtitle">
                        DIGITAL BANKING
                    </span>

                    <div className="register-gold-line"></div>

                    <p>
                        Create your FinCore banking account
                        and experience secure digital banking.
                    </p>

                    <div className="register-benefits">

                        <div>
                            <span>✓</span>
                            Secure Account
                        </div>

                        <div>
                            <span>✓</span>
                            Easy Banking Access
                        </div>

                        <div>
                            <span>✓</span>
                            Simple Digital Transactions
                        </div>

                    </div>

                </div>


             

                <div className="register-form-panel">


                    <div className="register-form-header">

                        <div className="register-small-icon">
                            ✨
                        </div>

                        <div>

                            <h2>
                                Create Account
                            </h2>

                            <p>
                                Register a new FinCore user
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleValidation}>


                       

                        <div className="register-form-group">

                            <label className="fincore-label">
                                User Name
                            </label>

                            <input
                                type="text"
                                name="username"
                                className="register-input"
                                placeholder="Enter username"
                                value={bankUser.username}
                                onChange={onChangeHandler}
                            />

                            {errors.username && (

                                <div className="fincore-error">
                                    ⚠ {errors.username}
                                </div>

                            )}

                        </div>


                       

                        <div className="register-form-group">

                            <label className="fincore-label">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                className="register-input"
                                placeholder="Enter password"
                                value={bankUser.password}
                                onChange={onChangeHandler}
                            />

                            {errors.password && (

                                <div className="fincore-error">
                                    ⚠ {errors.password}
                                </div>

                            )}

                            <small className="register-helper">
                                Password must be 5-10 characters
                            </small>

                        </div>


                        

                        <div className="register-form-group">

                            <label className="fincore-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                className="register-input"
                                placeholder="Retype your password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(
                                        event.target.value
                                    );
                                    setFlag(false);
                                }}
                            />

                            {errors.confirmPassword && (

                                <div className="fincore-error">
                                    ⚠ {errors.confirmPassword}
                                </div>

                            )}

                        </div>


                     

                        <div className="register-form-group">

                            <label className="fincore-label">
                                Personal Name
                            </label>

                            <input
                                type="text"
                                name="personalName"
                                className="register-input"
                                placeholder="Enter your full name"
                                value={bankUser.personalName}
                                onChange={onChangeHandler}
                            />

                            {errors.personalName && (

                                <div className="fincore-error">
                                    ⚠ {errors.personalName}
                                </div>

                            )}

                        </div>



                        <div className="register-form-group">

                            <label className="fincore-label">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="register-input"
                                placeholder="Enter email address"
                                value={bankUser.email}
                                onChange={onChangeHandler}
                            />

                            {errors.email && (

                                <div className="fincore-error">
                                    ⚠ {errors.email}
                                </div>

                            )}

                        </div>


                     

                        <div className="register-form-group">

                            <label className="fincore-label">
                                Select Role
                            </label>

                            <select
                                name="role"
                                className="register-input"
                                value={bankUser.role}
                                onChange={onChangeHandler}
                            >

                                <option value="">
                                    Select Role
                                </option>

                                <option value="Customer">
                                    Customer
                                </option>

                                <option value="Admin">
                                    Admin
                                </option>

                            </select>

                            {errors.role && (

                                <div className="fincore-error">
                                    ⚠ {errors.role}
                                </div>

                            )}

                        </div>


                    

                        <div className="register-button-group">

                            <button
                                type="submit"
                                className="register-submit-btn"
                            >
                                ✓ Create Account
                            </button>

                            <button
                                type="button"
                                className="register-back-btn"
                                onClick={returnBack}
                            >
                                ← Back to Login
                            </button>

                        </div>

                    </form>

                    {flag && (

                        <div className="register-success-message">

                            <div className="register-success-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    User Created Successfully
                                </strong>

                                <p>
                                    Your account has been created.
                                    You can now login to FinCore.
                                </p>

                                <button
                                    type="button"
                                    className="register-login-btn"
                                    onClick={returnBack}
                                >
                                    Go to Login →
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            <div className="register-footer">
                © 2026 FinCore Digital Banking
            </div>

        </div>

    );
};

export default RegisterUser;