package fadep.medicina.service;

import fadep.medicina.model.CausaPessoa;
import fadep.medicina.repository.CausaPessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CausaPessoaService {

    @Autowired
    private CausaPessoaRepository causaPessoaRepository;

    public ResponseEntity<CausaPessoa> atualizar(CausaPessoa causaPessoa, Long codigo) {
        CausaPessoa causaPessoaSalva = buscarPorCodigo(codigo);
        if (causaPessoaSalva != null) {
            BeanUtils.copyProperties(causaPessoa, causaPessoaSalva, "id_causa_pessoa");
            causaPessoaRepository.save(causaPessoaSalva);
            return ResponseEntity.ok(causaPessoaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<CausaPessoa> remover(Long codigo) {
        CausaPessoa causaPessoaSalva = buscarPorCodigo(codigo);
        if (causaPessoaSalva != null) {
            causaPessoaRepository.delete(causaPessoaSalva);
            causaPessoaSalva = buscarPorCodigo(codigo);
            if (causaPessoaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public CausaPessoa buscarPorCodigo(Long codigo) {
        Optional<CausaPessoa> causaPessoaOptional = causaPessoaRepository.findById(codigo);
        if (!(causaPessoaOptional.equals(Optional.empty()))) {
            CausaPessoa causaPessoaSalva = causaPessoaOptional.get();
            return causaPessoaSalva;
        }
        return null;
    }

}
