package fadep.medicina.service;

import fadep.medicina.model.CausaPessoa;
import fadep.medicina.repository.CausaPessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class CausaPessoaService {

    @Autowired
    private CausaPessoaRepository causaPessoaRepository;

    public ResponseEntity<CausaPessoa> atualizar(CausaPessoa causaPessoa, Long codigo) {
        CausaPessoa causaPessoaSalva = buscarPorCodigo(codigo);
        if (causaPessoaSalva != null) {
            BeanUtils.copyProperties(causaPessoa, causaPessoaSalva, "idCausaPessoa");
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
    	CausaPessoa causaPessoa = causaPessoaRepository.findOne(codigo);
    	if ( causaPessoa !=  null) {
    		return causaPessoa;
        }
        return null;
    }

}
