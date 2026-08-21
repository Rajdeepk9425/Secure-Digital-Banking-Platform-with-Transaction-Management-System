package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Loan {

    @Id
    private String loanId;

    private Double loanAmount;

    private Integer loanTenure;

    private Integer totalTenure;

    private Double interestRate;

    private Double emiPayable;

    private Double totalInterestPayable;

    private Double totalCost;

    private Long accountNumber;

    private Long loanAccountNumber;

    private String status;

    private String loanType;

    private Boolean amountAdded;

    public Loan() {
        super();
        this.amountAdded = false;
    }

    public Loan(
            String loanId,
            Double loanAmount,
            Integer loanTenure,
            Integer totalTenure,
            Double interestRate,
            Double emiPayable,
            Double totalInterestPayable,
            Double totalCost,
            Long accountNumber,
            Long loanAccountNumber,
            String status,
            String loanType,
            Boolean amountAdded) {

        super();

        this.loanId = loanId;
        this.loanAmount = loanAmount;
        this.loanTenure = loanTenure;
        this.totalTenure = totalTenure;
        this.interestRate = interestRate;
        this.emiPayable = emiPayable;
        this.totalInterestPayable = totalInterestPayable;
        this.totalCost = totalCost;
        this.accountNumber = accountNumber;
        this.loanAccountNumber = loanAccountNumber;
        this.status = status;
        this.loanType = loanType;
        this.amountAdded = amountAdded;
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

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getLoanAccountNumber() {
        return loanAccountNumber;
    }

    public void setLoanAccountNumber(Long loanAccountNumber) {
        this.loanAccountNumber = loanAccountNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public Boolean getAmountAdded() {
        return amountAdded;
    }

    public void setAmountAdded(Boolean amountAdded) {
        this.amountAdded = amountAdded;
    }
}