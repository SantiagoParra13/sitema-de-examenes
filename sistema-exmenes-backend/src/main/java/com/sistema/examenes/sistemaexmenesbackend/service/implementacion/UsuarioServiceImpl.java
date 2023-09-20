package com.sistema.examenes.sistemaexmenesbackend.service.implementacion;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioRolEntity;
import com.sistema.examenes.sistemaexmenesbackend.repositories.RolRepository;
import com.sistema.examenes.sistemaexmenesbackend.repositories.UsuarioRepository;
import com.sistema.examenes.sistemaexmenesbackend.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public UsuarioEntity guardarUsuario(UsuarioEntity usuarioEntity, Set<UsuarioRolEntity> usuarioRolEntities)
            throws Exception {
        UsuarioEntity usuarioLocal = usuarioRepository.findByUsername(usuarioEntity.getUsername());
        if (usuarioLocal != null) {
            System.out.println("El usuario ya existe");
            throw new Exception("El Usuario ya esta presente");
        } else {
            for (UsuarioRolEntity usuarioRolEntity:usuarioRolEntities) {
                rolRepository.save(usuarioRolEntity.getRol());
            }
            usuarioEntity.getUsaurioRoles().addAll(usuarioRolEntities);
            usuarioLocal = usuarioRepository.save(usuarioEntity);
        }

        return usuarioLocal;
    }

    @Override
    public UsuarioEntity obtenerUsuario(String username) {
        return usuarioRepository.findByUsername(username);

    }

    @Override
    public void eliminarUsuario(Long usuarioId) {
        
        usuarioRepository.deleteById(usuarioId);
    }

}
