import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getAllLoans,
    addLoanAmountToAccount
} from "../../Services/LoanService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./AdminLoans.css";


const AdminLoans = () => {

    const navigate = useNavigate();

    const [loanList, setLoanList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD ADMIN LOANS
    // =====================================================

    useEffect(() => {

        loadLoans();

    }, []);


    const loadLoans = () => {

        setLoading(true);

        setError("");

        getAllLoans()

            .then((response) => {

                console.log(
                    "Admin Loan List:",
                    response.data
                );

                setLoanList(
                    response.data || []
                );

            })

            .catch((error) => {

                console.log(
                    "Admin Loan Report Error:",
                    error
                );

                setError(
                    "Unable to load admin loans"
                );

                toast.error(
                    "Unable to load admin loans"
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

        const value =
            Number(amount);

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
    // ADD AMOUNT TO ACCOUNT
    // =====================================================

    const handleAddAmount = (loan) => {

        // -------------------------------------------------
        // CHECK ACCOUNT
        // -------------------------------------------------

        if (!loan.accountNumber) {

            toast.error(
                "No account is linked with this loan"
            );

            return;

        }


        // -------------------------------------------------
        // CHECK WHETHER AMOUNT IS ALREADY ADDED
        // -------------------------------------------------

        if (loan.amountAdded === true) {

            toast.error(
                "Loan amount has already been added"
            );

            return;

        }


        // -------------------------------------------------
        // CONFIRMATION
        // -------------------------------------------------

        const confirmAdd =
            window.confirm(
                `Add ${formatAmount(
                    loan.loanAmount
                )} to account ${loan.accountNumber}?`
            );


        if (!confirmAdd) {

            return;

        }


        // -------------------------------------------------
        // CALL BACKEND
        // -------------------------------------------------

        addLoanAmountToAccount(
            loan.loanId
        )

        .then((response) => {

            console.log(
                "Loan amount added:",
                response.data
            );


            // =================================================
            // UPDATE ONLY THIS LOAN
            // =================================================

            setLoanList(
                (previousList) =>
                    previousList.map(
                        (item) => {

                            if (
                                item.loanId ===
                                loan.loanId
                            ) {

                                return {
                                    ...item,
                                    amountAdded: true
                                };

                            }

                            return item;

                        }
                    )
            );


            // =================================================
            // SUCCESS TOAST
            // =================================================

            toast.success(
                "Loan amount added to customer account successfully 💰"
            );

        })

        .catch((error) => {

            console.log(
                "Add loan amount error:",
                error
            );


            const message =
                error.response?.data?.message ||
                "Unable to add loan amount";


            toast.error(
                message
            );

        });

    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate(
            "/admin-menu"
        );

    };


    // =====================================================
    // ADD NEW LOAN
    // =====================================================

    const addNewLoan = () => {

        navigate(
            "/loan-addition"
        );

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="admin-loans-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-loans-heading">

                <div>

                    <h1>
                        Admin Loan Report
                    </h1>

                    <p>
                        Loans added directly by the administrator
                    </p>

                </div>


                <button
                    type="button"
                    className="admin-loans-add-btn"
                    onClick={addNewLoan}
                >

                    + Add New Loan

                </button>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="admin-loans-message">

                    <div className="admin-loans-spinner">
                    </div>

                    <p>
                        Loading admin loans...
                    </p>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading &&
                error && (

                    <div className="admin-loans-error">

                        <p>
                            ⚠ {error}
                        </p>


                        <button
                            type="button"
                            onClick={loadLoans}
                        >

                            Try Again

                        </button>

                    </div>

                )}


            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
                !error &&
                loanList.length === 0 && (

                    <div className="admin-loans-empty">

                        <div className="admin-loans-empty-icon">

                            💰

                        </div>


                        <h2>

                            No Admin Loans

                        </h2>


                        <p>

                            No loans have been added by
                            the administrator yet.

                        </p>


                        <button
                            type="button"
                            onClick={addNewLoan}
                        >

                            + Add Loan

                        </button>

                    </div>

                )}


            {/* =================================================
                TABLE
            ================================================= */}

            {!loading &&
                !error &&
                loanList.length > 0 && (

                    <div className="admin-loans-table-container">

                        <table className="admin-loans-table">

                            <thead>

                                <tr>

                                    <th>
                                        Loan ID
                                    </th>

                                    <th>
                                        Loan Type
                                    </th>

                                    <th>
                                        Account Number
                                    </th>

                                    <th>
                                        Loan Amount
                                    </th>

                                    <th>
                                        Interest Rate
                                    </th>

                                    <th>
                                        Loan Tenure
                                    </th>

                                    <th>
                                        Total Tenure
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
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loanList.map(
                                    (loan, index) => (

                                        <tr
                                            key={
                                                loan.loanId ||
                                                index
                                            }
                                        >


                                            {/* =================================================
                                                LOAN ID
                                            ================================================= */}

                                            <td>

                                                <span className="admin-loan-id-badge">

                                                    {
                                                        loan.loanId ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* =================================================
                                                LOAN TYPE
                                            ================================================= */}

                                            <td>

                                                <strong>

                                                    {
                                                        loan.loanType ||
                                                        "-"
                                                    }

                                                </strong>

                                            </td>


                                            {/* =================================================
                                                ACCOUNT NUMBER
                                            ================================================= */}

                                            <td>

                                                <span className="admin-account-id-badge">

                                                    {
                                                        loan.accountNumber ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* =================================================
                                                LOAN AMOUNT
                                            ================================================= */}

                                            <td>

                                                <strong>

                                                    {
                                                        formatAmount(
                                                            loan.loanAmount
                                                        )
                                                    }

                                                </strong>

                                            </td>


                                            {/* =================================================
                                                INTEREST RATE
                                            ================================================= */}

                                            <td>

                                                {
                                                    loan.interestRate ||
                                                    20
                                                }%

                                            </td>


                                            {/* =================================================
                                                LOAN TENURE
                                            ================================================= */}

                                            <td>

                                                {
                                                    loan.loanTenure ||
                                                    0
                                                } Years

                                            </td>


                                            {/* =================================================
                                                TOTAL TENURE
                                            ================================================= */}

                                            <td>

                                                {
                                                    loan.totalTenure ||
                                                    0
                                                } Months

                                            </td>


                                            {/* =================================================
                                                EMI
                                            ================================================= */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.emiPayable
                                                    )
                                                }

                                            </td>


                                            {/* =================================================
                                                TOTAL INTEREST
                                            ================================================= */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.totalInterestPayable
                                                    )
                                                }

                                            </td>


                                            {/* =================================================
                                                TOTAL COST
                                            ================================================= */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.totalCost
                                                    )
                                                }

                                            </td>


                                            {/* =================================================
                                                ACTION
                                            ================================================= */}

                                            <td>

                                                {
                                                    loan.amountAdded === true

                                                        ?

                                                        (

                                                            <span className="admin-loan-amount-added">

                                                                ✓ Amount Added

                                                            </span>

                                                        )

                                                        :

                                                        (

                                                            <button
                                                                type="button"
                                                                className="admin-loan-add-amount-btn"
                                                                onClick={() =>
                                                                    handleAddAmount(
                                                                        loan
                                                                    )
                                                                }
                                                            >

                                                                💰 Add Amount to Account

                                                            </button>

                                                        )
                                                }

                                            </td>


                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}


            {/* =================================================
                RETURN
            ================================================= */}

            <div className="admin-loans-return">

                <button
                    type="button"
                    onClick={returnBack}
                >

                    ← Return Back

                </button>

            </div>


        </div>

    );

};


export default AdminLoans;