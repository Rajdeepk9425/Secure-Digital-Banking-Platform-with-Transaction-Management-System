import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTransactionByCustomer } from '../../Services/TransactionService';
import { getCustomerByUsername } from '../../Services/CustomerService';

import '../../DisplayView.css';
import "../../FinCorePage.css";
import toast from "react-hot-toast";

const CustomerTransactionReport = () => {

    const [transactions, setTransactions] = useState([]);
    const [customer, setCustomer] = useState({});

    const navigate = useNavigate();

    const loadCustomer = () => {

    getCustomerByUsername()
        .then((response) => {

            console.log("Full Response:", response);
            console.log("Response Data:", response.data);
            console.log("Customer ID:", response.data.customerId);

            setCustomer(response.data);

            return getTransactionByCustomer(response.data.customerId);

        })
        .then((res) => {

            console.log("Transactions:", res.data);

            setTransactions(res.data);

        })
        .catch((error) => {

            console.log(error);

        });

};


    useEffect(() => {

        loadCustomer();

    }, []);

    const returnBack = () => {

        navigate('/customer-menu');

    };

    const formatAmount = (amount) => {

        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(amount);

    };

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-GB");

    };


    return (

        <div className="fincore-page">

            <div className="fincore-page-header">

                <div>

                    <h1 className="fincore-page-title">
                        My Transaction History
                    </h1>

                    <p className="fincore-report-subtitle">
                        View your complete banking transaction history
                    </p>

                </div>


                <div className="fincore-report-count">

                    <span>
                        Total Transactions
                    </span>

                    <strong>
                        {transactions.length}
                    </strong>

                </div>

            </div>

            <div className="fincore-customer-summary">

                <div className="customer-summary-icon">
                    👤
                </div>

                <div className="customer-summary-details">

                    <span className="customer-summary-label">
                        Customer
                    </span>

                    <strong>
                        {customer.customerName || "Customer"}
                    </strong>

                </div>


                <div className="customer-summary-details">

                    <span className="customer-summary-label">
                        Customer ID
                    </span>

                    <strong>
                        {customer.customerId || "-"}
                    </strong>

                </div>

            </div>


            <div className="fincore-card transaction-report-card">

                <div className="fincore-card-header">

                    <div className="fincore-card-icon">
                        📊
                    </div>

                    <div>

                        <h3>
                            Your Transactions
                        </h3>

                        <p className="fincore-card-subtitle">
                            Recent deposits and withdrawals
                        </p>

                    </div>

                </div>

                {transactions.length > 0 ? (

                    <div className="fincore-table-container">

                        <table className="fincore-table">

                            <thead>

                                <tr>

                                    <th>
                                        Transaction ID
                                    </th>

                                    <th>
                                        Account Number
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {transactions.map((transaction) => {

                                    const isDeposit =
                                        transaction.transactionType
                                            ?.toLowerCase() === "deposit";

                                    return (

                                        <tr
                                            key={
                                                transaction.transactionId
                                            }
                                        >

                                            

                                            <td>

                                                <span className="transaction-id">
                                                    #{transaction.transactionId}
                                                </span>

                                            </td>


                                            <td>

                                                <strong>
                                                    {transaction.accountNumber}
                                                </strong>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        isDeposit
                                                            ? "transaction-badge transaction-deposit-badge"
                                                            : "transaction-badge transaction-withdraw-badge"
                                                    }
                                                >

                                                    {isDeposit
                                                        ? "↓ Deposit"
                                                        : "↑ Withdraw"}

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        isDeposit
                                                            ? "transaction-credit"
                                                            : "transaction-debit"
                                                    }
                                                >

                                                    {isDeposit
                                                        ? "+"
                                                        : "-"}

                                                    {" "}

                                                    {formatAmount(
                                                        transaction.transactionAmount
                                                    )}

                                                </span>

                                            </td>


                                            {/* Date */}

                                            <td>

                                                {formatDate(
                                                    transaction.transactionDate
                                                )}

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="fincore-empty-state">

                        <div className="empty-state-icon">
                            📊
                        </div>

                        <h3>
                            No Transactions Yet
                        </h3>

                        <p>
                            Your transaction history will appear here
                            once you complete a transaction.
                        </p>

                    </div>

                )}

                <div className="fincore-report-actions">

                    <button
                        type="button"
                        className="fincore-btn-secondary"
                        onClick={returnBack}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CustomerTransactionReport;