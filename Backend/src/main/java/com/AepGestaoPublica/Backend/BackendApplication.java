package com.AepGestaoPublica.Backend;

import com.AepGestaoPublica.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication implements CommandLineRunner {

    private final AuthService authService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        authService.inicializarUsuarios();
    }
}