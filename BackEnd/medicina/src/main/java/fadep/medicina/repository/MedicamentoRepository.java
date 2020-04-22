package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Medicamento;
import org.springframework.data.jpa.repository.Query;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    /**
     * Valida se o medicamento passado já está cadastrado
     */
    @Query("SELECT COUNT(m.idMedicamento) FROM Medicamento m WHERE m.nome = ?1")
    public Integer retornarNomeMedicamentoValido(String nome);

}
