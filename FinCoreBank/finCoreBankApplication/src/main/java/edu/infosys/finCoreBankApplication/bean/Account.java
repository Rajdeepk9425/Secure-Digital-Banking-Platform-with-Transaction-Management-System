package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Account {

    @Id
    private Long accountNumber;

    private Long customerId;

    private String customerLoanId;

    private String accountType;

    private Double balance;

    private String status;

    private String accountopenDate;

    public Account() {
        super();
    }

    public Account(
            Long accountNumber,
            Long customerId,
            String customerLoanId,
            String accountType,
            Double balance,
            String status,
            String accountopenDate) {

        super();

        this.accountNumber = accountNumber;
        this.customerId = customerId;
        this.customerLoanId = customerLoanId;
        this.accountType = accountType;
        this.balance = balance;
        this.status = status;
        this.accountopenDate = accountopenDate;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerLoanId() {
        return customerLoanId;
    }

    public void setCustomerLoanId(String customerLoanId) {
        this.customerLoanId = customerLoanId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAccountopenDate() {
        return accountopenDate;
    }

    public void setAccountopenDate(String accountopenDate) {
        this.accountopenDate = accountopenDate;
    }
}