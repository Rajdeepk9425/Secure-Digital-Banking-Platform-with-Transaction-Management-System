import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    updateCustomer,
    getCustomerById
} from "../../Services/CustomerService";

import FinButton from "../../Components/Common/FinButton";

import "../../DisplayView.css";
import "../../FinCorePage.css";

import toast from "react-hot-toast";


const CustomerEdit = () => {


    const navigate = useNavigate();

    const param = useParams();


    const [customer, setCustomer] = useState({

        customerId:0,
        customerName:"",
        customerAddress:"",
        dateOfBirth:"",
        dateOfJoin:"",
        email:"",
        username:"",
        status:""

    });


    const [flag,setFlag] = useState("");



    const setCustomerData = () => {


        getCustomerById(param.cid)

        .then((response)=>{

            console.log(
                "Customer Data:",
                response.data
            );


            setCustomer(response.data);

            setFlag(param.pno);

        })

        .catch((error)=>{

            console.log(error);

            toast.error(
                "Unable to load customer details"
            );

        });

    };



    useEffect(()=>{

        setCustomerData();

    },[]);





    const setCustomerStatus = () => {


        let updatedCustomer = {

            ...customer

        };


        if(flag === "1")
        {

            updatedCustomer.status="A";


        }
        else if(flag === "2")
        {

            updatedCustomer.status="R";

        }



        updateCustomer(updatedCustomer)

        .then(()=>{


            if(flag==="1")
            {

                toast.success(
                    "Customer approved successfully"
                );

            }
            else
            {

                toast.error(
                    "Customer request rejected"
                );

            }


            navigate("/admin-menu");


        })


        .catch(()=>{


            toast.error(
                "Customer update failed"
            );


        });


    };




return (

<div className="fincore-page">


    {/* Header */}

    <div className="fincore-page-header">


        <h1 className="fincore-page-title">

            Customer Approval

        </h1>


    </div>




    {/* Card */}

    <div className="fincore-card customer-edit-card">



        <div className="fincore-card-header">


            <div className="fincore-card-icon">

                👤

            </div>


            <div>

                <h3>
                    Customer Request Status
                </h3>


                <p className="fincore-card-subtitle">

                    Review customer registration request

                </p>


            </div>


        </div>





        {
            parseInt(flag)===1 ?

            (

            <div className="approval-success-box">


                <h2>
                    ✓ Welcome New Customer
                </h2>


                <p>

                    Customer registration request is ready for approval.

                </p>


            </div>

            )


            :

            (

            <div className="approval-reject-box">


                <h2>

                    ✕ Request Rejected

                </h2>


                <p>

                    Customer registration request has been rejected.

                </p>


            </div>

            )

        }




        <div className="customer-details-box">


            <div>

                <label>
                    Customer ID
                </label>

                <p>
                    {customer.customerId}
                </p>

            </div>



            <div>

                <label>
                    Customer Name
                </label>

                <p>
                    {customer.customerName}
                </p>

            </div>



            <div>

                <label>
                    Username
                </label>

                <p>
                    {customer.username}
                </p>

            </div>



            <div>

                <label>
                    Email
                </label>

                <p>
                    {customer.email}
                </p>

            </div>


        </div>




        <div className="fincore-button-group">


            <FinButton

                variant={
                    flag==="1"
                    ?
                    "primary"
                    :
                    "gold"
                }

                onClick={setCustomerStatus}

            >

                {
                    flag==="1"
                    ?
                    "✓ Approve Customer"
                    :
                    "✕ Reject Request"
                }


            </FinButton>



            <FinButton

                variant="secondary"

                onClick={()=>navigate("/admin-menu")}

            >

                ← Return Back

            </FinButton>


        </div>



    </div>


</div>

);


};


export default CustomerEdit;