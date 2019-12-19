package fadep.medicina.resource;

import fadep.medicina.model.AgenteDeSaude;
import fadep.medicina.repository.AgenteDeSaudeRepository;
import fadep.medicina.service.AgenteDeSaudeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/agentesDeSaude")
public class AgenteDeSaudeResource {

    @Autowired
    public AgenteDeSaudeRepository agenteDeSaudeRepository;

    @Autowired
    public AgenteDeSaudeService agenteDeSaudeService;

    @GetMapping
    public List<AgenteDeSaude> listarTodos() {
        return agenteDeSaudeRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<AgenteDeSaude> cadastrar(@Valid @RequestBody AgenteDeSaude agenteDeSaude, HttpServletResponse response) {
        AgenteDeSaude agenteDeSaudeSalvo = agenteDeSaudeRepository.save(agenteDeSaude);
        return (agenteDeSaudeSalvo != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(agenteDeSaude))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<AgenteDeSaude> alterar(@Valid @RequestBody AgenteDeSaude pessoa, @PathVariable("codigo") Long codigo) {
        return agenteDeSaudeService.atualizar(pessoa, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<AgenteDeSaude> remover(@PathVariable("codigo") Long codigo) {
        return agenteDeSaudeService.remover(codigo);
    }

}
