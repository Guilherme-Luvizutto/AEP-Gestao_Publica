package com.AepGestaoPublica.Backend.repository;

import com.AepGestaoPublica.Backend.model.Protocolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProtocoloRepository extends JpaRepository<Protocolo, Long> {

    List<Protocolo> findBySolicitanteIgnoreCase(String solicitante);
}