import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getAllCustomerLoans,
    addLoanAmountToAccount
} from "../../Services/CustomerLoanService";

import "../../DisplayView.css";
import "../../FinCorePage.css";

const LoanReport = () => {

    const navigate = useNavigate();

    const [loanList, setLoanList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadLoans();

    }, []);


  const loadLoans = () => {

    setLoading(true);
    setError("");

    getAllCustomerLoans()

        .then((response) => {

            console.log(
                "All Customer Loans:",
                response.data
            );

            /*
             * Backend returns all customer loans.
             *
             * Admin report should show:
             * A = Approved
             * D = Amount Added
             */

            const loans = response.data || [];

            const approvedLoans = loans.filter((loan) => {

                const status =
                    String(loan.status || "")
                        .trim()
                        .toUpperCase();

                return (
                    status === "A" ||
                    status === "D" ||
                    status === "APPROVED" ||
                    status === "ACCEPTED"
                );

            });

            console.log(
                "Approved Customer Loans:",
                approvedLoans
            );

            setLoanList(approvedLoans);

        })

        .catch((error) => {

            console.log(
                "Loan Report Error:",
                error
            );

            setError(
                "Unable to load loan report"
            );

            toast.error(
                "Unable to load loan report"
            );

        })

        .finally(() => {

            setLoading(false);

        });

};

    const handleAddAmount = (
        customerLoanId
    ) => {

        const confirmAdd =
            window.confirm(
                "Are you sure you want to add the loan amount to the customer's account?"
            );


        if (!confirmAdd) {

            return;

        }


        addLoanAmountToAccount(
            customerLoanId
        )

        .then((response) => {

            console.log(
                "Amount Added:",
                response.data
            );


            toast.success(
                "Loan amount added to account successfully 💰"
            );


            loadLoans();

        })

        .catch((error) => {

            console.log(
                "Add Amount Error:",
                error
            );


            toast.error(
                "Unable to add loan amount"
            );

        });

    };

    const returnBack = () => {

        navigate("/admin-menu");

    };

    const formatAmount = (amount) => {

        const value =
            Number(amount);


        if (isNaN(value)) {

            return "₹0.00";

        }


        return `₹${value.toFixed(2)}`;

    };

    const getStatusText = (status) => {

        const value =
            String(status || "")
                .trim()
                .toUpperCase();


        if (value === "D") {

            return "Amount Added";

        }


        if (
            value === "A" ||
            value === "APPROVED" ||
            value === "ACCEPTED"
        ) {

            return "Approved";

        }


        return value;

    };

    return (

        <div className="loan-report-page">


            <div className="loan-report-heading">

                <h1>
                    Accepted Loan Report
                </h1>

                <p>
                    Details of loans approved by the bank
                </p>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="loan-report-message">

                    <div className="loan-report-spinner">
                    </div>

                    <p>
                        Loading accepted loans...
                    </p>

                </div>

            )}


            {/* ERROR */}

            {!loading && error && (

                <div className="loan-report-error">

                    <p>
                        ⚠ {error}
                    </p>

                    <button
                        type="button"
                        onClick={loadLoans}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* EMPTY */}

            {!loading &&
                !error &&
                loanList.length === 0 && (

                    <div className="loan-report-empty">

                        <div className="loan-empty-icon">
                            💰
                        </div>

                        <h2>
                            No Accepted Loans
                        </h2>

                        <p>
                            No customer loans have
                            been approved yet.
                        </p>

                    </div>

                )}


            {/* TABLE */}

            {!loading &&
                !error &&
                loanList.length > 0 && (

                    <div className="loan-report-table-container">

                        <table className="loan-report-table">

                            <thead>

                                <tr>

                                    <th>
                                        Customer Loan ID
                                    </th>

                                    <th>
                                        Loan ID
                                    </th>

                                    <th>
                                       Loan Type
                                    </th>

                                    <th>
                                        Account ID
                                    </th>

                                    <th>
                                        Loan Amount
                                    </th>

                                    <th>
                                        Loan Tenure
                                    </th>

                                    <th>
                                        Total Tenure
                                    </th>

                                    <th>
                                        Interest Rate
                                    </th>

                                    <th>
                                        EMI
                                    </th>

                                    <th>
                                        Total Interest
                                    </th>

                                    <th>
                                        Total Cost
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loanList.map(
                                    (loan, index) => {

                                        const status =
                                            String(
                                                loan.status || ""
                                            )
                                            .trim()
                                            .toUpperCase();


                                        const amountAdded =
                                            status === "D";


                                        return (

                                            <tr
                                                key={
                                                    loan.customerLoanId ||
                                                    index
                                                }
                                            >

                                                <td>

                                                    <span className="customer-loan-id-badge">

                                                        {
                                                            loan.customerLoanId ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <span className="loan-id-badge">

                                                        {
                                                            loan.loanId ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>

                                                <td>
    <span className="loan-type-badge">
        {loan.loanType || "-"}
    </span>
</td>


                                                <td>

                                                    <span className="account-id-badge">

                                                        {
                                                            loan.savingsAccountNumber ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    {formatAmount(
                                                        loan.loanAmount
                                                    )}

                                                </td>


                                                <td>

                                                    {
                                                        loan.loanTenure ||
                                                        0
                                                    } Years

                                                </td>


                                                <td>

                                                    {
                                                        loan.totalTenure ||
                                                        0
                                                    } Months

                                                </td>


                                                <td>

                                                    {
                                                        loan.interestRate ||
                                                        0
                                                    }%

                                                </td>


                                                <td>

                                                    {formatAmount(
                                                        loan.emiPayable
                                                    )}

                                                </td>


                                                <td>

                                                    {formatAmount(
                                                        loan.totalInterestPayable
                                                    )}

                                                </td>


                                                <td>

                                                    {formatAmount(
                                                        loan.totalCost
                                                    )}

                                                </td>


                                                <td>

                                                    <span className="loan-status-approved">

                                                        {
                                                            getStatusText(
                                                                loan.status
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    {amountAdded ? (

                                                        <span
                                                            className="loan-amount-added"
                                                        >
                                                            ✓ Amount Added
                                                        </span>

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            className="loan-add-amount-btn"
                                                            onClick={() =>
                                                                handleAddAmount(
                                                                    loan.customerLoanId
                                                                )
                                                            }
                                                        >
                                                            💰 Add Amount to Account
                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}


            {/* RETURN */}

            <div className="loan-report-return">

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

export default LoanReport;