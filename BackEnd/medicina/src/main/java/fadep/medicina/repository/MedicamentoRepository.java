package fadep.medicina.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

	

}
