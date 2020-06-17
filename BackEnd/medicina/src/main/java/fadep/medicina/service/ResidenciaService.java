package fadep.medicina.service;

import fadep.medicina.model.Residencia;
import fadep.medicina.repository.ResidenciaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResidenciaService {

    @Autowired
    private ResidenciaRepository residenciaRepository;

    public ResponseEntity<Residencia> atualizar(Residencia residencia, Long codigo) {
        Residencia residenciaSalva = buscarPorCodigo(codigo);
        if (residenciaSalva != null) {
            BeanUtils.copyProperties(residencia, residenciaSalva, "idResidencia");
            residenciaRepository.save(residenciaSalva);
            return ResponseEntity.ok(residenciaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Residencia> remover(Long codigo) {
        Residencia residenciaSalva = buscarPorCodigo(codigo);
        if (residenciaSalva != null) {
            residenciaRepository.delete(residenciaSalva);
            residenciaSalva = buscarPorCodigo(codigo);
            if (residenciaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Residencia buscarPorCodigo(Long codigo) {
    	Residencia residencia = residenciaRepository.findOne(codigo);
    	return (residencia != null) ? (residencia): (null);
    }

}
