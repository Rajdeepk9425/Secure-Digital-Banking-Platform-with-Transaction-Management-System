package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Customer;

public interface CustomerDao {
  
	public void addCustomer(Customer customer);
	public Customer getCustomerById(Long customerId);
	public List<Customer> getCustomers();
	public void deleteCustomerById(Long customerId);
	public Long getMaxCustomerId();
	public List<Customer> getCustomerByStatus(String status);
	public Customer getCustomerByUsername(String username);
	public List<Long> getAllCustomerIds();
	public void deleteCustomer(Long customerId);
 
}
