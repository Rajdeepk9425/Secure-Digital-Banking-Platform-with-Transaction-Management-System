package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CustomerLoan {

    @Id
    private String customerLoanId;

    private Long customerId;

    private String loanId;

    private Double loanAmount;

    private Integer loanTenure;

    private Integer paidTenure;

    private Integer totalTenure;

    private Double interestRate;

    private Double emiPayable;

    private Double totalInterestPayable;

    private Double totalCost;

    private Double amountPaidTillDate;

    private String loanDate;

    private String completeDate;

    private String status;

    private Long savingsAccountNumber;

    private Long paymentAccountNumber;

    private String loanType;

    public CustomerLoan() {
        super();
    }

    public CustomerLoan(
            String customerLoanId,
            Long customerId,
            String loanId,
            Double loanAmount,
            Integer loanTenure,
            Integer paidTenure,
            Integer totalTenure,
            Double interestRate,
            Double emiPayable,
            Double totalInterestPayable,
            Double totalCost,
            Double amountPaidTillDate,
            String loanDate,
            String completeDate,
            String status,
            Long savingsAccountNumber,
            Long paymentAccountNumber,
            String loanType) {

        super();

        this.customerLoanId = customerLoanId;
        this.customerId = customerId;
        this.loanId = loanId;
        this.loanAmount = loanAmount;
        this.loanTenure = loanTenure;
        this.paidTenure = paidTenure;
        this.totalTenure = totalTenure;
        this.interestRate = interestRate;
        this.emiPayable = emiPayable;
        this.totalInterestPayable = totalInterestPayable;
        this.totalCost = totalCost;
        this.amountPaidTillDate = amountPaidTillDate;
        this.loanDate = loanDate;
        this.completeDate = completeDate;
        this.status = status;
        this.savingsAccountNumber = savingsAccountNumber;
        this.paymentAccountNumber = paymentAccountNumber;
        this.loanType = loanType;
    }

    public String getCustomerLoanId() {
        return customerLoanId;
    }

    public void setCustomerLoanId(String customerLoanId) {
        this.customerLoanId = customerLoanId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public Double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(Double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public Integer getLoanTenure() {
        return loanTenure;
    }

    public void setLoanTenure(Integer loanTenure) {
        this.loanTenure = loanTenure;
    }

    public Integer getPaidTenure() {
        return paidTenure;
    }

    public void setPaidTenure(Integer paidTenure) {
        this.paidTenure = paidTenure;
    }

    public Integer getTotalTenure() {
        return totalTenure;
    }

    public void setTotalTenure(Integer totalTenure) {
        this.totalTenure = totalTenure;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Double getEmiPayable() {
        return emiPayable;
    }

    public void setEmiPayable(Double emiPayable) {
        this.emiPayable = emiPayable;
    }

    public Double getTotalInterestPayable() {
        return totalInterestPayable;
    }

    public void setTotalInterestPayable(Double totalInterestPayable) {
        this.totalInterestPayable = totalInterestPayable;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getAmountPaidTillDate() {
        return amountPaidTillDate;
    }

    public void setAmountPaidTillDate(Double amountPaidTillDate) {
        this.amountPaidTillDate = amountPaidTillDate;
    }

    public String getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(String loanDate) {
        this.loanDate = loanDate;
    }

    public String getCompleteDate() {
        return completeDate;
    }

    public void setCompleteDate(String completeDate) {
        this.completeDate = completeDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getSavingsAccountNumber() {
        return savingsAccountNumber;
    }

    public void setSavingsAccountNumber(Long savingsAccountNumber) {
        this.savingsAccountNumber = savingsAccountNumber;
    }

    public Long getPaymentAccountNumber() {
        return paymentAccountNumber;
    }

    public void setPaymentAccountNumber(Long paymentAccountNumber) {
        this.paymentAccountNumber = paymentAccountNumber;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
}