package com.AepGestaoPublica.Backend.dto;

import com.AepGestaoPublica.Backend.model.NivelUrgencia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProtocoloRequestDTO {

    @NotBlank(message = "Nome completo é obrigatório")
    private String nomeCompleto;

    @NotBlank(message = "RG é obrigatório")
    private String rg;

    @NotBlank(message = "Celular é obrigatório")
    private String celular;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "Nível de urgência é obrigatório")
    private NivelUrgencia nivelUrgencia;

    @NotBlank(message = "Localização é obrigatória")
    private String localizacao;

    private String imagemUrl;
}