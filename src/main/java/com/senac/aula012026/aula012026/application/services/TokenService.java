package com.senac.aula012026.aula012026.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogado;
import com.senac.aula012026.aula012026.domain.entities.Token;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.repository.TokenRepository;
import com.senac.aula012026.aula012026.domain.repository.UsuarioRepository;
import com.senac.aula012026.aula012026.infra.ex.AcessoInvalidoException;
import org.springframework.beans.factory.annotation.Autowired;
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
    private Long tempoExpiracao;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario validarToken(String token) {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();

        verifier.verify(token);

        var tokenBanco = tokenRepository.findTokenByToken(token).orElse(null);

        if (tokenBanco == null){
            throw new AcessoInvalidoException("Token invalido!");
        }

        return tokenBanco.getUsuario();

    }

    public  String gerarToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(email)
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algorithm);

            var usuario = usuarioRepository.findAll()
                    .stream()
                    .filter(u -> u.getEmail().equals(email)).findFirst().orElse(null);

            tokenRepository.save(new Token(token,usuario));

            return token;


        }catch (Exception e){

            return  null;
        }
    }

    private Instant gerarDataExpiracao(){
        return LocalDateTime.now().plusMinutes(tempoExpiracao).toInstant(ZoneOffset.of("-03:00"));
    }

}
