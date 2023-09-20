package com.sistema.examenes.sistemaexmenesbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity,Long> {

    public UsuarioEntity findByUsername(String username);
}
