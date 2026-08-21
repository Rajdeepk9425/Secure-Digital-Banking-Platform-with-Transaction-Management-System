package edu.infosys.finCoreBankApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.BankUser;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;

@Service
public class CustomerService {

    @Autowired
    private BankUserService service;

    @Autowired
    private CustomerDao customerDao;

    public Long generateCustomerId() {

        Long value =
                customerDao.getMaxCustomerId();

        if (value == null) {
            value = 1000001L;
        } else {
            value = value + 1;
        }

        return value;
    }

    public Customer setCustomerDetails(
            Customer customer) {

        BankUser user =
                service.getUser();

        customer.setCustomerName(
                user.getPersonalName()
        );

        customer.setUsername(
                user.getUsername()
        );

        customer.setEmail(
                user.getEmail()
        );

        return customer;
    }

    public Boolean checkCustomer() {

        String username =
                service.getUserId();

        if (username == null ||
                username.isBlank()) {

            return true;
        }

        Customer customer =
                customerDao.getCustomerByUsername(
                        username
                );

        if (customer == null) {
            return true;
        }

        if (customer.getStatus() == null) {
            return true;
        }

        return customer.getStatus()
                .equalsIgnoreCase("R");
    }

    public Customer getCustomerByUsername() {

        String username =
                service.getUserId();

        if (username == null ||
                username.isBlank()) {

            return null;
        }

        return customerDao.getCustomerByUsername(
                username
        );
    }
}