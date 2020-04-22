package fadep.medicina.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/validar/nome")
	@ResponseBody
	public ResponseEntity<Boolean> retornarFuncaoDisponivel(@Param("nome") String nome) {
		return funcaoService.retornarFuncaoDisponivel(nome);
	}

	@GetMapping("{codigo}/funcionarios")
	public Integer retornarTotalFuncionarios(@PathVariable("codigo") Long codigo) {
		return funcaoRepository.retornarTotalFuncionarios(codigo);
	}

}
