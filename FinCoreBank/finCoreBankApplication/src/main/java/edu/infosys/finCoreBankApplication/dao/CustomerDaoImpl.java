package edu.infosys.finCoreBankApplication.dao;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
 
import edu.infosys.finCoreBankApplication.bean.Customer;
@Repository
@Service
public class CustomerDaoImpl implements CustomerDao {
	
	@Autowired
	private CustomerRepository repository;
	
	@Override
	public void addCustomer(Customer customer) {
		repository.save(customer);
 
 
	}
 
	@Override
	public Customer getCustomerById(Long customerId) {
		return repository.findById(customerId).get();
	}
 
	@Override
	public List<Customer> getCustomers() {
		return repository.findAll();
	}
 
	@Override
	public void deleteCustomerById(Long customerId) {
		repository.deleteById(customerId);
 
	}
 
	@Override
	public Long getMaxCustomerId() {
		return repository.getMaxCustomerId();
	}
 
	@Override
	public List<Customer> getCustomerByStatus(String status) {
		return repository.getCustomerByStatus(status);
	}
	
	@Override
	public Customer getCustomerByUsername(String status) {
		return repository.getCustomerByUsername(status);
	}
	
	@Override
	public List<Long> getAllCustomerIds(){
        return repository.getAllCustomerIds();
	}
	
	@Override
	public void deleteCustomer(Long customerId) {

	    repository.deleteById(customerId);
	}
}