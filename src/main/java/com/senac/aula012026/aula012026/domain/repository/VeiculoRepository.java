package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findAllByOficinaId(Long oficinaId);
    Optional<Veiculo> findByIdAndOficinaId(Long id, Long oficinaId);
}
