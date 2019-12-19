package fadep.medicina.resource;

import fadep.medicina.model.Causa;
import fadep.medicina.repository.CausaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/causa")
public class CausaResource {

    @Autowired
    public CausaRepository causaRepository;

    @GetMapping
    public List<Causa> listarTodos() {
        return causaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Causa> cadastrar(@Valid @RequestBody Causa causa, HttpServletResponse response) {
        Causa causaSalva = causaRepository.save(causa);
        return (causaSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(causaSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Causa> alterar(@Valid @RequestBody Causa causa, @PathVariable("codigo") Long codigo) {
        // Ainda falta a implementação do service pra implementar o método
        return null;
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Causa> remover(@PathVariable("codigo") Long codigo) {
        causaRepository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }

}
