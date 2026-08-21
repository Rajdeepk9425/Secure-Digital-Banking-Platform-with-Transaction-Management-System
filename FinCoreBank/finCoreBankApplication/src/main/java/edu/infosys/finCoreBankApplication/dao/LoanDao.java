package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Loan;

@Repository
public interface LoanDao {

    public void addLoan(Loan loan);

    public Loan getLoanById(String loanId);

    public List<Loan> getLoanChart();

    public void deleteLoanById(String loanId);

    public Long getMaxLoanId();

    public List<String> getLoanIdList();
}