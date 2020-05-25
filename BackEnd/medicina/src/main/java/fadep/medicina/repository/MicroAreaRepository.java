package fadep.medicina.repository;

import fadep.medicina.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.MicroArea;
import org.springframework.data.jpa.repository.Query;

public interface MicroAreaRepository extends JpaRepository<MicroArea, Long> {

    /**
     * Retorna uma contagem de registros que possuem aquele número na microárea
     */
    @Query("SELECT COUNT(m) FROM MicroArea m WHERE m.numero = ?1 AND m.bairro.idBairro = ?2")
    public Integer retornarMicroareaDisponivel(int numero, Long idBairro);

    /**
     * Faz um join com 4 tabelas para retornar o total de pacientes
     * presentes na microárea
     */
    @Query("SELECT COUNT(p.idPessoa) FROM Pessoa p, Familia f, Residencia r, MicroArea m " +
            "WHERE r.microArea = m AND r.familia = f AND p.familia = f AND m.idMicroArea = ?1")
    public Integer retornarTotalPacientesMicroarea(Long idMicroArea);

    /**
     * Retorna a ACS responsável por uma determinada microarea
     */
    @Query("SELECT f FROM Funcionario f WHERE f.microArea.idMicroArea = ?1")
    public Funcionario retornarAcsResponsavel(Long idMicroArea);

}
