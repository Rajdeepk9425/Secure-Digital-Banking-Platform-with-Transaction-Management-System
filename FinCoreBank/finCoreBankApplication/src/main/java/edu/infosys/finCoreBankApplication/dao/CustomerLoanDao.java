package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.CustomerLoan;

@Repository
public interface CustomerLoanDao {

    public void addCustomerLoan(CustomerLoan customerLoan);

    public CustomerLoan getLoanById(String customerLoanId);

    public List<CustomerLoan> getAllCustomerLoans();

    public void deleteCustomerLoanById(String customerLoanId);

    public Long getMaxCustomerLoanId();

    public List<CustomerLoan> getCustomerLoanByStatus(String status);

    public List<CustomerLoan> getCustomerLoanByCustomerId(Long customerId);

    public CustomerLoan getCustomerLoanByLoanId(String loanId);

    public String generateCustomerLoanId();

    public void approveCustomerLoan(String customerLoanId);

    public void rejectCustomerLoan(String customerLoanId);

    public void markAmountAdded(String customerLoanId);
}