import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    addCustomerLoan
} from "../../Services/CustomerLoanService";

import "./CustomerLoanRequestView.css";

const CustomerLoanRequestView = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // =====================================================
    // GET LOAN REQUEST FROM CUSTOMER LOAN ENTRY
    // =====================================================

    const loanRequest = location.state?.loanRequest;

    console.log(
        "Loan Request received:",
        loanRequest
    );


    // =====================================================
    // CONFIRM BUTTON LOADING
    // =====================================================

    const [confirming, setConfirming] =
        useState(false);


    // =====================================================
    // IF DATA NOT FOUND
    // =====================================================

    if (!loanRequest) {

        return (
            <div className="customer-loan-request-view-page">

                <div className="customer-loan-request-view-card">

                    <h2>
                        Customer Loan Request View
                    </h2>

                    <div className="loan-view-error">
                        Customer loan request details not found.
                    </div>

                    <div className="loan-view-button-area">

                        <button
                            className="loan-view-return-btn"
                            onClick={() => navigate(-1)}
                        >
                            Return Back
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // CONFIRM LOAN REQUEST
    // =====================================================

    const confirmLoanRequest = async () => {

        if (confirming) {
            return;
        }

        try {

            setConfirming(true);

            console.log(
                "Sending Customer Loan Request:",
                loanRequest
            );


            // =================================================
            // SEND REQUEST TO BACKEND
            // =================================================

            const response =
                await addCustomerLoan(
                    loanRequest
                );


            console.log(
                "Customer Loan Request Saved:",
                response.data
            );


            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            toast.success(
                "Loan request submitted successfully for admin approval!"
            );


            // =================================================
            // GO TO CUSTOMER MENU
            // =================================================

            setTimeout(() => {

                navigate(
                    "/customer-menu"
                );

            }, 1000);


        } catch (error) {

            console.error(
                "Customer Loan Request Error:",
                error
            );


            // =================================================
            // ERROR MESSAGE
            // =================================================

            if (
                error.response &&
                error.response.data
            ) {

                console.log(
                    "Backend Error:",
                    error.response.data
                );

            }


            toast.error(
                "Unable to submit loan request. Please try again."
            );

        } finally {

            setConfirming(false);

        }

    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate(-1);

    };


    // =====================================================
    // VIEW
    // =====================================================

    return (

        <div className="customer-loan-request-view-page">

            <div className="customer-loan-request-view-card">


                {/* =================================================
                    TITLE
                ================================================= */}

                <h2>
                    Customer Loan Request View
                </h2>


                {/* =================================================
                    LOAN DETAILS
                ================================================= */}

                <div className="customer-loan-details">


                    {/* CUSTOMER LOAN ID */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Customer Loan Id:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.customerLoanId}
                        </span>

                    </div>


                    {/* LOAN ID */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Id:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.loanId}
                        </span>

                    </div>


                    {/* LOAN TYPE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Type:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.loanType}
                        </span>

                    </div>


                    {/* INTEREST RATE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Interest Rate:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.interestRate}%
                        </span>

                    </div>


                    {/* LOAN AMOUNT */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Amount:
                        </span>

                        <span className="customer-loan-value">
                            ₹{Number(
                                loanRequest.loanAmount
                            ).toFixed(2)}
                        </span>

                    </div>


                    {/* TOTAL INTEREST */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Total Interest Need to Pay:
                        </span>

                        <span className="customer-loan-value">
                            ₹{Number(
                                loanRequest.totalInterestPayable
                            ).toFixed(2)}
                        </span>

                    </div>


                    {/* EMI */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            EMI:
                        </span>

                        <span className="customer-loan-value">
                            ₹{Number(
                                loanRequest.emiPayable
                            ).toFixed(2)}
                        </span>

                    </div>


                    {/* TOTAL TENURE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Total Tenures:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.totalTenure}
                        </span>

                    </div>


                    {/* PAID TENURE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Already Paid Tenures:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.paidTenure}
                        </span>

                    </div>


                    {/* AMOUNT PAID */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Amount Paid Till Date:
                        </span>

                        <span className="customer-loan-value">
                            ₹{Number(
                                loanRequest.amountPaidTillDate
                            ).toFixed(2)}
                        </span>

                    </div>


                    {/* TOTAL AMOUNT */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Total Amount Need to Pay:
                        </span>

                        <span className="customer-loan-value">
                            ₹{Number(
                                loanRequest.totalCost
                            ).toFixed(2)}
                        </span>

                    </div>


                    {/* SAVINGS ACCOUNT */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Saving Account:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.savingsAccountNumber}
                        </span>

                    </div>


                    {/* PAYMENT ACCOUNT */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Payment Account:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.paymentAccountNumber}
                        </span>

                    </div>


                    {/* LOAN DATE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Date:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.loanDate}
                        </span>

                    </div>


                    {/* STATUS */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Loan Status:
                        </span>

                        <span className="customer-loan-value loan-status-pending">
                            Pending
                        </span>

                    </div>


                    {/* COMPLETE DATE */}

                    <div className="customer-loan-row">

                        <span className="customer-loan-label">
                            Payment Complete Date:
                        </span>

                        <span className="customer-loan-value">
                            {loanRequest.completeDate || ""}
                        </span>

                    </div>


                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="loan-view-button-area">


                    {/* RETURN BACK */}

                    <button
                        className="loan-view-return-btn"
                        onClick={returnBack}
                        disabled={confirming}
                    >
                        Return Back
                    </button>


                    {/* CONFIRM */}

                    <button
                        className="loan-view-confirm-btn"
                        onClick={confirmLoanRequest}
                        disabled={confirming}
                    >

                        {confirming
                            ? "Submitting..."
                            : "Confirm"
                        }

                    </button>


                </div>


            </div>

        </div>
    );
};

export default CustomerLoanRequestView;