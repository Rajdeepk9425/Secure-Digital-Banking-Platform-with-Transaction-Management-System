package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import edu.infosys.finCoreBankApplication.bean.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	@Query("Select max(customerId) from Customer")
	public Long getMaxCustomerId();
	
	@Query("Select a from Customer a where a.status=?1")
	public List<Customer> getCustomerByStatus(String status);
	
	@Query("Select a from Customer a where a.username=?1")
	public Customer getCustomerByUsername(String username);
	
	@Query("Select customerId from Customer where status='A'")
	public List<Long> getAllCustomerIds();
}
