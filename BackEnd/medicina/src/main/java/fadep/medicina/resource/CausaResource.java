package fadep.medicina.resource;

import com.sun.org.apache.xpath.internal.operations.Bool;
import fadep.medicina.model.Causa;
import fadep.medicina.repository.CausaRepository;
import fadep.medicina.service.CausaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/causas")
public class CausaResource {

    @Autowired
    public CausaRepository causaRepository;

    @Autowired
    public CausaService causaService;

    @GetMapping
    public List<Causa> listarTodas() {
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
        return causaService.atualizar(causa, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Causa> remover(@PathVariable("codigo") Long codigo) {
        return causaService.remover(codigo);
    }

    @GetMapping("/{codigo}/pacientes")
    public Integer retornarTotalPacientes(@PathVariable("codigo") Long codigo) {
        return causaRepository.retornarTotalPacientes(codigo);
    }

    @GetMapping("/validar/causa")
    @ResponseBody
    public ResponseEntity<Boolean> retornarCausaDisponivel(@RequestParam("causa") String causa) {
        return causaService.retornarCausaDisponivel(causa);
    }

    @GetMapping("/paciente/{codigo}/somatorio")
    public Integer retornarSomatorioRiscos(@PathVariable("codigo") Long codigo) {
        return causaRepository.retornarSomatorioRisco(codigo);
    }
}
