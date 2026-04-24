package com.senac.aula012026.aula012026.services;

import com.senac.aula012026.aula012026.model.DTO.LoginRequest;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest){
        try{


            return usuarioRepository.existUsuarioByEmailContainingSenha(loginRequest.email(), loginRequest.senha());

        }catch(Exception e){
            throw new RuntimeException(e);

        }
    }
}
