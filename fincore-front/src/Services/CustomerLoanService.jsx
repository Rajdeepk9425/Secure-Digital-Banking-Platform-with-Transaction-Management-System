import axios from "axios";

const CL_URL =
    "http://localhost:9797/fincore/customer-loan";

const CL_ID_URL =
    "http://localhost:9797/fincore/customer-loan/customer-loan-id";


// ADD CUSTOMER LOAN
export const addCustomerLoan = (customerLoan) => {

    return axios.post(
        CL_URL,
        customerLoan,
        {
            withCredentials: true
        }
    );

};


// GENERATE CUSTOMER LOAN ID
export const generateCustomerLoanId = () => {

    return axios.get(
        CL_ID_URL,
        {
            withCredentials: true
        }
    );

};


// GET LOAN BY ID
export const getCustomerLoanById = (customerLoanId) => {

    return axios.get(
        `${CL_URL}/${customerLoanId}`,
        {
            withCredentials: true
        }
    );

};


// GET ALL CUSTOMER LOANS
export const getCustomerLoans = () => {

    return axios.get(
        CL_URL,
        {
            withCredentials: true
        }
    );

};


// GET ALL CUSTOMER LOANS
// ADMIN REPORT
export const getAllCustomerLoans = () => {

    return axios.get(
        `${CL_URL}/all`,
        {
            withCredentials: true
        }
    );

};


// GET LOGGED-IN CUSTOMER LOANS
export const getMyCustomerLoans = () => {

    return axios.get(
        `${CL_URL}/cust-loan-cust`,
        {
            withCredentials: true
        }
    );

};


// GET CUSTOMER LOANS BY CUSTOMER ID
// ADMIN
export const getCustomerLoansByCustomerIdForAdmin = (customerId) => {

    return axios.get(
        `${CL_URL}/cust-loan/${customerId}`,
        {
            withCredentials: true
        }
    );

};


// DELETE
export const deleteCustomerLoan = (customerLoanId) => {

    return axios.delete(
        `${CL_URL}/${customerLoanId}`,
        {
            withCredentials: true
        }
    );

};


// APPROVE
export const approveCustomerLoan = (customerLoanId) => {

    return axios.put(
        `${CL_URL}/approve/${customerLoanId}`,
        {},
        {
            withCredentials: true
        }
    );

};


// REJECT
export const rejectCustomerLoan = (customerLoanId) => {

    return axios.put(
        `${CL_URL}/reject/${customerLoanId}`,
        {},
        {
            withCredentials: true
        }
    );

};


// PENDING
export const getPendingCustomerLoans = () => {

    return axios.get(
        `${CL_URL}/pending`,
        {
            withCredentials: true
        }
    );

};


// ACCEPTED
export const getAcceptedCustomerLoans = () => {

    return axios.get(
        `${CL_URL}/accepted`,
        {
            withCredentials: true
        }
    );

};


// ADD LOAN AMOUNT TO ACCOUNT
export const addLoanAmountToAccount = (customerLoanId) => {

    return axios.put(
        `${CL_URL}/add-amount/${customerLoanId}`,
        {},
        {
            withCredentials: true
        }
    );

};

export const getCustomerLoansByCustomerId = (customerId) => {

    return axios.get(
        `${CL_URL}/cust-loan/${customerId}`,
        {
            withCredentials: true
        }
    );

};

export const applyCustomerLoan = (loan) => {

    return axios.post(
        "http://localhost:9797/fincore/customer-loan",
        loan,
        {
            withCredentials: true
        }
    );

};