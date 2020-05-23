package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.CausaPessoa;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CausaPessoaRepository extends JpaRepository<CausaPessoa, Long>{

    @Query("SELECT cp FROM CausaPessoa cp WHERE cp.pessoa.idPessoa = ?1")
    public List<CausaPessoa> listarCausas(Long codPaciente);

}
