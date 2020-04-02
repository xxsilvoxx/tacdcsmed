package fadep.medicina.resource;

import fadep.medicina.model.Funcionario;
import fadep.medicina.repository.FuncionarioRepository;
import fadep.medicina.service.FuncionarioService;
import fadep.medicina.service.UsuarioService;
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

    @Autowired
    public UsuarioService usuarioService;

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

    @GetMapping("/validar/login")
    @ResponseBody
    public ResponseEntity<Boolean> validarLogin(@RequestParam(name="login") String loginDigitado) {
        return funcionarioService.verificarDisponibilidadeLogin(loginDigitado);
    }

    @GetMapping("/validar/email")
    @ResponseBody
    public ResponseEntity<Boolean> validarEmail(@RequestParam(name="email") String emailDigitado) {
        return funcionarioService.verificarDisponibilidadeEmail(emailDigitado);
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

    @PutMapping("/{codigo}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarPropriedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo) {
        usuarioService.atualizarPropriedadeAtivo(codigo, ativo);
    }
}
