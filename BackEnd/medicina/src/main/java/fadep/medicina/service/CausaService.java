package fadep.medicina.service;

import fadep.medicina.model.Causa;
import fadep.medicina.repository.CausaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CausaService {

    @Autowired
    private CausaRepository causaRepository;

    public ResponseEntity<Causa> atualizar(Causa causa, Long codigo) {
        Causa causaSalva = buscarPorCodigo(codigo);
        if (causaSalva != null) {
            BeanUtils.copyProperties(causa, causaSalva, "idCausa");
            causaRepository.save(causaSalva);
            return ResponseEntity.ok(causaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Causa> remover(Long codigo) {
        Causa causaSalva = buscarPorCodigo(codigo);
        if (causaSalva != null) {
            causaRepository.delete(causaSalva);
            causaSalva = buscarPorCodigo(codigo);
            if (causaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Causa buscarPorCodigo(Long codigo) {
        Optional<Causa> causaOptional = causaRepository.findById(codigo);
        if (!(causaOptional.equals(Optional.empty()))) {
            Causa causaSalva = causaOptional.get();
            return causaSalva;
        }
        return null;
    }

}
