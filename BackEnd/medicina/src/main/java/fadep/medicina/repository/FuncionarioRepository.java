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

    /**
     * Verifica se o login pode ser modificado para um não salvo antes
     */
    @Query("SELECT COUNT(f.idFuncionario) FROM Funcionario f WHERE f.login = ?1")
    public Integer loginDisponivel(String login);

    /**
     * Verifica se o e-mail pode ser modificado para um não salvo antes
     */
    @Query("SELECT COUNT(f.idFuncionario) FROM Funcionario f WHERE f.email = ?1")
    public Integer emailDisponivel(String email);

    /**
     * Verifica se a microárea avaliada está disponivel ou não
     */
    @Query("SELECT COUNT(f.microArea.idMicroArea) FROM Funcionario f WHERE f.microArea.idMicroArea = ?1")
    public Integer microAreaDisponivel(Long idMicroArea);

    /**
     * Verifica se o funcionário tem visitas realizadas
     */
    @Query("SELECT COUNT(v.idVisita) FROM Visita v WHERE v.funcionario.idFuncionario = ?1")
    public Integer funcionarioPossuiVisitas(Long idFuncionario);

    /**
     * Retorna o objeto de funcionario apartir do email ou login e senha
     */
    @Query("SELECT f FROM Funcionario f WHERE (f.login = ?1 OR f.email = ?1) AND f.senha = ?2")
    public Funcionario retornarFuncionario(String login, String senha);

    /**
     * Retorna o objeto funcionário apartir do email
     */
    @Query("SELECT f FROM Funcionario f WHERE f.email = ?1")
    public Funcionario buscarPorEmail(String email);
}
