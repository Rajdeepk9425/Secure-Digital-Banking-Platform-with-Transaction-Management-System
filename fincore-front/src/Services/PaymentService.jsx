import axios from "axios";


const PAYMENT_URL =
    "http://localhost:9797/fincore";


// =====================================================
// MAKE LOAN PAYMENT
// =====================================================

export const makeLoanPayment = (
    customerLoanId
) => {

    return axios.post(
        `${PAYMENT_URL}/loan-payment/${customerLoanId}`,
        {},
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET PAYMENT BY ID
// =====================================================

export const getPaymentById = (
    paymentId
) => {

    return axios.get(
        `${PAYMENT_URL}/pay/${paymentId}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET PAYMENTS BY LOAN
// =====================================================

export const getPaymentsByLoan = (
    customerLoanId
) => {

    return axios.get(
        `${PAYMENT_URL}/pay-loan/${customerLoanId}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET PAYMENTS BY CUSTOMER
// =====================================================

export const getPaymentsByCustomer = (
    customerId
) => {

    return axios.get(
        `${PAYMENT_URL}/pay-cus/${customerId}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ALL PAYMENTS
// =====================================================

export const getAllPayments = () => {

    return axios.get(
        `${PAYMENT_URL}/pay`,
        {
            withCredentials: true
        }
    );

};