package com.senac.aula012026.aula012026.model.repository;

import com.senac.aula012026.aula012026.model.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
    List<Mesa> findByRestauranteId(Long restauranteId);
}
