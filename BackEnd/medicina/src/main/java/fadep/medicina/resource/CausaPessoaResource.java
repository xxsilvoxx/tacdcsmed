package fadep.medicina.resource;

import fadep.medicina.model.CausaPessoa;
import fadep.medicina.repository.CausaPessoaRepository;
import fadep.medicina.service.CausaPessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/causasPessoas")
public class CausaPessoaResource {

    @Autowired
    public CausaPessoaRepository causaPessoaRepository;

    @Autowired
    public CausaPessoaService causaPessoaService;

    @GetMapping
    public List<CausaPessoa> listarTodas() {
        return causaPessoaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<CausaPessoa> cadastrar(@Valid @RequestBody CausaPessoa causaPessoa, HttpServletResponse response) {
        CausaPessoa causaPessoaSalva = causaPessoaRepository.save(causaPessoa);
        return (causaPessoaSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(causaPessoaSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<CausaPessoa> alterar(@Valid @RequestBody CausaPessoa causaPessoa, @PathVariable("codigo") Long codigo) {
        return causaPessoaService.atualizar(causaPessoa, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<CausaPessoa> remover(@PathVariable("codigo") Long codigo) {
        return causaPessoaService.remover(codigo);
    }

}
