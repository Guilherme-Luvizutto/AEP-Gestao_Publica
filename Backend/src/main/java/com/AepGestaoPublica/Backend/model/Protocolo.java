package com.AepGestaoPublica.Backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "protocolos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Protocolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false)
    private String rg;

    @Column(nullable = false)
    private String celular;

    @Column(nullable = false, length = 1000)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelUrgencia nivelUrgencia;

    @Column(nullable = false)
    private String localizacao;

    private String imagemUrl;

    @Column(nullable = false)
    private String solicitante;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusProtocolo status;
}