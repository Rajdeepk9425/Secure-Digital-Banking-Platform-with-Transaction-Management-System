import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getCustomerLoanById
} from "../../Services/CustomerLoanService";

import "../../DisplayView.css";
import "../../FinCorePage.css";


const CustomerLoanView = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [customerLoan, setCustomerLoan] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        loadCustomerLoan();

    }, [id]);


    const loadCustomerLoan = () => {

        getCustomerLoanById(id)

            .then((response) => {

                setCustomerLoan(
                    response.data
                );

                setLoading(false);

            })

            .catch((error) => {

                console.log(error);

                toast.error(
                    "Unable to load customer loan"
                );

                setLoading(false);

            });

    };


    const returnBack = () => {

        navigate("/admin-menu");

    };


    const save = () => {

        toast.success(
            "Loan saved"
        );

    };


    if (loading) {

        return (

            <div className="customer-loan-view-page">

                <div className="customer-loan-view-card">

                    <h2>
                        Loading Customer Loan...
                    </h2>

                </div>

            </div>

        );

    }


    if (!customerLoan) {

        return (

            <div className="customer-loan-view-page">

                <div className="customer-loan-view-card">

                    <h2>
                        Customer Loan Not Found
                    </h2>

                    <button
                        className="loan-btn back-btn"
                        onClick={returnBack}
                    >
                        Return Back
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="customer-loan-view-page">


            <div className="customer-loan-view-card">


                <h1 className="customer-loan-view-title">

                    Customer Loan Request View

                </h1>


                <div className="loan-details">


                    <div className="loan-detail-row">

                        <strong>
                            Customer Loan Id:
                        </strong>

                        <span>
                            {customerLoan.customerLoanId}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Customer Id:
                        </strong>

                        <span>
                            {customerLoan.customerId}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Id:
                        </strong>

                        <span>
                            {customerLoan.loanId}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Type:
                        </strong>

                        <span>
                            {customerLoan.loanType || "Personal Loan"}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Interest Rate:
                        </strong>

                        <span>
                            {customerLoan.interestRate}%
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Amount:
                        </strong>

                        <span>
                            ₹
                            {Number(
                                customerLoan.loanAmount || 0
                            ).toFixed(2)}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Total Interest Need to Pay:
                        </strong>

                        <span>
                            ₹
                            {Number(
                                customerLoan.totalInterestPayable || 0
                            ).toFixed(2)}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            EMI:
                        </strong>

                        <span>
                            ₹
                            {Number(
                                customerLoan.emiPayable || 0
                            ).toFixed(2)}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Total Tenure:
                        </strong>

                        <span>
                            {customerLoan.totalTenure}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Already Paid Tenures:
                        </strong>

                        <span>
                            {customerLoan.paidTenure || 0}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Amount Paid Till Date:
                        </strong>

                        <span>
                            ₹
                            {Number(
                                customerLoan.amountPaidTillDate || 0
                            ).toFixed(2)}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Total Amount Need to Pay:
                        </strong>

                        <span>
                            ₹
                            {Number(
                                customerLoan.totalCost || 0
                            ).toFixed(2)}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Saving Account:
                        </strong>

                        <span>
                            {customerLoan.savingsAccountNumber}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Payment Account:
                        </strong>

                        <span>
                            {customerLoan.paymentAccountNumber || 0}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Date:
                        </strong>

                        <span>
                            {customerLoan.loanDate || "-"}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Loan Status:
                        </strong>

                        <span>
                            {customerLoan.status || "P"}
                        </span>

                    </div>


                    <div className="loan-detail-row">

                        <strong>
                            Payment Complete Date:
                        </strong>

                        <span>
                            {customerLoan.completeDate || "-"}
                        </span>

                    </div>


                </div>


                <div className="customer-loan-view-buttons">


                    <button
                        className="loan-btn save-btn"
                        onClick={save}
                    >
                        Save
                    </button>


                    <button
                        className="loan-btn back-btn"
                        onClick={returnBack}
                    >
                        Return Back
                    </button>


                </div>


            </div>

        </div>

    );

};

export default CustomerLoanView;