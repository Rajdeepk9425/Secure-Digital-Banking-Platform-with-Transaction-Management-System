import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {generateTransactionNumber,addTransaction} from "../../Services/TransactionService";

import {getAccountIdsByCustomerIdAndType} from "../../Services/AccountService";

import {getCustomerByUsername} from "../../Services/CustomerService";
import FinButton from "../../Components/Common/FinButton";

import '../../DisplayView.css';
import "../../FinCorePage.css";
import toast from "react-hot-toast";

const TransactionEntry = () => {

    const navigate = useNavigate();
    const param = useParams();

    const [errors, setErrors] = useState({});

    const [transaction, setTransaction] = useState({
        transactionId: "",
        accountNumber: 0,
        customerId: 0,
        transactionAmount: 0,
        transactionType: "",
        transactionDate: new Date().toISOString().slice(0, 19)
    });

    const [customer, setCustomer] = useState({
        customerId: 0,
        customerName: "",
        customerAddress: "",
        dateOfBirth: "",
        dateOfJoin: "",
        email: "",
        username: "",
        status: ""
    });

    const [flag, setFlag] = useState(0);
    const [typeno, setTypeno] = useState("");
    const [newId, setNewId] = useState("");
    const [idList, setIdList] = useState([]);

    const setTransactionType = () => {
        setTypeno(param.tno);
    };

    const setAccountIds = () => {

        getAccountIdsByCustomerIdAndType("Savings")
            .then(response => {

                console.log("Account IDs:", response.data);

                setIdList(response.data);

            })
            .catch(error => {

                console.log("Account API Error:", error);

            });
    };

    const setTransactionId = () => {

        generateTransactionNumber()
            .then(response => {

                setNewId(response.data);

            });
    };


    const setCustomerData = () => {

        getCustomerByUsername()
            .then(response => {

                setCustomer(response.data);

            });

    };

    useEffect(() => {

        setTransactionType();
        setAccountIds();
        setTransactionId();
        setCustomerData();

        setFlag(0);

    }, []);

    const onChangeHandler = (event) => {

        const { name, value } = event.target;

        if (name === "transactionAmount") {

            if (!/^\d*\.?\d{0,2}$/.test(value)) {
                return;
            }

        }

        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));

        setFlag(0);
    };


    const saveTransaction = (event) => {

        event.preventDefault();

        const newTransaction = {

            transactionId: newId,

            accountNumber:
                Number(transaction.accountNumber),

            customerId:
                customer.customerId,

            transactionAmount:
                Number(transaction.transactionAmount),

            transactionType:
                typeno === "1"
                    ? "Deposit"
                    : "Withdraw"
        };


        addTransaction(newTransaction)
            .then(response => {

                if (response.data === 2) {

                    toast.success(
                        "Transaction Successful 🎉"
                    );

                    navigate("/customer-menu");

                } else {

                    toast.warning(
                        "Minimum balance of ₹5000 must be maintained."
                    );

                }

            })
            .catch(error => {

                console.log(error);

                toast.error(
                    "Transaction Failed ❌"
                );

            });
    };

    const clearAll = (event) => {

        event.preventDefault();

        setTransaction({

            transactionId: "",
            accountNumber: 0,
            customerId: 0,
            transactionAmount: 0,
            transactionType: "",
            transactionDate:
                new Date()
                    .toISOString()
                    .slice(0, 19)

        });

        setErrors({});

        setFlag(0);
    };

    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};

        let isValid = true;


        if (
            transaction.accountNumber === 0 ||
            transaction.accountNumber === ""
        ) {

            tempErrors.accountNumber =
                "Select One Account Number";

            isValid = false;

        }


        if (
            !String(transaction.transactionAmount).trim()
        ) {

            tempErrors.transactionAmount =
                "Enter Transaction Amount";

            isValid = false;

        }


        if (
            parseFloat(
                String(transaction.transactionAmount).trim()
            ) <= 0
        ) {

            tempErrors.transactionAmount =
                "Invalid Amount";

            isValid = false;

        }


        setErrors(tempErrors);

