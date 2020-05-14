package fadep.medicina.repository;

import fadep.medicina.passwordreset.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    @Query("SELECT t FROM PasswordResetToken t WHERE t.token = ?1 and t.funcionario.idFuncionario = ?2")
    public PasswordResetToken retornarToken(String token, Long idFuncionario);
}
