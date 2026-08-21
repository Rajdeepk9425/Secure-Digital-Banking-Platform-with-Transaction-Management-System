import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getMyCustomerLoans
} from "../../Services/CustomerLoanService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./PersonalLoanView.css";


const PersonalLoanView = () => {

    const navigate = useNavigate();

    const [loanList, setLoanList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD CUSTOMER LOANS
    // =====================================================

    useEffect(() => {

        loadLoans();

    }, []);


    const loadLoans = () => {

        setLoading(true);
        setError("");

        getMyCustomerLoans()

            .then((response) => {

                console.log(
                    "My Customer Loans:",
                    response.data
                );

                setLoanList(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Personal Loan View Error:",
                    error
                );

                setLoanList([]);

                setError(
                    "Unable to load your loans"
                );

                toast.error(
                    "Unable to load your loans"
                );

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // =====================================================
    // FORMAT AMOUNT
    // =====================================================

    const formatAmount = (amount) => {

        const value = Number(amount);

        if (isNaN(value)) {
            return "₹0.00";
        }

        return `₹${value.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;

    };


    // =====================================================
    // STATUS TEXT
    // =====================================================

    const getStatusText = (status) => {

        const value =
            String(status || "")
                .trim()
                .toUpperCase();


        switch (value) {

            case "P":
                return "Applied";

            case "A":
            case "APPROVED":
            case "ACCEPTED":
                return "Accepted";

            case "D":
                return "Amount Added";

            case "C":
                return "Completed";

            case "R":
            case "REJECTED":
                return "Rejected";

            default:
                return value || "Unknown";

        }

    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        const value =
            String(status || "")
                .trim()
                .toUpperCase();


        switch (value) {

            case "P":
                return "personal-loan-status-pending";

            case "A":
            case "APPROVED":
            case "ACCEPTED":
                return "personal-loan-status-accepted";

            case "D":
                return "personal-loan-status-added";

            case "C":
                return "personal-loan-status-completed";

            case "R":
            case "REJECTED":
                return "personal-loan-status-rejected";

            default:
                return "personal-loan-status-default";

        }

    };


    // =====================================================
    // PAYMENT
    // =====================================================

    const payLoan = (loan) => {

        navigate(
            "/customer-loan-payment",
            {
                state: {
                    loan
                }
            }
        );

    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate("/customer-menu");

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="personal-loan-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="personal-loan-heading">

                <div className="personal-loan-heading-icon">
                    💰
                </div>

                <h1>
                    My Personal Loans
                </h1>

                <p>
                    View your applied, accepted and rejected loans
                </p>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="personal-loan-message">

                    <div className="personal-loan-spinner">
                    </div>

                    <p>
                        Loading your loans...
                    </p>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading && error && (

                <div className="personal-loan-error">

                    <div className="personal-loan-error-icon">
                        ⚠️
                    </div>

                    <h3>
                        Unable to Load Loans
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="personal-loan-retry-btn"
                        onClick={loadLoans}
                    >
                        ↻ Try Again
                    </button>

                </div>

            )}


            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
                !error &&
                loanList.length === 0 && (

                    <div className="personal-loan-empty">

                        <div className="personal-loan-empty-icon">
                            💰
                        </div>

                        <h2>
                            No Loans Found
                        </h2>

                        <p>
                            You have not applied for any loans yet.
                        </p>

                    </div>

                )}


            {/* =================================================
                LOAN LIST
            ================================================= */}

            {!loading &&
                !error &&
                loanList.length > 0 && (

                    <div className="personal-loan-list">

                        {loanList.map(
                            (loan, index) => {

                                const status =
                                    String(
                                        loan.status || ""
                                    )
                                        .trim()
                                        .toUpperCase();


                                const paidTenure =
                                    Number(
                                        loan.paidTenure || 0
                                    );


                                const totalTenure =
                                    Number(
                                        loan.totalTenure || 0
                                    );


                                const remainingTenure =
                                    Math.max(
                                        totalTenure -
                                        paidTenure,
                                        0
                                    );


                                const isPaymentAvailable =
                                    status === "D" &&
                                    paidTenure <
                                    totalTenure;


                                return (

                                    <div
                                        className="personal-loan-card"
                                        key={
                                            loan.customerLoanId ||
                                            index
                                        }
                                    >


                                        {/* =========================================
                                            CARD HEADER
                                        ========================================= */}

                                        <div className="personal-loan-card-header">

                                            <div className="personal-loan-card-title">

                                                <span className="personal-loan-label">
                                                    Customer Loan ID
                                                </span>

                                                <h2>
                                                    {
                                                        loan.customerLoanId ||
                                                        "-"
                                                    }
                                                </h2>

                                            </div>


                                            <span
                                                className={
                                                    `personal-loan-status ${
                                                        getStatusClass(
                                                            loan.status
                                                        )
                                                    }`
                                                }
                                            >
                                                {
                                                    getStatusText(
                                                        loan.status
                                                    )
                                                }
                                            </span>

                                        </div>


                                        {/* =========================================
                                            DETAILS
                                        ========================================= */}

                                        <div className="personal-loan-details">


                                            <div className="personal-loan-detail loan-type-detail">

                                                <span>
                                                    Loan Type
                                                </span>

                                                <strong>
                                                    {
                                                        loan.loanType ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Loan ID
                                                </span>

                                                <strong>
                                                    {
                                                        loan.loanId ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Loan Amount
                                                </span>

                                                <strong className="personal-loan-amount">
                                                    {
                                                        formatAmount(
                                                            loan.loanAmount
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Interest Rate
                                                </span>

                                                <strong>
                                                    {
                                                        loan.interestRate ||
                                                        0
                                                    }%
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    EMI
                                                </span>

                                                <strong>
                                                    {
                                                        formatAmount(
                                                            loan.emiPayable
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Loan Tenure
                                                </span>

                                                <strong>
                                                    {
                                                        loan.loanTenure ||
                                                        "-"
                                                    } Years
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Total Tenure
                                                </span>

                                                <strong>
                                                    {
                                                        totalTenure
                                                    } Months
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Paid Tenures
                                                </span>

                                                <strong>
                                                    {
                                                        paidTenure
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Remaining Tenures
                                                </span>

                                                <strong className="remaining-tenure">
                                                    {
                                                        remainingTenure
                                                    } Months
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Total Interest
                                                </span>

                                                <strong>
                                                    {
                                                        formatAmount(
                                                            loan.totalInterestPayable
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Total Cost
                                                </span>

                                                <strong>
                                                    {
                                                        formatAmount(
                                                            loan.totalCost
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Amount Paid
                                                </span>

                                                <strong>
                                                    {
                                                        formatAmount(
                                                            loan.amountPaidTillDate
                                                        )
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Loan Date
                                                </span>

                                                <strong>
                                                    {
                                                        loan.loanDate ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Savings Account
                                                </span>

                                                <strong>
                                                    {
                                                        loan.savingsAccountNumber ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="personal-loan-detail">

                                                <span>
                                                    Loan Account
                                                </span>

                                                <strong>
                                                    {
                                                        loan.paymentAccountNumber ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                        </div>


                                        {/* =========================================
                                            STATUS MESSAGE
                                        ========================================= */}

                                        {status === "P" && (

                                            <div className="personal-loan-info pending">

                                                <span className="status-message-icon">
                                                    ⏳
                                                </span>

                                                <div>

                                                    <strong>
                                                        Loan Application Pending
                                                    </strong>

                                                    <p>
                                                        Your loan application is waiting
                                                        for admin approval.
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {status === "A" && (

                                            <div className="personal-loan-info accepted">

                                                <span className="status-message-icon">
                                                    ✓
                                                </span>

                                                <div>

                                                    <strong>
                                                        Loan Approved
                                                    </strong>

                                                    <p>
                                                        Your loan has been approved by
                                                        the administrator.
                                                        Waiting for the loan amount
                                                        to be credited to your savings account.
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {status === "D" && (

                                            <div className="personal-loan-info added">

                                                <span className="status-message-icon">
                                                    ✓
                                                </span>

                                                <div>

                                                    <strong>
                                                        Loan Amount Added
                                                    </strong>

                                                    <p>
                                                        Loan amount has been added to
                                                        your savings account.
                                                        You can now repay your loan.
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {status === "C" && (

                                            <div className="personal-loan-info completed">

                                                <span className="status-message-icon">
                                                    🎉
                                                </span>

                                                <div>

                                                    <strong>
                                                        Loan Completed
                                                    </strong>

                                                    <p>
                                                        Congratulations! Your loan
                                                        has been completely repaid.
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {status === "R" && (

                                            <div className="personal-loan-info rejected">

                                                <span className="status-message-icon">
                                                    ✕
                                                </span>

                                                <div>

                                                    <strong>
                                                        Loan Rejected
                                                    </strong>

                                                    <p>
                                                        Your loan application has
                                                        been rejected.
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {/* =========================================
                                            PAYMENT AREA
                                        ========================================= */}

                                        {isPaymentAvailable && (

                                            <div className="personal-loan-payment-area">

                                                <div className="personal-loan-payment-summary">


                                                    <div className="payment-summary-item">

                                                        <span>
                                                            Next EMI
                                                        </span>

                                                        <strong>
                                                            {
                                                                formatAmount(
                                                                    loan.emiPayable
                                                                )
                                                            }
                                                        </strong>

                                                    </div>


                                                    <div className="payment-summary-item">

                                                        <span>
                                                            EMI Number
                                                        </span>

                                                        <strong>
                                                            {
                                                                paidTenure + 1
                                                            }
                                                        </strong>

                                                    </div>


                                                    <div className="payment-summary-item">

                                                        <span>
                                                            Remaining
                                                        </span>

                                                        <strong>
                                                            {
                                                                remainingTenure
                                                            } Months
                                                        </strong>

                                                    </div>


                                                </div>


                                                <button
                                                    type="button"
                                                    className="personal-loan-pay-btn"
                                                    onClick={() =>
                                                        payLoan(loan)
                                                    }
                                                >

                                                    <span>
                                                        💳
                                                    </span>

                                                    Pay EMI

                                                </button>

                                            </div>

                                        )}


                                        {/* =========================================
                                            COMPLETED
                                        ========================================= */}

                                        {status === "C" && (

                                            <div className="personal-loan-completed-area">

                                                <span>
                                                    ✓ All EMI payments completed
                                                </span>

                                            </div>

                                        )}

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}


            {/* =================================================
                RETURN
            ================================================= */}

            <div className="personal-loan-return">

                <button
                    type="button"
                    onClick={returnBack}
                >
                    ← Return to Customer Menu
                </button>

            </div>


        </div>

    );

};


export default PersonalLoanView;