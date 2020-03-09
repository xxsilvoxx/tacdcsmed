package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Visita;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VisitaRepository extends JpaRepository<Visita, Long> {

    @Query("SELECT v FROM Visita v WHERE v.pessoa.idPessoa = ?1 AND v.comparecerUbs = 1")
    public List<Visita> listarAgendamentos(Long codPaciente);
}
