package com.sistema.examenes.sistemaexmenesbackend.service;

import java.util.Set;


import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioRolEntity;

public interface UsuarioService {
    
    public UsuarioEntity guardarUsuario(UsuarioEntity usuarioEntity, Set<UsuarioRolEntity> usuarioRolEntities) throws Exception;

    public UsuarioEntity obtenerUsuario(String username);

    public void eliminarUsuario(Long usuarioId);

}
