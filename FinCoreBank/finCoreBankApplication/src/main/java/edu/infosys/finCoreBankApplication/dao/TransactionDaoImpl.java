package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Transaction;

@Repository
@Service
public class TransactionDaoImpl implements TransactionDao {

    @Autowired
    private TransactionRepository repository;

    @Override
    public Long getMaxTransactionId() {
        return repository.getMaxTransactionId();
    }

    @Override
    public List<Transaction> getTransactionByCustomer(Long customerId) {
        return repository.getTransactionByCustomer(customerId);
    }

    @Override
    public List<Transaction> getTransactionByAccount(Long accountNumber) {
        return repository.getTransactionByAccount(accountNumber);
    }

    @Override
    public List<Transaction> getTransactionByType(String type) {
        return repository.getTransactionByType(type);
    }

    @Override
    public void addTransaction(Transaction transaction) {
        repository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }
    
    @Override
    public Transaction getTransactionById(String transactionId) {
        return repository.findById(transactionId).get();
    }

    @Override
    public void deleteTransactionById(String transactionId) {
        repository.deleteById(transactionId);
    } 
    

}