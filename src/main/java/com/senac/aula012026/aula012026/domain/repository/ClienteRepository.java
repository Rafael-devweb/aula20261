package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsClienteByNomeContainingAndTelefone(String nome, String telefone);
    List<Cliente> findAllByOficinaId(Long oficinaId);
    Optional<Cliente> findByIdAndOficinaId(Long id, Long oficinaId);
}
