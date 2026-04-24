package com.senac.aula012026.aula012026.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // 1. Desabilita o CSRF (comum em APIs REST com JWT)
                .authorizeHttpRequests(auth -> auth // 2. Configura as regras de autorização
                        .requestMatchers("*/auth/login")
                        .permitAll()
                        .requestMatchers("*/swagger-ui/**",
                                "*/v3/api-docs/**",
                                "*/webjars/**",
                                "*/swagger-resources/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios").hasRole("ADIMIN") // Permite pre-flight de CORS
                        .anyRequest().authenticated() // Qualquer outra rota exige login
                )

                // 3. Adiciona seu filtro JWT antes do filtro de Username/Password padrão
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .build();
    }
}