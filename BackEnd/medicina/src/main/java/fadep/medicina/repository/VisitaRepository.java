package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Visita;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VisitaRepository extends JpaRepository<Visita, Long> {

    /**
     * Retorna as visitas que foram realizadas na microárea para que
     * o funcionario que for continuar as visitas ali tenha como dar
     * proseguimento.
     */
    @Query("SELECT v FROM Visita v, Pessoa p, Familia f, Residencia r " +
            "WHERE v.pessoa = p AND p.familia = f AND r.familia = f " +
            "AND r.microArea.idMicroArea = ?1")
    public List<Visita> retornarVisitasPorMicroarea(Long idMicroArea);

    @Query("SELECT v FROM Visita v WHERE v.funcionario.idFuncionario = ?1")
    public List<Visita> retornarVisitasPorFuncionario(Long idFuncionario);

    /**
     * Retorna uma lista com os agendamentos do paciente
     */
    @Query("SELECT v FROM Visita v WHERE v.pessoa.idPessoa = ?1 " +
            "AND v.comparecerUbs = 1 ORDER BY v.dataCompare DESC")
    public List<Visita> listarAgendamentos(Long codPaciente);

}
