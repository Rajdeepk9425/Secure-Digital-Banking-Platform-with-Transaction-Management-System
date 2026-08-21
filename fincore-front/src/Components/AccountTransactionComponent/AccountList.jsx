import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAccounts,
    deleteAccountByNumber
} from "../../Services/AccountService";

import {
    getCustomers
} from "../../Services/CustomerService";

import "./AccountList.css";

import toast from "react-hot-toast";


const AccountList = () => {

    const [accounts, setAccounts] = useState([]);

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();


    // =====================================================
    // LOAD ACCOUNTS AND CUSTOMERS
    // =====================================================

    const loadData = () => {

        // LOAD ACCOUNTS
        getAccounts()

            .then(response => {

                console.log(
                    "Accounts:",
                    response.data
                );

                setAccounts(
                    response.data || []
                );

            })

            .catch(error => {

                console.error(
                    "Unable to load accounts:",
                    error
                );

                toast.error(
                    "Unable to load accounts"
                );

            });


        // LOAD CUSTOMERS
        getCustomers()

            .then(response => {

                console.log(
                    "Customers:",
                    response.data
                );

                setCustomers(
                    response.data || []
                );

            })

            .catch(error => {

                console.error(
                    "Unable to load customers:",
                    error
                );

                toast.error(
                    "Unable to load customers"
                );

            });

    };


    // =====================================================
    // LOAD DATA ON PAGE LOAD
    // =====================================================

    useEffect(() => {

        loadData();

    }, []);


    // =====================================================
    // DELETE ACCOUNT
    // =====================================================

    const deleteAccount = (accountNumber) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this account?"
            );


        if (!confirmDelete) {

            return;

        }


        deleteAccountByNumber(accountNumber)

            .then(() => {

                setAccounts(
                    previousAccounts =>
                        previousAccounts.filter(
                            account =>
                                account.accountNumber !==
                                accountNumber
                        )
                );


                toast.success(
                    "Account Deleted Successfully 🗑️"
                );

            })

            .catch(error => {

                console.error(
                    "Delete account error:",
                    error
                );

                toast.error(
                    "Unable to delete account ❌"
                );

            });

    };


    // =====================================================
    // GET CUSTOMER NAME
    // =====================================================

    const getCustomerName = (customerId) => {

        const customer =
            customers.find(
                customer =>
                    customer.customerId === customerId
            );


        return customer
            ? customer.customerName
            : "-";

    };


    // =====================================================
    // GET ACCOUNT TYPE
    // =====================================================

    const getAccountType = (account) => {

        const type =
            String(
                account.accountType || ""
            )
                .trim()
                .toUpperCase();


        if (
            type === "LOAN" ||
            type === "LOAN ACCOUNT"
        ) {

            return "Loan Account";

        }


        if (
            type === "SAVINGS" ||
            type === "SAVINGS ACCOUNT"
        ) {

            return "Savings Account";

        }


        if (
            type === "CURRENT" ||
            type === "CURRENT ACCOUNT"
        ) {

            return "Current Account";

        }


        return account.accountType || "-";

    };


    // =====================================================
    // ACCOUNT TYPE CSS CLASS
    // =====================================================

    const getAccountTypeClass = (account) => {

        const type =
            String(
                account.accountType || ""
            )
                .trim()
                .toUpperCase();


        if (
            type === "LOAN" ||
            type === "LOAN ACCOUNT"
        ) {

            return "loan-account-type";

        }


        if (
            type === "SAVINGS" ||
            type === "SAVINGS ACCOUNT"
        ) {

            return "savings-account-type";

        }


        if (
            type === "CURRENT" ||
            type === "CURRENT ACCOUNT"
        ) {

            return "current-account-type";

        }


        return "other-account-type";

    };


    // =====================================================
    // GET STATUS INFORMATION
    // =====================================================

    const getStatusInfo = (account) => {

        const status =
            String(
                account.status || ""
            )
                .trim()
                .toUpperCase();


        if (
            status === "A" ||
            status === "ACTIVE" ||
            status === "APPROVED" ||
            status === "D"
        ) {

            return {

                active: true,

                text: "Active"

            };

        }


        if (status === "C") {

            return {

                active: true,

                text: "Completed"

            };

        }


        if (
            status === "R" ||
            status === "REJECTED" ||
            status === "INACTIVE" ||
            status === "I"
        ) {

            return {

                active: false,

                text: "Inactive"

            };

        }


        return {

            active: true,

            text: account.status || "Active"

        };

    };


    // =====================================================
    // FORMAT BALANCE
    // =====================================================

    const formatBalance = (balance) => {

        const value =
            Number(balance || 0);


        return value.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    // =====================================================
    // FORMAT OPENING DATE
    // =====================================================

    const formatOpenDate = (date) => {

        // No date
        if (!date) {

            return "-";

        }


        const dateString =
            String(date).trim();


        // -------------------------------------------------
        // FORMAT: dd-MM-yyyy
        // Example: 18-08-2026
        // -------------------------------------------------

        if (
            /^\d{2}-\d{2}-\d{4}$/.test(
                dateString
            )
        ) {

            const [
                day,
                month,
                year
            ] =
                dateString.split("-");


            return `${day}/${month}/${year}`;

        }


        // -------------------------------------------------
        // FORMAT: yyyy-MM-dd
        // Example: 2026-08-18
        // -------------------------------------------------

        if (
            /^\d{4}-\d{2}-\d{2}$/.test(
                dateString
            )
        ) {

            const [
                year,
                month,
                day
            ] =
                dateString.split("-");


            return `${day}/${month}/${year}`;

        }


        // -------------------------------------------------
        // FORMAT: yyyy-MM-ddTHH:mm:ss
        // Example:
        // 2026-08-18T00:00:00
        // -------------------------------------------------

        if (
            /^\d{4}-\d{2}-\d{2}T/.test(
                dateString
            )
        ) {

            const datePart =
                dateString.split("T")[0];


            const [
                year,
                month,
                day
            ] =
                datePart.split("-");


            if (
                year &&
                month &&
                day
            ) {

                return `${day}/${month}/${year}`;

            }

        }


        // -------------------------------------------------
        // NORMAL JAVASCRIPT DATE
        // -------------------------------------------------

        const parsedDate =
            new Date(dateString);


        if (
            !isNaN(
                parsedDate.getTime()
            )
        ) {

            return parsedDate.toLocaleDateString(
                "en-IN"
            );

        }


        // -------------------------------------------------
        // IF FORMAT IS UNKNOWN
        // -------------------------------------------------

        return dateString;

    };


    // =====================================================
    // RETURN UI
    // =====================================================

    return (

        <div className="account-list-page">


            <div className="account-list-card">


                {/* =========================================
                    HEADER
                   ========================================= */}

                <div className="account-list-header">

                    <div>

                        <h1>
                            💳 Account List
                        </h1>

                        <p>
                            View and manage all customer accounts
                        </p>

                    </div>


                    <div className="account-count">

                        {accounts.length}

                        <span>
                            Accounts
                        </span>

                    </div>

                </div>


                {/* =========================================
                    TABLE
                   ========================================= */}

                <div className="account-table-wrapper">

                    <table className="account-list-table">


                        {/* TABLE HEADER */}

                        <thead>

                            <tr>

                                <th>
                                    Account Number
                                </th>

                                <th>
                                    Customer ID
                                </th>

                                <th>
                                    Customer Name
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

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}

                        <tbody>


                            {/* NO ACCOUNTS */}

                            {accounts.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="account-empty-row"
                                    >

                                        No accounts found.

                                    </td>

                                </tr>

                            )}


                            {/* ACCOUNT LIST */}

                            {accounts.map(
                                account => {

                                    const statusInfo =
                                        getStatusInfo(
                                            account
                                        );


                                    return (

                                        <tr
                                            key={
                                                account.accountNumber
                                            }
                                        >


                                            {/* =================================
                                                ACCOUNT NUMBER
                                               ================================= */}

                                            <td>

                                                <strong className="account-number">

                                                    {
                                                        account.accountNumber
                                                    }

                                                </strong>

                                            </td>


                                            {/* =================================
                                                CUSTOMER ID
                                               ================================= */}

                                            <td>

                                                {
                                                    account.customerId
                                                }

                                            </td>


                                            {/* =================================
                                                CUSTOMER NAME
                                               ================================= */}

                                            <td>

                                                <strong>

                                                    {
                                                        getCustomerName(
                                                            account.customerId
                                                        )
                                                    }

                                                </strong>

                                            </td>


                                            {/* =================================
                                                ACCOUNT TYPE
                                               ================================= */}

                                            <td>

                                                <span
                                                    className={
                                                        `account-type-badge ${
                                                            getAccountTypeClass(
                                                                account
                                                            )
                                                        }`
                                                    }
                                                >

                                                    {
                                                        getAccountType(
                                                            account
                                                        )
                                                    }

                                                </span>

                                            </td>


                                            {/* =================================
                                                BALANCE
                                               ================================= */}

                                            <td
                                                className="account-balance"
                                            >

                                                ₹
                                                {
                                                    formatBalance(
                                                        account.balance
                                                    )
                                                }

                                            </td>


                                            {/* =================================
                                                STATUS
                                               ================================= */}

                                            <td>

                                                <span
                                                    className={
                                                        statusInfo.active
                                                            ? "active-status"
                                                            : "inactive-status"
                                                    }
                                                >

                                                    ●{" "}

                                                    {
                                                        statusInfo.text
                                                    }

                                                </span>

                                            </td>


                                            {/* =================================
                                                OPEN DATE
                                               ================================= */}

                                            <td>

                                                {
                                                    formatOpenDate(

                                                        /*
                                                         * Supports both:
                                                         *
                                                         * accountopenDate
                                                         * accountOpenDate
                                                         */

                                                        account.accountopenDate
                                                        ??
                                                        account.accountOpenDate

                                                    )
                                                }

                                            </td>


                                            {/* =================================
                                                DELETE ACTION
                                               ================================= */}

                                            <td>

                                                <button
                                                    type="button"
                                                    className="account-delete-btn"
                                                    onClick={() =>
                                                        deleteAccount(
                                                            account.accountNumber
                                                        )
                                                    }
                                                >

                                                    🗑 Delete

                                                </button>

                                            </td>


                                        </tr>

                                    );

                                }
                            )}

                        </tbody>


                    </table>

                </div>


                {/* =========================================
                    FOOTER
                   ========================================= */}

                <div className="account-list-footer">

                    <button
                        type="button"
                        className="fincore-btn-secondary"
                        onClick={() =>
                            navigate("/admin-menu")
                        }
                    >

                        ← Back to Admin Menu

                    </button>

                </div>


            </div>

        </div>

    );

};


export default AccountList;