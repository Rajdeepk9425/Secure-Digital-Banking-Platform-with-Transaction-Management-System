package edu.infosys.finCoreBankApplication.bean;

import java.util.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

@Entity
public class BankUser extends User{
    
	@Id
    private String username;
    private String password;
    private String personalName;
    private String email;
    private String role;
    
	public BankUser() {
		super("abc","pqr",new ArrayList<>());
	}
	public BankUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
			String username2, String personalName2,String email2, String password2, String role2) {
		super(username, password, authorities);
		this.username = username2;
		this.password = password2;
		this.personalName = personalName2;
		this.email = email2;
		this.role = role2;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPersonalName() {
		return personalName;
	}
	public void setPersonalName(String personalName) {
		this.personalName = personalName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    
    
    
}

