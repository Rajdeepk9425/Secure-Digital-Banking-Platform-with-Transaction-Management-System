package edu.infosys.finCoreBankApplication.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.CustomerLoan;
import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerLoanDao;
import edu.infosys.finCoreBankApplication.dao.LoanDao;

@Service
public class LoanService {

    @Autowired
    private LoanDao loanDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CustomerLoanDao customerLoanDao;

    public String generateLoanId() {

        Long value = loanDao.getMaxLoanId();

        if (value == null) {
            value = 1000001L;
        } else {
            value = value + 1;
        }

        return "L" + value;
    }

    public Loan setLoan(Loan loan) {

        if (loan == null) {
            throw new RuntimeException("Loan cannot be null");
        }

        if (loan.getLoanTenure() == null ||
                loan.getLoanTenure() <= 0) {

            throw new RuntimeException("Invalid loan tenure");
        }

        if (loan.getLoanAmount() == null ||
                loan.getLoanAmount() <= 0) {

            throw new RuntimeException("Invalid loan amount");
        }

        int totalTenure =
                loan.getLoanTenure() * 12;

        loan.setTotalTenure(totalTenure);

        Double interest =
                loan.getTotalInterestPayable();

        if (interest == null) {
            interest = 0.0;
        }

        loan.setTotalCost(
                loan.getLoanAmount() + interest
        );

        loan.setStatus("P");

        loan.setAmountAdded(false);

        loan.setLoanAccountNumber(null);

        if (loan.getLoanType() == null ||
                loan.getLoanType().isBlank()) {

            loan.setLoanType("Personal Loan");
        }

        if (loan.getAccountNumber() != null) {

            Account account =
                    accountDao.getAccountByNumber(
                            loan.getAccountNumber()
                    );

            if (account == null) {

                throw new RuntimeException(
                        "Selected account does not exist: "
                                + loan.getAccountNumber()
                );
            }

            String type =
                    account.getAccountType();

            if (type == null ||
                    (!type.equalsIgnoreCase("Savings") &&
                     !type.equalsIgnoreCase("Current"))) {

                throw new RuntimeException(
                        "Loan can only be linked to Savings or Current account"
                );
            }
        }

        return loan;
    }

    @Transactional
    public void addLoanAmountToAccount(
            String loanId) {

        Loan loan =
                loanDao.getLoanById(loanId);

        if (loan == null) {

            throw new RuntimeException(
                    "Loan not found: " + loanId
            );
        }

        if (Boolean.TRUE.equals(
                loan.getAmountAdded())) {

            throw new RuntimeException(
                    "Loan amount has already been added to the account"
            );
        }

        Long accountNumber =
                loan.getAccountNumber();

        if (accountNumber == null) {

            throw new RuntimeException(
                    "No account is linked with this loan"
            );
        }

        Account account =
                accountDao.getAccountByNumber(
                        accountNumber
                );

        if (account == null) {

            throw new RuntimeException(
                    "Account not found: " + accountNumber
            );
        }

        String accountType =
                account.getAccountType();

        if (accountType == null ||
                (!accountType.equalsIgnoreCase("Savings") &&
                 !accountType.equalsIgnoreCase("Current"))) {

            throw new RuntimeException(
                    "Loan amount cannot be added to account type: "
                            + accountType
            );
        }

        Double loanAmount =
                loan.getLoanAmount();

        if (loanAmount == null ||
                loanAmount <= 0) {

            throw new RuntimeException(
                    "Invalid loan amount"
            );
        }

        CustomerLoan customerLoan =
                customerLoanDao.getCustomerLoanByLoanId(
                        loanId
                );

        if (customerLoan == null) {

            throw new RuntimeException(
                    "Customer loan not found for loanId: "
                            + loanId
            );
        }

        if (customerLoan.getCustomerLoanId() == null ||
                customerLoan.getCustomerLoanId().isBlank()) {

            throw new RuntimeException(
                    "Customer Loan ID is missing for loanId: "
                            + loanId
            );
        }

        accountDao.addLoanAmount(
                accountNumber,
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
                account.getCustomerId()
        );

        loanAccount.setCustomerLoanId(
                customerLoan.getCustomerLoanId()
        );

        loanAccount.setAccountType(
                "LOAN"
        );

        loanAccount.setBalance(
                0.0
        );

        loanAccount.setStatus(
                "ACTIVE"
        );

        loanAccount.setAccountopenDate(
                LocalDate.now().toString()
        );

        accountDao.addAccount(
                loanAccount
        );

        loan.setLoanAccountNumber(
                loanAccountNumber
        );

        loan.setAmountAdded(true);

        loan.setStatus("ACTIVE");

        loanDao.addLoan(loan);

        customerLoan.setPaymentAccountNumber(
                loanAccountNumber
        );

        customerLoan.setStatus("D");

        customerLoanDao.addCustomerLoan(
                customerLoan
        );
    }
}