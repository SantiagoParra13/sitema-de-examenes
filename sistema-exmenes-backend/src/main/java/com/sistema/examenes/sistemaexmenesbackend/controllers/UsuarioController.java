package com.sistema.examenes.sistemaexmenesbackend.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.examenes.sistemaexmenesbackend.entities.RolEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioRolEntity;
import com.sistema.examenes.sistemaexmenesbackend.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/")
    public UsuarioEntity guardarUsuario(@RequestBody UsuarioEntity usuarioEntity) throws Exception {

        usuarioEntity.setPerfil("default.png");
        usuarioEntity.setPassword(this.bCryptPasswordEncoder.encode(usuarioEntity.getPassword()));
        Set<UsuarioRolEntity> usuarioRoles = new HashSet<>();

        RolEntity roleEntity = new RolEntity();
        roleEntity.setRolId(1L);
        roleEntity.setNombre("NORMAL");

        UsuarioRolEntity usuarioRolEntity = new UsuarioRolEntity();
        usuarioRolEntity.setUsuario(usuarioEntity);
        usuarioRolEntity.setRol(roleEntity);

        usuarioRoles.add(usuarioRolEntity);
        return usuarioService.guardarUsuario(usuarioEntity, usuarioRoles);

    }

    @GetMapping("/{username}")
    public UsuarioEntity obtenerUsuarioEntity(@PathVariable("username") String username) {
        return usuarioService.obtenerUsuario(username);
    }

    @DeleteMapping("/{usuarioId}")
    public void eliminarUSuario(@PathVariable("usuarioId") Long usuarioId) {
        usuarioService.eliminarUsuario(usuarioId);

    }

    @GetMapping("/hey")
    public String hey() {
        return "hello";
    }

}
