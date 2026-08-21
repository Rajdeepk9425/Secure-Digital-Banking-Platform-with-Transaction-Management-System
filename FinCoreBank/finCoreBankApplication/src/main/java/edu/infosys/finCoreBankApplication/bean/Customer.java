package edu.infosys.finCoreBankApplication.bean;
 
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
 
@Entity
public class Customer {
 
	@Id
	private Long customerId;
	private String customerName;
	private String customerAddress;
	private String dateOfBirth;
	private String dateOfJoin;
	private String email;
	private String username;
	private String status;
	
	
	
	public Customer() {
		super();
	}
		 
		public Customer(Long customerId, String customerName, String customerAddress, String dateOfBirth, String dateOfJoin,
				String email, String username, String status) {
			super();
			this.customerId = customerId;
			this.customerName = customerName;
			this.customerAddress = customerAddress;
			this.dateOfBirth = dateOfBirth;
			this.dateOfJoin = dateOfJoin;
			this.email = email;
			this.username = username;
			this.status = status;
		}
 
	public Long getCustomerId() {
		return customerId;
	}
 
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
 
	public String getCustomerName() {
		return customerName;
	}
 
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
 
	public String getCustomerAddress() {
		return customerAddress;
	}
 
	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}
 
	public String getEmail() {
		return email;
	}
 
	public void setEmail(String email) {
		this.email = email;
	}
 
	public String getUsername() {
		return username;
	}
 
	public void setUsername(String username) {
		this.username = username;
	}
 
	public String getStatus() {
		return status;
	}
 
	public void setStatus(String status) {
		this.status = status;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getDateOfJoin() {
		return dateOfJoin;
	}

	public void setDateOfJoin(String dateOfJoin) {
		this.dateOfJoin = dateOfJoin;
	}


	
	
}