import axios from 'axios';

const LOGIN_URL='http://localhost:9797/fincore/login';
const ROLE_URL='http://localhost:9797/fincore/role';
const LOGOUT_URL = 'http://localhost:9797/fincore/logout';
const USR_URL = 'http://localhost:9797/fincore/user';
 
export const registerNewUser=(user)=> {
        return axios.post(LOGIN_URL,user, {
            withCredentials: true
        });
    }

export const validateUser=(userId,password)=> {
    return axios.get(
    `http://localhost:9797/fincore/login/${userId}/${password}`,
    {
        withCredentials: true
    }
);
    }

export const getUserDetails=()=>{
    return axios.get(LOGIN_URL,{
        withCredentials: true
    });
    }
	
export const getRole=()=>{
    return axios.get(ROLE_URL,{
        withCredentials: true
    });
    }
   
export const getUserId=()=>{
    return axios.get(USR_URL,{
        withCredentials: true
    });
     }
 
export const logoutUser=()=>{
    return axios.post(LOGOUT_URL,{
        withCredentials: true
    });
}
 