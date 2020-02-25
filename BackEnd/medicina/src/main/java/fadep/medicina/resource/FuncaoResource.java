package fadep.medicina.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fadep.medicina.model.Funcao;
import fadep.medicina.repository.FuncaoRepository;
import fadep.medicina.service.FuncaoService;

@RestController
@RequestMapping("/funcao")
public class FuncaoResource {
	
	 @Autowired
	    public FuncaoRepository funcaoRepository;

	    @Autowired
	    public FuncaoService funcaoService;

	    @GetMapping
	    public List<Funcao> listarTodos() {
	        return funcaoRepository.findAll();
	    }

	    @PostMapping
	    public ResponseEntity<Funcao> cadastrar(@Valid @RequestBody Funcao funcao, HttpServletResponse response) {
	        Funcao funcaoSalvo = funcaoRepository.save(funcao);
	        return (funcaoSalvo != null)
	                ?(ResponseEntity.status(HttpStatus.CREATED).body(funcaoSalvo))
	                :(ResponseEntity.badRequest().build());
	    }

	    @PutMapping("/{codigo}")
	    public ResponseEntity<Funcao> alterar(@Valid @RequestBody Funcao funcao, @PathVariable("codigo") Long codigo) {
	        return funcaoService.atualizar(funcao, codigo);
	    }

	    @DeleteMapping("/{codigo}")
	    public ResponseEntity<Funcao> remover(@PathVariable("codigo") Long codigo) {
	        return funcaoService.remover(codigo);
	    }

}
