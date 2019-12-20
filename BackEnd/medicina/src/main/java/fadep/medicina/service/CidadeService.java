package fadep.medicina.service;

import fadep.medicina.model.Cidade;
import fadep.medicina.repository.CidadeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public ResponseEntity<Cidade> atualizar(Cidade cidade, Long codigo) {
        Cidade cidadeSalva = buscarPorCodigo(codigo);
        if (cidadeSalva != null) {
            BeanUtils.copyProperties(cidade, cidadeSalva, "idCidade");
            cidadeRepository.save(cidadeSalva);
            return ResponseEntity.ok(cidadeSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Cidade> remover(Long codigo) {
        Cidade cidadeSalva = buscarPorCodigo(codigo);
        if (cidadeSalva != null) {
            cidadeRepository.delete(cidadeSalva);
            cidadeSalva = buscarPorCodigo(codigo);
            if (cidadeSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Cidade buscarPorCodigo(Long codigo) {
        Optional<Cidade> cidadeOptional = cidadeRepository.findById(codigo);
        if (!(cidadeOptional.equals(Optional.empty()))) {
            Cidade cidadeSalva = cidadeOptional.get();
            return cidadeSalva;
        }
        return null;
    }

}
