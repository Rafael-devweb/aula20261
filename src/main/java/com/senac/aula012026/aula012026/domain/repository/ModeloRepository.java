package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.Marca;
import com.senac.aula012026.aula012026.domain.entities.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo,Long> {
    boolean existsByNomeIgnoreCaseAndMarca(String s, Marca marca);
    List<Modelo> findByMarcaId(Long marcaId);
}
