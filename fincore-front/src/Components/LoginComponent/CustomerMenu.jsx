import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { getAccountsByCustomerId, getBalanceByAccountNumber } from "../../Services/AccountService";
import { getTransactionByCustomer } from "../../Services/TransactionService";
import "./CustomerMenu.css";


const CustomerMenu = () => {

    const navigate = useNavigate();

    const [customer,setCustomer]=useState({});

const [account,setAccount]=useState({});

const [balance,setBalance]=useState(0);

const [transactions,setTransactions]=useState([]);

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };

    const loadCustomerDashboard = () => {


    getCustomerByUsername()

    .then(response=>{

        const customerData=response.data;

        setCustomer(customerData);


        getAccountsByCustomerId()

        .then(accountResponse=>{


            if(accountResponse.data.length>0){


                const accountData=
                accountResponse.data[0];


                setAccount(accountData);



                getBalanceByAccountNumber(
                    accountData.accountNumber
                )

                .then(balanceResponse=>{


                    setBalance(
                        balanceResponse.data
                    );


                });


                getTransactionByCustomer(
                    customerData.customerId
                )

                .then(transactionResponse=>{


                    setTransactions(

                        transactionResponse.data
                        .slice(-5)
                        .reverse()

                    );


                });


            }


        });


    });


};

useEffect(()=>{

    loadCustomerDashboard();

},[]);

    return (
        <>

           
            <Navbar expand="lg" className="fincore-navbar">

                <div className="container-fluid px-4">

                  
                    <Navbar.Brand className="fincore-brand">

                        <div className="fincore-logo">
                            🏦
                        </div>

                        <div className="brand-text">
                            <div className="brand-name">
                                FinCore
                            </div>

                            <div className="brand-subtitle">
                                Digital Banking
                            </div>
                        </div>

                    </Navbar.Brand>


                  
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="custom-toggler"
                    />


                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto fincore-menu">


                            <NavDropdown
                                title={
                                    <>
                                        <span className="menu-icon">👤</span>
                                        Customer
                                    </>
                                }
                                id="customer-dropdown"
                                className="fincore-dropdown"
                            >

                                <NavDropdown.Item href="/customer-req">
                                    👤 Customer Request
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/logined-customer-detail">
                                    📊 Customer Report
                                </NavDropdown.Item>

                            </NavDropdown>


                            {/* Account */}
                            <NavDropdown
                                title={
                                    <>
                                        <span className="menu-icon">💳</span>
                                        Account
                                    </>
                                }
                                id="account-dropdown"
                                className="fincore-dropdown"
                            >

                                <NavDropdown.Item href="/customer-account-details">
                                    📋 Account List
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/customer-account-list">
                                    📄 Account Detail List
                                </NavDropdown.Item>

                            </NavDropdown>


                            <NavDropdown
                                title={
                                    <>
                                        <span className="menu-icon">💸</span>
                                        Transaction
                                    </>
                                }
                                id="transaction-dropdown"
                                className="fincore-dropdown"
                            >

                                <NavDropdown.Item href="/transaction-entry/1">
                                    💰 Deposit
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/transaction-entry/2">
                                    💵 Withdraw
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/customer-transaction-repo">
                                    📊 Transaction Report
                                </NavDropdown.Item>

                            </NavDropdown>


                        
                            <NavDropdown
                                title={
                                    <>
                                        <span className="menu-icon">🏦</span>
                                        Loan
                                    </>
                                }
                                id="loan-dropdown"
                                className="fincore-dropdown"
                            >

                                <NavDropdown.Item href="/customer-loan-report">
                                    📋 Loan Request
                                </NavDropdown.Item>

                                 <NavDropdown.Item href="/personal-loan-view">
                                    📋 Personal Loan View
                                </NavDropdown.Item>
                                

                            </NavDropdown>


                            <Nav.Link
                                onClick={handleLogout}
                                className="fincore-logout"
                            >
                                🚪 Logout
                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>

                </div>

            </Navbar>


        

<div className="fincore-welcome">

    <div>

        <h1>
            Welcome back, {customer.customerName || "Customer"} 👋
        </h1>


        <p>
            Secure, simple and smarter digital banking
        </p>


    </div>



    <div className="welcome-icon">

        💰

    </div>


</div>


<div className="customer-dashboard-grid">


<div className="customer-dashboard-card">

<h4>
💰 Current Balance
</h4>

<h2>
₹{Number(balance).toLocaleString("en-IN")}
</h2>

</div>



<div className="customer-dashboard-card">

<h4>
💳 Account Number
</h4>

<h2>
{account.accountNumber || "-"}
</h2>

</div>




<div className="customer-dashboard-card">

<h4>
🏦 Account Type
</h4>

<h2>
{account.accountType || "-"}
</h2>

</div>



<div className="customer-dashboard-card">

<h4>
👤 Customer
</h4>

<h2>
{customer.customerName || "-"}
</h2>

</div>


</div>




<div className="customer-transaction-section">


    <div className="customer-section-header">


        <h2>
            Recent Transactions
        </h2>


        <button
            className="customer-view-btn"
            onClick={()=>navigate("/customer-transaction-repo")}
        >
            View All
        </button>


    </div>



    <div className="fincore-table-container">


        <table className="fincore-table">


            <thead>

                <tr>

                    <th>
                        Transaction ID
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

            transactions.length > 0 ?


            (

            transactions.map((transaction)=>(


                <tr key={transaction.transactionId}>


                    <td>

                        #{transaction.transactionId}

                    </td>



                    <td>


                    {

                    transaction.transactionType
                    ?.toLowerCase()
                    === "deposit"

                    ?

                    <span className="customer-deposit">

                        ↓ Deposit

                    </span>


                    :

                    <span className="customer-withdraw">

                        ↑ Withdraw

                    </span>


                    }


                    </td>



                    <td>


                    ₹
                    {
                    Number(
                    transaction.transactionAmount
                    )
                    .toLocaleString("en-IN")
                    }


                    </td>



                    <td>

                    {
                    transaction.transactionDate
                    ?

                    new Date(
                    transaction.transactionDate
                    )
                    .toLocaleDateString("en-IN")

                    :

                    "-"
                    }


                    </td>



                </tr>


            ))

            )


            :


            (

            <tr>

                <td colSpan="4">

                    No Transactions Found

                </td>

            </tr>

            )


            }


            </tbody>


        </table>


    </div>


</div>




<div className="customer-action-section">


<h2 className="section-title">

    Quick Actions

</h2>



<div className="customer-action-grid">


<button

onClick={()=>navigate("/transaction-entry/1")}

>

💰 Deposit Money

</button>



<button

onClick={()=>navigate("/transaction-entry/2")}

>

💸 Withdraw Money

</button>




<button

onClick={()=>navigate("/customer-transaction-repo")}

>

📊 Transaction History

</button>




<button

onClick={()=>navigate("/customer-account-details")}

>

💳 Account Details

</button>



</div>


</div>

        </>
    );
};

export default CustomerMenu;