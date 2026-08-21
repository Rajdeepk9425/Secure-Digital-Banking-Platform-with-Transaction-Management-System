package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("""
        SELECT MAX(a.accountNumber)
        FROM Account a
    """)
    Long getMaxAccountNumber();

    @Query("""
        SELECT a
        FROM Account a
        WHERE a.customerId = ?1
    """)
    List<Account> getAccountsByCustomerId(Long customerId);

    @Query("""
        SELECT a.balance
        FROM Account a
        WHERE a.accountNumber = ?1
    """)
    Double getBalanceByAccountNumber(Long accountNumber);

    @Query("""
        SELECT a
        FROM Account a
        WHERE LOWER(a.accountType) = LOWER(?1)
    """)
    List<Account> getAccountsByType(String accountType);

    @Query("""
        SELECT COALESCE(SUM(a.balance), 0)
        FROM Account a
        WHERE LOWER(a.accountType) IN ('savings', 'current')
    """)
    Double getTotalSavingsCurrentBalance();

    @Query("""
        SELECT a
        FROM Account a
        WHERE a.customerId = ?1
        AND LOWER(a.accountType) = 'savings'
    """)
    List<Account> getSavingsAccountsByCustomerId(Long customerId);

    void deleteByCustomerId(Long customerId);

    @Modifying
    @Query("""
        UPDATE Account a
        SET a.balance = COALESCE(a.balance, 0) + ?2,
            a.status = 'ACTIVE'
        WHERE a.accountNumber = ?1
    """)
    int addLoanAmount(Long accountNumber, Double loanAmount);
    
    @Modifying
    @Query("""
        UPDATE Account a
        SET a.balance =
            COALESCE(a.balance, 0) + ?2,
            a.status = 'ACTIVE'
        WHERE a.accountNumber = ?1
        AND LOWER(a.accountType) = 'loan'
    """)
    int addLoanPayment(
            Long accountNumber,
            Double amount
    );

    @Modifying
    @Query("""
        UPDATE Account a
        SET a.balance = COALESCE(a.balance, 0) - ?2
        WHERE a.accountNumber = ?1
        AND COALESCE(a.balance, 0) >= ?2
    """)
    int deductAmount(Long accountNumber, Double amount);

    @Modifying
    @Query("""
        UPDATE Account a
        SET a.balance = COALESCE(a.balance, 0) + ?2,
            a.status = 'ACTIVE'
        WHERE a.accountNumber = ?1
        AND LOWER(a.accountType) = 'loan'
    """)
    int addEmiAmount(Long accountNumber, Double amount);
}

