import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {getAllTransactions} from "../../Services/TransactionService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import toast from "react-hot-toast";



const AdminTransactionReport =()=>{


    const [transactions,setTransactions]=useState([]);

    const [filteredTransactions,setFilteredTransactions]=useState([]);


    const [typeFilter,setTypeFilter]=useState("ALL");

    const [accountFilter,setAccountFilter]=useState("");



    const navigate=useNavigate();



    useEffect(()=>{


        getAllTransactions()

        .then(response=>{

            setTransactions(response.data);

            setFilteredTransactions(response.data);

        })

        .catch(error=>{

            alert("Error loading transactions "+error);

        });


    },[]);

    const applyFilter=()=>{


        let data=[...transactions];



        if(typeFilter!=="ALL"){


            data=data.filter(

                t=>

                t.transactionType
                ?.toLowerCase()
                ===
                typeFilter.toLowerCase()

            );

        }



        if(accountFilter.trim()!==""){


            data=data.filter(

                t=>

                String(t.accountNumber)
                .includes(accountFilter)

            );


        }



        setFilteredTransactions(data);


    };




    useEffect(()=>{


        applyFilter();


    },[typeFilter,accountFilter]);






    const formatAmount=(amount)=>{


        return new Intl.NumberFormat(

            "en-IN",

            {

            style:"currency",

            currency:"INR"

            }

        ).format(amount);


    };

    const formatDate=(date)=>{


        if(!date)
            return "-";


        return new Date(date)
        .toLocaleDateString("en-GB");


    };


    return(


    <div className="fincore-page">



        <div className="fincore-page-header">


            <div>

                <h1 className="fincore-page-title">

                    Admin Transaction Report

                </h1>


                <p className="fincore-report-subtitle">

                    View all customer transactions

                </p>

            </div>




            <div className="fincore-report-count">


                <span>
                    Total Transactions
                </span>


                <strong>

                    {filteredTransactions.length}

                </strong>


            </div>


        </div>






        <div className="fincore-card transaction-report-card">



        <div className="transaction-filter">


            <select

            value={typeFilter}

            onChange={(e)=>
                setTypeFilter(e.target.value)
            }

            >

                <option value="ALL">
                    All Transactions
                </option>


                <option value="Deposit">
                    Deposits
                </option>


                <option value="Withdraw">
                    Withdrawals
                </option>


            </select>





            <input

            type="text"

            placeholder="Search Account Number"

            value={accountFilter}

            onChange={(e)=>
                setAccountFilter(e.target.value)
            }

            />



        </div>







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
                Customer ID
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


        {

        filteredTransactions.map(transaction=>{


            const deposit=

            transaction.transactionType
            ?.toLowerCase()
            ==="deposit";



            return(


            <tr key={transaction.transactionId}>


            <td>

                #{transaction.transactionId}

            </td>



            <td>

                {transaction.accountNumber}

            </td>



            <td>

                {transaction.customerId}

            </td>




            <td>


            <span

            className={

            deposit

            ?

            "transaction-badge transaction-deposit-badge"

            :

            "transaction-badge transaction-withdraw-badge"

            }

            >

            {

            deposit

            ?

            "↓ Deposit"

            :

            "↑ Withdraw"

            }


            </span>


            </td>




            <td>


            <span

            className={

            deposit

            ?

            "transaction-credit"

            :

            "transaction-debit"

            }

            >

            {deposit?"+":"-"}

            {formatAmount(
                transaction.transactionAmount
            )}


            </span>


            </td>




            <td>

            {formatDate(
                transaction.transactionDate
            )}

            </td>



            </tr>


            );


        })


        }


        </tbody>


        </table>


        </div>





        <div className="fincore-report-actions">


        <button

        className="fincore-btn-secondary"

        onClick={()=>navigate("/admin-menu")}

        >

        ← Return Back


        </button>


        </div>



        </div>



    </div>


    );


};


export default AdminTransactionReport;