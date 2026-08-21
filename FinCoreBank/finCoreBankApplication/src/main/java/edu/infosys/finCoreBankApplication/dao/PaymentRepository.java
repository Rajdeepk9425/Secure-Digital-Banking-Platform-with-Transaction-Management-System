package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.finCoreBankApplication.bean.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("Select max(paymentId) from Payment")
    public Long getMaxPaymentId();

    @Query("Select a from Payment a where a.customerId=?1")
    public List<Payment> getPaymentByCustomerId(Long customerId);

    @Query("Select a from Payment a where a.customerLoanId=?1")
    public List<Payment> getPaymentByCustomerLoanId(String customerLoanId);

}