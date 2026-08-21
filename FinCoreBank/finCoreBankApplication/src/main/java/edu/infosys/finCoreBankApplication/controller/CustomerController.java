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

import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;
import edu.infosys.finCoreBankApplication.service.CustomerService;

@RestController
@RequestMapping("/fincore")
@CrossOrigin(
        origins = "http://localhost:3737",
        allowCredentials = "true"
)
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private CustomerService service;

    @PostMapping("/customer")
    public void addCustomer(
            @RequestBody Customer customer) {

        Customer newCustomer =
                service.setCustomerDetails(customer);

        customerDao.addCustomer(newCustomer);
    }

    @GetMapping("/customer/{customerId}")
    public Customer getCustomerById(
            @PathVariable Long customerId) {

        return customerDao.getCustomerById(
                customerId
        );
    }

    @GetMapping("/customer")
    public List<Customer> getCustomers() {

        return customerDao.getCustomers();
    }

    @DeleteMapping("/customer/{customerId}")
    public void deleteCustomer(
            @PathVariable Long customerId) {

        customerDao.deleteCustomer(customerId);
    }

    @PutMapping("/customer")
    public void updateCustomer(
            @RequestBody Customer customer) {

        customerDao.addCustomer(customer);
    }

    @GetMapping("/cust-info")
    public Long generateCustomerId() {

        return service.generateCustomerId();
    }

    @GetMapping("/cust-info/{status}")
    public List<Customer> getCustomerByStatus(
            @PathVariable String status) {

        return customerDao.getCustomerByStatus(status);
    }

    @GetMapping("/cust-chk")
    public Integer checkCustomer() {

        return service.checkCustomer() ? 1 : 0;
    }

    @GetMapping("/cust-user")
    public Customer getCustomerByUsername() {

        return service.getCustomerByUsername();
    }

    @GetMapping("/cust-ids")
    public List<Long> getAllCustomerIds() {

        return customerDao.getAllCustomerIds();
    }
}