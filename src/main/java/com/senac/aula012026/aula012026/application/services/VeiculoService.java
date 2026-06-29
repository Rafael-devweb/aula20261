package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.MarcaResponse;
import com.senac.aula012026.aula012026.application.DTO.ModeloResponse;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogado;
import com.senac.aula012026.aula012026.application.DTO.VeiculoRequest;
import com.senac.aula012026.aula012026.application.DTO.VeiculoResponse;
import com.senac.aula012026.aula012026.domain.entities.Veiculo;
import com.senac.aula012026.aula012026.domain.repository.*;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private ModeloRepository modeloRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private OficinaRepository oficinaRepository;
    @Autowired
    private MarcaRepository marcaRepository;

    public Long salvar(VeiculoRequest request) {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("Um veículo deve pertencer a uma oficina");
        }
        var oficina = oficinaRepository.getReferenceById(oficinaId);
        var cliente = clienteRepository.getReferenceById(request.clienteId());
        var modelo = modeloRepository.getReferenceById(request.modeloId());
        var marca = modelo.getMarca();

        var veiculoSalvar = new Veiculo(request, oficina, cliente, modelo, marca );
        return veiculoRepository.save(veiculoSalvar).getId();
    }

    public List<VeiculoResponse> listarTodos() {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("Não foi possível identificar a oficina");
        }
        return veiculoRepository.findAllByOficinaId(oficinaId).stream().map(VeiculoResponse::new).toList();
    }

    public VeiculoResponse buscarPorId(Long id) {
        var oficinaId = buscarOficinaId();
        return new VeiculoResponse(veiculoRepository.findByIdAndOficinaId(id, oficinaId).orElseThrow(()-> new RuntimeException("Veiculo não encontrado")));
    }

    public VeiculoResponse alterar(Long id, VeiculoRequest veiculo) {
        var oficinaId = buscarOficinaId();
        var veiculoBanco = veiculoRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
        if (veiculoBanco == null) {
            return null;
        }

        veiculoBanco.setPlaca(veiculo.placa());
        veiculoBanco.setAno(veiculo.ano());
        
        if (veiculo.modeloId() != null) {
            var modelo = modeloRepository.getReferenceById(veiculo.modeloId());
            veiculoBanco.setModelo(modelo);
            veiculoBanco.setMarca(modelo.getMarca());
        }

        return new VeiculoResponse(veiculoRepository.save(veiculoBanco));
    }

    public Long buscarOficinaId() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UsuarioLogado usuario) {
            return usuario.oficinaId();
        }
        return null;
    }

    public List<MarcaResponse> listarMarcas() {
        return marcaRepository.findAll(Sort.by("nome")).stream().map(MarcaResponse::new).toList();
    }

    public List<ModeloResponse> listarModelosPorMarca(Long marcaId) {
        return modeloRepository.findByMarcaId(marcaId).stream().map(ModeloResponse::new).toList();
    }
}
