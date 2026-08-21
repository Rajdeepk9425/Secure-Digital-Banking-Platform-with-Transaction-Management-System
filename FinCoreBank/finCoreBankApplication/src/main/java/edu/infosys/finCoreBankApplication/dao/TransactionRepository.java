package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.finCoreBankApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {

	@Query(value = "SELECT MAX(CAST(SUBSTRING(transaction_id, 2) AS UNSIGNED)) FROM Transaction", nativeQuery = true)
    public Long getMaxTransactionId();
	
	@Query(value = "SELECT a FROM Transaction a where a.customerId=?1")
    public List<Transaction> getTransactionByCustomer(Long customerId);
	
	@Query(value = "SELECT a FROM Transaction a where a.accountNumber=?1")
    public List<Transaction> getTransactionByAccount(Long accountNumber);
	
	@Query(value = "SELECT a FROM Transaction a where a.transactionType=?1")
    public List<Transaction> getTransactionByType(String type);
 
}