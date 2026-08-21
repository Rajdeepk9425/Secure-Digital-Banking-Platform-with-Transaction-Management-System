package edu.infosys.finCoreBankApplication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;

@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private BankUserService service;

    public Long generateAccountNumber() {

        Long value = accountDao.getMaxAccountNumber();

        if (value == null) {
            value = 8000001L;
        } else {
            value = value + 1;
        }

        return value;
    }

    public List<Account> getAccountsByCustomerId() {

        String userId = service.getUserId();

        if (userId == null || userId.isBlank()) {
            return new ArrayList<>();
        }

        Customer customer =
                customerDao.getCustomerByUsername(userId);

        if (customer == null) {
            return new ArrayList<>();
        }

        return accountDao.getAccountsByCustomerId(
                customer.getCustomerId()
        );
    }

    public List<Long> getAccountIdsByCustomerId() {

        List<Account> accountList =
                getAccountsByCustomerId();

        List<Long> numberList =
                new ArrayList<>();

        for (Account account : accountList) {

            numberList.add(
                    account.getAccountNumber()
            );
        }

        return numberList;
    }

    public List<Account> getAccountsByCustomerIdAndType(
            String type) {

        List<Account> accountList =
                getAccountsByCustomerId();

        List<Account> typeList =
                new ArrayList<>();

        for (Account account : accountList) {

            if (account.getAccountType() != null &&
                    account.getAccountType()
                            .equalsIgnoreCase(type)) {

                typeList.add(account);
            }
        }

        return typeList;
    }

    public List<Long> getAccountIdsByCustomerIdAndType(
            String type) {

        List<Account> accountList =
                getAccountsByCustomerId();

        List<Long> numberList =
                new ArrayList<>();

        for (Account account : accountList) {

            if (account.getAccountType() != null &&
                    account.getAccountType()
                            .equalsIgnoreCase(type)) {

                numberList.add(
                        account.getAccountNumber()
                );
            }
        }

        return numberList;
    }

    public List<Account> getAccountsByCustomerId(
            Long customerId) {

        return accountDao.getAccountsByCustomerId(
                customerId
        );
    }

    private boolean isActiveStatus(String status) {

        if (status == null) {
            return false;
        }

        return status.equalsIgnoreCase("ACTIVE")
                ||
                status.equalsIgnoreCase("A");
    }

    public Long getActiveAccountCount() {

        List<Account> accountList =
                accountDao.getAccounts();

        long count = 0;

        for (Account account : accountList) {

            if (isActiveStatus(
                    account.getStatus())) {

                count++;
            }
        }

        return count;
    }

    public Long getInactiveAccountCount() {

        List<Account> accountList =
                accountDao.getAccounts();

        long count = 0;

        for (Account account : accountList) {

            if (account.getStatus() != null &&
                    account.getStatus()
                            .equalsIgnoreCase("INACTIVE")) {

                count++;
            }
        }

        return count;
    }

    public Long getTotalAccountCount() {

        List<Account> accountList =
                accountDao.getAccounts();

        return (long) accountList.size();
    }
}