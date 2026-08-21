import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTransactions } from "../../Services/TransactionService";

import "../../DisplayView.css";
import "../../FinCorePage.css";
import "./TransactionReport.css";
import toast from "react-hot-toast";


const TransactionReport = () => {


    const navigate = useNavigate();



    const [allTransactions,setAllTransactions] = useState([]);

    const [filteredTransactions,setFilteredTransactions] = useState([]);

    

    const [typeFilter,setTypeFilter] = useState("ALL");

    const [accountFilter,setAccountFilter] = useState("");

    const [customerFilter,setCustomerFilter] = useState("");

    const [transactionSearch,setTransactionSearch] = useState("");


    const setTransactionData = () => {


        getAllTransactions()

        .then((response)=>{


            setAllTransactions(response.data);

            setFilteredTransactions(response.data);


        })

        .catch((error)=>{


            alert(
                "Error loading transactions : "+error
            );


        });


    };




    useEffect(()=>{


        setTransactionData();


    },[]);


    const applyFilters = () => {


        let data=[...allTransactions];



        if(typeFilter !== "ALL")
        {

            data=data.filter(

                (transaction)=>

                transaction.transactionType
                ?.toLowerCase()
                ===
                typeFilter.toLowerCase()

            );

        }




        if(accountFilter)
        {

            data=data.filter(

                (transaction)=>

                String(transaction.accountNumber)
                .includes(accountFilter)

            );

        }





        if(customerFilter)
        {

            data=data.filter(

                (transaction)=>

                String(transaction.customerId)
                .includes(customerFilter)

            );

        }





        if(transactionSearch)
        {

            data=data.filter(

                (transaction)=>

                String(transaction.transactionId)
                .includes(transactionSearch)

            );

        }



        setFilteredTransactions(data);


    };


    const resetFilters = () => {


        setTypeFilter("ALL");

        setAccountFilter("");

        setCustomerFilter("");

        setTransactionSearch("");

        setFilteredTransactions(allTransactions);


    };


    const returnBack = () => {


        navigate("/admin-menu");


    };

    const formatAmount=(amount)=>{


        return new Intl.NumberFormat(
            "en-IN",
            {
                style:"currency",
                currency:"INR"
            }
        )
        .format(amount);


    };


    const formatDate=(date)=>{


        if(!date)
        {
            return "-";
        }


        return new Date(date)
        .toLocaleDateString("en-IN");


    };



    return (

<div className="fincore-page">



<div className="fincore-page-header">


<div>

<h1 className="fincore-page-title">

Admin Transaction Report

</h1>


<p className="fincore-report-subtitle">

All Customer Transaction History

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



<div className="fincore-card-header">


<div className="fincore-card-icon">

📊

</div>



<div>

<h3>

Transaction List

</h3>


<p className="fincore-card-subtitle">

Deposit and Withdrawal Records

</p>


</div>


</div>


<div className="transaction-filter-card">


    <div className="filter-group">

        <label>
            Transaction ID
        </label>

        <input

            type="text"

            placeholder="Search Transaction ID"

            value={transactionSearch}

            onChange={(e)=>
                setTransactionSearch(e.target.value)
            }

        />

    </div>





    <div className="filter-group">

        <label>
            Account Number
        </label>

        <input

            type="text"

            placeholder="Account Number"

            value={accountFilter}

            onChange={(e)=>
                setAccountFilter(e.target.value)
            }

        />

    </div>





    <div className="filter-group">

        <label>
            Customer ID
        </label>

        <input

            type="text"

            placeholder="Customer ID"

            value={customerFilter}

            onChange={(e)=>
                setCustomerFilter(e.target.value)
            }

        />

    </div>





    <div className="filter-group">

        <label>
            Transaction Type
        </label>


        <select

            value={typeFilter}

            onChange={(e)=>
                setTypeFilter(e.target.value)
            }

        >

            <option value="ALL">
                All
            </option>


            <option value="Deposit">
                Deposit
            </option>


            <option value="Withdraw">
                Withdraw
            </option>


        </select>


    </div>





    <div className="filter-buttons">


        <button

            className="filter-search-btn"

            onClick={applyFilters}

        >

            🔍 Search

        </button>




        <button

            className="filter-reset-btn"

            onClick={resetFilters}

        >

            🔄 Reset

        </button>


    </div>



</div>


<div className="transaction-summary">


<div>

<span>
Total Transactions
</span>


<strong>

{filteredTransactions.length}

</strong>


</div>





<div>

<span>
Deposits
</span>


<strong className="summary-credit">


{

filteredTransactions.filter(

(t)=>

t.transactionType
?.toLowerCase()
==="deposit"

).length


}


</strong>


</div>






<div>

<span>
Withdrawals
</span>


<strong className="summary-debit">


{

filteredTransactions.filter(

(t)=>

t.transactionType
?.toLowerCase()
==="withdraw"

).length


}


</strong>


</div>


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
Transaction Type
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

filteredTransactions.length > 0 ?



filteredTransactions.map((transaction)=>(


<tr key={transaction.transactionId}>


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

{transaction.customerId}

</td>





<td>


{

transaction.transactionType
?.toLowerCase()
==="deposit"


?


<span className="transaction-deposit-badge">

↓ Deposit

</span>



:


<span className="transaction-withdraw-badge">

↑ Withdraw

</span>


}


</td>





<td>


<span

className={

transaction.transactionType
?.toLowerCase()
==="deposit"

?

"transaction-credit"

:

"transaction-debit"

}


>


{

transaction.transactionType
?.toLowerCase()
==="deposit"

?

"+"

:

"-"

}


{" "}


{

formatAmount(
transaction.transactionAmount
)

}


</span>


</td>





<td>


{

formatDate(
transaction.transactionDate
)

}


</td>




</tr>


))



:


<tr>

<td colSpan="6">


No Transactions Found


</td>


</tr>


}



</tbody>



</table>



</div>



<div className="fincore-report-actions">


<button

type="button"

className="fincore-btn-secondary"

onClick={returnBack}

>


← Return Back


</button>



</div>





</div>



</div>


);

};


export default TransactionReport;