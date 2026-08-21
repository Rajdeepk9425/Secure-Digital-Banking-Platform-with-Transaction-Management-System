import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getCustomerAccountsByCustomerId
} from "../../Services/AccountService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./CustomerWiseAccountReport.css";

const CustomerWiseAccountReport = () => {

    const navigate = useNavigate();

    const [customerId, setCustomerId] = useState("");
    const [accounts, setAccounts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");


    // =====================================================
    // SEARCH CUSTOMER ACCOUNTS
    // =====================================================

    const searchAccounts = () => {

        if (!customerId.trim()) {

            toast.error("Please enter Customer ID");

            return;
        }


        if (!/^\d+$/.test(customerId.trim())) {

            toast.error("Customer ID must contain numbers only");

            return;
        }


        setLoading(true);
        setError("");
        setSearched(true);



       getCustomerAccountsByCustomerId(customerId)
        .then((response) => {

            console.log(
                "Customer Accounts:",
                response.data
            );


            setAccounts(
                response.data || []
            );


            if (
                !response.data ||
                response.data.length === 0
            ) {

                toast.error(
                    "No accounts found for this customer"
                );

            }

        })

        .catch((error) => {

            console.log(
                "Customer Wise Account Report Error:",
                error
            );


            setAccounts([]);


            setError(
                "Unable to load customer accounts"
            );


            toast.error(
                "Unable to load customer accounts"
            );

        })

        .finally(() => {

            setLoading(false);

        });

    };


    // =====================================================
    // CLEAR SEARCH
    // =====================================================

    const clearSearch = () => {

        setCustomerId("");
        setAccounts([]);
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
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate("/admin-menu");

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-wise-account-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="customer-wise-account-heading">

                <h1>
                    Customer Wise Account Report
                </h1>

                <p>
                    View all accounts belonging to a particular customer
                </p>

            </div>


            {/* =================================================
                SEARCH BOX
            ================================================= */}

            <div className="customer-wise-account-search">

                <div className="customer-wise-account-search-content">

                    <label>
                        Customer ID
                    </label>


                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) =>
                            setCustomerId(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                searchAccounts();

                            }

                        }}
                        placeholder="Enter Customer ID"
                    />


                    <button
                        type="button"
                        className="customer-wise-account-search-btn"
                        onClick={searchAccounts}
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
                            className="customer-wise-account-clear-btn"
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

                <div className="customer-wise-account-message">

                    <div className="customer-wise-account-spinner">
                    </div>

                    <p>
                        Loading customer accounts...
                    </p>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading &&
                error && (

                    <div className="customer-wise-account-error">

                        <p>
                            ⚠ {error}
                        </p>

                        <button
                            type="button"
                            onClick={searchAccounts}
                        >

                            Try Again

                        </button>

                    </div>

                )}


            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            {!loading &&
                !error &&
                searched &&
                accounts.length > 0 && (

                    <div className="customer-wise-account-info">

                        <span>
                            Customer ID
                        </span>

                        <strong>
                            {customerId}
                        </strong>

                        <span>
                            Total Accounts
                        </span>

                        <strong>
                            {accounts.length}
                        </strong>

                    </div>

                )}


            {/* =================================================
                EMPTY RESULT
            ================================================= */}

            {!loading &&
                !error &&
                searched &&
                accounts.length === 0 && (

                    <div className="customer-wise-account-empty">

                        <div className="customer-wise-account-empty-icon">
                            🏦
                        </div>

                        <h2>
                            No Accounts Found
                        </h2>

                        <p>
                            No accounts are available for Customer ID{" "}
                            <strong>
                                {customerId}
                            </strong>.
                        </p>

                    </div>

                )}


            {/* =================================================
                ACCOUNT TABLE
            ================================================= */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    <div className="customer-wise-account-table-container">

                        <table className="customer-wise-account-table">

                            <thead>

                                <tr>

                                    <th>
                                        Account Number
                                    </th>

                                    <th>
                                        Customer ID
                                    </th>

                                    <th>
                                        Account Type
                                    </th>

                                    <th>
                                        Opening Date
                                    </th>

                                    <th>
                                        Balance
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {accounts.map(
                                    (account, index) => (

                                        <tr
                                            key={
                                                account.accountNumber ||
                                                index
                                            }
                                        >

                                            {/* ACCOUNT NUMBER */}

                                            <td>

                                                <span className="customer-account-number-badge">

                                                    {
                                                        account.accountNumber ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* CUSTOMER ID */}

                                            <td>

                                                {
                                                    account.customerId ||
                                                    customerId
                                                }

                                            </td>


                                            {/* ACCOUNT TYPE */}

                                            <td>

                                                <span className="customer-account-type-badge">

                                                    {
                                                        account.accountType ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* OPENING DATE */}

                                            <td>

                                                {
                                                    account.accountopenDate ||
                                                    account.accountOpenDate ||
                                                    "-"
                                                }

                                            </td>


                                            {/* BALANCE */}

                                            <td>

                                                <strong className="customer-account-balance">

                                                    {
                                                        formatAmount(
                                                            account.balance
                                                        )
                                                    }

                                                </strong>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        String(
                                                            account.status
                                                        ).toUpperCase() ===
                                                        "ACTIVE"

                                                        ? "customer-account-status-active"

                                                        : "customer-account-status"
                                                    }
                                                >

                                                    {
                                                        account.status ||
                                                        "-"
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
                RETURN BUTTON
            ================================================= */}

            <div className="customer-wise-account-return">

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

export default CustomerWiseAccountReport;