package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Loan;

@Repository
public interface LoanRepository
        extends JpaRepository<Loan, String> {


    @Query(
        value =
            "SELECT MAX(CAST(SUBSTRING(loan_id, 2) AS UNSIGNED)) " +
            "FROM loan",
        nativeQuery = true
    )
    Long getMaxLoanId();


    @Query(
        "SELECT l.loanId FROM Loan l"
    )
    List<String> getLoanIdList();
}