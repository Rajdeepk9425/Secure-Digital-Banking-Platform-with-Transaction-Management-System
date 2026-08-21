import React, {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    generateCustomerLoanId
} from "../../Services/CustomerLoanService";

import {
    getAccountIdsByCustomerIdAndType
} from "../../Services/AccountService";

import "../../DisplayView.css";
import "../../FinCorePage.css";


const CustomerLoanEntry = () => {

    const navigate = useNavigate();

    const location = useLocation();


    // =====================================================
    // SELECTED LOAN DATA
    // =====================================================

    const selectedLoan =
        location.state || {};


    // =====================================================
    // STATES
    // =====================================================

    const [
        customerLoanId,
        setCustomerLoanId
    ] = useState("");


    const [
        loanId,
        setLoanId
    ] = useState(
        selectedLoan.loanId || ""
    );


    const [
        loanAmount,
        setLoanAmount
    ] = useState(
        selectedLoan.loanAmount || 100000
    );


    const [
        loanTenure,
        setLoanTenure
    ] = useState(
        selectedLoan.loanTenure || 1
    );


    const interestRate = 20;


    const [
        totalTenure,
        setTotalTenure
    ] = useState(
        selectedLoan.totalTenure || 12
    );


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
    // SAVINGS ACCOUNT
    // =====================================================

    const [
        accountNumbers,
        setAccountNumbers
    ] = useState([]);


    const [
        savingsAccountNumber,
        setSavingsAccountNumber
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadCustomerLoanId();

        loadSavingsAccounts();

    }, []);


    // =====================================================
    // GENERATE CUSTOMER LOAN ID
    // =====================================================

    const loadCustomerLoanId = () => {

        generateCustomerLoanId()

            .then((response) => {

                console.log(
                    "Generated Customer Loan ID:",
                    response.data
                );

                setCustomerLoanId(
                    response.data
                );

            })

            .catch((error) => {

                console.error(
                    "Customer Loan ID generation error:",
                    error
                );

                toast.error(
                    "Unable to generate Customer Loan ID"
                );

            });
    };


    // =====================================================
    // LOAD ONLY SAVINGS ACCOUNTS
    // =====================================================

    const loadSavingsAccounts = () => {

        /*
         * IMPORTANT:
         *
         * Do NOT use:
         *
         * getAccountIdsByCustomerId()
         *
         * because that returns both Savings and Loan
         * accounts.
         *
         * We explicitly request Savings accounts.
         */

        getAccountIdsByCustomerIdAndType(
            "Savings"
        )

            .then((response) => {

                console.log(
                    "Customer Savings Accounts:",
                    response.data
                );

                setAccountNumbers(
                    response.data || []
                );

            })

            .catch((error) => {

                console.error(
                    "Savings account loading error:",
                    error
                );

                toast.error(
                    "Unable to load your savings accounts"
                );

            });
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


        // -------------------------------------------------
        // MULTIPLE OF 50,000
        // -------------------------------------------------

        if (
            numericAmount % 50000 !== 0
        ) {

            setError(
                "Loan Amount must be a multiple of ₹50,000"
            );

            setEmiPayable(0);

            setTotalInterestPayable(0);

            setTotalCost(0);

            return;
        }


        setError("");


        // -------------------------------------------------
        // TOTAL TENURE
        // -------------------------------------------------

        const months =
            numericTenure * 12;


        setTotalTenure(
            months
        );


        // -------------------------------------------------
        // MONTHLY INTEREST
        // -------------------------------------------------

        const monthlyRate =
            interestRate / 12 / 100;


        // -------------------------------------------------
        // EMI
        // -------------------------------------------------

        const emi =
            numericAmount *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );


        // -------------------------------------------------
        // TOTAL PAYMENT
        // -------------------------------------------------

        const totalPayment =
            emi * months;


        // -------------------------------------------------
        // TOTAL INTEREST
        // -------------------------------------------------

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

    const handleAmountChange = (event) => {

        const value =
            event.target.value;


        if (value === "") {

            setLoanAmount("");

            setError("");

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

        setError("");
    };


    // =====================================================
    // TENURE CHANGE
    // =====================================================

    const handleTenureChange = (event) => {

        const value =
            Number(
                event.target.value
            );


        setLoanTenure(
            value
        );
    };


    // =====================================================
    // SAVE
    // =====================================================

    const saveLoan = (event) => {

        event.preventDefault();


        // -------------------------------------------------
        // LOAN ID
        // -------------------------------------------------

        if (!loanId) {

            toast.error(
                "Loan ID is missing. Please select a loan from Loan Report."
            );

            return;
        }


        // -------------------------------------------------
        // AMOUNT
        // -------------------------------------------------

        const amount =
            Number(loanAmount);


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
        // SAVINGS ACCOUNT
        // -------------------------------------------------

        if (!savingsAccountNumber) {

            toast.error(
                "Please select your savings account"
            );

            return;
        }


        /*
         * Extra frontend protection.
         *
         * Make sure the selected account actually
         * exists in the Savings Account list.
         */

        const selectedAccountExists =
            accountNumbers.some(
                accountNumber =>
                    Number(accountNumber) ===
                    Number(savingsAccountNumber)
            );


        if (!selectedAccountExists) {

            toast.error(
                "Invalid savings account selected"
            );

            return;
        }


        // -------------------------------------------------
        // REQUEST
        // -------------------------------------------------

        const loanRequest = {

            customerLoanId:
                customerLoanId,

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

            paidTenure:
                0,

            amountPaidTillDate:
                0.0,

            loanDate:
                new Date()
                    .toLocaleDateString(
                        "en-GB"
                    ),

            completeDate:
                "",

            status:
                "P",

            /*
             * THIS is the account that must
             * eventually be stored in Loan.accountNumber.
             */
            savingsAccountNumber:
                Number(
                    savingsAccountNumber
                ),

            /*
             * Keep payment account empty
             * until actually required.
             */
            paymentAccountNumber:
                0
        };


        console.log(
            "Loan Request:",
            loanRequest
        );


        // -------------------------------------------------
        // GO TO REQUEST VIEW
        // -------------------------------------------------

        navigate(
            "/customer-loan-request-view",
            {
                state: {
                    loanRequest:
                        loanRequest
                }
            }
        );
    };


    // =====================================================
    // RESET
    // =====================================================

    const resetForm = () => {

        const defaultAmount =
            selectedLoan.loanAmount ||
            100000;


        const defaultTenure =
            selectedLoan.loanTenure ||
            1;


        setLoanAmount(
            defaultAmount
        );


        setLoanTenure(
            defaultTenure
        );


        setSavingsAccountNumber(
            ""
        );


        setError("");


        calculateLoan(
            defaultAmount,
            defaultTenure
        );
    };


    // =====================================================
    // RETURN
    // =====================================================

    const returnBack = () => {

        navigate(
            "/customer-menu"
        );
    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="customer-loan-entry-page">

            <div className="customer-loan-entry-card">

                <h1 className="customer-loan-entry-title">

                    Customer Loan Request

                </h1>


                <p>

                    Enter your loan details and continue
                    to review your request.

                </p>


                <form
                    onSubmit={saveLoan}
                >


                    {/* CUSTOMER LOAN ID */}

                    <div className="customer-loan-field">

                        <label>
                            Customer Loan Id:
                        </label>

                        <input
                            type="text"
                            value={customerLoanId}
                            readOnly
                        />

                    </div>


                    {/* LOAN ID */}

                    <div className="customer-loan-field">

                        <label>
                            Loan Id:
                        </label>

                        <input
                            type="text"
                            value={loanId}
                            readOnly
                        />

                    </div>


                    {/* LOAN TYPE */}

                    <div className="customer-loan-field">

                        <label>
                            Loan Type:
                        </label>

                        <input
                            type="text"
                            value="Personal Loan"
                            readOnly
                        />

                    </div>


                    {/* LOAN AMOUNT */}

                    <div className="customer-loan-field">

                        <label>
                            Loan Amount:
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


                        {error && (

                            <div className="customer-loan-error">

                                ⚠ {error}

                            </div>

                        )}


                        <small>
                            Amount must be a multiple of ₹50,000
                        </small>

                    </div>


                    {/* INTEREST RATE */}

                    <div className="customer-loan-field">

                        <label>
                            Interest Rate:
                        </label>

                        <input
                            type="text"
                            value={`${interestRate}%`}
                            readOnly
                        />

                    </div>


                    {/* TENURE */}

                    <div className="customer-loan-field">

                        <label>
                            Loan Tenure:
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

                    <div className="customer-loan-field">

                        <label>
                            Total Tenure:
                        </label>

                        <input
                            type="text"
                            value={`${totalTenure} Months`}
                            readOnly
                        />

                    </div>


                    {/* EMI */}

                    <div className="customer-loan-field">

                        <label>
                            EMI:
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


                    {/* TOTAL INTEREST */}

                    <div className="customer-loan-field">

                        <label>
                            Total Interest:
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

                    <div className="customer-loan-field">

                        <label>
                            Total Amount:
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


                    {/* SAVINGS ACCOUNT */}

                    <div className="customer-loan-field">

                        <label>
                            Select Savings Account Number:
                        </label>


                        <select
                            value={
                                savingsAccountNumber
                            }
                            onChange={(e) =>
                                setSavingsAccountNumber(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Savings Account
                            </option>


                            {accountNumbers.map(
                                (accountNumber) => (

                                    <option
                                        key={
                                            accountNumber
                                        }
                                        value={
                                            accountNumber
                                        }
                                    >

                                        {accountNumber}

                                    </option>

                                )
                            )}

                        </select>


                        {accountNumbers.length === 0 && (

                            <small className="customer-loan-error">

                                No savings accounts found
                                for the logged-in customer.

                            </small>

                        )}

                    </div>


                    {/* BUTTONS */}

                    <div className="customer-loan-buttons">

                        <button
                            type="submit"
                            className="loan-btn save-btn"
                        >

                            Save

                        </button>


                        <button
                            type="button"
                            className="loan-btn reset-btn"
                            onClick={
                                resetForm
                            }
                        >

                            Reset

                        </button>


                        <button
                            type="button"
                            className="loan-btn back-btn"
                            onClick={
                                returnBack
                            }
                        >

                            Return Back

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};


export default CustomerLoanEntry;