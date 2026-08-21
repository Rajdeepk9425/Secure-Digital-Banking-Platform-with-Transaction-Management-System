package edu.infosys.finCoreBankApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.dao.LoanDao;
import edu.infosys.finCoreBankApplication.service.LoanService;

@RestController
@RequestMapping("/fincore")
@CrossOrigin(
        origins = "http://localhost:3737",
        allowCredentials = "true"
)
public class LoanController {

    @Autowired
    private LoanDao loanDao;

    @Autowired
    private LoanService service;


    @PostMapping("/loan")
    public void addLoan(
            @RequestBody Loan loan) {

        Loan newLoan =
                service.setLoan(loan);

        loanDao.addLoan(newLoan);
    }


    @GetMapping("/loan/{id}")
    public Loan getLoanById(
            @PathVariable String id) {

        return loanDao.getLoanById(id);
    }


    @GetMapping("/loan")
    public List<Loan> getLoanChart() {

        return loanDao.getLoanChart();
    }


    @DeleteMapping("/loan/{id}")
    public void deleteLoanById(
            @PathVariable String id) {

        loanDao.deleteLoanById(id);
    }


    @GetMapping("/loan-id")
    public String generateLoanId() {

        return service.generateLoanId();
    }


    @GetMapping("/loan-idlist")
    public List<String> getLoansIdList() {

        return loanDao.getLoanIdList();
    }
    
    @PutMapping("/loan/add-amount/{id}")
    public String addLoanAmountToAccount(
            @PathVariable String id) {

        try {

            service.addLoanAmountToAccount(id);

            return "Loan amount added to account successfully";

        } catch (RuntimeException e) {

            return e.getMessage();
        }
    }
}