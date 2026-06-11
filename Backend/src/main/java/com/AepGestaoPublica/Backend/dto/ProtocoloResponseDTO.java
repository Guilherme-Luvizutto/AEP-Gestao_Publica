package com.AepGestaoPublica.Backend.dto;

import com.AepGestaoPublica.Backend.model.NivelUrgencia;
import com.AepGestaoPublica.Backend.model.StatusProtocolo;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProtocoloResponseDTO {

    private Long id;
    private String codigo;
    private String nomeCompleto;
    private String celular;
    private String descricao;
    private NivelUrgencia nivelUrgencia;
    private String localizacao;
    private String imagemUrl;
    private String solicitante;
    private LocalDateTime dataCriacao;
    private StatusProtocolo status;
}