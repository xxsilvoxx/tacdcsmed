package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Familia;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FamiliaRepository extends JpaRepository<Familia, Long> {

    /**
     * Retorna a lista de fámilias da microárea mantendo as
     * informações informações mais separadas.
     */
    @Query("SELECT f FROM Residencia r, Familia f WHERE r.familia = f AND r.microArea.idMicroArea = ?1")
	public List<Familia> retornarFamiliasPorMicroarea(Long idMicroarea);

    /**
     * Retorna as famílias que possuem residência
     */
    @Query("SELECT DISTINCT r.familia FROM Residencia r")
    public List<Familia> retornarFamiliasComResidencia();

    /**
     * Retorna se existem registros com aquele nome de família
     */
    @Query("SELECT COUNT(f) FROM Familia f WHERE f.nome = ?1")
    public Integer retornarFamiliaDisponivel(String nome);

}