if (isValid) {

    saveTransaction(event);

}
else {

    toast.warning(
        "Please check transaction details ⚠️"
    );

}

    };

    const returnBack = () => {

        navigate('/customer-menu');

    };


    const isDeposit = typeno === "1";


    return (

        <div className="fincore-page">

            <div className="fincore-page-header">

                <h1 className="fincore-page-title">

                    {isDeposit
                        ? "Deposit Money"
                        : "Withdraw Money"}

                </h1>

            </div>

            <div
                className={
                    `fincore-card transaction-form-card ${
                        isDeposit
                            ? "deposit-card"
                            : "withdraw-card"
                    }`
                }
            >

                <div className="fincore-card-header">

                    <div
                        className={
                            `fincore-card-icon ${
                                isDeposit
                                    ? "transaction-deposit-icon"
                                    : "transaction-withdraw-icon"
                            }`
                        }
                    >

                        {isDeposit
                            ? "💰"
                            : "💸"}

                    </div>


                    <div>

                        <h3>

                            {isDeposit
                                ? "Deposit Transaction"
                                : "Withdrawal Transaction"}

                        </h3>

                        <p className="fincore-card-subtitle">

                            {isDeposit
                                ? "Add money securely to your account"
                                : "Withdraw money from your account"}

                        </p>

                    </div>

                </div>


                <form onSubmit={handleValidation}>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Transaction ID
                        </label>

                        <input
                            type="text"
                            className="fincore-input fincore-readonly"
                            value={newId}
                            readOnly
                        />

                        <small className="fincore-helper">
                            Automatically generated by FinCore
                        </small>

                    </div>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Customer ID
                        </label>

                        <input
                            type="text"
                            className="fincore-input fincore-readonly"
                            value={customer.customerId}
                            readOnly
                        />

                    </div>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Select Account Number
                        </label>

                        <select
                            className="fincore-select"
                            name="accountNumber"
                            value={
                                transaction.accountNumber || ""
                            }
                            onChange={onChangeHandler}
                        >

                            <option value="">
                                Select Account
                            </option>

                            {idList.map((id) => (

                                <option
                                    key={id}
                                    value={Number(id)}
                                >
                                    {id}
                                </option>

                            ))}

                        </select>


                        {errors.accountNumber && (

                            <div className="fincore-error">
                                ⚠ {errors.accountNumber}
                            </div>

                        )}

                    </div>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Transaction Type
                        </label>

                        <div
                            className={
                                `transaction-type-box ${
                                    isDeposit
                                        ? "deposit-type"
                                        : "withdraw-type"
                                }`
                            }
                        >

                            <span className="transaction-type-icon">

                                {isDeposit
                                    ? "↓"
                                    : "↑"}

                            </span>

                            {isDeposit
                                ? "Deposit"
                                : "Withdraw"}

                        </div>

                    </div>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Transaction Amount
                        </label>


                        <div className="transaction-amount-wrapper">

                            <span className="currency-symbol">
                                ₹
                            </span>


                            <input
                                type="text"
                                className="fincore-input transaction-amount-input"
                                name="transactionAmount"
                                placeholder="Enter Amount"
                                value={
                                    transaction.transactionAmount
                                }
                                onChange={onChangeHandler}
                            />

                        </div>


                        {errors.transactionAmount && (

                            <div className="fincore-error">
                                ⚠ {errors.transactionAmount}
                            </div>

                        )}

                    </div>

                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Transaction Date
                        </label>

                        <input
                            type="text"
                            className="fincore-input fincore-readonly"
                            value={
                                new Date()
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")
                            }
                            readOnly
                        />

                        <small className="fincore-helper">
                            Transaction date is automatically generated
                        </small>

                    </div>


                    <div className="fincore-button-group">


                        <FinButton
    type="submit"
    variant={
        isDeposit
        ? "deposit"
        : "withdraw"
    }
>
    {
      isDeposit
      ? "↓ Deposit Money"
      : "↑ Withdraw Money"
    }
</FinButton>


                        <FinButton
                            type="button"
                            variant="gold"
                            onClick={clearAll}
                        >

                            ↻ Reset

                        </FinButton>


                        <FinButton  
                            type="button"
                            variant="secondary"
                            onClick={returnBack}
                        >

                            ← Return Back

                        </FinButton>

                    </div>

                </form>


                {flag === 2 && (

                    <div className="fincore-success-message">

                        <span className="success-icon">
                            ✓
                        </span>

                        <div>

                            <strong>
                                Transaction Completed Successfully
                            </strong>

                            <p>
                                Your transaction has been processed.
                            </p>

                        </div>

                    </div>

                )}


                {flag === 1 && (

                    <div className="fincore-transaction-error">

                        <span className="transaction-error-icon">
                            !
                        </span>

                        <div>

                            <strong>
                                Transaction Failed
                            </strong>

                            <p>
                                Minimum balance of ₹5000 must be maintained.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default TransactionEntry;