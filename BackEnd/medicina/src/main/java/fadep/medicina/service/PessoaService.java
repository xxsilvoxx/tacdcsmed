package fadep.medicina.service;

import fadep.medicina.model.Pessoa;
import fadep.medicina.repository.PessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    	/**
    	 * novo retorno de pessoas, se for diferente de nulo;
    	 */
        Pessoa pessoa = pessoaRepository.findOne(codigo);
        if ( pessoa != null) {
        	return pessoa;
        }
        return null;
    }

    public ResponseEntity<Pessoa> retornarResponsavelFamiliar(Long codFamilia) {
        Pessoa pessoa = pessoaRepository.retornarFamiliaPossuiResponsavel(codFamilia);
        return (pessoa != null) ? (ResponseEntity.ok(pessoa)) : (null);
    }

    /**
     * Se retornar false, significa que já possui esse cpf ou cnpj cadastrado
     * Se retornar true, é validado e pode ser cadastrado.
     */
    public Boolean retornarValidadeCpfCnpj(String cpfCnpj) {
        Integer registro = pessoaRepository.retornarCpfCnpjValido(cpfCnpj);
        return (registro > 0) ? (false) : (true);
    }
    
	public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
		Pessoa pessoaSalva = buscarPorCodigo(codigo);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);
	}

}
