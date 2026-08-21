import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getAccountsByCustomerId
} from "../../Services/AccountService";

import "./CustomerAccountList.css";


const CustomerAccountList = () => {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD CUSTOMER ACCOUNTS
    // =====================================================

    const loadAccounts = () => {

        setLoading(true);

        getAccountsByCustomerId()

            .then((response) => {

                console.log(
                    "Customer Accounts:",
                    response.data
                );

                setAccounts(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Customer account loading error:",
                    error
                );

                toast.error(
                    "Unable to load account details"
                );

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadAccounts();

    }, []);


    // =====================================================
    // FORMAT ACCOUNT TYPE
    // =====================================================

    const formatAccountType = (type) => {

        if (!type) {

            return "-";

        }

        return type;

    };


    // =====================================================
    // FORMAT BALANCE
    // =====================================================

    const formatBalance = (balance) => {

        const amount =
            Number(balance || 0);

        return amount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }

        const parsedDate =
            new Date(date);


        if (
            isNaN(
                parsedDate.getTime()
            )
        ) {

            return date;

        }


        return parsedDate.toLocaleDateString(
            "en-IN"
        );

    };


    // =====================================================
    // ACCOUNT STATUS
    // =====================================================

    const getStatus = (status) => {

        if (
            status &&
            status.toUpperCase() === "A"
        ) {

            return (

                <span className="customer-account-active">

                    ● Active

                </span>

            );

        }


        return (

            <span className="customer-account-inactive">

                ● Inactive

            </span>

        );

    };


    // =====================================================
    // BACK TO CUSTOMER MENU
    // =====================================================

    const returnBack = () => {

        navigate(
            "/customer-menu"
        );

    };


    // =====================================================
    // REFRESH
    // =====================================================

    const refreshAccounts = () => {

        loadAccounts();

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-account-list-page">


            <div className="customer-account-list-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="customer-account-header">


                    <div className="customer-account-title-section">


                        <div className="customer-account-icon">

                            🏦

                        </div>


                        <div>

                            <h1>

                                My Account Details

                            </h1>


                            <p>

                                View your account information,
                                balance and status

                            </p>

                        </div>


                    </div>


                    <div className="customer-account-count">

                        {accounts.length}

                        {" "}

                        Account
                        {accounts.length !== 1
                            ? "s"
                            : ""
                        }

                    </div>


                </div>


                {/* =================================================
                    GOLD LINE
                ================================================= */}

                <div className="customer-account-gold-line"></div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="customer-account-message">

                        <div className="customer-account-loading-icon">

                            ⏳

                        </div>


                        <h2>

                            Loading Account Details

                        </h2>


                        <p>

                            Please wait while we fetch
                            your account information.

                        </p>

                    </div>

                )}


                {/* =================================================
                    NO ACCOUNTS
                ================================================= */}

                {!loading &&
                    accounts.length === 0 && (

                    <div className="customer-account-message">


                        <div className="customer-account-empty-icon">

                            🏦

                        </div>


                        <h2>

                            No Accounts Found

                        </h2>


                        <p>

                            No accounts are currently
                            linked to your customer profile.

                        </p>


                        <button
                            className="customer-account-refresh-btn"
                            onClick={refreshAccounts}
                        >

                            ↻ Refresh

                        </button>


                    </div>

                )}


                {/* =================================================
                    ACCOUNT TABLE
                ================================================= */}

                {!loading &&
                    accounts.length > 0 && (

                    <div className="customer-account-table-container">


                        <table className="customer-account-list-table">


                            <thead>

                                <tr>

                                    <th>
                                        Account Number
                                    </th>


                                    <th>
                                        Account Type
                                    </th>


                                    <th>
                                        Balance
                                    </th>


                                    <th>
                                        Status
                                    </th>


                                    <th>
                                        Open Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {accounts.map(
                                    (account) => (

                                    <tr
                                        key={
                                            account.accountNumber
                                        }
                                    >


                                        {/* ACCOUNT NUMBER */}

                                        <td>

                                            <span className="customer-account-number">

                                                {account.accountNumber}

                                            </span>

                                        </td>


                                        {/* ACCOUNT TYPE */}

                                        <td>

                                            <span className="customer-account-type">

                                                {formatAccountType(
                                                    account.accountType
                                                )}

                                            </span>

                                        </td>


                                        {/* BALANCE */}

                                        <td>

                                            <span className="customer-account-balance">

                                                ₹
                                                {formatBalance(
                                                    account.balance
                                                )}

                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            {getStatus(
                                                account.status
                                            )}

                                        </td>


                                        {/* OPEN DATE */}

                                        <td>

                                            <span className="customer-account-date">

                                                {formatDate(
                                                    account.accountopenDate
                                                )}

                                            </span>

                                        </td>


                                    </tr>

                                ))}


                            </tbody>


                        </table>


                    </div>

                )}


                {/* =================================================
                    ACCOUNT SUMMARY
                ================================================= */}

                {!loading &&
                    accounts.length > 0 && (

                    <div className="customer-account-summary">


                        <div className="customer-summary-item">


                            <span className="customer-summary-label">

                                Total Accounts

                            </span>


                            <span className="customer-summary-value">

                                {accounts.length}

                            </span>


                        </div>


                        <div className="customer-summary-divider"></div>


                        <div className="customer-summary-item">


                            <span className="customer-summary-label">

                                Active Accounts

                            </span>


                            <span className="customer-summary-value">

                                {
                                    accounts.filter(
                                        (account) =>
                                            account.status &&
                                            account.status.toUpperCase() === "A"
                                    ).length
                                }

                            </span>


                        </div>


                        <div className="customer-summary-divider"></div>


                        <div className="customer-summary-item">


                            <span className="customer-summary-label">

                                Total Balance

                            </span>


                            <span className="customer-summary-value customer-summary-balance">

                                ₹
                                {formatBalance(
                                    accounts.reduce(
                                        (
                                            total,
                                            account
                                        ) =>
                                            total +
                                            Number(
                                                account.balance || 0
                                            ),
                                        0
                                    )
                                )}

                            </span>


                        </div>


                    </div>

                )}


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="customer-account-list-footer">


                    <button
                        type="button"
                        className="customer-account-refresh-btn"
                        onClick={refreshAccounts}
                    >

                        ↻ Refresh

                    </button>


                    <button
                        type="button"
                        className="customer-account-back-btn"
                        onClick={returnBack}
                    >

                        ← Back to Customer Menu

                    </button>


                </div>


            </div>


        </div>

    );

};


export default CustomerAccountList;