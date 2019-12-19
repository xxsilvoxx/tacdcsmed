package fadep.medicina.resource;

import fadep.medicina.model.AgenteDeSaude;
import fadep.medicina.repository.AgenteDeSaudeRepository;
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

    @GetMapping
    public List<AgenteDeSaude> listarTodos() {
        return agenteDeSaudeRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<AgenteDeSaude> cadastrar(@Valid @RequestBody AgenteDeSaude agenteDeSaude, HttpServletResponse response) {
        AgenteDeSaude agenteDeSaudeSalvo = agenteDeSaudeRepository.save(agenteDeSaude);
        return (agenteDeSaude != null)
                ?(ResponseEntity.status(HttpStatus.CREATED).body(agenteDeSaude))
                :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<AgenteDeSaude> alterar(@Valid @RequestBody AgenteDeSaude pessoa, @PathVariable("codigo") Long codigo) {
        // Ainda falta a implementação do service pra implementar o método
        return null;
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<AgenteDeSaude> remover(@PathVariable("codigo") Long codigo) {
        agenteDeSaudeRepository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }

}
