package fadep.medicina.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Residencia;
import org.springframework.data.jpa.repository.Query;

public interface ResidenciaRepository extends JpaRepository<Residencia, Long> {

    /*
    * Retorna a quantidade de pessoas que existem naquela família
    * */

    @Query("select count (p.idpessoa) from Pessoa p, Familia f, " +"where p.idfamilia = f")
    public Integer retornaTotalFamiliares(Long idPessoa);

}
