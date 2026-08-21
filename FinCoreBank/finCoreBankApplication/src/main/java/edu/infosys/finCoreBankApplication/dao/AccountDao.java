package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Account;

public interface AccountDao {

    public void addAccount(
            Account account
    );


    public Account getAccountByAccountNumber(
            Long accountNumber
    );


    public List<Account> getAccounts();


    public void deleteAccountByNumber(
            Long accountId
    );


    public Long getMaxAccountNumber();


    public List<Account> getAccountsByCustomerId(
            Long customerId
    );


    public Double getBalanceByAccountNumber(
            Long accountNumber
    );


    public List<Account> getAccountsByType(
            String accountType
    );


    public Account getAccountByNumber(
            Long accountNumber
    );


    public void deleteAccountByCustomerId(
            Long customerId
    );


    public void addLoanAmount(
            Long accountNumber,
            Double loanAmount
    );


    public void deductAmount(
            Long accountNumber,
            Double amount
    );


    public Double getTotalSavingsCurrentBalance();


    public void updateAccount(
            Account account
    );
    
    public int addLoanPayment(
            Long accountNumber,
            Double amount
    );

}