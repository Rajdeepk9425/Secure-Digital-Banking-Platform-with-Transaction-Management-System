package edu.infosys.finCoreBankApplication.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.bean.CustomerLoan;
import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerLoanDao;
import edu.infosys.finCoreBankApplication.dao.LoanDao;

@Service
public class CustomerLoanService {

    @Autowired
    private CustomerLoanDao customerLoanDao;

    @Autowired
    private LoanDao loanDao;

    @Autowired
    private CustomerService service;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private AccountService accountService;

    public String generateCustomerLoanId() {

        Long value =
                customerLoanDao.getMaxCustomerLoanId();

        if (value == null) {
            value = 1000001L;
        } else {
            value = value + 1;
        }

        return "CL" + value;
    }

    public CustomerLoan setAppliedCustomerLoan(
            CustomerLoan customerLoan) {

        Customer customer =
                service.getCustomerByUsername();

        if (customer == null) {

            throw new RuntimeException(
                    "Customer not found"
            );
        }

        if (customerLoan.getLoanId() == null ||
                customerLoan.getLoanId().isBlank()) {

            throw new RuntimeException(
                    "Loan ID is required"
            );
        }

        Loan loan =
                loanDao.getLoanById(
                        customerLoan.getLoanId()
                );

        if (loan == null) {

            throw new RuntimeException(
                    "Loan not found with loanId: "
                            + customerLoan.getLoanId()
            );
        }

        customerLoan.setCustomerId(
                customer.getCustomerId()
        );

        customerLoan.setTotalTenure(
                loan.getTotalTenure()
        );

        customerLoan.setInterestRate(
                loan.getInterestRate()
        );

        if (customerLoan.getLoanType() == null ||
                customerLoan.getLoanType().isBlank()) {

            customerLoan.setLoanType(
                    loan.getLoanType()
            );
        }

        Double loanAmount =
                customerLoan.getLoanAmount();

        if (loanAmount == null ||
                loanAmount <= 0) {

            throw new RuntimeException(
                    "Invalid loan amount"
            );
        }

        double loanTimes =
                loanAmount / 100000.00;

        customerLoan.setEmiPayable(
                loan.getEmiPayable() * loanTimes
        );

        Double totalInterestPayable =
                loan.getTotalInterestPayable();

        if (totalInterestPayable == null) {
            totalInterestPayable = 0.0;
        }

        totalInterestPayable =
                totalInterestPayable * loanTimes;

        customerLoan.setTotalInterestPayable(
                totalInterestPayable
        );

        customerLoan.setTotalCost(
                loanAmount + totalInterestPayable
        );

        if (customerLoan.getPaidTenure() == null) {
            customerLoan.setPaidTenure(0);
        }

        if (customerLoan.getAmountPaidTillDate() == null) {
            customerLoan.setAmountPaidTillDate(0.0);
        }

        if (customerLoan.getLoanDate() == null ||
                customerLoan.getLoanDate().isBlank()) {

            customerLoan.setLoanDate(
                    LocalDate.now().toString()
            );
        }

        Long savingsAccountNumber =
                customerLoan.getSavingsAccountNumber();

        List<Account> customerAccounts =
                accountDao.getAccountsByCustomerId(
                        customer.getCustomerId()
                );

        Account savingsAccount = null;

        if (savingsAccountNumber != null) {

            for (Account account : customerAccounts) {

                if (savingsAccountNumber.equals(
                        account.getAccountNumber())) {

                    if (account.getAccountType() != null &&
                            account.getAccountType()
                                    .equalsIgnoreCase("Savings")) {

                        savingsAccount = account;
                    }

                    break;
                }
            }

            if (savingsAccount == null) {

                throw new RuntimeException(
                        "Selected account is not a valid Savings account"
                );
            }

        } else {

            for (Account account : customerAccounts) {

                if (account.getAccountType() != null &&
                        account.getAccountType()
                                .equalsIgnoreCase("Savings")) {

                    savingsAccount = account;
                    break;
                }
            }
        }

        if (savingsAccount == null) {

            throw new RuntimeException(
                    "Customer does not have a Savings account"
            );
        }

        customerLoan.setSavingsAccountNumber(
                savingsAccount.getAccountNumber()
        );

        customerLoan.setStatus("P");

        customerLoan.setPaymentAccountNumber(null);

        return customerLoan;
    }

