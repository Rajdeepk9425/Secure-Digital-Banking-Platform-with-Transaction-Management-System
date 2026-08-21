import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAccounts } from "../../Services/AccountService";
import { addTransaction,generateTransactionNumber } from "../../Services/TransactionService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./AdminDebitTransaction.css";

const AdminDebitTransaction = () => {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    const [transactionId, setTransactionId] = useState("");

    const [accountNumber, setAccountNumber] = useState("");

    const [amount, setAmount] = useState("");

    const [currentBalance, setCurrentBalance] = useState(0);

    const [loading, setLoading] = useState(false);


    // =====================================================
    // LOAD ACCOUNTS
    // =====================================================

    useEffect(() => {

        loadAccounts();
        generateTransactionId();

    }, []);


    const loadAccounts = () => {

        getAccounts()

            .then((response) => {

                setAccounts(response.data || []);

            })

            .catch((error) => {

                console.log(
                    "Account loading error:",
                    error
                );

                toast.error(
                    "Unable to load accounts"
                );

            });

    };

    const generateTransactionId = () => {

    generateTransactionNumber()

        .then((response) => {

            console.log(
                "Generated Transaction ID:",
                response.data
            );

            setTransactionId(response.data);

        })

        .catch((error) => {

            console.log(
                "Transaction ID generation error:",
                error
            );

            toast.error(
                "Unable to generate transaction ID"
            );

        });

};


    // =====================================================
    // ACCOUNT CHANGE
    // =====================================================

    const handleAccountChange = (e) => {

        const value = e.target.value;

        setAccountNumber(value);

        const account = accounts.find(
            (item) =>
                String(item.accountNumber) ===
                String(value)
        );

        if (account) {

            setCurrentBalance(
                Number(account.balance || 0)
            );

        } else {

            setCurrentBalance(0);

        }

    };


    // =====================================================
    // AMOUNT
    // =====================================================

    const handleAmountChange = (e) => {

        const value = e.target.value;

        if (
            value === "" ||
            /^\d*\.?\d*$/.test(value)
        ) {

            setAmount(value);

        }

    };


    // =====================================================
    // DEBIT
    // =====================================================

    const handleDebit = (e) => {

    e.preventDefault();

    const debitAmount = Number(amount);


    if (!accountNumber) {

        toast.error(
            "Please select an account"
        );

        return;

    }


    if (
        !debitAmount ||
        debitAmount <= 0
    ) {

        toast.error(
            "Please enter a valid amount"
        );

        return;

    }


    if (
        debitAmount > currentBalance
    ) {

        toast.error(
            "Insufficient account balance"
        );

        return;

    }


    if (!transactionId) {

        toast.error(
            "Transaction ID is not generated"
        );

        return;

    }


    const confirmDebit = window.confirm(
        `Debit ₹${debitAmount.toFixed(2)} from account ${accountNumber}?`
    );


    if (!confirmDebit) {

        return;

    }


    const account = accounts.find(
        (item) =>
            String(item.accountNumber) ===
            String(accountNumber)
    );


    if (!account) {

        toast.error(
            "Account not found"
        );

        return;

    }


    const transaction = {

        transactionId:
            transactionId,

        accountNumber:
            Number(accountNumber),

        customerId:
            Number(account.customerId),

        transactionAmount:
            debitAmount,

        transactionType:
            "withdraw",

        transactionDate:
            new Date()

    };


    console.log(
        "Admin Debit Transaction:",
        transaction
    );


    setLoading(true);


    addTransaction(transaction)

        .then((response) => {

            console.log(
                "Debit response:",
                response.data
            );


            toast.success(
                "Amount debited successfully 💸"
            );


            setAmount("");


            loadAccounts();


            setCurrentBalance(
                currentBalance -
                debitAmount
            );


            // Generate a new ID for next transaction
            generateTransactionId();

        })

        .catch((error) => {

            console.log(
                "Debit transaction error:",
                error
            );


            toast.error(
                "Unable to debit amount"
            );

        })

        .finally(() => {

            setLoading(false);

        });

};

    // =====================================================
    // RESET
    // =====================================================

    const resetForm = () => {

        setAccountNumber("");

        setAmount("");

        setCurrentBalance(0);

        generateTransactionId();

    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate("/admin-menu");

    };


    return (

        <div className="admin-debit-page">

            <div className="admin-debit-card">


                {/* HEADER */}

                <div className="admin-debit-header">

                    <div className="admin-debit-icon">
                        💸
                    </div>

                    <div>

                        <h1>
                            Debit Transaction
                        </h1>

                        <p>
                            Remove money from a customer account
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={handleDebit}
                    className="admin-debit-form"
                >


                    {/* ACCOUNT */}

                    <div className="admin-debit-field">

                        <label>
                            Customer Account
                        </label>

                        <select
                            value={accountNumber}
                            onChange={
                                handleAccountChange
                            }
                        >

                            <option value="">
                                -- Select Account --
                            </option>

                            {accounts.map(
                                (account) => (

                                    <option
                                        key={
                                            account.accountNumber
                                        }
                                        value={
                                            account.accountNumber
                                        }
                                    >

                                        Account No:
                                        {" "}
                                        {account.accountNumber}

                                        {" | "}

                                        {account.accountType}

                                        {" | Customer ID: "}

                                        {account.customerId}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* CURRENT BALANCE */}

                    <div className="admin-debit-balance">

                        <span>
                            Current Balance
                        </span>

                        <strong>
                            ₹{" "}
                            {Number(
                                currentBalance
                            ).toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2
                                }
                            )}
                        </strong>

                    </div>


                    {/* AMOUNT */}

                    <div className="admin-debit-field">

                        <label>
                            Debit Amount
                        </label>

                        <input
                            type="text"
                            value={amount}
                            onChange={
                                handleAmountChange
                            }
                            placeholder="Enter amount"
                        />

                    </div>


                    {/* NEW BALANCE */}

                    {accountNumber &&
                        Number(amount) > 0 && (

                        <div className="admin-debit-preview">

                            <span>
                                Balance After Debit
                            </span>

                            <strong>
                                ₹{" "}
                                {(
                                    currentBalance -
                                    Number(amount)
                                ).toLocaleString(
                                    "en-IN",
                                    {
                                        minimumFractionDigits: 2
                                    }
                                )}
                            </strong>

                        </div>

                    )}


                    {/* BUTTONS */}

                    <div className="admin-debit-buttons">

                        <button
                            type="submit"
                            className="admin-debit-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Processing..."
                                : "💸 Debit Amount"
                            }

                        </button>


                        <button
                            type="button"
                            className="admin-debit-reset"
                            onClick={resetForm}
                        >

                            ↻ Reset

                        </button>


                        <button
                            type="button"
                            className="admin-debit-return"
                            onClick={returnBack}
                        >

                            ← Return Back

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AdminDebitTransaction;