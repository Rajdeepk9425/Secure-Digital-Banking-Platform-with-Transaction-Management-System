import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    generateLoanId,
    addLoan
} from "../../Services/LoanService";

import {
    getAccountsByType
} from "../../Services/AccountService";

import "../../DisplayView.css";
import "../../FinCorePage.css";


const LoanAddition = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // STATES
    // =====================================================

    const [
        loanId,
        setLoanId
    ] = useState("");


    const [
        loanAmount,
        setLoanAmount
    ] = useState(100000);


    const [
        loanTenure,
        setLoanTenure
    ] = useState(1);


    const interestRate = 20;


    const [
        totalTenure,
        setTotalTenure
    ] = useState(12);


    const [
        emiPayable,
        setEmiPayable
    ] = useState(0);


    const [
        totalInterestPayable,
        setTotalInterestPayable
    ] = useState(0);


    const [
        totalCost,
        setTotalCost
    ] = useState(0);


    // =====================================================
    // ACCOUNT STATES
    // =====================================================

    const [
        accounts,
        setAccounts
    ] = useState([]);


    const [
        accountNumber,
        setAccountNumber
    ] = useState("");


    const [
        currentBalance,
        setCurrentBalance
    ] = useState(0);


    const [
        loading,
        setLoading
    ] = useState(false);


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        generateLoan();

        loadAccounts();

    }, []);


    // =====================================================
    // GENERATE LOAN ID
    // =====================================================

    const generateLoan = () => {

        generateLoanId()

            .then((response) => {

                setLoanId(
                    response.data
                );

            })

            .catch((error) => {

                console.error(
                    error
                );

                toast.error(
                    "Unable to generate Loan ID"
                );

            });

    };


    // =====================================================
    // LOAD ONLY SAVINGS + CURRENT
    // =====================================================

    const loadAccounts = () => {

        Promise.all([

            getAccountsByType(
                "Savings"
            ),

            getAccountsByType(
                "Current"
            )

        ])

            .then(
                ([
                    savingsResponse,
                    currentResponse
                ]) => {

                    const savings =
                        savingsResponse.data || [];


                    const current =
                        currentResponse.data || [];


                    const allowedAccounts = [

                        ...savings,

                        ...current

                    ];


                    setAccounts(
                        allowedAccounts
                    );


                    console.log(
                        "Savings + Current accounts:",
                        allowedAccounts
                    );

                }
            )

            .catch((error) => {

                console.error(
                    "Account loading error:",
                    error
                );

                toast.error(
                    "Unable to load Savings/Current accounts"
                );

            });

    };


    // =====================================================
    // ACCOUNT CHANGE
    // =====================================================

    const handleAccountChange = (e) => {

        const value =
            e.target.value;


        setAccountNumber(
            value
        );


        const account =
            accounts.find(
                (item) =>
                    String(
                        item.accountNumber
                    ) === String(value)
            );


        if (account) {

            setCurrentBalance(
                Number(
                    account.balance || 0
                )
            );

        } else {

            setCurrentBalance(0);

        }

    };


    // =====================================================
    // CALCULATE LOAN
    // =====================================================

    const calculateLoan = (
        amount = loanAmount,
        tenure = loanTenure
    ) => {

        const numericAmount =
            Number(amount);


        const numericTenure =
            Number(tenure);


        if (
            !numericAmount ||
            numericAmount <= 0
        ) {

            setTotalTenure(0);

            setEmiPayable(0);

            setTotalInterestPayable(0);

            setTotalCost(0);

            return;

        }


        const months =
            numericTenure * 12;


        setTotalTenure(
            months
        );


        const monthlyRate =
            interestRate / 12 / 100;


        const power =
            Math.pow(
                1 + monthlyRate,
                months
            );


        const emi =
            numericAmount *
            monthlyRate *
            power /
            (power - 1);


        const totalPayment =
            emi * months;


        const totalInterest =
            totalPayment -
            numericAmount;


        setEmiPayable(
            Number(
                emi.toFixed(2)
            )
        );


        setTotalInterestPayable(
            Number(
                totalInterest.toFixed(2)
            )
        );


        setTotalCost(
            Number(
                totalPayment.toFixed(2)
            )
        );

    };


    // =====================================================
    // RECALCULATE
    // =====================================================

    useEffect(() => {

        calculateLoan(
            loanAmount,
            loanTenure
        );

    }, [
        loanAmount,
        loanTenure
    ]);


    // =====================================================
    // AMOUNT CHANGE
    // =====================================================

    const handleAmountChange = (e) => {

        const value =
            e.target.value;


        if (value === "") {

            setLoanAmount("");

            return;

        }


        if (
            !/^\d+$/.test(value)
        ) {

            return;

        }


        setLoanAmount(
            Number(value)
        );

    };


    // =====================================================
    // TENURE CHANGE
    // =====================================================

    const handleTenureChange = (e) => {

        setLoanTenure(
            Number(
                e.target.value
            )
        );

    };


    // =====================================================
    // SAVE LOAN
    // =====================================================

    const saveLoan = (e) => {

        e.preventDefault();


        const amount =
            Number(loanAmount);


        // -------------------------------------------------
        // ACCOUNT
        // -------------------------------------------------

        if (!accountNumber) {

            toast.error(
                "Please select a Savings or Current account"
            );

            return;

        }


        const selectedAccount =
    accounts.find(
        (account) =>
            String(account.accountNumber) ===
            String(accountNumber)
    );

if (!selectedAccount) {

    toast.error(
        "Invalid account selected"
    );

    return;
}

const normalizedType =
    String(
        selectedAccount.accountType || ""
    ).toLowerCase();

if (
    normalizedType !== "savings" &&
    normalizedType !== "current"
) {

    toast.error(
        "Only Savings or Current accounts are allowed"
    );

    return;
}


        // -------------------------------------------------
        // BACKEND SAFETY
        // -------------------------------------------------

        const type =
            selectedAccount.accountType;


        if (
            !type ||
            (
                !type.equals?.("Savings") &&
                !type.equals?.("Current")
            )
        ) {

            // JavaScript doesn't have equalsIgnoreCase.
            const normalizedType =
                String(
                    type || ""
                ).toLowerCase();


            if (
                normalizedType !== "savings" &&
                normalizedType !== "current"
            ) {

                toast.error(
                    "Only Savings or Current accounts are allowed"
                );

                return;

            }

        }


        // -------------------------------------------------
        // AMOUNT
        // -------------------------------------------------

        if (
            !amount ||
            amount <= 0
        ) {

            toast.error(
                "Please enter a valid loan amount"
            );

            return;

        }


        if (
            amount % 50000 !== 0
        ) {

            toast.error(
                "Loan Amount must be a multiple of ₹50,000"
            );

            return;

        }


        // -------------------------------------------------
        // CONFIRM
        // -------------------------------------------------

        const confirmLoan =
            window.confirm(
                `Add Personal Loan of ₹${amount.toLocaleString(
                    "en-IN"
                )} for account ${accountNumber}?`
            );


        if (!confirmLoan) {

            return;

        }


        // -------------------------------------------------
        // LOAN OBJECT
        // -------------------------------------------------

        const loan = {

            loanId:
                loanId,

            loanType:
                "Personal Loan",

            loanAmount:
                amount,

            loanTenure:
                Number(loanTenure),

            totalTenure:
                Number(totalTenure),

            interestRate:
                Number(interestRate),

            emiPayable:
                Number(emiPayable),

            totalInterestPayable:
                Number(
                    totalInterestPayable
                ),

            totalCost:
                Number(totalCost),

            accountNumber:
                Number(accountNumber),

            // NEW LOANS ARE ACTIVE
            status:
                "A",

            // Amount will be credited later
            amountAdded:
                false

        };


        console.log(
            "Loan being sent:",
            loan
        );


        setLoading(true);


        addLoan(loan)

            .then(() => {

                toast.success(
                    "Loan added successfully"
                );


                navigate(
                    "/admin-loans"
                );

            })

            .catch((error) => {

                console.error(
                    "Loan saving error:",
                    error
                );


                console.error(
                    "Backend:",
                    error.response?.data
                );


                toast.error(
                    error.response?.data ||
                    "Unable to add loan"
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

        setLoanAmount(
            100000
        );

        setLoanTenure(
            1
        );

        setAccountNumber(
            ""
        );

        setCurrentBalance(
            0
        );

        calculateLoan(
            100000,
            1
        );

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
    // UI
    // =====================================================

    return (

        <div className="loan-addition-page">

            <div className="loan-addition-card">

                <h1 className="loan-addition-title">

                    💰 Loan Addition

                </h1>


                <p className="loan-addition-subtitle">

                    Add a new loan for a customer

                </p>


                <form
                    onSubmit={saveLoan}
                >


                    {/* LOAN ID */}

                    <div className="loan-addition-field">

                        <label>
                            Loan ID
                        </label>

                        <input
                            type="text"
                            value={loanId}
                            readOnly
                        />

                        <small>
                            Automatically generated by FinCore
                        </small>

                    </div>


                    {/* ACCOUNT */}

                    <div className="loan-addition-field">

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
                                -- Select Savings / Current Account --
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

                                        {account.accountNumber}

                                        {" | "}

                                        {account.accountType}

                                        {" | Customer ID: "}

                                        {account.customerId}

                                    </option>

                                )
                            )}

                        </select>


                        {accounts.length === 0 && (

                            <small>
                                No Savings or Current accounts found.
                            </small>

                        )}

                    </div>


                    {/* BALANCE */}

                    {accountNumber && (

                        <div className="loan-addition-balance">

                            <span>
                                Current Account Balance
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

                    )}


                    {/* LOAN TYPE */}

                    <div className="loan-addition-field">

                        <label>
                            Loan Type
                        </label>

                        <input
                            type="text"
                            value="Personal Loan"
                            readOnly
                        />

                    </div>


                    {/* AMOUNT */}

                    <div className="loan-addition-field">

                        <label>
                            Loan Amount
                        </label>

                        <input
                            type="number"
                            value={loanAmount}
                            min="50000"
                            step="50000"
                            onChange={
                                handleAmountChange
                            }
                        />

                        <small>
                            Loan amount must be a multiple of ₹50,000
                        </small>

                    </div>


                    {/* INTEREST */}

                    <div className="loan-addition-field">

                        <label>
                            Interest Rate
                        </label>

                        <input
                            type="text"
                            value="20%"
                            readOnly
                        />

                    </div>


                    {/* TENURE */}

                    <div className="loan-addition-field">

                        <label>
                            Loan Tenure
                        </label>

                        <select
                            value={loanTenure}
                            onChange={
                                handleTenureChange
                            }
                        >

                            <option value={1}>
                                1 Year
                            </option>

                            <option value={2}>
                                2 Years
                            </option>

                            <option value={3}>
                                3 Years
                            </option>

                            <option value={5}>
                                5 Years
                            </option>

                            <option value={10}>
                                10 Years
                            </option>

                        </select>

                    </div>


                    {/* TOTAL TENURE */}

                    <div className="loan-addition-field">

                        <label>
                            Total Tenure
                        </label>

                        <input
                            type="text"
                            value={
                                `${totalTenure} Months`
                            }
                            readOnly
                        />

                    </div>


                    {/* EMI */}

                    <div className="loan-addition-field">

                        <label>
                            EMI Payable
                        </label>

                        <input
                            type="text"
                            value={
                                `₹${Number(
                                    emiPayable
                                ).toFixed(2)}`
                            }
                            readOnly
                        />

                    </div>


                    {/* INTEREST */}

                    <div className="loan-addition-field">

                        <label>
                            Total Interest Payable
                        </label>

                        <input
                            type="text"
                            value={
                                `₹${Number(
                                    totalInterestPayable
                                ).toFixed(2)}`
                            }
                            readOnly
                        />

                    </div>


                    {/* TOTAL COST */}

                    <div className="loan-addition-field">

                        <label>
                            Total Cost
                        </label>

                        <input
                            type="text"
                            value={
                                `₹${Number(
                                    totalCost
                                ).toFixed(2)}`
                            }
                            readOnly
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="loan-addition-buttons">

                        <button
                            type="submit"
                            className="loan-add-btn save-loan-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "✓ Add Loan"
                            }

                        </button>


                        <button
                            type="button"
                            className="loan-add-btn reset-loan-btn"
                            onClick={
                                resetForm
                            }
                            disabled={loading}
                        >

                            ↻ Reset

                        </button>


                        <button
                            type="button"
                            className="loan-add-btn return-loan-btn"
                            onClick={
                                returnBack
                            }
                            disabled={loading}
                        >

                            ← Return Back

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default LoanAddition;