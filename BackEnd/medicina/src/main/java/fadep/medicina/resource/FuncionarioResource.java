package fadep.medicina.resource;

import fadep.medicina.model.Funcionario;
import fadep.medicina.repository.FuncionarioRepository;
import fadep.medicina.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioResource {

    @Autowired
    public FuncionarioRepository funcionarioRepository;

    @Autowired
    public FuncionarioService funcionarioService;

    @GetMapping
    public List<Funcionario> listarTodos() {
        return funcionarioRepository.findAll();
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Funcionario> buscarPorCodigo(@PathVariable("codigo") Long codigo) {
        Funcionario funcionario = funcionarioService.buscarPorCodigo(codigo);
        return (funcionario != null)
                ? (ResponseEntity.ok(funcionario))
                : (ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Funcionario> cadastrar(@Valid @RequestBody Funcionario funcionario, HttpServletResponse response) {
        Funcionario funcionarioSalvo = funcionarioRepository.save(funcionario);
        return (funcionarioSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(funcionarioSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Funcionario> alterar(@Valid @RequestBody Funcionario funcionario, @PathVariable("codigo") Long codigo) {
        return funcionarioService.atualizar(funcionario, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Funcionario> remover(@PathVariable("codigo") Long codigo) {
        return funcionarioService.remover(codigo);
    }

}
