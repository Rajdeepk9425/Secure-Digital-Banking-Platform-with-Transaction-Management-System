package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Loan;

@Repository
public class LoanDaoImpl implements LoanDao {

    @Autowired
    private LoanRepository repository;

    @Override
    public void addLoan(Loan loan) {
        repository.save(loan);
    }

    @Override
    public Loan getLoanById(String loanId) {
        return repository.findById(loanId).orElse(null);
    }

    @Override
    public List<Loan> getLoanChart() {
        return repository.findAll();
    }

    @Override
    public void deleteLoanById(String loanId) {
        repository.deleteById(loanId);
    }

    @Override
    public Long getMaxLoanId() {
        return repository.getMaxLoanId();
    }

    @Override
    public List<String> getLoanIdList() {
        return repository.getLoanIdList();
    }
}