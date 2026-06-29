package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    Optional<Marca> findByNhtsaMakeId(int id);
}
