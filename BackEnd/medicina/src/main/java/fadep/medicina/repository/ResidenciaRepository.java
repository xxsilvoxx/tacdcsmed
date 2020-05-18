package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Residencia;
import org.springframework.data.jpa.repository.Query;

public interface ResidenciaRepository extends JpaRepository<Residencia, Long> {

    /*
    * Retorna a quantidade de pessoas que existem naquela família
    * */

    @Query("SELECT COUNT(p.idPessoa) FROM Pessoa p, Familia f WHERE p.familia = f AND p.idPessoa = ?1")
    public Integer retornaTotalFamiliares(Integer idPessoa);

    /**
     * Retorna o endereço da pessoa, passando o código da família
     * por parâmetro, para comparar qual residência pertence a
     * família.
     */
    @Query("SELECT r FROM Residencia r WHERE r.familia.idFamilia = ?1")
    public Residencia retornarResidenciaPorFamilia(Long idFamilia);

}
