package com.sistema.examenes.sistemaexmenesbackend.service.implementacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.repositories.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsuarioEntity usuarioEntity = this.usuarioRepository.findByUsername(username);

        if (usuarioEntity == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        return usuarioEntity;
    }

}
