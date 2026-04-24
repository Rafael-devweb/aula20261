package com.senac.aula012026.aula012026.config;

import com.senac.aula012026.aula012026.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {


    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        //liberaçao de metodos para nao trvar o token
        if(path.equals("/auth/login")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/webjars")
                || path.startsWith("/swagger-resoucer")
                || path.startsWith("/v3/api-docs")
                || request.getMethod().startsWith("OPTIONS"))
        {

            filterChain.doFilter(request,response);
            return;

        }

     String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")){

            String token = header.replace("Bearer ", "");

            //validar token JWT

            var retornotoken = tokenService.validarToken(token);

            var usaurioLogado =retornotoken;

            String username = retornotoken.getSubject();

            UsernamePasswordAuthenticationToken usario =new UsernamePasswordAuthenticationToken(
                    usaurioLogado,
                    null,
                    Collections.emptyList()

            );

            SecurityContextHolder.getContext().setAuthentication(usaurioLogado);

            System.out.println("Usuario autentificado" + username);


        }else{
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token nao informado");
            return;
        }
        filterChain.doFilter(request, response);

    }
}
