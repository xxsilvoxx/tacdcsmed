package fadep.medicina.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fadep.medicina.model.Ubs;
import fadep.medicina.repository.UbsRepository;
import fadep.medicina.service.UbsService;

@RestController
@RequestMapping("/ubs")
public class UbsResource {

    @Autowired
    public UbsRepository ubsRepository;

    @Autowired
    public UbsService ubsService;

    @GetMapping
    public List<Ubs> listarTodos() {
        return ubsRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Ubs> cadastrar(@Valid @RequestBody Ubs ubs, HttpServletResponse response) {
        Ubs ubsSalvo = ubsRepository.save(ubs);
        return (ubsSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(ubsSalvo))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Ubs> alterar(@Valid @RequestBody Ubs ubs, @PathVariable("codigo") Long codigo) {
        return ubsService.atualizar(ubs, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Ubs> remover(@PathVariable("codigo") Long codigo) {
        return ubsService.remover(codigo);
    }

    @GetMapping("/validar/nome")
    @ResponseBody
    public ResponseEntity<Boolean> retornarUbsDisponivel(@Param("nome") String nome) {
        return ubsService.retornarUbsDisponivel(nome);
    }

    @GetMapping("/{codigo}/funcionarios/total")
    public Integer retornarTotalFuncionarios(@PathVariable("codigo") Long codigo) {
        return ubsRepository.retornarTotalFuncionarios(codigo);
    }

    @GetMapping("/{codigo}/bairros/total")
    public Integer retornarTotalBairros(@PathVariable("codigo") Long codigo) {
        return ubsRepository.retornarTotalBairros(codigo);
    }

}

