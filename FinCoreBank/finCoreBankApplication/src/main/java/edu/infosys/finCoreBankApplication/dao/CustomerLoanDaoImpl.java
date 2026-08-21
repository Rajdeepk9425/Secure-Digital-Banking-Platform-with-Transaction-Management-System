package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.CustomerLoan;

@Repository
public class CustomerLoanDaoImpl implements CustomerLoanDao {

    @Autowired
    private CustomerLoanRepository repository;

    @Override
    public void addCustomerLoan(CustomerLoan customerLoan) {
        repository.save(customerLoan);
    }

    @Override
    public String generateCustomerLoanId() {

        Long maxId = repository.getMaxCustomerLoanId();

        if (maxId == null) {
            return "CL1000001";
        }

        return "CL" + (maxId + 1);
    }

    @Override
    public CustomerLoan getLoanById(String customerLoanId) {
        return repository.findById(customerLoanId).orElse(null);
    }

    @Override
    public CustomerLoan getCustomerLoanByLoanId(String loanId) {
        return repository.getCustomerLoanByLoanId(loanId);
    }

    @Override
    public List<CustomerLoan> getAllCustomerLoans() {
        return repository.findAll();
    }

    @Override
    public void deleteCustomerLoanById(String customerLoanId) {
        repository.deleteById(customerLoanId);
    }

    @Override
    public Long getMaxCustomerLoanId() {
        return repository.getMaxCustomerLoanId();
    }

    @Override
    public List<CustomerLoan> getCustomerLoanByStatus(String status) {
        return repository.getCustomerLoanByStatus(status);
    }

    @Override
    public List<CustomerLoan> getCustomerLoanByCustomerId(Long customerId) {
        return repository.getCustomerLoanByCustomerId(customerId);
    }

    @Override
    public void approveCustomerLoan(String customerLoanId) {

        CustomerLoan customerLoan =
                repository.findById(customerLoanId).orElse(null);

        if (customerLoan != null) {
            customerLoan.setStatus("A");
            repository.save(customerLoan);
        }
    }

    @Override
    public void rejectCustomerLoan(String customerLoanId) {

        CustomerLoan customerLoan =
                repository.findById(customerLoanId).orElse(null);

        if (customerLoan != null) {
            customerLoan.setStatus("R");
            repository.save(customerLoan);
        }
    }

    @Override
    public void markAmountAdded(String customerLoanId) {

        CustomerLoan customerLoan =
                repository.findById(customerLoanId).orElse(null);

        if (customerLoan != null) {
            customerLoan.setStatus("D");
            repository.save(customerLoan);
        }
    }
}