package edu.infosys.finCoreBankApplication.bean;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Transaction {

    @Id
    private String transactionId;   

    private Long accountNumber;
    private Long customerId;
    private Double transactionAmount;
    private String transactionType;
    private LocalDateTime transactionDate;

    public Transaction() {
    }
    
    public Transaction(String transactionId, Long accountNumber, Long customerId,
            Double transactionAmount, String transactionType,
            LocalDateTime transactionDate) {
      this.transactionId = transactionId;
      this.accountNumber = accountNumber;
      this.customerId = customerId;
      this.transactionAmount = transactionAmount;
      this.transactionType = transactionType;
      this.transactionDate = transactionDate;

}

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
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

    public Double getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(Double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}

   