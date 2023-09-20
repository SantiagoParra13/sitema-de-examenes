package com.sistema.examenes.sistemaexmenesbackend.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.examenes.sistemaexmenesbackend.configurations.JwtUlis;
import com.sistema.examenes.sistemaexmenesbackend.entities.JwtRequest;
import com.sistema.examenes.sistemaexmenesbackend.entities.JwtResponse;
import com.sistema.examenes.sistemaexmenesbackend.entities.UsuarioEntity;
import com.sistema.examenes.sistemaexmenesbackend.service.implementacion.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUlis jwtUlis;

    @PostMapping("/generate-token")
    public ResponseEntity generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticar(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new Exception("Usuario no econtrado");
        }
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUlis.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticar(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException disabledException) {
            throw new Exception("Usuario Deshabilitado" + disabledException.getMessage());
        } catch (BadCredentialsException badCredentialsException) {
            throw new Exception("Credenciales Invalidas " + badCredentialsException.getMessage());
        }
    }

    @GetMapping("/actual-usuario")
    public UsuarioEntity obtenerUsuarioActual(Principal principal) {
        return (UsuarioEntity) this.userDetailsService.loadUserByUsername(principal.getName());
    }
}
