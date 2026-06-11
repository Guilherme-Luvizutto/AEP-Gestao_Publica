package com.AepGestaoPublica.Backend.service;

import com.AepGestaoPublica.Backend.dto.ProtocoloRequestDTO;
import com.AepGestaoPublica.Backend.dto.ProtocoloResponseDTO;
import com.AepGestaoPublica.Backend.model.Protocolo;
import com.AepGestaoPublica.Backend.model.StatusProtocolo;
import com.AepGestaoPublica.Backend.repository.ProtocoloRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProtocoloService {

    private final ProtocoloRepository repository;

    public ProtocoloResponseDTO criar(ProtocoloRequestDTO dto) {
        Protocolo protocolo = Protocolo.builder()
                .codigo(gerarCodigo())
                .nomeCompleto(dto.getNomeCompleto())
                .rg(dto.getRg())
                .celular(dto.getCelular())
                .descricao(dto.getDescricao())
                .nivelUrgencia(dto.getNivelUrgencia())
                .localizacao(dto.getLocalizacao())
                .imagemUrl(dto.getImagemUrl())
                .solicitante(dto.getNomeCompleto().split(" ")[0])
                .dataCriacao(LocalDateTime.now())
                .status(StatusProtocolo.ABERTO)
                .build();

        Protocolo salvo = repository.save(protocolo);
        return toResponseDTO(salvo);
    }

    public List<ProtocoloResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ProtocoloResponseDTO> listarPorSolicitante(String solicitante) {
        return repository.findBySolicitanteIgnoreCase(solicitante)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ProtocoloResponseDTO buscarPorId(Long id) {
        Protocolo protocolo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Protocolo não encontrado"));
        return toResponseDTO(protocolo);
    }

    private ProtocoloResponseDTO toResponseDTO(Protocolo protocolo) {
        ProtocoloResponseDTO dto = new ProtocoloResponseDTO();
        dto.setId(protocolo.getId());
        dto.setCodigo(protocolo.getCodigo());
        dto.setNomeCompleto(protocolo.getNomeCompleto());
        dto.setCelular(protocolo.getCelular());
        dto.setDescricao(protocolo.getDescricao());
        dto.setNivelUrgencia(protocolo.getNivelUrgencia());
        dto.setLocalizacao(protocolo.getLocalizacao());
        dto.setImagemUrl(protocolo.getImagemUrl());
        dto.setSolicitante(protocolo.getSolicitante());
        dto.setDataCriacao(protocolo.getDataCriacao());
        dto.setStatus(protocolo.getStatus());
        return dto;
    }

    private String gerarCodigo() {
        return "PROT-" + System.currentTimeMillis();
    }
}