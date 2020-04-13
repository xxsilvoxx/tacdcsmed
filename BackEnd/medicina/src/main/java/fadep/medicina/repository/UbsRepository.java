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

    /**
     * Retorna o total de funcionários na ubs
     */
    @Query("SELECT COUNT(f.idFuncionario) FROM Funcionario f WHERE f.ubs.idUbs = ?1")
    public Integer retornarTotalFuncionarios(Long idUbs);

    /**
     * Retorna o total de bairros que a ubs atende
     */
    @Query("SELECT COUNT(b.idBairro) FROM Bairro b WHERE b.ubs.idUbs = ?1")
    public Integer retornarTotalBairros(Long idUbs);

}
