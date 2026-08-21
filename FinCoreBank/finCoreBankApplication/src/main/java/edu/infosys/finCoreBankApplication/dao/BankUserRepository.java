package edu.infosys.finCoreBankApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import edu.infosys.finCoreBankApplication.bean.BankUser;


import java.util.List;

public interface BankUserRepository extends JpaRepository<BankUser, String> {
 @Query("Select username from BankUser where role=?1")
  public List<String> getUsersByRole(String role);
}
