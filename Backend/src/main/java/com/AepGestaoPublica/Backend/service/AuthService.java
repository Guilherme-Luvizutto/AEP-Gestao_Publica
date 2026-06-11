package com.AepGestaoPublica.Backend.service;

import com.AepGestaoPublica.Backend.config.JwtService;
import com.AepGestaoPublica.Backend.dto.LoginRequestDTO;
import com.AepGestaoPublica.Backend.dto.LoginResponseDTO;
import com.AepGestaoPublica.Backend.model.Role;
import com.AepGestaoPublica.Backend.model.Usuario;
import com.AepGestaoPublica.Backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void inicializarUsuarios() {
        if (!usuarioRepository.existsByEmail("joao@email.com")) {
            usuarioRepository.save(Usuario.builder()
                    .nome("João Silva")
                    .email("joao@email.com")
                    .senha(passwordEncoder.encode("123456"))
                    .role(Role.USUARIO)
                    .build());
        }

        if (!usuarioRepository.existsByEmail("admin@email.com")) {
            usuarioRepository.save(Usuario.builder()
                    .nome("Admin Sistema")
                    .email("admin@email.com")
                    .senha(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build());
        }
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        final Usuario usuario = usuarioRepository
                .findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        final String token = jwtService.gerarToken(
                usuario.getEmail(),
                usuario.getRole().name()
        );

        return new LoginResponseDTO(
                token,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole().name()
        );
    }
}