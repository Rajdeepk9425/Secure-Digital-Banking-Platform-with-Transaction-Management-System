import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAccounts } from "../../Services/AccountService";
import { addTransaction,generateTransactionNumber } from "../../Services/TransactionService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./AdminCreditTransaction.css";

const AdminCreditTransaction = () => {

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
    // CREDIT
    // =====================================================

    const handleCredit = (e) => {

        e.preventDefault();

        const creditAmount = Number(amount);


        if (!accountNumber) {

            toast.error(
                "Please select an account"
            );

            return;

        }


        if (
            !creditAmount ||
            creditAmount <= 0
        ) {

            toast.error(
                "Please enter a valid amount"
            );

            return;

        }


        const confirmCredit = window.confirm(
            `Credit ₹${creditAmount.toFixed(2)} to account ${accountNumber}?`
        );


        if (!confirmCredit) {

            return;

        }


       const account = accounts.find(
    (item) =>
        String(item.accountNumber) ===
        String(accountNumber)
);

if (!account) {

    toast.error("Account not found");

    return;

}

const transaction = {

    transactionId: transactionId,

    accountNumber:
        Number(accountNumber),

    customerId:
        Number(account.customerId),

    transactionAmount:
        creditAmount,

    transactionType:
        "Deposit",

    transactionDate:
        new Date()

};


        console.log(
            "Admin Credit Transaction:",
            transaction
        );


        setLoading(true);


        addTransaction(transaction)

            .then((response) => {

                console.log(
                    "Credit response:",
                    response.data
                );

                toast.success(
                    "Amount credited successfully 💰"
                );

                setAmount("");

                loadAccounts();

                setCurrentBalance(
                    currentBalance +
                    creditAmount
                );

            })

            .catch((error) => {

                console.log(
                    "Credit transaction error:",
                    error
                );

                toast.error(
                    "Unable to credit amount"
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

        <div className="admin-credit-page">

            <div className="admin-credit-card">


                {/* HEADER */}

                <div className="admin-credit-header">

                    <div className="admin-credit-icon">
                        💰
                    </div>

                    <div>

                        <h1>
                            Credit Transaction
                        </h1>

                        <p>
                            Add money to a customer account
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={handleCredit}
                    className="admin-credit-form"
                >


                    {/* ACCOUNT */}

                    <div className="admin-credit-field">

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

                    <div className="admin-credit-balance">

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

                    <div className="admin-credit-field">

                        <label>
                            Credit Amount
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

                        <div className="admin-credit-preview">

                            <span>
                                Balance After Credit
                            </span>

                            <strong>
                                ₹{" "}
                                {(
                                    currentBalance +
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

                    <div className="admin-credit-buttons">

                        <button
                            type="submit"
                            className="admin-credit-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Processing..."
                                : "💰 Credit Amount"
                            }

                        </button>


                        <button
                            type="button"
                            className="admin-credit-reset"
                            onClick={resetForm}
                        >

                            ↻ Reset

                        </button>


                        <button
                            type="button"
                            className="admin-credit-return"
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

export default AdminCreditTransaction;