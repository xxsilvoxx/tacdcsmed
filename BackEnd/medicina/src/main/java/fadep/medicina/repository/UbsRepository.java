package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Ubs;
import org.springframework.data.jpa.repository.Query;

public interface UbsRepository extends JpaRepository<Ubs, Long>{
    /**
     * Valida se o nome de UBS passado por parâmetro pode ser utilizado
     */
    @Query("SELECT COUNT(u.idUbs) FROM Ubs u WHERE u.nome = ?1")
    public Integer validarUbsDisponivel(String nome);

}
