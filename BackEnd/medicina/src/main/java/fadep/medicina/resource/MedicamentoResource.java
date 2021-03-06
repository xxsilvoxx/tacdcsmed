package fadep.medicina.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fadep.medicina.model.Medicamento;
import fadep.medicina.repository.MedicamentoRepository;
import fadep.medicina.service.MedicamentoService;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoResource {

    @Autowired
    public MedicamentoRepository medicamentoRepository;

    @Autowired
    public MedicamentoService medicamentoService;

    @GetMapping
    public List<Medicamento> listarTodos() {
        return medicamentoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Medicamento> cadastrar(@Valid @RequestBody Medicamento medicamento, HttpServletResponse response) {
        Medicamento medicamentoSalvo = medicamentoRepository.save(medicamento);
        return (medicamentoSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(medicamentoSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Medicamento> alterar(@Valid @RequestBody Medicamento medicamento, @PathVariable("codigo") Long codigo) {
        return medicamentoService.atualizar(medicamento, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Medicamento> remover(@PathVariable("codigo") Long codigo) {
        return medicamentoService.remover(codigo);
    }

    @GetMapping("/validar/nome")
    @ResponseBody
    public ResponseEntity<Boolean> retornarNomeValido(@RequestParam(value="nome") String nome) {
        return medicamentoService.validarNomeValido(nome);
    }

}

