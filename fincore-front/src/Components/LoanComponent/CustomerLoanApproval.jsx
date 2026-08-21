import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../DisplayView.css";
import "./CustomerLoanApproval.css";


const CustomerLoanApproval = () => {

    const navigate = useNavigate();

    const [loanList, setLoanList] = useState([]);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // TOAST STATE
    // =====================================================

    const [toast, setToast] = useState({
        show: false,
        type: "",
        message: ""
    });

    const toastTimerRef = useRef(null);


    // =====================================================
    // SHOW TOAST
    // =====================================================

    const showToast = (type, message) => {

        // Clear previous timer
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        setToast({
            show: true,
            type: type,
            message: message
        });

        // Hide toast after 3 seconds
        toastTimerRef.current = setTimeout(() => {

            setToast({
                show: false,
                type: "",
                message: ""
            });

        }, 3000);
    };


    // =====================================================
    // CLEAR TOAST TIMER
    // =====================================================

    useEffect(() => {

        return () => {

            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }

        };

    }, []);


    // =====================================================
    // LOAD PENDING CUSTOMER LOANS
    // =====================================================

    const loadPendingLoans = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:9797/fincore/customer-loan/pending",
                {
                    method: "GET",
                    credentials: "include"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load pending loans"
                );

            }


            const data = await response.json();


            console.log(
                "Pending Customer Loans:",
                data
            );


            setLoanList(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (err) {

            console.error(
                "Loading pending loans error:",
                err
            );


            showToast(
                "error",
                "Unable to load pending customer loans."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadPendingLoans();

    }, []);


    // =====================================================
    // APPROVE LOAN
    // =====================================================

    const approveLoan = async (
        customerLoanId
    ) => {

        try {

            const response = await fetch(
                `http://localhost:9797/fincore/customer-loan/approve/${customerLoanId}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );


            const result =
                await response.text();


            console.log(
                "Approve response:",
                result
            );


            if (!response.ok) {

                throw new Error(
                    result ||
                    "Unable to approve loan."
                );

            }


            // Remove approved loan
            // from pending list

            setLoanList(
                (previousList) =>
                    previousList.filter(
                        (loan) =>
                            loan.customerLoanId !==
                            customerLoanId
                    )
            );


            // Show success toast

            showToast(
                "success",
                "Loan approved successfully."
            );

        }

        catch (err) {

            console.error(
                "Loan approval error:",
                err
            );


            showToast(
                "error",
                err.message ||
                "Unable to approve loan."
            );

        }

    };


    // =====================================================
    // REJECT LOAN
    // =====================================================

    const rejectLoan = async (
        customerLoanId
    ) => {

        try {

            const response = await fetch(
                `http://localhost:9797/fincore/customer-loan/reject/${customerLoanId}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );


            const result =
                await response.text();


            console.log(
                "Reject response:",
                result
            );


            if (!response.ok) {

                throw new Error(
                    result ||
                    "Unable to reject loan."
                );

            }


            // Remove rejected loan
            // from pending list

            setLoanList(
                (previousList) =>
                    previousList.filter(
                        (loan) =>
                            loan.customerLoanId !==
                            customerLoanId
                    )
            );


            // Show success toast

            showToast(
                "success",
                "Loan rejected successfully."
            );

        }

        catch (err) {

            console.error(
                "Loan rejection error:",
                err
            );


            showToast(
                "error",
                err.message ||
                "Unable to reject loan."
            );

        }

    };


    // =====================================================
    // RETURN TO ADMIN MENU
    // =====================================================

    const returnBack = () => {

        navigate(
            "/admin-menu"
        );

    };


    // =====================================================
    // FORMAT CURRENCY
    // =====================================================

    const formatCurrency = (value) => {

        return Number(
            value || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    // =====================================================
    // RETURN UI
    // =====================================================

    return (

        <div className="loan-report-page">


            {/* =================================================
                TOAST NOTIFICATION
            ================================================= */}

            {toast.show && (

                <div
                    className={`toast ${
                        toast.type === "success"
                            ? "toast-success"
                            : "toast-error"
                    }`}
                >

                    <div className="toast-icon">

                        {toast.type === "success"
                            ? "✓"
                            : "✕"
                        }

                    </div>


                    <div className="toast-content">

                        <strong>
                            {toast.type === "success"
                                ? "Success"
                                : "Error"
                            }
                        </strong>

                        <span>
                            {toast.message}
                        </span>

                    </div>


                    <button
                        type="button"
                        className="toast-close"
                        onClick={() => {

                            if (toastTimerRef.current) {
                                clearTimeout(
                                    toastTimerRef.current
                                );
                            }

                            setToast({
                                show: false,
                                type: "",
                                message: ""
                            });

                        }}
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="loan-page-header">

                <div>

                    <h1 className="loan-report-heading">

                        Customer Loan Approval

                    </h1>


                    <p className="loan-report-subtitle">

                        Review customer loan requests
                        awaiting approval

                    </p>

                </div>


                <div className="loan-pending-count">

                    <span>
                        Pending Requests
                    </span>

                    <strong>
                        {loanList.length}
                    </strong>

                </div>

            </div>


            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div className="loan-approval-container">


                {/* =================================================
                    APPROVAL HEADER
                ================================================= */}

                <div className="loan-approval-header">

                    <div className="loan-approval-icon">

                        ⏳

                    </div>


                    <div>

                        <h2>

                            Customer Approval Queue

                        </h2>


                        <p>

                            Accept or reject pending
                            customer loan requests

                        </p>

                    </div>

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="loan-loading">

                        <div className="loan-loading-icon">

                            ⏳

                        </div>

                        <p>

                            Loading pending loans...

                        </p>

                    </div>

                )}


                {/* =================================================
                    EMPTY
                ================================================= */}

                {!loading &&
                    loanList.length === 0 && (

                        <div className="loan-empty">

                            <div className="loan-empty-icon">

                                ✓

                            </div>


                            <h3>

                                No Pending Loans

                            </h3>


                            <p>

                                There are currently no
                                customer loan applications
                                waiting for approval.

                            </p>

                        </div>

                    )}


                {/* =================================================
                    LOAN TABLE
                ================================================= */}

                {!loading &&
                    loanList.length > 0 && (

                        <div className="loan-table-wrapper">

                            <table className="loan-report-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Customer Loan ID
                                        </th>

                                        <th>
                                            Customer ID
                                        </th>

                                        <th>
                                            Loan ID
                                        </th>

                                        <th>
                                            Loan Type
                                        </th>

                                        <th>
                                            Loan Amount
                                        </th>

                                        <th>
                                            Loan Tenure
                                        </th>

                                        <th>
                                            Total Tenure
                                        </th>

                                        <th>
                                            Interest Rate
                                        </th>

                                        <th>
                                            EMI
                                        </th>

                                        <th>
                                            Total Interest
                                        </th>

                                        <th>
                                            Total Cost
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                {/* =================================================
                                    TABLE BODY
                                ================================================= */}

                                <tbody>

                                    {loanList.map(
                                        (loan) => (

                                            <tr
                                                key={
                                                    loan.customerLoanId
                                                }
                                            >

                                                {/* CUSTOMER LOAN ID */}

                                                <td>

                                                    {
                                                        loan.customerLoanId
                                                    }

                                                </td>


                                                {/* CUSTOMER ID */}

                                                <td>

                                                    {
                                                        loan.customerId
                                                    }

                                                </td>


                                                {/* LOAN ID */}

                                                <td>

                                                    {
                                                        loan.loanId
                                                    }

                                                </td>


                                                {/* LOAN TYPE */}

                                                <td>

                                                    {
                                                        loan.loanType ||
                                                        "Personal Loan"
                                                    }

                                                </td>


                                                {/* LOAN AMOUNT */}

                                                <td>

                                                    ₹
                                                    {formatCurrency(
                                                        loan.loanAmount
                                                    )}

                                                </td>


                                                {/* LOAN TENURE */}

                                                <td>

                                                    {
                                                        loan.loanTenure ||
                                                        loan.paidTenure ||
                                                        0
                                                    }

                                                    {" "}

                                                    Year(s)

                                                </td>


                                                {/* TOTAL TENURE */}

                                                <td>

                                                    {
                                                        loan.totalTenure ||
                                                        0
                                                    }

                                                    {" "}

                                                    Months

                                                </td>


                                                {/* INTEREST RATE */}

                                                <td>

                                                    {Number(
                                                        loan.interestRate ||
                                                        0
                                                    ).toFixed(2)}

                                                    %

                                                </td>


                                                {/* EMI */}

                                                <td>

                                                    ₹
                                                    {formatCurrency(
                                                        loan.emiPayable
                                                    )}

                                                </td>


                                                {/* TOTAL INTEREST */}

                                                <td>

                                                    ₹
                                                    {formatCurrency(
                                                        loan.totalInterestPayable
                                                    )}

                                                </td>


                                                {/* TOTAL COST */}

                                                <td>

                                                    ₹
                                                    {formatCurrency(
                                                        loan.totalCost
                                                    )}

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span className="loan-pending-status">

                                                        ⏳ Pending

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="loan-action-buttons">


                                                        {/* ACCEPT */}

                                                        <button
                                                            type="button"
                                                            className="apply-loan-btn"
                                                            onClick={() =>
                                                                approveLoan(
                                                                    loan.customerLoanId
                                                                )
                                                            }
                                                        >

                                                            ✓ Accept

                                                        </button>


                                                        {/* REJECT */}

                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                rejectLoan(
                                                                    loan.customerLoanId
                                                                )
                                                            }
                                                        >

                                                            ✕ Reject

                                                        </button>


                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}


                {/* =================================================
                    RETURN BUTTON
                ================================================= */}

                <div className="loan-report-return">

                    <button
                        type="button"
                        onClick={returnBack}
                    >

                        ← Back to Admin Menu

                    </button>

                </div>


            </div>

        </div>

    );

};


export default CustomerLoanApproval;