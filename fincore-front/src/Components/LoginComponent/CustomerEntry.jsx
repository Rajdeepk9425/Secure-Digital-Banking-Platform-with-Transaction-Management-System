import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {addCustomer,generateCustomerId,checkCustomer} from "../../Services/CustomerService";
import FinButton from "../../Components/Common/FinButton";

import '../../DisplayView.css';
import "../../FinCorePage.css";
import toast from "react-hot-toast";

const CustomerEntry = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [customer, setCustomer] = useState({
        customerId: 0,
        customerName: "abc",
        customerAddress: "",
        DateofBirth: new Date(),
        DateofJoin: new Date(),
        email: "abc",
        username: "abc",
        status: "P"
    });

    const [flag, setFlag] = useState(false);
    const [newId, setNewId] = useState(0);
    const [bdate, setBdate] = useState("");
    const [jdate, setJdate] = useState(() => {
    return new Date()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");
});
   const customerValidation = () => {

    checkCustomer()
        .then(response => {

            console.log(
                "Customer check response:",
                response.data
            );

           if (response.data === 0) {

    toast.error(
        "Customer Already Exists ❌"
    );

    navigate('/customer-menu');

}

        })
        .catch(error => {

            console.error(
                "Customer check failed:",
                error
            );

        });
};


    const setCustomerId = () => {

        generateCustomerId().then(response => {

            setNewId(response.data);

        });

    };


    useEffect(() => {

    customerValidation();
    setCustomerId();

    setJdate(
        new Date()
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-")
    );

    setFlag(false);

}, []);


    const onChangeHandler = (event) => {

        event.persist();

        setFlag(false);

        const name = event.target.name;
        const value = event.target.value;

        setCustomer(values => ({
            ...values,
            [name]: value
        }));

    };


    const saveCustomer = (event) => {

        event.preventDefault();

        customer.customerId = newId;
        customer.dateOfJoin = jdate;
        const formattedDOB = bdate
    ? bdate.split("-").reverse().join("-")
    : "";

customer.dateOfBirth = formattedDOB;

       addCustomer(customer)
.then(response => {

    setFlag(true);

    toast.success(
        "Customer Request Submitted Successfully 🎉"
    );

})
.catch(error => {

    console.error(
        "Customer save failed:",
        error
    );

    toast.error(
        "Unable to submit customer request ❌"
    );

});

    };


    const clearAll = (event) => {

    event.preventDefault();

    setCustomer(values => ({
        ...values,
        customerAddress: ""
    }));

    setBdate("");
    setJdate("");

    setErrors({});
    setFlag(false);
};


    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};
        let isValid = true;

        if (!customer.customerAddress.trim()) {

            tempErrors.customerAddress =
                "Customer Address is required";

            isValid = false;
        }

        setErrors(tempErrors);

        if (isValid) {

    saveCustomer(event);

}
else{

    toast.warning(
        "Please enter customer address ⚠️"
    );

}

    };


    const returnBack = () => {

        navigate('/admin-menu');

    };


    return (

        <div className="fincore-page">

            {/* Page Header */}
            <div className="fincore-page-header">

                <h1 className="fincore-page-title">
                    New Customer Request
                </h1>

            </div>


            {/* Main Card */}
            <div className="fincore-card customer-form-card">

                {/* Card Header */}
                <div className="fincore-card-header">

                    <div className="fincore-card-icon">
                        👤
                    </div>

                    <div>
                        <h3>Customer Information</h3>

                        <p className="fincore-card-subtitle">
                            Enter the customer details below
                        </p>
                    </div>

                </div>


                <form onSubmit={handleValidation}>

                    {/* Customer ID */}
                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Customer ID
                        </label>

                        <input
                            type="text"
                            name="customerId"
                            className="fincore-input fincore-readonly"
                            value={newId}
                            readOnly
                        />

                    </div>


                    {/* Customer Address */}
                    <div className="fincore-form-group">

                        <label className="fincore-label">
                            Customer Address
                        </label>

                        <input
                            type="text"
                            name="customerAddress"
                            className="fincore-input"
                            placeholder="Enter customer address"
                            value={customer.customerAddress}
                            onChange={onChangeHandler}
                        />

                        {errors.customerAddress && (

                            <div className="fincore-error">
                                ⚠ {errors.customerAddress}
                            </div>

                        )}

                    </div>


                    {/* Date of Birth */}
                   <div className="fincore-form-group">

    <label className="fincore-label">
        Date of Birth
    </label>

    <input
    type="date"
    name="dateOfBirth"
    className="fincore-input"
    value={bdate}
    onChange={(event) => setBdate(event.target.value)}
    max={new Date().toISOString().split("T")[0]}
/>

</div>

                   
                    <div className="fincore-form-group">

    <label className="fincore-label">
        Date of Joining
    </label>

   <input
    type="text"
    className="fincore-input fincore-readonly"
    value={jdate}
    readOnly
/>

</div>


                   
                    <div className="fincore-button-group">

                        <FinButton
                            type="submit"
                            variant="primary"
                        >
                            ✓ Submit Request
                        </FinButton>


                        <FinButton
                            type="button"
                            variant="gold"
                            onClick={clearAll}
                        >
                            ↻ Reset
                        </FinButton>


                        <FinButton
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/customer-menu')}
                        >
                            ← Return Back
                        </FinButton>

                    </div>

                </form>


                {/* Success Message */}
                {flag && (

                    <div className="fincore-success-message">

                        <span className="success-icon">
                            ✓
                        </span>

                        <div>
                            <strong>
                                Request Submitted Successfully
                            </strong>

                            <p>
                                New Customer Request Pending for Approval
                            </p>
                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

export default CustomerEntry;