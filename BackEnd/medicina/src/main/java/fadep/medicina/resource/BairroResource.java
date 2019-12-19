package fadep.medicina.resource;

import fadep.medicina.model.Bairro;
import fadep.medicina.repository.BairroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/bairros")
public class BairroResource {

    @Autowired
    public BairroRepository bairroRepository;

    @GetMapping
    public List<Bairro> listarTodos() {
        return bairroRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Bairro> cadastrar(@Valid @RequestBody Bairro bairro, HttpServletResponse response) {
        Bairro bairroSalvo = bairroRepository.save(bairro);
        return (bairroSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(bairroSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Bairro> alterar(@Valid @RequestBody Bairro bairro, @PathVariable("codigo") Long codigo) {
        // Ainda falta a implementação do service pra implementar o método
        return null;
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Bairro> remover(@PathVariable("codigo") Long codigo) {
        bairroRepository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }

}
