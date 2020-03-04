package fadep.medicina.repository;

import fadep.medicina.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.MedicamentoPessoa;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicamentoPessoaRepository extends JpaRepository<MedicamentoPessoa, Long>{

    @Query("SELECT mp FROM MedicamentoPessoa mp WHERE mp.pessoa.idPessoa = ?1")
    public List<MedicamentoPessoa> RetornarMedicamentosPaciente(Long codPaciente);
}
