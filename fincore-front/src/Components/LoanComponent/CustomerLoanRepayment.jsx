import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    makeLoanPayment
} from "../../Services/PaymentService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./CustomerLoanRepayment.css";


const CustomerLoanRepayment = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const loan = location.state?.loan;

    const [loading, setLoading] = useState(false);


    // =====================================================
    // IF LOAN DETAILS ARE NOT AVAILABLE
    // =====================================================

    if (!loan) {

        return (

            <div className="customer-loan-repayment-page">

                <div className="customer-loan-repayment-card repayment-not-found">

                    <div className="repayment-icon">
                        ⚠️
                    </div>

                    <h2>
                        Loan Repayment
                    </h2>

                    <p>
                        Loan details not found.
                    </p>

                    <button
                        type="button"
                        className="repayment-back-btn"
                        onClick={() =>
                            navigate("/personal-loan")
                        }
                    >
                        ← Return to My Loans
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // FORMAT AMOUNT
    // =====================================================

    const formatAmount = (amount) => {

        const value = Number(amount || 0);

        return `₹${value.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;

    };


    // =====================================================
    // REMAINING TENURE
    // =====================================================

    const totalTenure =
        Number(loan.totalTenure || 0);

    const paidTenure =
        Number(loan.paidTenure || 0);

    const remainingTenure =
        Math.max(
            totalTenure - paidTenure,
            0
        );


    // =====================================================
    // MAKE PAYMENT
    // =====================================================

    const makePayment = async () => {

        try {

            setLoading(true);

            const response =
                await makeLoanPayment(
                    loan.customerLoanId
                );


            toast.success(
                response.data ||
                "Loan EMI paid successfully"
            );


            navigate(
                "/personal-loan-view"
            );


        } catch (error) {

            console.error(
                "Loan payment error:",
                error
            );


            toast.error(
                error.response?.data ||
                "Unable to make loan payment"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-loan-repayment-page">

            <div className="customer-loan-repayment-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="repayment-header">

                    <div className="repayment-header-icon">
                        💳
                    </div>

                    <div>

                        <h2>
                            Loan Repayment
                        </h2>

                        <p className="repayment-subtitle">
                            Review your EMI details before making payment.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    LOAN SUMMARY
                ================================================= */}

                <div className="repayment-summary">

                    <div className="repayment-summary-item">

                        <span>
                            Customer Loan ID
                        </span>

                        <strong>
                            {loan.customerLoanId || "-"}
                        </strong>

                    </div>


                    <div className="repayment-summary-item">

                        <span>
                            Loan Type
                        </span>

                        <strong>
                            {loan.loanType || "-"}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="repayment-details">


                    {/* LOAN ID */}

                    <div className="repayment-row">

                        <span>
                            Loan ID
                        </span>

                        <strong>
                            {loan.loanId || "-"}
                        </strong>

                    </div>


                    {/* LOAN AMOUNT */}

                    <div className="repayment-row">

                        <span>
                            Loan Amount
                        </span>

                        <strong>
                            {formatAmount(loan.loanAmount)}
                        </strong>

                    </div>


                    {/* EMI */}

                    <div className="repayment-row repayment-highlight">

                        <span>
                            EMI Amount
                        </span>

                        <strong className="repayment-emi">
                            {formatAmount(loan.emiPayable)}
                        </strong>

                    </div>


                    {/* INTEREST RATE */}

                    <div className="repayment-row">

                        <span>
                            Interest Rate
                        </span>

                        <strong>
                            {loan.interestRate || 0}%
                        </strong>

                    </div>


                    {/* PAID TENURE */}

                    <div className="repayment-row">

                        <span>
                            Paid Tenures
                        </span>

                        <strong>
                            {paidTenure} Months
                        </strong>

                    </div>


                    {/* TOTAL TENURE */}

                    <div className="repayment-row">

                        <span>
                            Total Tenure
                        </span>

                        <strong>
                            {totalTenure} Months
                        </strong>

                    </div>


                    {/* REMAINING TENURE */}

                    <div className="repayment-row">

                        <span>
                            Remaining Tenures
                        </span>

                        <strong>
                            {remainingTenure} Months
                        </strong>

                    </div>


                    {/* AMOUNT PAID */}

                    <div className="repayment-row">

                        <span>
                            Amount Paid Till Date
                        </span>

                        <strong>
                            {formatAmount(
                                loan.amountPaidTillDate
                            )}
                        </strong>

                    </div>


                    {/* TOTAL INTEREST */}

                    <div className="repayment-row">

                        <span>
                            Total Interest
                        </span>

                        <strong>
                            {formatAmount(
                                loan.totalInterestPayable
                            )}
                        </strong>

                    </div>


                    {/* TOTAL COST */}

                    <div className="repayment-row">

                        <span>
                            Total Loan Cost
                        </span>

                        <strong>
                            {formatAmount(
                                loan.totalCost
                            )}
                        </strong>

                    </div>


                    {/* SAVINGS ACCOUNT */}

                    <div className="repayment-row">

                        <span>
                            Savings Account
                        </span>

                        <strong>
                            {loan.savingsAccountNumber || "-"}
                        </strong>

                    </div>


                    {/* LOAN ACCOUNT */}

                    <div className="repayment-row">

                        <span>
                            Loan Account
                        </span>

                        <strong>
                            {loan.paymentAccountNumber || "-"}
                        </strong>

                    </div>


                </div>


                {/* =================================================
                    WARNING
                ================================================= */}

                <div className="repayment-warning">

                    <div className="repayment-warning-icon">
                        ℹ️
                    </div>

                    <p>
                        Your EMI of{" "}
                        <strong>
                            {formatAmount(loan.emiPayable)}
                        </strong>{" "}
                        will be deducted from your savings account.
                    </p>

                </div>


                {/* =================================================
                    PAYMENT INFORMATION
                ================================================= */}

                <div className="repayment-payment-info">

                    <div>

                        <span>
                            Next EMI
                        </span>

                        <strong>
                            {formatAmount(loan.emiPayable)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            EMI Number
                        </span>

                        <strong>
                            {paidTenure + 1}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Remaining
                        </span>

                        <strong>
                            {remainingTenure}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="repayment-buttons">

                    <button
                        type="button"
                        className="repayment-cancel-btn"
                        onClick={() =>
                            navigate(-1)
                        }
                        disabled={loading}
                    >

                        ← Cancel

                    </button>


                    <button
                        type="button"
                        className="repayment-pay-btn"
                        onClick={makePayment}
                        disabled={
                            loading ||
                            remainingTenure <= 0
                        }
                    >

                        {loading ? (
                            <>
                                <span className="repayment-button-spinner">
                                </span>

                                Processing...
                            </>
                        ) : (
                            <>
                                💳 Pay EMI
                            </>
                        )}

                    </button>

                </div>


            </div>

        </div>

    );

};


export default CustomerLoanRepayment;