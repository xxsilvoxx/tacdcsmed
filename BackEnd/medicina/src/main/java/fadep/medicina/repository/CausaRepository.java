package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Causa;

public interface CausaRepository extends JpaRepository<Causa, Long> {

}
