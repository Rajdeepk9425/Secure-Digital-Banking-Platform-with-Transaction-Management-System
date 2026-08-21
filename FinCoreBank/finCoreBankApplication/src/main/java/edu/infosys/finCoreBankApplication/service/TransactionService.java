package edu.infosys.finCoreBankApplication.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Transaction;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.TransactionDao;
 
@Service
public class TransactionService {
 
	@Autowired
	private TransactionDao transactionDao;
	@Autowired
	private AccountDao accountDao;
	
	public String generateTransactionNumber() {
		Long value=transactionDao.getMaxTransactionId();
		
		 if(value==null)
			 value=1000001L;
		 else
			 value=value+1;
		 String newId="T"+value;
		 return newId;
	}
	
	public void balanceUpdate(Transaction transaction) {
		Account account=accountDao.getAccountByNumber(transaction.getAccountNumber());
		double balance=account.getBalance();
		if(transaction.getTransactionType().equalsIgnoreCase("Deposit")) {
			balance=balance+transaction.getTransactionAmount();
		}
		else if(transaction.getTransactionType().equalsIgnoreCase("Withdraw")) {
			balance=balance-transaction.getTransactionAmount();
		}
		account.setBalance(balance);
		accountDao.addAccount(account);
	}
}
 