package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.DashboardStatsResponse;
import com.senac.aula012026.aula012026.application.DTO.OficinaRequest;
import com.senac.aula012026.aula012026.application.DTO.OficinaResponse;
import com.senac.aula012026.aula012026.domain.entities.Oficina;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.domain.repository.*;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OficinaService {

    @Autowired
    private OficinaRepository oficinaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private OrdemServicoRepository ordemServicoRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private TokenService tokenService;

    public void salvar(OficinaRequest oficina){
        var oficinaEntity = new Oficina(oficina);
        var usuarioEntity = new Usuario(oficina.usuario(), oficinaEntity);

        try {
            oficinaRepository.save(oficinaEntity);
            usuarioRepository.save(usuarioEntity);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<OficinaResponse> listarTodas() {
        return oficinaRepository.findAll()
                .stream()
                .map(OficinaResponse::new)
                .collect(Collectors.toList());
    }

    public DashboardStatsResponse obterEstatisticas() {
        return new DashboardStatsResponse(
                oficinaRepository.count(),
                usuarioRepository.count(),
                clienteRepository.count(),
                veiculoRepository.count(),
                ordemServicoRepository.count()
        );
    }

    @Transactional
    public String vincularOficina(Long usuarioId, Long oficinaId) {
        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RegraNegocioException("Usuário não encontrado"));
        var oficina = oficinaRepository.findById(oficinaId)
                .orElseThrow(() -> new RegraNegocioException("Oficina não encontrada"));
        
        usuario.setOficina(oficina);
        usuarioRepository.save(usuario);

        tokenRepository.deleteByUsuarioId(usuarioId);
        return tokenService.gerarToken(usuario.getEmail());
    }



}
