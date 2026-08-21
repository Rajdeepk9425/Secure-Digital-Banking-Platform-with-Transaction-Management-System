package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.CustomerLoan;

@Repository
public interface CustomerLoanRepository
        extends JpaRepository<CustomerLoan, String> {

    @Query(
        value = "SELECT MAX(CAST(SUBSTRING(customer_loan_id, 3) AS UNSIGNED)) " +
                "FROM customer_loan",
        nativeQuery = true
    )
    Long getMaxCustomerLoanId();

    @Query(
        "SELECT a FROM CustomerLoan a " +
        "WHERE a.status = ?1"
    )
    List<CustomerLoan> getCustomerLoanByStatus(
            String status
    );

    @Query(
        "SELECT a FROM CustomerLoan a " +
        "WHERE a.customerId = ?1"
    )
    List<CustomerLoan> getCustomerLoanByCustomerId(
            Long customerId
    );

    @Query(
        "SELECT a FROM CustomerLoan a " +
        "WHERE a.loanId = ?1"
    )
    CustomerLoan getCustomerLoanByLoanId(
            String loanId
    );
}