package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Payment {
	@Id
	private Long paymentId;
	private String customerLoanId;
	private Long customerId;
	private Double amount;
	private Long accountNumber;
	private String paymentDate;
	private Integer tenureNumber;
	
	public Payment() {
	    super();
	}
	
	public Payment(Long paymentId, String customerLoanId, Long customerId, Double amount, Long accountNumber,
			String paymentDate, Integer tenureNumber) {
		super();
		this.paymentId = paymentId;
		this.customerLoanId = customerLoanId;
		this.customerId = customerId;
		this.amount = amount;
		this.accountNumber = accountNumber;
		this.paymentDate = paymentDate;
		this.tenureNumber = tenureNumber;
	}
	public Long getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}
	public String getCustomerLoanId() {
		return customerLoanId;
	}
	public void setCustomerLoanId(String customerLoanId) {
		this.customerLoanId = customerLoanId;
	}
	public Long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Integer getTenureNumber() {
		return tenureNumber;
	}
	public void setTenureNumber(Integer tenureNumber) {
		this.tenureNumber = tenureNumber;
	}
 
}
