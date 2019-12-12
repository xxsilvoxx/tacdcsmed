package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
