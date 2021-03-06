package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Pessoa;
import org.springframework.data.jpa.repository.Query;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

    /**
     * Retorna uma listagem com os pacientes que estão presentes
     * na microárea em que o funcionário está trabalhando.
     */
    @Query("SELECT p FROM Pessoa p, Familia f, Residencia r " +
            "WHERE p.familia = f AND r.familia = f AND r.microArea.idMicroArea = ?1")
    public List<Pessoa> retornarPacientesPorMicroarea(Long idMicroArea);

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

    /**
     * Retorna pacientes que possuem visitas
     */
    @Query("SELECT DISTINCT (v.pessoa) FROM Visita v, Familia f, Residencia r " +
            "WHERE v.pessoa.familia = f AND r.familia = f " +
            "AND r.microArea.idMicroArea = ?1")
    public List<Pessoa> retornarPacientesVisitados(Long idMicroArea);

    /**
     * Retorna a lista de pacientes que tem
     * consultas marcadas, ordenando por ordem
     * crescente.
     */
    @Query("SELECT v.pessoa FROM Visita v, Familia f, Residencia r " +
            "WHERE v.pessoa.familia = f AND r.familia = f AND r.microArea.idMicroArea = ?3 " +
            "AND v.comparecerUbs = 1 AND (v.dataCompare >= ?1 AND v.dataCompare <= ?2) " +
            "ORDER BY v.dataCompare")
    public List<Pessoa> retornarPacientesComConsultas(Date dataAtual, Date umaSemana, Long idMicroArea);

    @Query("SELECT p FROM Pessoa p WHERE p.familia.idFamilia = ?1")
    public List<Pessoa> retornarMembrosFamilia(Long idFamilia);
}
