package edu.infosys.finCoreBankApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.service.AccountService;

@RestController
@RequestMapping("/fincore")
@CrossOrigin(
        origins = "http://localhost:3737",
        allowCredentials = "true"
)
public class AccountController {

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private AccountService service;

    @PostMapping("/account")
    public void addAccount(
            @RequestBody Account account) {

        accountDao.addAccount(account);
    }

    @PutMapping("/account")
    public void updateAccount(
            @RequestBody Account account) {

        accountDao.updateAccount(account);
    }

    @GetMapping("/account/{accountNumber}")
    public Account getAccountByNumber(
            @PathVariable Long accountNumber) {

        return accountDao.getAccountByAccountNumber(
                accountNumber
        );
    }

    @GetMapping("/account")
    public List<Account> getAccounts() {

        return accountDao.getAccounts();
    }

    @DeleteMapping("/account/{accountNumber}")
    public void deleteAccountByNumber(
            @PathVariable Long accountNumber) {

        accountDao.deleteAccountByNumber(
                accountNumber
        );
    }

    @GetMapping("/account-id")
    public Long generateAccountNumber() {

        return service.generateAccountNumber();
    }

    @GetMapping("/account-info")
    public List<Account> getAccountsByCustomerId() {

        return service.getAccountsByCustomerId();
    }

    @GetMapping("/account-info/{customerId}")
    public List<Account> getAccountsByCustomerId(
            @PathVariable Long customerId) {

        return service.getAccountsByCustomerId(
                customerId
        );
    }

    @GetMapping("/balance-info/{accountNumber}")
    public Double getBalanceByAccountNumber(
            @PathVariable Long accountNumber) {

        return accountDao.getBalanceByAccountNumber(
                accountNumber
        );
    }

    @GetMapping("/id-list")
    public List<Long> getAccountIdsByCustomerId() {

        return service.getAccountIdsByCustomerId();
    }

    @GetMapping("/id-list/{accountType}")
    public List<Long> getAccountIdsByCustomerIdAndType(
            @PathVariable String accountType) {

        return service.getAccountIdsByCustomerIdAndType(
                accountType
        );
    }

    @GetMapping("/accounts/{accountType}")
    public List<Account> getAccountsByType(
            @PathVariable String accountType) {

        return accountDao.getAccountsByType(
                accountType
        );
    }

    @GetMapping("/account-info/type/{accountType}")
    public List<Account> getAccountsByCustomerIdAndType(
            @PathVariable String accountType) {

        return service.getAccountsByCustomerIdAndType(
                accountType
        );
    }

    @GetMapping("/total-balance")
    public Double getTotalSavingsCurrentBalance() {

        return accountDao.getTotalSavingsCurrentBalance();
    }

    @GetMapping("/active-account-count")
    public Long getActiveAccountCount() {

        return service.getActiveAccountCount();
    }

    @GetMapping("/inactive-account-count")
    public Long getInactiveAccountCount() {

        return service.getInactiveAccountCount();
    }

    @GetMapping("/total-account-count")
    public Long getTotalAccountCount() {

        return service.getTotalAccountCount();
    }
}