package edu.infosys.finCoreBankApplication.controller;
 
import java.util.List;
import java.time.LocalDateTime;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import edu.infosys.finCoreBankApplication.bean.Transaction;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.TransactionDao;
import edu.infosys.finCoreBankApplication.service.TransactionService;
import jakarta.persistence.Id;
 
@RestController
@RequestMapping("/fincore/")
@CrossOrigin(origins = "http://localhost:3737", allowCredentials = "true")
public class TransactionController {
	@Autowired
	private TransactionDao transactionDao;
	
	@Autowired
	private AccountDao accountDao;
	
	@Autowired
	private TransactionService service;

	@GetMapping("/trans-info")
	public String generateTransactionNumber() {
		return service.generateTransactionNumber();
	}
 
	@GetMapping("/trans-info/{cno}")
	public List<Transaction> getTransactionByCustomer(@PathVariable Long cno) {
		return transactionDao.getTransactionByCustomer(cno);
	}
 
	@GetMapping("/trans-ac/{acno}")
	public List<Transaction> getTransactionByAccount(@PathVariable Long acno) {
		return transactionDao.getTransactionByAccount(acno);
	}
 
	@GetMapping("/trans-type/{type}")
	public List<Transaction> getTransactionByType(@PathVariable String type) {
		return transactionDao.getTransactionByType(type);
	}
 

   @PostMapping("/trans")
   public Integer addTransaction(@RequestBody Transaction transaction) {
    transaction.setTransactionDate(LocalDateTime.now());

    int flag = 0;

    if (transaction.getTransactionType().equalsIgnoreCase("Withdraw") &&
        accountDao.getBalanceByAccountNumber(transaction.getAccountNumber()) <= 5000.00) {

        flag = 1;

    } else {

        service.balanceUpdate(transaction);
        transactionDao.addTransaction(transaction);
        flag = 2;
    }

    return flag;
}
	
	@GetMapping("/trans")
	public List<Transaction> getAllTransactions() {
		return transactionDao.getAllTransactions();
	}
 
	@GetMapping("/trans/{id}")
	public Transaction getTransactionById(@PathVariable String id) {
		return transactionDao.getTransactionById(id);
	}
 
	@DeleteMapping("/trans/{id}")
	public void deleteTranscationById(@PathVariable String id) {
		transactionDao.deleteTransactionById(id);
	}
 
 
}