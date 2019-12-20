package fadep.medicina.service;

import fadep.medicina.model.Bairro;
import fadep.medicina.repository.BairroRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BairroService {

    @Autowired
    private BairroRepository bairroRepository;

    public ResponseEntity<Bairro> atualizar(Bairro bairro, Long codigo) {
        Bairro bairroSalvo = buscarPorCodigo(codigo);
        if (bairroSalvo != null) {
            BeanUtils.copyProperties(bairro, bairroSalvo, "idBairro");
            bairroRepository.save(bairroSalvo);
            return ResponseEntity.ok(bairroSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Bairro> remover(Long codigo) {
        Bairro bairroSalvo = buscarPorCodigo(codigo);
        if (bairroSalvo != null) {
            bairroRepository.delete(bairroSalvo);
            bairroSalvo = buscarPorCodigo(codigo);
            if (bairroSalvo == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Bairro buscarPorCodigo(Long codigo) {
        Optional<Bairro> bairroOptional = bairroRepository.findById(codigo);
        if (!(bairroOptional.equals(Optional.empty()))) {
            Bairro bairroSalvo = bairroOptional.get();
            return bairroSalvo;
        }
        return null;
    }

}
