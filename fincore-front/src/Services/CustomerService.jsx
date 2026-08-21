import axios from 'axios';

const CUST_URL='http://localhost:9797/fincore/customer';
const INFO_URL='http://localhost:9797/fincore/cust-info';
const CHK_URL = 'http://localhost:9797/fincore/cust-chk';
const USR_URL='http://localhost:9797/fincore/cust-user';
const ID_URL= 'http://localhost:9797/fincore/cust-ids';

	export const addCustomer = (customer)=>{
		return axios.post(CUST_URL,customer, {
            withCredentials: true
        });
    }
 
	export const updateCustomer=(customer)=>{
    return axios.put(CUST_URL,customer, {
        withCredentials: true
    });
   }
 
   
export const getCustomerById=(id)=> {
    return axios.get(`${CUST_URL}/${id}`, {
        withCredentials: true
    });
    }
 
export const getCustomers=()=>{
    return axios.get(CUST_URL,{
        withCredentials: true
    });
    }
 
export const deleteCustomerById=(id)=>{
    return axios.delete(`${CUST_URL}/${id}`, {
        withCredentials: true
    });
    }
   
export const generateCustomerId=()=>{
    return axios.get(INFO_URL,{
        withCredentials: true
    });
    }
   
export const getCustomerByStatus=(status)=>{
    return axios.get(`${INFO_URL}/${status}`, {
        withCredentials: true
    });
}
 
export const checkCustomer=()=>{
    return axios.get(CHK_URL,{
        withCredentials: true
    });
}


export const getCustomerByUsername=()=> {
		    return axios.get(USR_URL, {
        withCredentials: true
            });
 
	 
}

export const getAllCustomerIds=()=>{
    return axios.get(ID_URL,{
        withCredentials: true
    });
}