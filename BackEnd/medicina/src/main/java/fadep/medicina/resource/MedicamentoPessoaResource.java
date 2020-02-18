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

import fadep.medicina.model.MedicamentoPessoa;
import fadep.medicina.repository.MedicamentoPessoaRepository;
import fadep.medicina.service.MedicamentoPessoaService;

@RestController
@RequestMapping("/medicamentoPessoas")
public class MedicamentoPessoaResource {

    @Autowired
    public MedicamentoPessoaRepository medicamentoPessoaRepository;

    @Autowired
    public MedicamentoPessoaService medicamentoPessoaService;

    @GetMapping
    public List<MedicamentoPessoa> listarTodos() {
        return medicamentoPessoaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<MedicamentoPessoa> cadastrar(@Valid @RequestBody MedicamentoPessoa medicamentoPessoa, HttpServletResponse response) {
        MedicamentoPessoa medicamentoPessoaSalvo = medicamentoPessoaRepository.save(medicamentoPessoa);
        return (medicamentoPessoaSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(medicamentoPessoaSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<MedicamentoPessoa> alterar(@Valid @RequestBody MedicamentoPessoa medicamentoPessoa, @PathVariable("codigo") Long codigo) {
        return medicamentoPessoaService.atualizar(medicamentoPessoa, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<MedicamentoPessoa> remover(@PathVariable("codigo") Long codigo) {
        return medicamentoPessoaService.remover(codigo);
    }

}

