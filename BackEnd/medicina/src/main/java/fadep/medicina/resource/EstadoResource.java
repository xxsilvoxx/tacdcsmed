package fadep.medicina.resource;

import fadep.medicina.model.Estado;
import fadep.medicina.repository.EstadoRepository;
import fadep.medicina.service.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/estados")
public class EstadoResource {

    @Autowired
    public EstadoRepository estadoRepository;

    @Autowired
    public EstadoService estadoService;

    @GetMapping
    public List<Estado> listarTodos() {
        return estadoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Estado> cadastrar(@Valid @RequestBody Estado estado, HttpServletResponse response) {
        Estado estadoSalvo = estadoRepository.save(estado);
        return (estadoSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(estadoSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Estado> alterar(@Valid @RequestBody Estado estado, @PathVariable("codigo") Long codigo) {
        return estadoService.atualizar(estado, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Estado> remover(@PathVariable("codigo") Long codigo) {
        return estadoService.remover(codigo);
    }

}
