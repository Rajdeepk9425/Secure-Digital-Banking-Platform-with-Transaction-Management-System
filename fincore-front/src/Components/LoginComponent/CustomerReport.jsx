import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getCustomers,
    deleteCustomerById
} from '../../Services/CustomerService';

import '../../DisplayView.css';
import "../../FinCorePage.css";
import toast from "react-hot-toast";

const CustomerReport = () => {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();


    const setCustomerData = () => {

        getCustomers()
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


    const removeCustomer=(id)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this customer?"
);


if(!confirmDelete)
return;



deleteCustomerById(id)

.then(()=>{


setCustomers(

customers.filter(

customer=>

customer.customerId !== id

)

);


toast.success(
"Customer Deleted Successfully 👤"
);


})

.catch((error)=>{

console.log("Delete Error:", error);

toast.error(
"Unable to delete customer ❌"
);

});


};


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
                        Customer Report
                    </h1>

                    <p className="fincore-report-subtitle">
                        Manage and view registered bank customers
                    </p>

                </div>


                <div className="fincore-report-count">

                    <span>
                        Total Customers
                    </span>

                    <strong>
                        {customers.length}
                    </strong>

                </div>

            </div>


            <div className="fincore-card customer-report-card">



                <div className="fincore-card-header">

                    <div className="fincore-card-icon">
                        👥
                    </div>

                    <div>

                        <h3>
                            Customers List
                        </h3>

                        <p className="fincore-card-subtitle">
                            Registered customer information
                        </p>

                    </div>

                </div>


                {customers.length > 0 ? (

                    <div className="fincore-table-container">

                        <table className="fincore-table customer-table">

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

                                {customers.map((customer) => (

                                    <tr
                                        key={customer.customerId}
                                    >

                                       
                                        <td>

                                            <span className="customer-id-badge">
                                                #{customer.customerId}
                                            </span>

                                        </td>


                                       
                                        <td>

                                            <div className="customer-name-cell">

                                                <div className="customer-avatar">
                                                    {customer.customerName
                                                        ? customer.customerName
                                                            .charAt(0)
                                                            .toUpperCase()
                                                        : "?"}
                                                </div>

                                                <strong>
                                                    {customer.customerName}
                                                </strong>

                                            </div>

                                        </td>


                                        
                                        <td>

                                            <span className="customer-address">
                                                {customer.customerAddress || "-"}
                                            </span>

                                        </td>


                                      
                                        <td>
                                            {customer.email || "-"}
                                        </td>


                                         <td>

                                            {formatDate(
                                                customer.dateOfBirth
                                            )}

                                        </td>


                                     
                                        <td>

                                            <span className="customer-username">
                                                {customer.username || "-"}
                                            </span>

                                        </td>


                                        <td>

                                            {formatDate(
                                                customer.dateOfJoin
                                            )}

                                        </td>


                                        <td>

                                            {customer.status === "A" ||
                                            customer.status === "P" ? (

                                                <span
                                                    className={
                                                        customer.status === "A"
                                                            ? "fincore-status-active"
                                                            : "fincore-status-pending"
                                                    }
                                                >
                                                    {customer.status === "A"
                                                        ? "Active"
                                                        : "Pending"}
                                                </span>

                                            ) : (

                                                <span className="fincore-status-inactive">
                                                    Inactive
                                                </span>

                                            )}

                                        </td>


                                     
                                        <td>

                                            <button
                                                type="button"
                                                className="fincore-delete-btn"
                                                onClick={() =>
                                                    removeCustomer(
                                                        customer.customerId
                                                    )
                                                }
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

           
                    <div className="fincore-empty-state">

                        <div className="empty-state-icon">
                            👥
                        </div>

                        <h3>
                            No Customers Found
                        </h3>

                        <p>
                            There are currently no registered
                            customers available.
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

export default CustomerReport;