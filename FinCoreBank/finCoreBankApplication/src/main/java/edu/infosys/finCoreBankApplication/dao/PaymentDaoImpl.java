package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.finCoreBankApplication.bean.Payment;

@Repository
public class PaymentDaoImpl implements PaymentDao {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public void addPayment(Payment payment) {
        paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Long getMaxPaymentId() {
        return paymentRepository.getMaxPaymentId();
    }

    @Override
    public List<Payment> getPaymentByCustomerId(Long customerId) {
        return paymentRepository.getPaymentByCustomerId(customerId);
    }

    @Override
    public List<Payment> getPaymentByCustomerLoanId(String customerLoanId) {
        return paymentRepository.getPaymentByCustomerLoanId(customerLoanId);
    }
}