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

    /**
     * Válida se a fámilia já possui um responsável familiar, caso possua,
     * retorna o paciente, mostrando que o paciente a ser caddastrado não pode ser o responsável familiar,
     * caso retorne vazio, o paciente poderá ser o responsável familiar
     */
    @Query("SELECT p FROM Pessoa p WHERE p.familia.idFamilia = ?1 AND p.responsavelFamiliar = 1")
    public Pessoa retornarFamiliaPossuiResponsavel(Long codFamilia);
}
