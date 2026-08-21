import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccountsByCustomerId } from "../../Services/AccountService";

import "./CustomerAccountDetails.css";

const CustomerAccountDetails = () => {


    const navigate = useNavigate();


    const [accounts,setAccounts] = useState([]);


    const loadAccounts = () => {


        getAccountsByCustomerId()

        .then((response)=>{


            setAccounts(response.data);


        })

        .catch((error)=>{


            console.log(
                "Error loading accounts : ",
                error
            );


        });


    };





    useEffect(()=>{


        loadAccounts();


    },[]);





    const returnBack = () => {


        navigate("/customer-menu");


    };






    return (


<div className="account-page">



<div className="account-card">



<h1 className="account-title">

Customer Account Details

</h1>





<div className="account-container">


{

accounts.length > 0 ?


accounts.map((account)=>(


<div

className="account-details-card"

key={account.accountNumber}

>



<div className="account-card-header">


<div className="account-icon">

🏦

</div>




<div>


<h3>

{account.accountType}

Account

</h3>


<p>

Account No : {account.accountNumber}

</p>


</div>


</div>







<div className="account-info">



<div>


<span>
Customer ID
</span>


<strong>

{account.customerId}

</strong>


</div>






<div>


<span>
Balance
</span>


<strong className="account-balance">


₹ {Number(account.balance).toLocaleString("en-IN")}


</strong>


</div>







<div>


<span>
Status
</span>



<span className="status-badge active">

Active

</span>


</div>



</div>





</div>


))



:



<div className="no-data">

No Accounts Found

</div>



}



</div>






<button

className="return-btn"

onClick={returnBack}

>

← Return Back

</button>




</div>


</div>


    );

};


export default CustomerAccountDetails;