package fadep.medicina.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.Medicamento;
import fadep.medicina.repository.MedicamentoRepository;

@Service
public class MedicamentoService {
	
	  @Autowired
	    private MedicamentoRepository medicamentoRepository;

	    public ResponseEntity<Medicamento> atualizar(Medicamento medicamento, Long codigo) {
	        Medicamento medicamentoSalvo = buscarPorCodigo(codigo);
	        if (medicamentoSalvo != null) {
	            BeanUtils.copyProperties(medicamento, medicamentoSalvo, "idmedicamento");
	            medicamentoRepository.save(medicamentoSalvo);
	            return ResponseEntity.ok(medicamentoSalvo);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public ResponseEntity<Medicamento> remover(Long codigo) {
	        Medicamento medicamentoSalvo = buscarPorCodigo(codigo);
	        if (medicamentoSalvo != null) {
	            medicamentoRepository.delete(medicamentoSalvo);
	            medicamentoSalvo = buscarPorCodigo(codigo);
	            if (medicamentoSalvo == null) {
	                return ResponseEntity.noContent().build();
	            } else {
	                return ResponseEntity.badRequest().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public Medicamento buscarPorCodigo(Long codigo) {
	    	Medicamento medicamento = medicamentoRepository.findOne(codigo);
	    	return (medicamento != null) ? (medicamento) : (null);

	    }

}
