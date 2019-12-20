package fadep.medicina.resource;

import fadep.medicina.model.Residencia;
import fadep.medicina.repository.ResidenciaRepository;
import fadep.medicina.service.ResidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/residencias")
public class ResidenciaResource {

    @Autowired
    public ResidenciaRepository residenciaRepository;

    @Autowired
    public ResidenciaService residenciaService;

    @GetMapping
    public List<Residencia> listarTodas() {
        return residenciaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Residencia> cadastrar(@Valid @RequestBody Residencia residencia, HttpServletResponse response) {
        Residencia residenciaSalva = residenciaRepository.save(residencia);
        return (residenciaSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(residenciaSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Residencia> alterar(@Valid @RequestBody Residencia residencia, @PathVariable("codigo") Long codigo) {
        return residenciaService.atualizar(residencia, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Residencia> remover(@PathVariable("codigo") Long codigo) {
        return residenciaService.remover(codigo);
    }

}