    @Transactional
    public CustomerLoan createCustomerLoanFromAdmin(
            CustomerLoan customerLoan) {

        if (customerLoan == null) {

            throw new RuntimeException(
                    "Customer loan cannot be null"
            );
        }

        if (customerLoan.getLoanId() == null ||
                customerLoan.getLoanId().isBlank()) {

            throw new RuntimeException(
                    "Loan ID is required"
            );
        }

        Loan loan =
                loanDao.getLoanById(
                        customerLoan.getLoanId()
                );

        if (loan == null) {

            throw new RuntimeException(
                    "Loan not found: "
                            + customerLoan.getLoanId()
            );
        }

        if (customerLoan.getSavingsAccountNumber() == null) {

            throw new RuntimeException(
                    "Savings account is required"
            );
        }

        Account savingsAccount =
                accountDao.getAccountByNumber(
                        customerLoan.getSavingsAccountNumber()
                );

        if (savingsAccount == null) {

            throw new RuntimeException(
                    "Savings account not found"
            );
        }

        if (savingsAccount.getAccountType() == null ||
                !savingsAccount.getAccountType()
                        .equalsIgnoreCase("Savings")) {

            throw new RuntimeException(
                    "Selected account is not a Savings account"
            );
        }

        if (savingsAccount.getCustomerId() == null) {

            throw new RuntimeException(
                    "Customer ID not found for Savings account"
            );
        }

        CustomerLoan existing =
                customerLoanDao.getCustomerLoanByLoanId(
                        customerLoan.getLoanId()
                );

        if (existing != null) {

            throw new RuntimeException(
                    "Customer loan already exists for loanId: "
                            + customerLoan.getLoanId()
            );
        }

        customerLoan.setCustomerLoanId(
                generateCustomerLoanId()
        );

        customerLoan.setCustomerId(
                savingsAccount.getCustomerId()
        );

        customerLoan.setLoanAmount(
                loan.getLoanAmount()
        );

        customerLoan.setTotalTenure(
                loan.getTotalTenure()
        );

        customerLoan.setInterestRate(
                loan.getInterestRate()
        );

        customerLoan.setEmiPayable(
                loan.getEmiPayable()
        );

        customerLoan.setTotalInterestPayable(
                loan.getTotalInterestPayable()
        );

        customerLoan.setTotalCost(
                loan.getTotalCost()
        );

        customerLoan.setPaidTenure(0);

        customerLoan.setAmountPaidTillDate(0.0);

        customerLoan.setLoanDate(
                LocalDate.now().toString()
        );

        customerLoan.setCompleteDate("");

        customerLoan.setSavingsAccountNumber(
                savingsAccount.getAccountNumber()
        );

        customerLoan.setPaymentAccountNumber(null);

        customerLoan.setStatus("P");

        if (customerLoan.getLoanType() == null ||
                customerLoan.getLoanType().isBlank()) {

            customerLoan.setLoanType(
                    loan.getLoanType()
            );
        }

        customerLoanDao.addCustomerLoan(
                customerLoan
        );

        return customerLoan;
    }

    @Transactional
    public void approveCustomerLoan(
            String customerLoanId) {

        CustomerLoan customerLoan =
                customerLoanDao.getLoanById(
                        customerLoanId
                );

        if (customerLoan == null) {

            throw new RuntimeException(
                    "Customer loan not found: "
                            + customerLoanId
            );
        }

        if (!"P".equalsIgnoreCase(
                customerLoan.getStatus())) {

            throw new RuntimeException(
                    "Only pending loans can be approved"
            );
        }

        if (customerLoan.getSavingsAccountNumber() == null) {

            throw new RuntimeException(
                    "Savings account is not linked with this loan"
            );
        }

        Account savingsAccount =
                accountDao.getAccountByNumber(
                        customerLoan.getSavingsAccountNumber()
                );

        if (savingsAccount == null) {

            throw new RuntimeException(
                    "Savings account not found"
            );
        }

        if (savingsAccount.getAccountType() == null ||
                !savingsAccount.getAccountType()
                        .equalsIgnoreCase("Savings")) {

            throw new RuntimeException(
                    "Linked account is not a Savings account"
            );
        }

        customerLoan.setStatus("A");

        customerLoan.setPaymentAccountNumber(null);

        customerLoanDao.addCustomerLoan(
                customerLoan
        );
    }

