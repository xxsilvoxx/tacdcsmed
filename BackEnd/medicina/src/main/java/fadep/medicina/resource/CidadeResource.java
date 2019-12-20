package fadep.medicina.resource;

import fadep.medicina.model.Cidade;
import fadep.medicina.repository.CidadeRepository;
import fadep.medicina.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cidades")
public class CidadeResource {

    @Autowired
    public CidadeRepository cidadeRepository;

    @Autowired
    public CidadeService cidadeService;

    @GetMapping
    public List<Cidade> listarTodas() {
        return cidadeRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Cidade> cadastrar(@Valid @RequestBody Cidade cidade, HttpServletResponse response) {
        Cidade cidadeSalva = cidadeRepository.save(cidade);
        return (cidadeSalva != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(cidadeSalva))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Cidade> alterar(@Valid @RequestBody Cidade cidade, @PathVariable("codigo") Long codigo) {
        return cidadeService.atualizar(cidade, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Cidade> remover(@PathVariable("codigo") Long codigo) {
        return cidadeService.remover(codigo);
    }

}
