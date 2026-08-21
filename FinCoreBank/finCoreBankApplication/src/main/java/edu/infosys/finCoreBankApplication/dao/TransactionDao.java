package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Transaction;

public interface TransactionDao {

	 public Long getMaxTransactionId();
     public List<Transaction> getTransactionByCustomer(Long customerId);
	 public List<Transaction> getTransactionByAccount(Long accountNumber);
	 public List<Transaction> getTransactionByType(String type);
	 public void addTransaction(Transaction transaction);
	 public List<Transaction> getAllTransactions();
	 public Transaction getTransactionById(String transactionId);
	 public void deleteTransactionById(String transactionId);

}