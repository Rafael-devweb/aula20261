package com.senac.aula012026.aula012026.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private UsuarioService usuarioService;

    public boolean ValidarClienteTelefone(NomeRequest nomeRequest){


          try{


        return clienteRepository.existClienteByNomeContainingTelefone(loginRequest.nome(), loginRequest.telefone());

    }catch(Exception e){

        throw new RuntimeException(e);

    }
}
}



