package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Account;
import jakarta.transaction.Transactional;

@Repository
public class AccountDaoImpl
        implements AccountDao {


    @Autowired
    private AccountRepository repository;


    @Override
    public void addAccount(
            Account account) {

        if (account.getStatus() == null ||
                account.getStatus().isBlank()) {

            account.setStatus("ACTIVE");
        }

        repository.save(account);
    }


    @Override
    public void updateAccount(
            Account account) {

        repository.save(account);
    }


    @Override
    public Account getAccountByAccountNumber(
            Long accountNumber) {

        return repository
                .findById(accountNumber)
                .orElse(null);
    }


    @Override
    public List<Account> getAccounts() {

        return repository.findAll();
    }


    @Override
    public void deleteAccountByNumber(
            Long accountId) {

        repository.deleteById(accountId);
    }


    @Override
    public Long getMaxAccountNumber() {

        return repository.getMaxAccountNumber();
    }


    @Override
    public List<Account> getAccountsByCustomerId(
            Long customerId) {

        return repository
                .getAccountsByCustomerId(
                        customerId
                );
    }


    @Override
    public Double getBalanceByAccountNumber(
            Long accountNumber) {

        return repository
                .getBalanceByAccountNumber(
                        accountNumber
                );
    }


    @Override
    public List<Account> getAccountsByType(
            String accountType) {

        return repository
                .getAccountsByType(
                        accountType
                );
    }


    @Override
    public Account getAccountByNumber(
            Long accountNumber) {

        return repository
                .findById(accountNumber)
                .orElse(null);
    }


    @Override
    @Transactional
    public void deleteAccountByCustomerId(
            Long customerId) {

        repository.deleteByCustomerId(
                customerId
        );
    }

    @Override
    @Transactional
    public void addLoanAmount(
            Long accountNumber,
            Double loanAmount) {


        Account account =
                repository.findById(
                        accountNumber
                ).orElse(null);


        if (account == null) {

            throw new RuntimeException(
                    "Account not found: "
                            + accountNumber
            );
        }


        Double currentBalance =
                account.getBalance();


        if (currentBalance == null) {

            currentBalance = 0.0;
        }


        account.setBalance(
                currentBalance + loanAmount
        );

        account.setStatus("ACTIVE");


        repository.save(account);
    }
    
    @Override
    public int addLoanPayment(
            Long accountNumber,
            Double amount) {

        return repository.addLoanPayment(
                accountNumber,
                amount
        );
    }


    @Override
    @Transactional
    public void deductAmount(
            Long accountNumber,
            Double amount) {


        Account account =
                repository.findById(
                        accountNumber
                ).orElse(null);


        if (account == null) {

            throw new RuntimeException(
                    "Account not found: "
                            + accountNumber
            );
        }


        Double currentBalance =
                account.getBalance();


        if (currentBalance == null) {

            currentBalance = 0.0;
        }


        if (currentBalance < amount) {

            throw new RuntimeException(
                    "Insufficient balance in account"
            );
        }


        account.setBalance(
                currentBalance - amount
        );


        repository.save(account);
    }


    @Override
    public Double getTotalSavingsCurrentBalance() {

        Double total =
                repository
                        .getTotalSavingsCurrentBalance();


        if (total == null) {

            return 0.0;
        }


        return total;
    }

}