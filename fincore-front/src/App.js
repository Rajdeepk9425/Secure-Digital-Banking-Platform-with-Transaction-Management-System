import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import CustomerMenu from "./Components/LoginComponent/CustomerMenu";
import CustomerEntry from "./Components/LoginComponent/CustomerEntry";
import CustomerReport from "./Components/LoginComponent/CustomerReport";
import PendingCustomerList from "./Components/LoginComponent/PendingCustomerList";
import CustomerEdit from "./Components/LoginComponent/CustomerEdit";
import TransactionEntry from "./Components/AccountTransactionComponent/TransactionEntry";
import AccountEntry from "./Components/AccountTransactionComponent/AccountEntry";
import AccountReport from "./Components/AccountTransactionComponent/AccountReport";
import TransactionReport from "./Components/AccountTransactionComponent/TransactionReport";
import CustomerTransactionReport from "./Components/AccountTransactionComponent/CustomerTransactionReport";
import CustomerAccountDetails from "./Components/LoginComponent/CustomerAccountDetails";
import AdminTransactionReport from "./Components/AccountTransactionComponent/AdminTransactionReport";
import AccountList from "./Components/AccountTransactionComponent/AccountList";
import LoanAddition from "./Components/LoanComponent/LoanAddition";
import LoanReport from "./Components/LoanComponent/LoanReport";
import CustomerLoanReport from "./Components/LoanComponent/CustomerLoanReport";
import CustomerLoanEntry from "./Components/LoanComponent/CustomerLoanEntry";
import CustomerLoanView from "./Components/LoanComponent/CustomerLoanView";
import CustomerLoanApproval from "./Components/LoanComponent/CustomerLoanApproval";
import AdminCreditTransaction from "./Components/AccountTransactionComponent/AdminCreditTransaction";
import AdminDebitTransaction from "./Components/AccountTransactionComponent/AdminDebitTransaction";
import AdminLoans from  "./Components/LoanComponent/AdminLoans";
import CustomerWiseAccountReport from "./Components/LoginComponent/CustomerWiseAccountReport";
import CustomerWiseLoanReport from "./Components/LoginComponent/CustomerWiseLoanReport";
import PersonalLoanView from "./Components/LoanComponent/PersonalLoanView";
import CustomerLoanRequestView from './Components/LoanComponent/CustomerLoanRequestView';
import CustomerLoanRepayment from "./Components/LoanComponent/CustomerLoanRepayment";
import CustomerAccountList from "./Components/LoginComponent/CustomerAccountList"
import './App.css';
import { Toaster } from "react-hot-toast";
import LoggedInCustomerDetails from './Components/LoginComponent/LoggedInCustomerDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/admin-menu" element={<AdminMenu />} />
        <Route path="/customer-menu" element={<CustomerMenu />} />
        <Route path="/customer-req" element={<CustomerEntry />} />
        <Route path="/customer-repo" element={<CustomerReport />} />
        <Route path="/pending-customers" element={<PendingCustomerList />} />
        <Route path="/customer-edit/:cid/:pno" element={<CustomerEdit/>}/>
        <Route path="/transaction-entry/:tno" element={<TransactionEntry />} />
        <Route path="/account-req" element={<AccountEntry />} />
        <Route path="/account-repo" element={<AccountReport />} />
        <Route path="/transaction-repo" element={<TransactionReport />} />
        <Route path="/customer-transaction-repo" element={<CustomerTransactionReport />} />
        <Route path="/customer-account-details" element={<CustomerAccountDetails />} />
        <Route path="/admin-transaction-repo" element={<AdminTransactionReport />} />
        <Route path="/account-list" element={<AccountList />} /> 
        <Route path="/loan-addition" element={<LoanAddition/>} />
        <Route path="/loan-report" element={<LoanReport/>} />
        <Route path="/customer-loan-report" element={<CustomerLoanReport/>} />
        <Route path="/customer-loan-entry" element={<CustomerLoanEntry />} />
        <Route path="/customer-loan-view/:id" element={<CustomerLoanView />} />
        <Route path="/customer-loan-approval" element={<CustomerLoanApproval />} />
        <Route path="/logined-customer-detail" element={<LoggedInCustomerDetails/>} />
        <Route path="/admin-credit-transaction" element={<AdminCreditTransaction/>} />
        <Route path="/admin-debit-transaction" element={<AdminDebitTransaction/>} />
        <Route path="/admin-loans" element={<AdminLoans />} />
        <Route path="/customer-wise-account-report" element={<CustomerWiseAccountReport/>} />
        <Route path="/customer-wise-loan-report" element={<CustomerWiseLoanReport/>} />
        <Route
    path="/personal-loan-view"
    element={<PersonalLoanView />}
/>
        <Route
    path="/customer-loan-request-view"
    element={<CustomerLoanRequestView />}
/> 
    
    <Route
    path="/customer-loan-payment"
    element={<CustomerLoanRepayment />}
/>
    <Route
    path="/customer-account-list"
    element={<CustomerAccountList />}
/>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
