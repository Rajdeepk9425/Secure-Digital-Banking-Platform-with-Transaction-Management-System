package edu.infosys.finCoreBankApplication.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.CustomerLoan;
import edu.infosys.finCoreBankApplication.bean.Payment;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerLoanDao;
import edu.infosys.finCoreBankApplication.dao.PaymentDao;

@Service
public class PaymentService {

    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private CustomerLoanDao customerLoanDao;

    @Autowired
    private AccountDao accountDao;

    public Long generatePaymentId() {

        Long value = paymentDao.getMaxPaymentId();

        if (value == null) {
            value = 1001L;
        } else {
            value = value + 1;
        }

        return value;
    }

    @Transactional
    public void makeLoanPayment(String customerLoanId) {

        CustomerLoan customerLoan =
                customerLoanDao.getLoanById(customerLoanId);

        if (customerLoan == null) {
            throw new RuntimeException(
                    "Customer loan not found: " + customerLoanId
            );
        }

        if (!"D".equalsIgnoreCase(customerLoan.getStatus())) {
            throw new RuntimeException(
                    "Loan must be disbursed before repayment"
            );
        }

        Integer paidTenure = customerLoan.getPaidTenure();
        Integer totalTenure = customerLoan.getTotalTenure();

        if (paidTenure == null) {
            paidTenure = 0;
        }

        if (totalTenure == null || totalTenure <= 0) {
            throw new RuntimeException("Invalid loan tenure");
        }

        if (paidTenure >= totalTenure) {
            throw new RuntimeException(
                    "All loan installments are already paid"
            );
        }

        Double emi = customerLoan.getEmiPayable();

        if (emi == null || emi <= 0) {
            throw new RuntimeException("Invalid EMI amount");
        }

        Long savingsAccountNumber =
                customerLoan.getSavingsAccountNumber();

        if (savingsAccountNumber == null) {
            throw new RuntimeException(
                    "Savings account not found"
            );
        }

        Long loanAccountNumber =
                customerLoan.getPaymentAccountNumber();

        if (loanAccountNumber == null ||
                loanAccountNumber <= 0) {

            throw new RuntimeException(
                    "Loan account not found"
            );
        }

        Account savingsAccount =
                accountDao.getAccountByNumber(
                        savingsAccountNumber
                );

        if (savingsAccount == null) {
            throw new RuntimeException(
                    "Savings account not found: "
                            + savingsAccountNumber
            );
        }

        if (savingsAccount.getAccountType() == null ||
                !savingsAccount.getAccountType()
                        .equalsIgnoreCase("Savings")) {

            throw new RuntimeException(
                    "Invalid savings account"
            );
        }

        Account loanAccount =
                accountDao.getAccountByNumber(
                        loanAccountNumber
                );

        if (loanAccount == null) {
            throw new RuntimeException(
                    "Loan account not found: "
                            + loanAccountNumber
            );
        }

        if (loanAccount.getAccountType() == null ||
                !loanAccount.getAccountType()
                        .equalsIgnoreCase("LOAN")) {

            throw new RuntimeException(
                    "Invalid loan account"
            );
        }

        Double savingsBalance =
                accountDao.getBalanceByAccountNumber(
                        savingsAccountNumber
                );

        if (savingsBalance == null) {
            savingsBalance = 0.0;
        }

        if (savingsBalance < emi) {
            throw new RuntimeException(
                    "Insufficient balance in savings account"
            );
        }

        Double amountPaid =
                customerLoan.getAmountPaidTillDate();

        if (amountPaid == null) {
            amountPaid = 0.0;
        }

        Double totalCost =
                customerLoan.getTotalCost();

        if (totalCost == null || totalCost <= 0) {
            throw new RuntimeException(
                    "Invalid total loan repayment amount"
            );
        }

        Double remainingAmount =
                totalCost - amountPaid;

        if (remainingAmount <= 0.01) {
            throw new RuntimeException(
                    "All loan amount is already paid"
            );
        }

        Double paymentAmount =
                Math.min(emi, remainingAmount);

                accountDao.deductAmount(
                        savingsAccountNumber,
                        paymentAmount
                );

        int credited =
                accountDao.addLoanPayment(
                        loanAccountNumber,
                        paymentAmount
                );

        if (credited == 0) {
            throw new RuntimeException(
                    "Unable to credit EMI to loan account"
            );
        }

        Payment payment = new Payment();

        payment.setPaymentId(
                generatePaymentId()
        );

        payment.setCustomerLoanId(
                customerLoanId
        );

        payment.setCustomerId(
                customerLoan.getCustomerId()
        );

        payment.setAmount(
                paymentAmount
        );

        payment.setAccountNumber(
                savingsAccountNumber
        );

        payment.setPaymentDate(
                LocalDate.now().toString()
        );

        payment.setTenureNumber(
                paidTenure + 1
        );

        paymentDao.addPayment(payment);

        paidTenure = paidTenure + 1;
        amountPaid = amountPaid + paymentAmount;

        customerLoan.setPaidTenure(
                paidTenure
        );

        customerLoan.setAmountPaidTillDate(
                amountPaid
        );

        if (amountPaid >= totalCost - 0.01 ||
                paidTenure >= totalTenure) {

            customerLoan.setStatus("C");

            customerLoan.setCompleteDate(
                    LocalDate.now().toString()
            );
        }

        customerLoanDao.addCustomerLoan(
                customerLoan
        );
    }
}