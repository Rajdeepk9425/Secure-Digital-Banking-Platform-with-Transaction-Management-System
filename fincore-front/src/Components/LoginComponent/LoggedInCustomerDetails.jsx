import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getCustomerByUsername } from "../../Services/CustomerService";

import "../../DisplayView.css";
import "../../FinCorePage.css";

const LoggedInCustomerDetails = () => {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD LOGGED-IN CUSTOMER
    // =====================================================

    useEffect(() => {

        loadCustomer();

    }, []);


    const loadCustomer = () => {

        setLoading(true);

        getCustomerByUsername()

            .then((response) => {

                console.log(
                    "Logged-in Customer:",
                    response.data
                );

                setCustomer(response.data);

            })

            .catch((error) => {

                console.log(
                    "Customer Details Error:",
                    error
                );

                toast.error(
                    "Unable to load customer details"
                );

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // =====================================================
    // RETURN BACK
    // =====================================================

    const returnBack = () => {

        navigate("/customer-menu");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="customer-details-page">

                <div className="customer-details-card">

                    <div className="customer-details-loading">

                        Loading customer details...

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO CUSTOMER
    // =====================================================

    if (!customer) {

        return (

            <div className="customer-details-page">

                <div className="customer-details-card">

                    <h2 className="customer-details-title">
                        Customer Details
                    </h2>

                    <div className="customer-details-empty">

                        Customer details not found.

                    </div>

                    <div className="customer-details-return">

                        <button
                            type="button"
                            onClick={returnBack}
                        >
                            ← Return Back
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-details-page">

            <div className="customer-details-card">


                {/* =================================================
                    TITLE
                ================================================= */}

                <div className="customer-details-header">

                    <h1 className="customer-details-title">

                        Customer Details

                    </h1>

                    <p className="customer-details-subtitle">

                        Your registered customer information

                    </p>

                </div>


                {/* =================================================
                    CUSTOMER DETAILS - ROW 1
                ================================================= */}

                <div className="customer-details-row">


                    {/* CUSTOMER ID */}

                    <div className="customer-detail-item">

                        <span className="customer-detail-label">

                            Customer ID

                        </span>

                        <span className="customer-detail-value">

                            {customer.customerId || "-"}

                        </span>

                    </div>


                    {/* CUSTOMER NAME */}

                    <div className="customer-detail-item">

                        <span className="customer-detail-label">

                            Customer Name

                        </span>

                        <span className="customer-detail-value">

                            {customer.customerName ||
                             customer.personalName ||
                             "-"}

                        </span>

                    </div>


                    {/* DATE OF BIRTH */}

                    <div className="customer-detail-item">

                        <span className="customer-detail-label">

                            Date of Birth

                        </span>

                        <span className="customer-detail-value">

                            {customer.dateOfBirth || "-"}

                        </span>

                    </div>


                    {/* DATE OF JOIN */}

                    <div className="customer-detail-item">

                        <span className="customer-detail-label">

                            Date of Join

                        </span>

                        <span className="customer-detail-value">

                            {customer.dateOfJoin || "-"}

                        </span>

                    </div>


                </div>


                {/* =================================================
                    CUSTOMER DETAILS - ROW 2
                ================================================= */}

                <div className="customer-details-row">


                    {/* ADDRESS */}

                    <div className="customer-detail-item customer-detail-address">

                        <span className="customer-detail-label">

                            Address

                        </span>

                        <span className="customer-detail-value">

                            {customer.customerAddress || "-"}

                        </span>

                    </div>


                    {/* USERNAME */}

                    <div className="customer-detail-item">

                        <span className="customer-detail-label">

                            Username

                        </span>

                        <span className="customer-detail-value">

                            {customer.username || "-"}

                        </span>

                    </div>


                </div>


                {/* =================================================
                    RETURN BUTTON
                ================================================= */}

                <div className="customer-details-return">

                    <button
                        type="button"
                        onClick={returnBack}
                    >

                        ← Return Back

                    </button>

                </div>


            </div>

        </div>

    );

};

export default LoggedInCustomerDetails;