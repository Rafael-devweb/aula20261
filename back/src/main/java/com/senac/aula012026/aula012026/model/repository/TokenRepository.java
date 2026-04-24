package com.senac.aula012026.aula012026.model.repository;


import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends jpaRepository<Token,Long> {
}
