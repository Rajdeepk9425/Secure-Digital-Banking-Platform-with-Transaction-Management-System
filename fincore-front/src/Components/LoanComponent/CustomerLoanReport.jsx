import React from "react";
import { useNavigate } from "react-router-dom";


import "./CustomerLoanReport.css"

const CustomerLoanReport = () => {

    const navigate = useNavigate();

    const loanList = [

        {
            loanId: "L1000001",
            loanAmount: 100000,
            loanTenure: 1,
            totalTenure: 12,
            interestRate: 20,
            emiPayable: 9263.45,
            totalInterestPayable: 11161.41,
            totalCost: 111161.41
        },

        {
            loanId: "L1000002",
            loanAmount: 100000,
            loanTenure: 2,
            totalTenure: 24,
            interestRate: 20,
            emiPayable: 5089.58,
            totalInterestPayable: 22149.93,
            totalCost: 122149.93
        },

        {
            loanId: "L1000003",
            loanAmount: 100000,
            loanTenure: 3,
            totalTenure: 36,
            interestRate: 20,
            emiPayable: 3716.36,
            totalInterestPayable: 33788.90,
            totalCost: 133788.90
        },

        {
            loanId: "L1000004",
            loanAmount: 100000,
            loanTenure: 5,
            totalTenure: 60,
            interestRate: 20,
            emiPayable: 2649.39,
            totalInterestPayable: 58963.30,
            totalCost: 158963.30
        },

        {
            loanId: "L1000005",
            loanAmount: 100000,
            loanTenure: 10,
            totalTenure: 120,
            interestRate: 20,
            emiPayable: 1932.56,
            totalInterestPayable: 131906.81,
            totalCost: 231906.81
        }

    ];


    const applyLoan = (loan) => {

        navigate(
            "/customer-loan-entry",
            {
                state: loan
            }
        );

    };


    const returnBack = () => {

        navigate("/customer-menu");

    };



    return (

        <div className="loan-report-page">

            <h2 className="loan-report-heading">

                <u>
                    Loan Chart for ₹100000.00
                </u>

                <br />

                <u>
                    Interest Rate: 20%
                </u>

            </h2>


            <table className="loan-report-table">

                <thead>

                    <tr>

                        <th>
                            Loan Id
                        </th>

                        <th>
                            Loan Amount
                        </th>

                        <th>
                            Loan Tenure
                            (Years)
                        </th>

                        <th>
                            Total Tenure
                            (Months)
                        </th>

                        <th>
                            Interest Rate
                        </th>

                        <th>
                            EMI (Rs)
                        </th>

                        <th>
                            Total Interest
                        </th>

                        <th>
                            Total Cost
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {loanList.map((loan) => (

                        <tr key={loan.loanId}>

                            <td>
                                {loan.loanId}
                            </td>

                            <td>
                                ₹{loan.loanAmount.toFixed(2)}
                            </td>

                            <td>
                                {loan.loanTenure}
                            </td>

                            <td>
                                {loan.totalTenure}
                            </td>

                            <td>
                                {loan.interestRate}%
                            </td>

                            <td>
                                ₹{loan.emiPayable.toFixed(2)}
                            </td>

                            <td>
                                ₹{loan.totalInterestPayable.toFixed(2)}
                            </td>

                            <td>
                                ₹{loan.totalCost.toFixed(2)}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    className="apply-loan-btn"
                                    onClick={() =>
                                        applyLoan(loan)
                                    }
                                >
                                    Apply Loan
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>


            <div className="loan-report-return">

                <button
                    type="button"
                    onClick={returnBack}
                >
                    Return
                </button>

            </div>

        </div>

    );

};

export default CustomerLoanReport;