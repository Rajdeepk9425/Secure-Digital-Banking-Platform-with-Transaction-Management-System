package edu.infosys.finCoreBankApplication.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.BankUser;
import edu.infosys.finCoreBankApplication.dao.BankUserRepository;

@Service
public class BankUserService implements UserDetailsService {

    private final BankUserRepository repository;

    public BankUserService(BankUserRepository repository) {
        this.repository = repository;
    }

    public BankUser getUser(String username) {

        return repository.findById(username)
                .orElseThrow(() ->
                    new UsernameNotFoundException(
                        "User not found: " + username
                    )
                );
    }

    public BankUser getUser() {

        Authentication authentication =
                SecurityContextHolder
                    .getContext()
                    .getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated()) {

            throw new UsernameNotFoundException(
                "No authenticated user found"
            );
        }

        String username =
                authentication.getName();

        return getUser(username);
    }


    public void saveUser(BankUser user) {

        repository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        return repository.findById(username)
                .orElseThrow(() ->
                    new UsernameNotFoundException(
                        "User not found: " + username
                    )
                );
    }
    
    public String getUserId() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getName())) {

            return null;
        }

        return authentication.getName();
    }
}