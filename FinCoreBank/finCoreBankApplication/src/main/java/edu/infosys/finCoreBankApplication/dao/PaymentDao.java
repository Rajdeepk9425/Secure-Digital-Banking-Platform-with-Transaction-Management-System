package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Payment;

public interface PaymentDao {
	public void addPayment(Payment payment);
	public Payment getPaymentById(Long id);
	public List<Payment> getAllPayments();
	public Long getMaxPaymentId();
	public List<Payment> getPaymentByCustomerId(Long customerId);
	public List<Payment> getPaymentByCustomerLoanId(String customerLoanId);
}
