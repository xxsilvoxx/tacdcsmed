package fadep.medicina.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.Visita;
import fadep.medicina.repository.VisitaRepository;

@Service
public class VisitaService {
	
	  @Autowired
	    private VisitaRepository visitaRepository;

	    public ResponseEntity<Visita> atualizar(Visita visita, Long codigo) {
	        Visita visitaSalvo = buscarPorCodigo(codigo);
	        if (visitaSalvo != null) {
	            BeanUtils.copyProperties(visita, visitaSalvo, "idvisita");
	            visitaRepository.save(visitaSalvo);
	            return ResponseEntity.ok(visitaSalvo);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public ResponseEntity<Visita> remover(Long codigo) {
	        Visita visitaSalvo = buscarPorCodigo(codigo);
	        if (visitaSalvo != null) {
	            visitaRepository.delete(visitaSalvo);
	            visitaSalvo = buscarPorCodigo(codigo);
	            if (visitaSalvo == null) {
	                return ResponseEntity.noContent().build();
	            } else {
	                return ResponseEntity.badRequest().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public Visita buscarPorCodigo(Long codigo) {
	        Optional<Visita> visitaOptional = visitaRepository.findById(codigo);
	        if (!(visitaOptional.equals(Optional.empty()))) {
	            Visita visitaSalvo = visitaOptional.get();
	            return visitaSalvo;
	        }
	        return null;
	    }

}
