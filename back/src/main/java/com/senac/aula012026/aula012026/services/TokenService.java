package com.senac.aula012026.aula012026.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secretKey}")
    private String secret;

    @Value("${spring.emissor}")
    private String emissor;

    @Value("${spring.tempoexpiracao}")
    private Long tempoexpiracao;

    public DecodedJWT validarToken(String token) {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();

        return verifier.verify(token);

    }

    public  String gerarToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(email)
                    .withExpiresAt(gerarDataExpiraçao())
                    .sign(algorithm);

             return token;


        } catch (Exception e) {
            return null;
        }

    }
    private Instant gerarDataExpiraçao(){
        return LocalDateTime.now().plusMinutes(tempoexpiracao).toInstant(ZoneOffset.of("-03:00"));
    }

}
