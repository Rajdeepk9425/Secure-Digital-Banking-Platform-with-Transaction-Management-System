package edu.infosys.finCoreBankApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.DeferredSecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.finCoreBankApplication.bean.BankUser;
import edu.infosys.finCoreBankApplication.config.EncoderConfig;
import edu.infosys.finCoreBankApplication.service.BankUserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/fincore/")
@CrossOrigin(
    origins = "http://localhost:3737",
    allowCredentials = "true"
)
public class LoginController {

    @Autowired
    private BankUserService service;

    @Autowired
    private EncoderConfig econfig;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public void registerNewUser(@RequestBody BankUser user) {

        PasswordEncoder bCrypt =
                econfig.passwordEcoding();

        String encodedPassword =
                bCrypt.encode(user.getPassword());

        user.setPassword(encodedPassword);

        service.saveUser(user);
    }
    @GetMapping("/login/{userId}/{password}")
    public String validateUser(
            @PathVariable String userId,
            @PathVariable String password,
            HttpServletRequest request,
            HttpServletResponse response) {

        try {

            Authentication authentication =
                    authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                            userId,
                            password
                        )
                    );

            SecurityContext context =
                    SecurityContextHolder.createEmptyContext();

            context.setAuthentication(authentication);

            SecurityContextHolder.setContext(context);


           
            HttpSessionSecurityContextRepository
                    securityContextRepository =
                    new HttpSessionSecurityContextRepository();

            securityContextRepository.saveContext(
                    context,
                    request,
                    response
            );

            BankUser user =
                    service.getUser(userId);

            return user.getRole();

        } catch (Exception ex) {

            ex.printStackTrace();

            return "false";
        }
    }


    @GetMapping("/login")
    public BankUser getUserDetails(
            HttpServletRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getName())) {

            return null;
        }

        return service.getUser(authentication.getName());
    }


    @GetMapping("/role")
    public String getRole() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getName())) {

            return "false";
        }

        BankUser user =
                service.getUser(authentication.getName());

        return user.getRole();
    }

    @GetMapping("/user")
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

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        SecurityContextHolder.clearContext();


        HttpSession session =
                request.getSession(false);

        if (session != null) {
            session.invalidate();
        }


        Cookie cookie =
                new Cookie("JSESSIONID", null);

        cookie.setPath("/");

        cookie.setMaxAge(0);

        response.addCookie(cookie);


        return ResponseEntity.ok(
                "Logout successful"
        );
    }
}