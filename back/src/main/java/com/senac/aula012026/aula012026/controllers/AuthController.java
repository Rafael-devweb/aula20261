package com.senac.aula012026.aula012026.controllers;


import com.senac.aula012026.aula012026.model.DTO.LoginRequest;
import com.senac.aula012026.aula012026.model.DTO.LoginResponse;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){


        if(loginRequest.email().equals("String@s") &&  loginRequest.senha().equals("String")){
            return ResponseEntity.ok(new LoginResponse("Sasdasdas123"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
