package com.sistema.examenes.sistemaexmenesbackend;

import java.util.HashSet;
import java.util.Set;
import java.lang.Exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sistema.examenes.sistemaexmenesbackend.entities.RolEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioRolEntity;
import com.sistema.examenes.sistemaexmenesbackend.service.UsuarioService;

@SpringBootApplication
public class SistemaExmenesBackendApplication implements CommandLineRunner {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SistemaExmenesBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		/* 
			UsuarioEntity usuarioEntity = new UsuarioEntity();
		usuarioEntity.setNombre("Santiago");
		usuarioEntity.setApellido("Vidal");
		usuarioEntity.setUsername("parrascar");
		usuarioEntity.setPassword(bCryptPasswordEncoder.encode("1234"));
		usuarioEntity.setEmail("santiagp@correo.com");
		usuarioEntity.setTelefono("1234567890");
		usuarioEntity.setPerfil("foto.png");

		RolEntity rolEntity = new RolEntity();
		rolEntity.setRolId(1L);
		rolEntity.setNombre("ADMIN");

		Set<UsuarioRolEntity> usuarioRoles = new HashSet<>();

		UsuarioRolEntity usuarioRolEntity = new UsuarioRolEntity();
		usuarioRolEntity.setRol(rolEntity);
		usuarioRolEntity.setUsuario(usuarioEntity);
		usuarioRoles.add(usuarioRolEntity);

		UsuarioEntity usuarioGuardado = usuarioService.guardarUsuario(usuarioEntity, usuarioRoles);
		System.out.println(usuarioGuardado.getUsername());
	*/
		

	}

}

