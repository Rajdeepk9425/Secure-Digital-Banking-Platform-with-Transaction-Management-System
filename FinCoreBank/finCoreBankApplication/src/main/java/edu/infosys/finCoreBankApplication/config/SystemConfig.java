package edu.infosys.finCoreBankApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SystemConfig {


    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }


    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(Customizer.withDefaults())

            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Login
                .requestMatchers("/fincore/login").permitAll()
                .requestMatchers("/fincore/login/**").permitAll()

                // Logout
                .requestMatchers("/fincore/logout").permitAll()

                // TEMPORARY - for testing cust-user
                .requestMatchers("/fincore/cust-user").permitAll()

                // Other FinCore APIs
                .requestMatchers("/fincore/**").authenticated()

                .anyRequest().authenticated()
            )

            .logout(logout -> logout

                .logoutUrl("/fincore/logout")

                .invalidateHttpSession(true)

                .deleteCookies("JSESSIONID")

                .logoutSuccessHandler(
                    (request, response, authentication) -> {

                        response.setStatus(200);

                        response.getWriter()
                               .write("Logout success");
                    }
                )
            );

        return http.build();
    }
}