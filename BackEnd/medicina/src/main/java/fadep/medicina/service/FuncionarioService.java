package fadep.medicina.service;

import fadep.medicina.model.Funcionario;
import fadep.medicina.repository.FuncionarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public ResponseEntity<Funcionario> atualizar(Funcionario funcionario, Long codigo) {
        Funcionario funcionarioSalvo = buscarPorCodigo(codigo);
        if (funcionarioSalvo != null) {
            BeanUtils.copyProperties(funcionario, funcionarioSalvo, "idFuncionario");
            funcionarioRepository.save(funcionarioSalvo);
            return ResponseEntity.ok(funcionarioSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Funcionario> remover(Long codigo) {
        Funcionario funcionarioSalvo = buscarPorCodigo(codigo);
        if (funcionarioSalvo != null) {
            funcionarioRepository.delete(funcionarioSalvo);
            funcionarioSalvo = buscarPorCodigo(codigo);
            if (funcionarioSalvo == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Funcionario buscarPorCodigo(Long codigo) {
        Optional<Funcionario> agenteDeSaudeOptional = funcionarioRepository.findById(codigo);
        if (!(agenteDeSaudeOptional.equals(Optional.empty()))) {
            Funcionario funcionarioSalvo = agenteDeSaudeOptional.get();
            return funcionarioSalvo;
        }
        return null;
    }

}
