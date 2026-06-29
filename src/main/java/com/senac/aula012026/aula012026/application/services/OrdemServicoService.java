package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.OrdemServicoRequest;
import com.senac.aula012026.aula012026.application.DTO.OrdemServicoResponse;
import com.senac.aula012026.aula012026.application.DTO.OrdemServicoStatusRequest;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogado;
import com.senac.aula012026.aula012026.domain.entities.OrdemServico;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOS;
import com.senac.aula012026.aula012026.domain.repository.OficinaRepository;
import com.senac.aula012026.aula012026.domain.repository.OrdemServicoRepository;
import com.senac.aula012026.aula012026.domain.repository.VeiculoRepository;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;
    @Autowired
    private OficinaRepository oficinaRepository;
    @Autowired
    private VeiculoRepository veiculoRepository;

    public void salvar(OrdemServicoRequest requester) {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("OS deve pertencer a uma oficina");
        }
        var oficina = oficinaRepository.getReferenceById(oficinaId);
        var veiculo = veiculoRepository.getReferenceById(requester.veiculoId());
        var ordemServico = new OrdemServico(requester, oficina, veiculo);
        ordemServicoRepository.save(ordemServico);
    }

    public boolean cancelar(Long id) {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("OS deve pertencer a uma oficina");
        }
        var ordemServico = ordemServicoRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
        if (ordemServico == null) {
            return false;
        }
        ordemServico.cancelar();
        ordemServicoRepository.save(ordemServico);
        return true;
    }


    public boolean alterarStatus(Long id, OrdemServicoStatusRequest request) {
        OrdemServico ordemServico = null;
        try {
            ordemServico = buscarPorId(id);
        } catch (Exception e) {
            return false;
        }
        ordemServico.atualizarStatus(request.status());
        ordemServicoRepository.save(ordemServico);
        return true;
    }

    public OrdemServicoResponse listarPorId(Long id) {
        OrdemServico ordemServico = null;
        try {
            ordemServico = buscarPorId(id);
        } catch (Exception e) {
            throw new IllegalArgumentException("Nao existe ordem de servico com esse id");
        }
        return new OrdemServicoResponse(ordemServico);
    }

    public List<OrdemServicoResponse> listarTodos() {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("OS deve pertencer a uma oficina");
        }
        return ordemServicoRepository.findAllByOficinaId(oficinaId).stream().map(OrdemServicoResponse::new).toList();
    }

    private OrdemServico buscarPorId(Long id) {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("OS deve pertencer a uma oficina");
        }
        return ordemServicoRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
    }

    private Long buscarOficinaId() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UsuarioLogado usuario) {
            return usuario.oficinaId();
        }
        return null;
    }

}
