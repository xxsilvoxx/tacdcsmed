package fadep.medicina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fadep.medicina.model.Funcao;
import org.springframework.data.jpa.repository.Query;

public interface FuncaoRepository extends JpaRepository<Funcao, Long> {

    /**
     * Método que verifica se a função passada já existe no banco
     */
    @Query("SELECT COUNT(f.idFuncao) FROM Funcao f WHERE f.nome = ?1")
    public Integer retornarFuncaoDisponivel(String nome);

    /**
     * Método que retorna o total de funcionarios que tem uma determinada função
     */
    @Query("SELECT COUNT(f.idFuncionario) FROM Funcionario f WHERE f.funcao.idFuncao = ?1")
    public Integer retornarTotalFuncionarios(Long idFuncao);

}
