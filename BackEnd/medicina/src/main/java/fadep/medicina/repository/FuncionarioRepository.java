package fadep.medicina.repository;

import fadep.medicina.model.Funcionario;
import fadep.medicina.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    /**
     * Método responsável por modificar o funcionario adicionando a imagem pra ele
     */
    @Modifying
    @Transactional
    @Query("UPDATE Funcionario f SET f.imagem.idImagem = :idImg WHERE f.idFuncionario = :idFuncionario")
    public int adicionarImagemAoUsuario(@Param("idImg") Long idImg, @Param("idFuncionario") Long idFuncionario);

    /**
     * Método responsável por atribuir null a coluna imagem do usuário
     */
    @Modifying
    @Transactional
    @Query("UPDATE Funcionario f SET f.imagem = null WHERE f.idFuncionario = :idFuncionario")
    public int removerImagem(@Param("idFuncionario") Long idFuncionario);
}
