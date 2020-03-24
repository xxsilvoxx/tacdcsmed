package fadep.medicina.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.Ubs;
import fadep.medicina.repository.UbsRepository;

@Service
public class UbsService {

	  @Autowired
	    private UbsRepository ubsRepository;

	    public ResponseEntity<Ubs> atualizar(Ubs ubs, Long codigo) {
	        Ubs ubsSalvo = buscarPorCodigo(codigo);
	        if (ubsSalvo != null) {
	            BeanUtils.copyProperties(ubs, ubsSalvo, "idubs");
	            ubsRepository.save(ubsSalvo);
	            return ResponseEntity.ok(ubsSalvo);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public ResponseEntity<Ubs> remover(Long codigo) {
	        Ubs ubsSalvo = buscarPorCodigo(codigo);
	        if (ubsSalvo != null) {
	            ubsRepository.delete(ubsSalvo);
	            ubsSalvo = buscarPorCodigo(codigo);
	            if (ubsSalvo == null) {
	                return ResponseEntity.noContent().build();
	            } else {
	                return ResponseEntity.badRequest().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public Ubs buscarPorCodigo(Long codigo) {
	    	Ubs ubs = ubsRepository.findOne(codigo);
	    	return (ubs != null) ? (ubs) : (null);
	    }
}
