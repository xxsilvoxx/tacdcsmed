package fadep.medicina.resource;

import fadep.medicina.model.Pessoa;
import fadep.medicina.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {

    @Autowired
    public PessoaRepository pessoaRepository;

    @GetMapping
    public List<Pessoa> listarTodos() {
        return pessoaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Pessoa> cadastrar(@Valid @RequestBody Pessoa pessoa, HttpServletResponse response) {
       Pessoa pessoaSalva = pessoaRepository.save(pessoa);
       return (pessoaSalva != null)
               ?(ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva))
               :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Pessoa> alterar(@Valid @RequestBody Pessoa pessoa, @PathVariable("codigo") Long codigo) {
        // Ainda falta a implementação do service pra implementar o método
        return null;
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Pessoa> remover(@PathVariable("codigo") Long codigo) {
        pessoaRepository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }

}
