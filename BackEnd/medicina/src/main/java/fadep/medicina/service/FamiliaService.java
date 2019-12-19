package fadep.medicina.service;

import fadep.medicina.model.Familia;
import fadep.medicina.repository.FamiliaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FamiliaService {

    @Autowired
    private FamiliaRepository familiaRepository;

    public ResponseEntity<Familia> atualizar(Familia familia, Long codigo) {
        Familia familiaSalva = buscarPorCodigo(codigo);
        if (familiaSalva != null) {
            BeanUtils.copyProperties(familia, familiaSalva, "id_familia");
            familiaRepository.save(familiaSalva);
            return ResponseEntity.ok(familiaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Familia> remover(Long codigo) {
        Familia familiaSalva = buscarPorCodigo(codigo);
        if (familiaSalva != null) {
            familiaRepository.delete(familiaSalva);
            familiaSalva = buscarPorCodigo(codigo);
            if (familiaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Familia buscarPorCodigo(Long codigo) {
        Optional<Familia> familiaOptional = familiaRepository.findById(codigo);
        if (!(familiaOptional.equals(Optional.empty()))) {
            Familia familiaSalva = familiaOptional.get();
            return familiaSalva;
        }
        return null;
    }

}
