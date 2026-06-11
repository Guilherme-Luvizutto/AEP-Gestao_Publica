package com.AepGestaoPublica.Backend.controller;

import com.AepGestaoPublica.Backend.dto.ProtocoloRequestDTO;
import com.AepGestaoPublica.Backend.dto.ProtocoloResponseDTO;
import com.AepGestaoPublica.Backend.service.ProtocoloService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/protocolos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProtocoloController {

    private final ProtocoloService service;

    @PostMapping
    public ResponseEntity<ProtocoloResponseDTO> criar(@Valid @RequestBody ProtocoloRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProtocoloResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/meus")
    public ResponseEntity<List<ProtocoloResponseDTO>> listarMeus(@RequestParam String solicitante) {
        return ResponseEntity.ok(service.listarPorSolicitante(solicitante));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProtocoloResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }
}