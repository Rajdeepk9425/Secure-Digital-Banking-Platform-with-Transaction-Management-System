import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getCustomerLoansByCustomerIdForAdmin
} from "../../Services/CustomerLoanService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./CustomerWiseLoanReport.css";

const CustomerWiseLoanReport = () => {

    const navigate = useNavigate();

    const [customerId, setCustomerId] = useState("");
    const [loans, setLoans] = useState([]);

    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");


    // =====================================================
    // SEARCH CUSTOMER LOANS
    // =====================================================

    const searchLoans = () => {

        if (!customerId.trim()) {

            toast.error("Please enter Customer ID");

            return;
        }


        if (!/^\d+$/.test(customerId.trim())) {

            toast.error(
                "Customer ID must contain numbers only"
            );

            return;
        }


        setLoading(true);
        setError("");
        setSearched(true);


        getCustomerLoansByCustomerIdForAdmin(
            customerId.trim()
        )

        .then((response) => {

            console.log(
                "Customer Loans:",
                response.data
            );


            setLoans(
                response.data || []
            );


            if (
                !response.data ||
                response.data.length === 0
            ) {

                toast.error(
                    "No loans found for this customer"
                );

            }

        })

        .catch((error) => {

            console.log(
                "Customer Wise Loan Report Error:",
                error
            );


            setLoans([]);


            setError(
                "Unable to load customer loans"
            );


            toast.error(
                "Unable to load customer loans"
            );

        })

        .finally(() => {

            setLoading(false);

        });

    };


    // =====================================================
    // CLEAR
    // =====================================================

    const clearSearch = () => {

        setCustomerId("");
        setLoans([]);
        setError("");
        setSearched(false);

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
    // STATUS
    // =====================================================

    const getStatusText = (status) => {

        switch (
            String(status).toUpperCase()
        ) {

            case "P":
                return "Pending";

            case "A":
                return "Approved";

            case "R":
                return "Rejected";

            case "D":
                return "Amount Added";

            default:
                return status || "-";

        }

    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate("/admin-menu");

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-wise-loan-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="customer-wise-loan-heading">

                <h1>
                    Customer Wise Loan Report
                </h1>

                <p>
                    View all loans belonging to a particular customer
                </p>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="customer-wise-loan-search">

                <div className="customer-wise-loan-search-content">

                    <label>
                        Customer ID
                    </label>


                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) =>
                            setCustomerId(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                searchLoans();

                            }

                        }}
                        placeholder="Enter Customer ID"
                    />


                    <button
                        type="button"
                        className="customer-wise-loan-search-btn"
                        onClick={searchLoans}
                        disabled={loading}
                    >

                        {loading
                            ? "Searching..."
                            : "🔍 Search"
                        }

                    </button>


                    {searched && (

                        <button
                            type="button"
                            className="customer-wise-loan-clear-btn"
                            onClick={clearSearch}
                        >

                            Clear

                        </button>

                    )}

                </div>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="customer-wise-loan-message">

                    <div className="customer-wise-loan-spinner">
                    </div>

                    <p>
                        Loading customer loans...
                    </p>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading &&
                error && (

                    <div className="customer-wise-loan-error">

                        <p>
                            ⚠ {error}
                        </p>

                        <button
                            type="button"
                            onClick={searchLoans}
                        >

                            Try Again

                        </button>

                    </div>

                )}


            {/* =================================================
                CUSTOMER INFO
            ================================================= */}

            {!loading &&
                !error &&
                searched &&
                loans.length > 0 && (

                    <div className="customer-wise-loan-info">

                        <span>
                            Customer ID
                        </span>

                        <strong>
                            {customerId}
                        </strong>

                        <span>
                            Total Loans
                        </span>

                        <strong>
                            {loans.length}
                        </strong>

                    </div>

                )}


            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
                !error &&
                searched &&
                loans.length === 0 && (

                    <div className="customer-wise-loan-empty">

                        <div className="customer-wise-loan-empty-icon">
                            💰
                        </div>

                        <h2>
                            No Loans Found
                        </h2>

                        <p>
                            No loans are available for Customer ID{" "}
                            <strong>
                                {customerId}
                            </strong>.
                        </p>

                    </div>

                )}


            {/* =================================================
                LOAN TABLE
            ================================================= */}

            {!loading &&
                !error &&
                loans.length > 0 && (

                    <div className="customer-wise-loan-table-container">

                        <table className="customer-wise-loan-table">

                            <thead>

                                <tr>

                                    <th>
                                        Customer Loan ID
                                    </th>

                                    <th>
                                        Loan ID
                                    </th>

                                    {/* =================================================
                                        LOAN TYPE
                                    ================================================= */}

                                    <th>
                                        Loan Type
                                    </th>

                                    <th>
                                        Customer ID
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
                                        Savings Account
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loans.map(
                                    (loan, index) => (

                                        <tr
                                            key={
                                                loan.customerLoanId ||
                                                index
                                            }
                                        >

                                            {/* CUSTOMER LOAN ID */}

                                            <td>

                                                <span className="customer-loan-id-badge">

                                                    {
                                                        loan.customerLoanId ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* LOAN ID */}

                                            <td>

                                                <span className="customer-loan-id-badge">

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


                                            {/* CUSTOMER ID */}

                                            <td>

                                                {
                                                    loan.customerId ||
                                                    customerId
                                                }

                                            </td>


                                            {/* LOAN AMOUNT */}

                                            <td>

                                                <strong className="customer-loan-amount">

                                                    {
                                                        formatAmount(
                                                            loan.loanAmount
                                                        )
                                                    }

                                                </strong>

                                            </td>


                                            {/* INTEREST */}

                                            <td>

                                                <strong className="customer-loan-interest">

                                                    {
                                                        loan.interestRate ||
                                                        20
                                                    }%

                                                </strong>

                                            </td>


                                            {/* LOAN TENURE */}

                                            <td>

                                                {
                                                    loan.loanTenure ||
                                                    "-"
                                                }

                                                {loan.loanTenure &&
                                                    " Years"}

                                            </td>


                                            {/* TOTAL TENURE */}

                                            <td>

                                                {
                                                    loan.totalTenure ||
                                                    "-"
                                                }

                                                {loan.totalTenure &&
                                                    " Months"}

                                            </td>


                                            {/* EMI */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.emiPayable
                                                    )
                                                }

                                            </td>


                                            {/* TOTAL INTEREST */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.totalInterestPayable
                                                    )
                                                }

                                            </td>


                                            {/* TOTAL COST */}

                                            <td>

                                                {
                                                    formatAmount(
                                                        loan.totalCost
                                                    )
                                                }

                                            </td>


                                            {/* SAVINGS ACCOUNT */}

                                            <td>

                                                <span className="customer-loan-account-badge">

                                                    {
                                                        loan.savingsAccountNumber ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        `customer-loan-status customer-loan-status-${String(
                                                            loan.status || ""
                                                        ).toLowerCase()}`
                                                    }
                                                >

                                                    {
                                                        getStatusText(
                                                            loan.status
                                                        )
                                                    }

                                                </span>

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

            <div className="customer-wise-loan-return">

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

export default CustomerWiseLoanReport;