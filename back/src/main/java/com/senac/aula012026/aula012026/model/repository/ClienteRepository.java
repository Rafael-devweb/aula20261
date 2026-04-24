package com.senac.aula012026.aula012026.model.repository;

import com.senac.aula012026.aula012026.model.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByOficinaId(Long oficinaId);

    boolean existClienteByEmailContainingTelefone(String nome, String telefone);
}
