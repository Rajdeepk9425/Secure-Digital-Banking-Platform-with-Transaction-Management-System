import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getAccounts,
    deleteAccountByNumber
} from '../../Services/AccountService';

import '../../DisplayView.css';
import "../../FinCorePage.css";
import "./AccountReport.css";
import toast from "react-hot-toast";


const AccountReport = () => {


    const [accounts, setAccounts] = useState([]);

    const [filteredAccounts, setFilteredAccounts] = useState([]);


    const [accountSearch, setAccountSearch] = useState("");

    const [customerSearch, setCustomerSearch] = useState("");

    const [typeFilter, setTypeFilter] = useState("ALL");



    const navigate = useNavigate();

    const setAccountData = () => {


        getAccounts()

        .then((response)=>{


            setAccounts(response.data);

            setFilteredAccounts(response.data);


        })

        .catch(error=>{


            alert(
                "Error Occurred while loading data : "
                + error
            );


        });


    };




    useEffect(()=>{


        setAccountData();


    },[]);

    const applyFilters = () => {


        let data=[...accounts];



        if(accountSearch)
        {

            data=data.filter(

                (account)=>

                String(account.accountNumber)
                .includes(accountSearch)

            );

        }


       if(customerSearch)
        {

            data=data.filter(

                (account)=>

                String(account.customerId)
                .includes(customerSearch)

            );

        }


        if(typeFilter !== "ALL")
        {

            data=data.filter(

                (account)=>

                account.accountType
                ?.toLowerCase()
                ===
                typeFilter.toLowerCase()

            );

        }

        setFilteredAccounts(data);


    };

    const resetFilters = () => {


        setAccountSearch("");

        setCustomerSearch("");

        setTypeFilter("ALL");


        setFilteredAccounts(accounts);


    };

    const removeAccount=(accountNumber)=>{


        const confirmDelete =
        window.confirm(
            `Are you sure you want to delete account ${accountNumber}?`
        );


        if(!confirmDelete)
        {
            return;
        }



        deleteAccountByNumber(accountNumber)

        .then(()=>{


            const remaining =
            accounts.filter(

                account=>

                account.accountNumber !== accountNumber

            );


            setAccounts(remaining);

            setFilteredAccounts(remaining);


        })


        .catch(error=>{


            alert(
                "Unable to delete account : "
                + error
            );


        });


    };

    const returnBack=()=>{


        navigate("/admin-menu");


    };


    const formatDate=(date)=>{


        if(!date)
        {
            return "-";
        }


        const parsedDate=new Date(date);


        if(isNaN(parsedDate.getTime()))
        {
            return date;
        }


        return parsedDate.toLocaleDateString("en-GB");


    };


    const formatBalance=(balance)=>{


        return new Intl.NumberFormat(

            "en-IN",

            {
                style:"currency",
                currency:"INR"
            }

        ).format(balance || 0);


    };


    const totalBalance = filteredAccounts.reduce(

        (sum,account)=>

        sum + Number(account.balance || 0)

    ,0);







return(


<div className="fincore-page">





<div className="fincore-page-header">


<div>


<h1 className="fincore-page-title">

Account Report

</h1>


<p className="fincore-report-subtitle">

Manage and view all customer accounts

</p>


</div>




<div className="fincore-report-count">


<span>

Total Accounts

</span>


<strong>

{filteredAccounts.length}

</strong>


</div>


</div>







<div className="fincore-card account-report-card">






<div className="fincore-card-header">


<div className="fincore-card-icon">

💳

</div>


<div>

<h3>

Accounts List

</h3>


<p className="fincore-card-subtitle">

Complete bank account information

</p>


</div>


</div>


<div className="account-filter-box">


<input

type="text"

placeholder="Account Number"

value={accountSearch}

onChange={(e)=>
setAccountSearch(e.target.value)
}

/>



<input

type="text"

placeholder="Customer ID"

value={customerSearch}

onChange={(e)=>
setCustomerSearch(e.target.value)
}

/>

<select

value={typeFilter}

onChange={(e)=>
setTypeFilter(e.target.value)
}

>

<option value="ALL">
All Account Types
</option>


<option value="Savings">
Savings
</option>


<option value="Current">
Current
</option>


</select>

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

<div className="account-summary">



<div>

<span>
Total Accounts
</span>


<strong>

{filteredAccounts.length}

</strong>


</div>




<div>

<span>
Total Balance
</span>


<strong className="total-balance">

{formatBalance(totalBalance)}

</strong>


</div>



</div>


{

filteredAccounts.length > 0 ?



<div className="fincore-table-container">


<table className="fincore-table account-table">


<thead>

<tr>

<th>
Account Number
</th>


<th>
Customer ID
</th>


<th>
Account Type
</th>


<th>
Balance
</th>


<th>
Status
</th>


<th>
Open Date
</th>


<th>
Action
</th>


</tr>

</thead>


<tbody>


{

filteredAccounts.map((account)=>(


<tr key={account.accountNumber}>


<td>

<span className="account-number-badge">

{account.accountNumber}

</span>


</td>


<td>

<span className="account-customer-id">

#{account.customerId}

</span>


</td>


<td>

<span className="account-type-badge">

💳 {account.accountType}

</span>


</td>


<td>

<span className="account-balance">

{formatBalance(account.balance)}

</span>


</td>


<td>


<span className="fincore-status-active">

● Active

</span>


</td>


<td>

{formatDate(account.accountopenDate)}

</td>



<td>


<button

className="fincore-delete-btn"

onClick={()=>
removeAccount(account.accountNumber)
}

>

🗑 Delete

</button>


</td>





</tr>


))


}


</tbody>


</table>


</div>



:



<div className="fincore-empty-state">


<div className="empty-state-icon">

💳

</div>


<h3>

No Accounts Found

</h3>


<p>

No bank accounts available.

</p>


</div>



}


<div className="fincore-report-actions">


<button

className="fincore-btn-secondary"

onClick={returnBack}

>

← Back to Admin Menu

</button>


</div>


</div>


</div>



);


};


export default AccountReport;