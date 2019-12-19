package fadep.medicina.resource;

import fadep.medicina.model.Familia;
import fadep.medicina.repository.FamiliaRepository;
import fadep.medicina.service.FamiliaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/familias")
public class FamiliaResource {

    @Autowired
    public FamiliaRepository familiaRepository;

    @Autowired
    public FamiliaService familiaService;

    @GetMapping
    public List<Familia> listarTodas() {
        return familiaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Familia> cadastrar(@Valid @RequestBody Familia familia, HttpServletResponse response) {
        Familia familiaSalva = familiaRepository.save(familia);
        return (familiaSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(familiaSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Familia> alterar(@Valid @RequestBody Familia familia, @PathVariable("codigo") Long codigo) {
        return familiaService.atualizar(familia, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Familia> remover(@PathVariable("codigo") Long codigo) {
        return familiaService.remover(codigo);
    }

}
