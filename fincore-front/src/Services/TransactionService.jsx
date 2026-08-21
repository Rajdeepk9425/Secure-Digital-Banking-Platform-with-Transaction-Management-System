import axios from 'axios';

const TR_URL='http://localhost:9797/fincore/trans';
const TINFO_URL = 'http://localhost:9797/fincore/trans-info';
const TAC_URL = 'http://localhost:9797/fincore/trans-ac';
const TY_URL = 'http://localhost:9797/fincore/trans-type';

    
    export const addTransaction = (transaction) => {
        return axios.post(TR_URL, transaction, {
            withCredentials: true
        });
    };

   
    export const updateTransaction = (transaction) => {
        return axios.put(TR_URL, transaction, {
            withCredentials: true
        });
    };

    
  export const getTransactionById = (transactionId) => {
    return axios.get(`${TR_URL}/${transactionId}`, {
        withCredentials: true
    });
}
 
    
    export const getAllTransactions = () => {
        return axios.get(TR_URL,{
            withCredentials: true
        });
    }
 
   export const deleteTransactionById = (transactionId) => {
    return axios.delete(`${TR_URL}/${transactionId}`, {
        withCredentials: true
    });
}
 
    export const generateTransactionNumber = () => {
        return axios.get(TINFO_URL, {
            withCredentials: true
        });
    }
 
    
    
    export const getTransactionByCustomer = (customerId) => {
        return axios.get(`${TINFO_URL}/${customerId}`, {
            withCredentials: true
        });
    }
 

   export const getTransactionByAccount = (accountNumber) => {
    return axios.get(`${TAC_URL}/${accountNumber}`, {
        withCredentials: true
    });
}

   export const getTransactionByType = (type) => {
    return axios.get(`${TY_URL}/${type}`, {
        withCredentials: true
    });
}