package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.MedicamentoPessoa;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MedicamentoPessoaRepository extends JpaRepository<MedicamentoPessoa, Long>{

    @Query("SELECT mp FROM MedicamentoPessoa mp WHERE mp.pessoa.idPessoa = ?1")
    public List<MedicamentoPessoa> RetornarMedicamentosPaciente(Long codPaciente);

    /**
     * Retorna o total de dependentes de um determinado medicamento
     */
    @Query("SELECT COUNT(mp.pessoa.idPessoa) FROM MedicamentoPessoa mp WHERE mp.medicamento.idMedicamento = ?1")
    public Integer retornarTotalDependentes(Long idMedicamento);

    /**
     * Remove todos as relações da tabela MedicamentoPessoa
     * para poder remover o medicamento
     */
    @Transactional
    @Modifying
    @Query("DELETE FROM MedicamentoPessoa mp WHERE mp.medicamento.idMedicamento = :idMedicamento")
    public void removerRelacaoMedicamentoPessoa(@Param("idMedicamento") Long idMedicamento);
}
