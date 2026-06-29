package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.OrdemServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico,Long> {
    Optional<OrdemServico> findByIdAndOficinaId(Long id, Long oficinaId);
    List<OrdemServico> findAllByOficinaId(Long oficinaId);
}
