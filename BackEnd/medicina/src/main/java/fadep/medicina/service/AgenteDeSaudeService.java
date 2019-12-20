package fadep.medicina.service;

import fadep.medicina.model.AgenteDeSaude;
import fadep.medicina.repository.AgenteDeSaudeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AgenteDeSaudeService {

    @Autowired
    private AgenteDeSaudeRepository agenteDeSaudeRepository;

    public ResponseEntity<AgenteDeSaude> atualizar(AgenteDeSaude agenteDeSaude, Long codigo) {
        AgenteDeSaude agenteDeSaudeSalva = buscarPorCodigo(codigo);
        if (agenteDeSaudeSalva != null) {
            BeanUtils.copyProperties(agenteDeSaude, agenteDeSaudeSalva, "idAgente");
            agenteDeSaudeRepository.save(agenteDeSaudeSalva);
            return ResponseEntity.ok(agenteDeSaudeSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<AgenteDeSaude> remover(Long codigo) {
        AgenteDeSaude agenteDeSaudeSalva = buscarPorCodigo(codigo);
        if (agenteDeSaudeSalva != null) {
            agenteDeSaudeRepository.delete(agenteDeSaudeSalva);
            agenteDeSaudeSalva = buscarPorCodigo(codigo);
            if (agenteDeSaudeSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public AgenteDeSaude buscarPorCodigo(Long codigo) {
        Optional<AgenteDeSaude> agenteDeSaudeOptional = agenteDeSaudeRepository.findById(codigo);
        if (!(agenteDeSaudeOptional.equals(Optional.empty()))) {
            AgenteDeSaude agenteDeSaudeSalva = agenteDeSaudeOptional.get();
            return agenteDeSaudeSalva;
        }
        return null;
    }

}
