import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../Services/LoginService";
import { getCustomers } from "../../Services/CustomerService";
import { getAccounts } from "../../Services/AccountService";
import { getAllTransactions } from "../../Services/TransactionService";

import "./AdminMenu.css";
import toast from "react-hot-toast";


const AdminMenu = () => {

    const navigate = useNavigate();


    // =====================================================
    // STATES
    // =====================================================

    const [customers, setCustomers] = useState([]);

    const [accounts, setAccounts] = useState([]);

    const [transactions, setTransactions] = useState([]);


    // =====================================================
    // LOAD DASHBOARD
    // =====================================================

    const loadDashboard = () => {

        // -------------------------------------------------
        // CUSTOMERS
        // -------------------------------------------------

        getCustomers()

            .then((response) => {

                console.log(
                    "Customers:",
                    response.data
                );

                setCustomers(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Customer loading error:",
                    error
                );

            });


        // -------------------------------------------------
        // ACCOUNTS
        // -------------------------------------------------

        getAccounts()

            .then((response) => {

                console.log(
                    "All Accounts:",
                    response.data
                );

                setAccounts(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Account loading error:",
                    error
                );

                toast.error(
                    "Unable to load accounts"
                );

            });


        // -------------------------------------------------
        // TRANSACTIONS
        // -------------------------------------------------

        getAllTransactions()

            .then((response) => {

                console.log(
                    "Transactions:",
                    response.data
                );

                setTransactions(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Transaction loading error:",
                    error
                );

            });

    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        logoutUser()

            .then(() => {

                localStorage.clear();

                sessionStorage.clear();

                navigate("/");

            })

            .catch((error) => {

                console.log(
                    "Logout failed:",
                    error
                );

            });

    };


    // =====================================================
    // IMPORTANT:
    //
    // TOTAL BALANCE
    //
    // ONLY SAVINGS + CURRENT
    //
    // LOAN ACCOUNTS ARE EXCLUDED
    // =====================================================

    const totalBalance = accounts

        .filter((account) => {

            const accountType =
                account.accountType
                    ?.trim()
                    .toLowerCase();

            return (
                accountType === "savings" ||
                accountType === "current"
            );

        })

        .reduce((sum, account) => {

            return (
                sum +
                Number(
                    account.balance || 0
                )
            );

        }, 0);


    // =====================================================
    // NORMAL CUSTOMER/CURRENT/SAVINGS ACCOUNTS
    // =====================================================

    const normalAccounts =
        accounts.filter((account) => {

            const type =
                account.accountType
                    ?.trim()
                    .toLowerCase();

            return (
                type === "savings" ||
                type === "current"
            );

        });


    // =====================================================
    // SAVINGS COUNT
    // =====================================================

    const savingsAccounts =
        accounts.filter((account) => {

            return (
                account.accountType
                    ?.trim()
                    .toLowerCase() ===
                "savings"
            );

        });


    // =====================================================
    // CURRENT COUNT
    // =====================================================

    const currentAccounts =
        accounts.filter((account) => {

            return (
                account.accountType
                    ?.trim()
                    .toLowerCase() ===
                "current"
            );

        });


    // =====================================================
    // ACTIVE NORMAL ACCOUNTS
    //
    // ONLY SAVINGS/CURRENT
    //
    // A = ACTIVE
    // =====================================================

    const activeAccounts =
        normalAccounts.filter((account) => {

            return (
                account.status
                    ?.trim()
                    .toUpperCase() ===
                "A"
            );

        });


    // =====================================================
    // INACTIVE NORMAL ACCOUNTS
    //
    // LOAN ACCOUNTS ARE NOT INCLUDED
    // =====================================================

    const inactiveAccounts =
        normalAccounts.filter((account) => {

            return (
                account.status
                    ?.trim()
                    .toUpperCase() !==
                "A"
            );

        });


    // =====================================================
    // RETURN UI
    // =====================================================

    return (

        <>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar
                expand="lg"
                className="fincore-admin-navbar"
            >

                <div className="container-fluid px-4">


                    <Navbar.Brand
                        className="fincore-admin-brand"
                    >

                        <div className="admin-logo">
                            🏦
                        </div>


                        <div>

                            <div className="admin-brand-name">
                                FinCore
                            </div>


                            <div className="admin-brand-subtitle">
                                Admin Banking Portal
                            </div>

                        </div>

                    </Navbar.Brand>


                    <Navbar.Toggle
                        aria-controls="admin-navbar"
                        className="admin-toggler"
                    />


                    <Navbar.Collapse
                        id="admin-navbar"
                    >

                        <Nav
                            className="ms-auto fincore-admin-menu"
                        >


                            {/* =================================================
                                CUSTOMER
                            ================================================= */}

                            <NavDropdown
                                title={
                                    <>
                                        <span className="admin-menu-icon">
                                            👥
                                        </span>

                                        Customer
                                    </>
                                }
                                id="admin-customer-dropdown"
                                className="fincore-admin-dropdown"
                            >

                                <NavDropdown.Item
                                    href="/customer-repo"
                                >
                                    👥 Customer List
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/pending-customers"
                                >
                                    ⏳ Pending Customer List
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/customer-wise-account-report"
                                >
                                    📊 Customer Wise Account Report
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/customer-wise-loan-report"
                                >
                                    🏦 Customer Wise Loan Report
                                </NavDropdown.Item>

                            </NavDropdown>


                            {/* =================================================
                                ACCOUNT
                            ================================================= */}

                            <NavDropdown
                                title={
                                    <>
                                        <span className="admin-menu-icon">
                                            💳
                                        </span>

                                        Account
                                    </>
                                }
                                id="admin-account-dropdown"
                                className="fincore-admin-dropdown"
                            >

                                <NavDropdown.Item
                                    href="/account-list"
                                >
                                    📋 Account List
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/account-req"
                                >
                                    ➕ Account Addition
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/admin-credit-transaction"
                                >
                                    💰 Credit Transactions
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/admin-debit-transaction"
                                >
                                    💸 Debit Transactions
                                </NavDropdown.Item>

                            </NavDropdown>


                            {/* =================================================
                                LOAN
                            ================================================= */}

                            <NavDropdown
                                title={
                                    <>
                                        <span className="admin-menu-icon">
                                            🏦
                                        </span>

                                        Loan
                                    </>
                                }
                                id="admin-loan-dropdown"
                                className="fincore-admin-dropdown"
                            >

                                <NavDropdown.Item
                                    href="/loan-report"
                                >
                                    📋 Customer Applied Loans
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/admin-loans"
                                >
                                    📋 Admin Applied Loans
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/loan-addition"
                                >
                                    ➕ Loan Addition
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/customer-loan-approval"
                                >
                                    ✅ Customer Loan Approval
                                </NavDropdown.Item>

                            </NavDropdown>


                            {/* =================================================
                                REPORTS
                            ================================================= */}

                            <NavDropdown
                                title={
                                    <>
                                        <span className="admin-menu-icon">
                                            📊
                                        </span>

                                        Reports
                                    </>
                                }
                                id="admin-reports-dropdown"
                                className="fincore-admin-dropdown"
                            >

                                <NavDropdown.Item
                                    href="/account-repo"
                                >
                                    📊 Account Report
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/transaction-repo"
                                >
                                    💰 Transaction Report
                                </NavDropdown.Item>


                                <NavDropdown.Item
                                    href="/customer-wise-account-report"
                                >
                                    👤 Customerwise Account Report
                                </NavDropdown.Item>

                            </NavDropdown>


                            {/* =================================================
                                LOGOUT
                            ================================================= */}

                            <Nav.Link
                                onClick={handleLogout}
                                className="fincore-admin-logout"
                            >

                                🚪 Logout

                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>

                </div>

            </Navbar>


            {/* =================================================
                WELCOME
            ================================================= */}

            <div className="fincore-admin-welcome">

                <div>

                    <div className="admin-welcome-label">

                        FINCORE ADMINISTRATION

                    </div>


                    <h1>

                        Welcome Admin 👋

                    </h1>


                    <p>

                        Manage customers, accounts and banking operations

                    </p>

                </div>


                <div className="admin-welcome-icon">

                    🏦

                </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="admin-summary-grid">


                {/* CUSTOMERS */}

                <div className="admin-summary-card">

                    <div className="summary-icon">
                        👥
                    </div>


                    <div>

                        <h5>
                            Customers
                        </h5>


                        <h2>
                            {customers.length}
                        </h2>

                    </div>

                </div>


                {/* ACCOUNTS */}

                <div className="admin-summary-card">

                    <div className="summary-icon">
                        💳
                    </div>


                    <div>

                        <h5>
                            Accounts
                        </h5>


                        <h2>
                            {accounts.length}
                        </h2>

                    </div>

                </div>


                {/* TRANSACTIONS */}

                <div className="admin-summary-card">

                    <div className="summary-icon">
                        📊
                    </div>


                    <div>

                        <h5>
                            Transactions
                        </h5>


                        <h2>
                            {transactions.length}
                        </h2>

                    </div>

                </div>


                {/* =================================================
                    TOTAL BALANCE
                ================================================= */}

                <div className="admin-summary-card">

                    <div className="summary-icon">
                        💰
                    </div>


                    <div>

                        <h5>
                            Total Balance
                        </h5>


                        <h2>

                            ₹
                            {Number(
                                totalBalance
                            ).toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}

                        </h2>

                    </div>

                </div>

            </div>


            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="admin-dashboard-card">

                <div className="dashboard-title">

                    <h2>
                        Quick Actions
                    </h2>

                </div>


                <div className="admin-action-grid">


                    <button
                        onClick={() =>
                            navigate(
                                "/customer-repo"
                            )
                        }
                    >

                        👥

                        <span>
                            Customers
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/account-repo"
                            )
                        }
                    >

                        💳

                        <span>
                            Accounts
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/transaction-repo"
                            )
                        }
                    >

                        💰

                        <span>
                            Transactions
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/customer-wise-account-report"
                            )
                        }
                    >

                        📊

                        <span>
                            Reports
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/loan-report"
                            )
                        }
                    >

                        🏦

                        <span>
                            Loans
                        </span>

                    </button>


                    <button>

                        📈

                        <span>
                            Analytics
                        </span>

                    </button>

                </div>

            </div>


            {/* =================================================
                LATEST TRANSACTIONS
            ================================================= */}

            <div className="admin-dashboard-card">

                <div className="dashboard-title">

                    <h2>
                        Latest Transactions
                    </h2>


                    <button
                        className="view-all-btn"
                        onClick={() =>
                            navigate(
                                "/transaction-repo"
                            )
                        }
                    >

                        View All →

                    </button>

                </div>


                <div className="dashboard-table">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Txn ID
                                </th>

                                <th>
                                    Account
                                </th>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Amount
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                transactions
                                    .slice(-5)
                                    .reverse()
                                    .map(
                                        (transaction) => {

                                            const isDeposit =
                                                transaction
                                                    .transactionType
                                                    ?.toLowerCase() ===
                                                "deposit";


                                            return (

                                                <tr
                                                    key={
                                                        transaction
                                                            .transactionId
                                                    }
                                                >

                                                    <td>

                                                        {
                                                            transaction
                                                                .transactionId
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            transaction
                                                                .accountNumber
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            transaction
                                                                .customerId
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                isDeposit
                                                                    ? "deposit-text"
                                                                    : "withdraw-text"
                                                            }
                                                        >

                                                            {
                                                                isDeposit
                                                                    ? "Deposit"
                                                                    : "Withdraw"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        ₹

                                                        {
                                                            Number(
                                                                transaction
                                                                    .transactionAmount
                                                            )
                                                                .toLocaleString(
                                                                    "en-IN"
                                                                )
                                                        }

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =================================================
                SYSTEM OVERVIEW
            ================================================= */}

            <div className="admin-dashboard-card">

                <div className="dashboard-title">

                    <h2>
                        System Overview
                    </h2>

                </div>


                <div className="overview-grid">


                    {/* SAVINGS */}

                    <div className="overview-item">

                        <span>
                            💳 Savings Accounts
                        </span>


                        <strong>

                            {
                                savingsAccounts.length
                            }

                        </strong>

                    </div>


                    {/* CURRENT */}

                    <div className="overview-item">

                        <span>
                            🏦 Current Accounts
                        </span>


                        <strong>

                            {
                                currentAccounts.length
                            }

                        </strong>

                    </div>


                    {/* ACTIVE */}

                    <div className="overview-item">

                        <span>
                            ✅ Active Accounts
                        </span>


                        <strong>

                            {
                                activeAccounts.length
                            }

                        </strong>

                    </div>


                    {/* INACTIVE */}

                    <div className="overview-item">

                        <span>
                            ❌ Inactive Accounts
                        </span>


                        <strong>

                            {
                                inactiveAccounts.length
                            }

                        </strong>

                    </div>

                </div>

            </div>

        </>

    );

};


export default AdminMenu;