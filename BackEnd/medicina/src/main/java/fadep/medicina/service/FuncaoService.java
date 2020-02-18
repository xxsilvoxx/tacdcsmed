package fadep.medicina.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.Funcao;
import fadep.medicina.repository.FuncaoRepository;

@Service
public class FuncaoService {
	  @Autowired
	    private FuncaoRepository funcaoRepository;

	    public ResponseEntity<Funcao> atualizar(Funcao funcao, Long codigo) {
	        Funcao funcaoSalvo = buscarPorCodigo(codigo);
	        if (funcaoSalvo != null) {
	            BeanUtils.copyProperties(funcao, funcaoSalvo, "idfuncao");
	            funcaoRepository.save(funcaoSalvo);
	            return ResponseEntity.ok(funcaoSalvo);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public ResponseEntity<Funcao> remover(Long codigo) {
	        Funcao funcaoSalvo = buscarPorCodigo(codigo);
	        if (funcaoSalvo != null) {
	            funcaoRepository.delete(funcaoSalvo);
	            funcaoSalvo = buscarPorCodigo(codigo);
	            if (funcaoSalvo == null) {
	                return ResponseEntity.noContent().build();
	            } else {
	                return ResponseEntity.badRequest().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    public Funcao buscarPorCodigo(Long codigo) {
	        Optional<Funcao> funcaoOptional = funcaoRepository.findById(codigo);
	        if (!(funcaoOptional.equals(Optional.empty()))) {
	            Funcao funcaoSalvo = funcaoOptional.get();
	            return funcaoSalvo;
	        }
	        return null;
	    }

}
