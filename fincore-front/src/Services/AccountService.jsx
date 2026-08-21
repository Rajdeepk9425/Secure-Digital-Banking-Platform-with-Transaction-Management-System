import axios from "axios";


// =====================================================
// BASE URLs
// =====================================================

const AC_URL =
    "http://localhost:9797/fincore/account";

const AINFO_URL =
    "http://localhost:9797/fincore/account-info";

const BINFO_URL =
    "http://localhost:9797/fincore/balance-info";

const ID_URL =
    "http://localhost:9797/fincore/account-id";

const LIST_URL =
    "http://localhost:9797/fincore/id-list";

const ACS_URL =
    "http://localhost:9797/fincore/accounts";


// =====================================================
// ADD ACCOUNT
// =====================================================

export const addAccount = (account) => {

    return axios.post(
        AC_URL,
        account,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// UPDATE ACCOUNT
// =====================================================

export const updateAccount = (account) => {

    return axios.put(
        AC_URL,
        account,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ACCOUNT BY ACCOUNT NUMBER
// =====================================================

export const getAccountByNumber = (
    accountNumber
) => {

    return axios.get(
        `${AC_URL}/${accountNumber}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ALL ACCOUNTS
// ADMIN USE
// =====================================================

export const getAccounts = () => {

    return axios.get(
        AC_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// DELETE ACCOUNT BY ACCOUNT NUMBER
// =====================================================

export const deleteAccountByNumber = (
    accountNumber
) => {

    return axios.delete(
        `${AC_URL}/${accountNumber}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GENERATE ACCOUNT NUMBER
// =====================================================

export const generateAccountNumber = () => {

    return axios.get(
        ID_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOGGED-IN CUSTOMER ACCOUNTS
// =====================================================
// Backend:
// @GetMapping("/account-info")
// public List<Account> getAccountsByCustomerId()
// =====================================================

export const getAccountsByCustomerId = () => {

    return axios.get(
        AINFO_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOGGED-IN CUSTOMER ACCOUNT IDs
// =====================================================

export const getAccountIdsByCustomerId = () => {

    return axios.get(
        LIST_URL,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET BALANCE BY ACCOUNT NUMBER
// =====================================================

export const getBalanceByAccountNumber = (
    accountNumber
) => {

    return axios.get(
        `${BINFO_URL}/${accountNumber}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOGGED-IN CUSTOMER ACCOUNT IDs BY TYPE
// =====================================================

export const getAccountIdsByCustomerIdAndType = (
    accountType
) => {

    return axios.get(
        `${LIST_URL}/${accountType}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET ALL ACCOUNTS BY ACCOUNT TYPE
// ADMIN USE
// =====================================================

export const getAccountsByType = (
    accountType
) => {

    return axios.get(
        `${ACS_URL}/${accountType}`,
        {
            withCredentials: true
        }
    );

};


// =====================================================
// GET LOGGED-IN CUSTOMER ACCOUNTS BY ACCOUNT TYPE
// =====================================================

export const getAccountsByCustomerIdAndType = (
    accountType
) => {

    return axios.get(
        `${AINFO_URL}/${accountType}`,
        {
            withCredentials: true
        }
    );

};

export const getCustomerAccountsByCustomerId = (customerId) => {

    return axios.get(
        `${AINFO_URL}/${customerId}`,
        {
            withCredentials: true
        }
    );

};

export const getCustomerAccounts = () => {

    return axios.get(
        AINFO_URL,
        {
            withCredentials: true
        }
    );

};

export const getTotalBalance = () => {

    return axios.get(
        "http://localhost:8080/fincore/total-balance"
    );

};