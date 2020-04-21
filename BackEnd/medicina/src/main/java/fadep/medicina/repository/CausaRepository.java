package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Causa;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CausaRepository extends JpaRepository<Causa, Long> {

    /**
     * Retorna o total de registros com o mesmo nome da causa
     */
    @Query("SELECT COUNT(c.idCausa) FROM Causa c WHERE c.nome = ?1")
    public Integer retornarRiscoDisponivel(String descricao);

    /**
     * Retorna o total de pacientes que possuem a causa
     */
    @Query("SELECT COUNT(cp.pessoa.idPessoa) FROM CausaPessoa cp WHERE cp.causa.idCausa = ?1")
    public Integer retornarTotalPacientes(Long codCausa);

    /**
     * Remove todas as relacoes de paciente com a causa
     */
    @Transactional
    @Modifying
    @Query("DELETE FROM CausaPessoa cp WHERE cp.causa.idCausa = :idCausa")
    public void removerRelacaoPacienteCausa(@Param("idCausa") Long idCausa);

}
