package fadep.medicina.resource;

import fadep.medicina.model.Funcionario;
import fadep.medicina.model.MicroArea;
import fadep.medicina.repository.MicroAreaRepository;
import fadep.medicina.service.MicroAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/microarea")
public class MicroAreaResource {

    @Autowired
    public MicroAreaRepository microAreaRepository;

    @Autowired
    public MicroAreaService microAreaService;

    @GetMapping
    public List<MicroArea> listarTodas() {
        return microAreaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<MicroArea> cadastrar(@Valid @RequestBody MicroArea microArea, HttpServletResponse response) {
        MicroArea microAreaSalva = microAreaRepository.save(microArea);
        return (microAreaSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(microAreaSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<MicroArea> alterar(@Valid @RequestBody MicroArea microArea, @PathVariable("codigo") Long codigo) {
        return microAreaService.atualizar(microArea, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<MicroArea> remover(@PathVariable("codigo") Long codigo) {
        return microAreaService.remover(codigo);
    }

    @GetMapping("/validar/{numero}")
    public ResponseEntity<Boolean> microareaDisponivel(@PathVariable("numero") int numero) {
        return microAreaService.retornarMicroareaValida(numero);
    }

    @GetMapping("{codigo}/pacientes")
    public Integer retornarTotalPacientes(@PathVariable("codigo") Long codigo) {
        return microAreaRepository.retornarTotalPacientesMicroarea(codigo);
    }

    @GetMapping("{codigo}/responsavel")
    public ResponseEntity<Funcionario> retornarAcsResponsavel(@PathVariable("codigo") Long codigo) {
        return microAreaService.retornarAcsResponsavel(codigo);
    }

}
