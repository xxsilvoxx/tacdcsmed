package fadep.medicina.repository;

import fadep.medicina.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {

    /**
     * Método que busca a imagem salva para o usuário do sistema
     */
    @Query("SELECT f.imagem FROM Funcionario f WHERE f.idFuncionario = ?1")
    public Imagem buscarImagemDoUsuario(Long codFuncionario);

    /**
     * Remove a imagem interior do usuário
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Imagem i WHERE i.idImagem = :idImg")
    public void removerImagemPeloCodigo(@Param("idImg") Long idImagem);
}
