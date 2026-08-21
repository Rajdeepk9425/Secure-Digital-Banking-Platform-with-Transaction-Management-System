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

import edu.infosys.finCoreBankApplication.bean.CustomerLoan;
import edu.infosys.finCoreBankApplication.dao.CustomerLoanDao;
import edu.infosys.finCoreBankApplication.service.CustomerLoanService;

@RestController
@RequestMapping("/fincore/customer-loan")
@CrossOrigin(
        origins = "http://localhost:3737",
        allowCredentials = "true"
)
public class CustomerLoanController {

    @Autowired
    private CustomerLoanDao customerLoanDao;

    @Autowired
    private CustomerLoanService service;

    @GetMapping("/customer-loan-id")
    public String getCustomerLoanId() {

        return service.generateCustomerLoanId();
    }

    @PostMapping
    public void addCustomerLoan(
            @RequestBody CustomerLoan customerLoan) {

        customerLoan.setCustomerLoanId(
                service.generateCustomerLoanId()
        );

        CustomerLoan newLoan =
                service.setAppliedCustomerLoan(
                        customerLoan
                );

        customerLoanDao.addCustomerLoan(
                newLoan
        );
    }

    @PostMapping("/admin")
    public CustomerLoan createCustomerLoanFromAdmin(
            @RequestBody CustomerLoan customerLoan) {

        return service.createCustomerLoanFromAdmin(
                customerLoan
        );
    }

    @GetMapping("/cust-loan/{id}")
    public List<CustomerLoan> getAllCustomerLoan(
            @PathVariable Long id) {

        return customerLoanDao
                .getCustomerLoanByCustomerId(id);
    }

    @GetMapping("/cust-loan-cust")
    public List<CustomerLoan> getCustomerLoanByCustomerId() {

        return service.getCustomerLoanByCustomerId();
    }

    @GetMapping("/{id}")
    public CustomerLoan getLoanById(
            @PathVariable String id) {

        return customerLoanDao.getLoanById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomerLoanById(
            @PathVariable String id) {

        customerLoanDao.deleteCustomerLoanById(id);
    }

    @GetMapping("/pending")
    public List<CustomerLoan> getPendingCustomerLoans() {

        return customerLoanDao
                .getCustomerLoanByStatus("P");
    }

    @GetMapping("/accepted")
    public List<CustomerLoan> getAcceptedCustomerLoans() {

        return customerLoanDao
                .getCustomerLoanByStatus("A");
    }

    @GetMapping("/emi-payment")
    public List<CustomerLoan> getLoansForEmiPayment() {

        return service.getLoansForEmiPayment();
    }

    @PutMapping("/approve/{id}")
    public String approveCustomerLoan(
            @PathVariable String id) {

        try {

            service.approveCustomerLoan(id);

            return "Customer loan approved successfully";

        } catch (RuntimeException e) {

            return e.getMessage();
        }
    }

    @PutMapping("/reject/{id}")
    public String rejectCustomerLoan(
            @PathVariable String id) {

        try {

            service.rejectCustomerLoan(id);

            return "Customer loan rejected successfully";

        } catch (RuntimeException e) {

            return e.getMessage();
        }
    }

    @PutMapping("/add-amount/{id}")
    public String addLoanAmountToAccount(
            @PathVariable String id) {

        try {

            service.addLoanAmountToAccount(id);

            return "Loan amount added and loan account created successfully";

        } catch (RuntimeException e) {

            return e.getMessage();
        }
    }

    @GetMapping("/all")
    public List<CustomerLoan> getAllCustomerLoans() {

        return customerLoanDao
                .getAllCustomerLoans();
    }

    @GetMapping("/cust-loan-cust/{id}")
    public CustomerLoan checkPaymentStatus(
            @PathVariable String id) {

        return service.checkPaymentStatus(id);
    }
}