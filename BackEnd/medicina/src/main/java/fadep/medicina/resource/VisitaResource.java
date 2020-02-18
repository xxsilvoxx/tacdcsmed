package fadep.medicina.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fadep.medicina.model.Visita;
import fadep.medicina.repository.VisitaRepository;
import fadep.medicina.service.VisitaService;

@RestController
@RequestMapping("/visitas")
public class VisitaResource {

    @Autowired
    public VisitaRepository visitaRepository;

    @Autowired
    public VisitaService visitaService;

    @GetMapping
    public List<Visita> listarTodos() {
        return visitaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Visita> cadastrar(@Valid @RequestBody Visita visita, HttpServletResponse response) {
        Visita visitaSalvo = visitaRepository.save(visita);
        return (visitaSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(visitaSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Visita> alterar(@Valid @RequestBody Visita visita, @PathVariable("codigo") Long codigo) {
        return visitaService.atualizar(visita, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Visita> remover(@PathVariable("codigo") Long codigo) {
        return visitaService.remover(codigo);
    }

}

