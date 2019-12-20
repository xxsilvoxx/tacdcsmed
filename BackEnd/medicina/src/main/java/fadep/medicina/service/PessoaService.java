package fadep.medicina.service;

import fadep.medicina.model.Pessoa;
import fadep.medicina.repository.PessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public ResponseEntity<Pessoa> atualizar(Pessoa pessoa, Long codigo) {
        Pessoa pessoaSalva = buscarPorCodigo(codigo);
        if (pessoaSalva != null) {
            BeanUtils.copyProperties(pessoa, pessoaSalva, "idPessoa");
            pessoaRepository.save(pessoaSalva);
            return ResponseEntity.ok(pessoaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Pessoa> remover(Long codigo) {
        Pessoa pessoaSalva = buscarPorCodigo(codigo);
        if (pessoaSalva != null) {
            pessoaRepository.delete(pessoaSalva);
            pessoaSalva = buscarPorCodigo(codigo);
            if (pessoaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Pessoa buscarPorCodigo(Long codigo) {
        /**
         * Nas versões atuais do spring ele pede um objeto Optional para buscar informações, como o findById,
         * que é muito similar ao findOne().
         * Por isso é passado primeiro Pessoa como Optional, e depois convertido para a Classe Pessoa.
         */
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(codigo);
        if (!(pessoaOptional.equals(Optional.empty()))) {
            Pessoa pessoaSalva = pessoaOptional.get();
            return pessoaSalva;
        }
        return null;
    }

}
