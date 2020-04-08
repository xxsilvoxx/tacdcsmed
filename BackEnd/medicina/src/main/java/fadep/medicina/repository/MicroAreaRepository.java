package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.MicroArea;
import org.springframework.data.jpa.repository.Query;

public interface MicroAreaRepository extends JpaRepository<MicroArea, Long> {

    /**
     * Retorna uma contagem de registros que possuem aquele número na microárea
     */
    @Query("SELECT COUNT(m.idMicroArea) FROM MicroArea m WHERE m.numero = ?1")
    public Integer retornarMicroareaDisponivel(int numero);

}
