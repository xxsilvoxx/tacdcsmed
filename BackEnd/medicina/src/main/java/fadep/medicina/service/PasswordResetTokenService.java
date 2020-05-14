package fadep.medicina.service;

import fadep.medicina.model.Funcionario;
import fadep.medicina.passwordreset.PasswordResetToken;
import fadep.medicina.repository.FuncionarioRepository;
import fadep.medicina.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Locale;
import java.util.Properties;
import java.util.Random;

@Service
public class PasswordResetTokenService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private Properties properties;

    /**
     * Implementação necessário para poder
     * utilizar os recursos do servidor
     * de email e da API do JavaMail.
     */
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("suporte.mindsafe.teste@gmail.com");
        mailSender.setPassword("projetoestagio2020");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.debug", "true");

        return mailSender;
    }

    /**
     * Método que gera 6 números aleatórios para o usuário.
     */
    public String gerarToken() {
        StringBuilder token = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int num = random.nextInt(10);
            token.append(Integer.toString(num));
        }
        return token.toString();
    }

    /**
     * Endpoint com o post para usuário informar o email.
     * Caso toda a operação tenha êxito, um código é enviado
     * para o email cadastrado do usuário.
     */
    public ResponseEntity<Funcionario> salvarTokenParaFuncionario(HttpServletRequest request, String email, Funcionario funcionario) {
        Funcionario funcionarioRetornado = funcionarioRepository.buscarPorEmail(email);
        if (funcionarioRetornado != null) {
            funcionario = funcionarioRetornado;
            String token = gerarToken();
            createPasswordResetTokenForUser(funcionario, token);
            getJavaMailSender().send(constructResetTokenEmail(token, funcionario));
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Método que cria apartir do construtor da classe o token
     * para o usuário.
     */
    public void createPasswordResetTokenForUser(Funcionario funcionario, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, funcionario);
        passwordResetTokenRepository.save(myToken);
    }

    public SimpleMailMessage constructResetTokenEmail(String token, Funcionario funcionario) {
        String mensagem = "Token gerado para que possa redefinir a sua senha: \n\n";
        return constructEmail("Alterar Senha", mensagem + "Utilize o token: " + token, funcionario);
    }

    /**
     * método responsável por montar o corpo do
     * email que será enviado para o usuário
     * com o token para redefinição de senha.
     */
    private SimpleMailMessage constructEmail(String subject, String body, Funcionario funcionario) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(funcionario.getEmail());
        email.setFrom("suporte.mindsafe.teste@gmail.com");
        return email;
    }

    /**
     * Compara o token enviado pelo usuário,
     * valida se é igual um dos tokens associados
     * a ele, e se a data não expirou ainda
     */
    public ResponseEntity<Boolean> validarToken(String token, Long idFuncionario) {
        Calendar calendar = Calendar.getInstance();
        PasswordResetToken myToken = passwordResetTokenRepository.retornarToken(token, idFuncionario);
        if (myToken != null) {
            // Compara a data em que iria expirar o token
            // caso seja anterior a data, retorna um true.
            if (myToken.getDataExpira().after(calendar.getTime())) {
                // Remover após validar
                passwordResetTokenRepository.delete(myToken);
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.badRequest().body(false);
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Altera a senha do funcionario, passando o código dele
     * por parâmetro para o repository
     */
    public ResponseEntity<Boolean> alterarSenha(String novaSenha, Funcionario funcionario) {
        Funcionario funcionarioRetornado = funcionarioRepository.findOne(funcionario.getIdFuncionario());
        if (funcionarioRetornado != null) {
            funcionarioRetornado.setSenha(novaSenha);
            funcionarioRepository.save(funcionarioRetornado);
            if (!funcionario.getSenha().equals(novaSenha)) {
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
