package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Residencia;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResidenciaRepository extends JpaRepository<Residencia, Long> {

    /**
     * Retorna uma lista com as residências cadastradas na
     * microarea em que o funcionário está atuando.
     */
    @Query("SELECT r FROM Residencia r WHERE r.microArea.idMicroArea = ?1")
    public List<Residencia> retornarResidenciasPorMicroarea(Long idMicroArea);

    /**
     * Retorna a quantidade de pessoas que existem naquela família
     */
    @Query("SELECT COUNT(p) FROM Pessoa p WHERE p.familia.idFamilia = ?1")
    public Integer retornarTotalFamiliares(Long idFamilia);

    /**
     * Retorna o endereço da pessoa, passando o código da família
     * por parâmetro, para comparar qual residência pertence a
     * família.
     */
    @Query("SELECT r FROM Residencia r WHERE r.familia.idFamilia = ?1")
    public Residencia retornarResidenciaPorFamilia(Long idFamilia);

}
