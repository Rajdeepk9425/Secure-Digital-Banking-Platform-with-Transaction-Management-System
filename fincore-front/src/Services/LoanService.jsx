import axios from "axios";


const LOAN_URL =
    "http://localhost:9797/fincore/loan";

const LOANID_URL =
    "http://localhost:9797/fincore/loan-id";

const LOANLIST_URL =
    "http://localhost:9797/fincore/loan-idlist";


// =====================================================
// GENERATE LOAN ID
// =====================================================

export const generateLoanId = () => {

    return axios.get(
        LOANID_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// ADD LOAN
// =====================================================

export const addLoan = (loan) => {

    return axios.post(
        LOAN_URL,
        loan,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ALL LOANS
// =====================================================

export const getLoanChart = () => {

    return axios.get(
        LOAN_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOAN BY ID
// =====================================================

export const getLoanById = (loanId) => {

    return axios.get(
        `${LOAN_URL}/${loanId}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// DELETE LOAN
// =====================================================

export const deleteLoanById = (loanId) => {

    return axios.delete(
        `${LOAN_URL}/${loanId}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOAN ID LIST
// =====================================================

export const getLoanIdList = () => {

    return axios.get(
        LOANLIST_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ALL LOANS
// =====================================================

export const getAllLoans = () => {

    return axios.get(
        LOAN_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// DELETE LOAN
// =====================================================

export const deleteLoan = (id) => {

    return axios.delete(
        `${LOAN_URL}/${id}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// ADD LOAN AMOUNT TO CUSTOMER ACCOUNT
// =====================================================

export const addLoanAmountToAccount = (loanId) => {

    return axios.put(
        `${LOAN_URL}/add-amount/${loanId}`,
        {},
        {
            withCredentials: true
        }
    );

};