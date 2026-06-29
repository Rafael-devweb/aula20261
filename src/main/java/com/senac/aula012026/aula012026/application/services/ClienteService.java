package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.ClienteRequest;
import com.senac.aula012026.aula012026.application.DTO.ClienteResponse;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogado;
import com.senac.aula012026.aula012026.domain.entities.Cliente;
import com.senac.aula012026.aula012026.domain.repository.ClienteRepository;
import com.senac.aula012026.aula012026.domain.repository.OficinaRepository;
import com.senac.aula012026.aula012026.domain.valueobject.CPF;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private OficinaRepository oficinaRepository;

    public Long salvar(ClienteRequest requester) {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("Um cliente deve pertencer a uma oficina");
        }
        var oficina = oficinaRepository.getReferenceById(oficinaId);
        var cliente = new Cliente(requester, oficina);
        return clienteRepository.save(cliente).getId();
    }

    public List<ClienteResponse> listarTodos() {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("Não foi possível identificar a oficina");
        }
        return clienteRepository.findAllByOficinaId(oficinaId).stream().map(ClienteResponse::new).toList();
    }

    public ClienteResponse buscarPorId(Long id) {
        var oficinaId = buscarOficinaId();
        return new ClienteResponse(clienteRepository.findByIdAndOficinaId(id, oficinaId).orElseThrow(()-> new RegraNegocioException("Cliente nao encontrado")));
    }

    public ClienteResponse alterar(Long id, ClienteRequest cliente) {
        var oficinaId = buscarOficinaId();
        var clienteBanco = clienteRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
        if (clienteBanco == null) {
            return null;
        }

        clienteBanco.setNome(cliente.nome());
        clienteBanco.setTelefone(cliente.telefone());
        clienteBanco.setCpf(new CPF(cliente.cpf()));

        return new ClienteResponse(clienteRepository.save(clienteBanco));
    }

    public Long buscarOficinaId() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UsuarioLogado usuario) {
            return usuario.oficinaId();
        }
        return null;
    }
}
