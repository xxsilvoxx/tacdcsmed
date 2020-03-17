package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Pessoa;
import org.springframework.data.jpa.repository.Query;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

    /**
     * Método para verificar no banco se o CPF ou CNPJ passado no formulário web
     * já está cadastrado ou não, validando para retornar uma msg para o usuário.
     */
    @Query("SELECT COUNT(p.idPessoa) FROM Pessoa p WHERE p.cpfCnpj = ?1")
    public Integer retornarCpfCnpjValido(String cpfCnpj);
}
