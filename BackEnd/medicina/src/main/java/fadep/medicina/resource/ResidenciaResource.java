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

    @GetMapping("/microarea/{codigo}")
    public List<Residencia> listarResidenciasPorMicroArea(@PathVariable("codigo") Long idMicroArea) {
        return residenciaRepository.retornarResidenciasPorMicroarea(idMicroArea);
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

    @GetMapping("/familia/{codigo}")
    public ResponseEntity<Residencia> retornarResidenciaDaFamilia(@PathVariable("codigo") Long idFamilia) {
        Residencia residencia = residenciaRepository.retornarResidenciaPorFamilia(idFamilia);
        return (residencia != null) ? (ResponseEntity.ok(residencia)) : (ResponseEntity.notFound().build());
    }

    @GetMapping("/familia/total/{codigo}")
    public ResponseEntity<Integer> retornaTotalFamiliares(@PathVariable("codigo") Long idFamilia) {
        Integer totalFamiliares = residenciaRepository.retornarTotalFamiliares(idFamilia);
        return (totalFamiliares != null) ? (ResponseEntity.ok(totalFamiliares)) : (ResponseEntity.notFound().build());
    }
}