    @Transactional
    public void rejectCustomerLoan(
            String customerLoanId) {

        CustomerLoan customerLoan =
                customerLoanDao.getLoanById(
                        customerLoanId
                );

        if (customerLoan == null) {

            throw new RuntimeException(
                    "Customer loan not found: "
                            + customerLoanId
            );
        }

        if (!"P".equalsIgnoreCase(
                customerLoan.getStatus())) {

            throw new RuntimeException(
                    "Only pending loans can be rejected"
            );
        }

        customerLoan.setStatus("R");

        customerLoanDao.addCustomerLoan(
                customerLoan
        );
    }

    @Transactional
    public void addLoanAmountToAccount(
            String customerLoanId) {

        CustomerLoan customerLoan =
                customerLoanDao.getLoanById(
                        customerLoanId
                );

        if (customerLoan == null) {

            throw new RuntimeException(
                    "Customer loan not found: "
                            + customerLoanId
            );
        }

        if (!"A".equalsIgnoreCase(
                customerLoan.getStatus())) {

            if ("D".equalsIgnoreCase(
                    customerLoan.getStatus())) {

                throw new RuntimeException(
                        "Loan amount has already been disbursed"
                );
            }

            throw new RuntimeException(
                    "Loan must be approved first"
            );
        }

        if (customerLoan.getSavingsAccountNumber() == null) {

            throw new RuntimeException(
                    "Savings account not found for this loan"
            );
        }

        Account savingsAccount =
                accountDao.getAccountByNumber(
                        customerLoan.getSavingsAccountNumber()
                );

        if (savingsAccount == null) {

            throw new RuntimeException(
                    "Savings account not found"
            );
        }

        Double loanAmount =
                customerLoan.getLoanAmount();

        if (loanAmount == null ||
                loanAmount <= 0) {

            throw new RuntimeException(
                    "Invalid loan amount"
            );
        }

        if (customerLoan.getPaymentAccountNumber() != null) {

            throw new RuntimeException(
                    "Loan account already exists for this loan"
            );
        }

        accountDao.addLoanAmount(
                customerLoan.getSavingsAccountNumber(),
                loanAmount
        );

        Long loanAccountNumber =
                accountService.generateAccountNumber();

        Account loanAccount =
                new Account();

        loanAccount.setAccountNumber(
                loanAccountNumber
        );

        loanAccount.setCustomerId(
                customerLoan.getCustomerId()
        );

        loanAccount.setCustomerLoanId(
                customerLoan.getCustomerLoanId()
        );

        loanAccount.setAccountType(
                "LOAN"
        );

        loanAccount.setBalance(0.0);

        loanAccount.setStatus("ACTIVE");

        loanAccount.setAccountopenDate(
                LocalDate.now().toString()
        );

        accountDao.addAccount(
                loanAccount
        );

        customerLoan.setPaymentAccountNumber(
                loanAccountNumber
        );

        customerLoan.setStatus("D");

        customerLoanDao.addCustomerLoan(
                customerLoan
        );
    }

    public List<CustomerLoan>
    getCustomerLoanByCustomerId() {

        Customer customer =
                service.getCustomerByUsername();

        if (customer == null) {

            throw new RuntimeException(
                    "Customer not found"
            );
        }

        return customerLoanDao
                .getCustomerLoanByCustomerId(
                        customer.getCustomerId()
                );
    }

    public CustomerLoan checkPaymentStatus(
            String customerLoanId) {

        CustomerLoan customerLoan =
                customerLoanDao.getLoanById(
                        customerLoanId
                );

        if (customerLoan == null) {
            return null;
        }

        Integer paidTenure =
                customerLoan.getPaidTenure();

        Integer totalTenure =
                customerLoan.getTotalTenure();

        if (paidTenure == null) {
            paidTenure = 0;
        }

        if (totalTenure == null) {
            return customerLoan;
        }

        if (paidTenure >= totalTenure) {
            return null;
        }

        return customerLoan;
    }

    public List<CustomerLoan> getLoansForEmiPayment() {

        return customerLoanDao
                .getCustomerLoanByStatus("D");
    }
}