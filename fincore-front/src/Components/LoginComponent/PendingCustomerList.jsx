import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
    getCustomerByStatus
} from '../../Services/CustomerService';

import '../../DisplayView.css';
import "../../FinCorePage.css";
import toast from "react-hot-toast";


const PendingCustomerList = () => {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();


   

    const setCustomerData = () => {

        getCustomerByStatus("P")
            .then((response) => {

                setCustomers(response.data);

            })
            .catch(error => {

                alert(
                    "Error Occurred while loading data: " +
                    error
                );

            });

    };


    useEffect(() => {

        setCustomerData();

    }, []);


  

    const returnBack = () => {

        navigate('/admin-menu');

    };




    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-GB");

    };


    return (

        <div className="fincore-page">



            <div className="fincore-page-header">

                <div>

                    <h1 className="fincore-page-title">
                        Pending Customer Requests
                    </h1>

                    <p className="fincore-report-subtitle">
                        Review customer requests awaiting approval
                    </p>

                </div>


                <div className="pending-customer-count">

                    <span>
                        Pending Requests
                    </span>

                    <strong>
                        {customers.length}
                    </strong>

                </div>

            </div>



            <div className="fincore-card pending-customer-card">


               

                <div className="fincore-card-header">

                    <div className="pending-header-icon">
                        ⏳
                    </div>

                    <div>

                        <h3>
                            Customer Approval Queue
                        </h3>

                        <p className="fincore-card-subtitle">
                            Accept or reject pending customer requests
                        </p>

                    </div>

                </div>


               

                {customers.length > 0 ? (

                    <div className="fincore-table-container">

                        <table className="fincore-table pending-customer-table">

                            <thead>

                                <tr>

                                    <th>
                                        Customer ID
                                    </th>

                                    <th>
                                        Customer Name
                                    </th>

                                    <th>
                                        Address
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Date of Birth
                                    </th>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Date of Join
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

                                {customers.map((cust) => (

                                    <tr
                                        key={cust.customerId}
                                    >

                                     

                                        <td>

                                            <span className="customer-id-badge">
                                                #{cust.customerId}
                                            </span>

                                        </td>



                                        <td>

                                            <div className="customer-name-cell">

                                                <div className="customer-avatar">
                                                    {cust.customerName
                                                        ? cust.customerName
                                                            .charAt(0)
                                                            .toUpperCase()
                                                        : "?"}
                                                </div>

                                                <strong>
                                                    {cust.customerName || "-"}
                                                </strong>

                                            </div>

                                        </td>


                                  

                                        <td>

                                            <span className="customer-address">
                                                {cust.customerAddress || "-"}
                                            </span>

                                        </td>



                                        <td>
                                            {cust.email || "-"}
                                        </td>



                                        <td>

                                            {formatDate(
                                                cust.dateOfBirth
                                            )}

                                        </td>


                                        

                                        <td>

                                            <span className="customer-username">
                                                {cust.username || "-"}
                                            </span>

                                        </td>


                                      

                                        <td>

                                            {formatDate(
                                                cust.dateOfJoin
                                            )}

                                        </td>



                                        <td>

                                            <span className="fincore-status-pending">
                                                ⏳ Pending
                                            </span>

                                        </td>


                                      

                                        <td>

                                            <div className="pending-action-group">

                                                <Link
                                                    to={`/customer-edit/${cust.customerId}/1`}
                                                >

                                                    <button
                                                        type="button"
                                                        className="pending-accept-btn"
                                                    >
                                                        ✓ Accept
                                                    </button>

                                                </Link>


                                                <Link
                                                    to={`/customer-edit/${cust.customerId}/2`}
                                                >

                                                    <button
                                                        type="button"
                                                        className="pending-reject-btn"
                                                    >
                                                        ✕ Reject
                                                    </button>

                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                   

                    <div className="fincore-empty-state">

                        <div className="empty-state-icon">
                            ✓
                        </div>

                        <h3>
                            No Pending Customers
                        </h3>

                        <p>
                            There are currently no customer requests
                            waiting for approval.
                        </p>

                    </div>

                )}


              

                <div className="fincore-report-actions">

                    <button
                        type="button"
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

export default PendingCustomerList;