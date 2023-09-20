package com.sistema.examenes.sistemaexmenesbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.examenes.sistemaexmenesbackend.entities.RolEntity;

public interface RolRepository extends JpaRepository<RolEntity,Long> {
    
    
}
