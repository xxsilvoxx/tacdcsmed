package fadep.medicina.resource;

import fadep.medicina.model.Funcionario;
import fadep.medicina.service.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class PasswordResetTokenResource {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;


    @PostMapping("/reset/password")
    public ResponseEntity<Funcionario> resetPassword(HttpServletRequest request, @RequestParam("email") String userEmail, @RequestBody Funcionario funcionario) {
        return passwordResetTokenService.salvarTokenParaFuncionario(request, userEmail, funcionario);
    }

    @GetMapping("/{codigo}/validate")
    public ResponseEntity<Boolean> validarToken(@PathVariable("codigo") Long idFuncionario, @RequestParam("token") String token) {
        return passwordResetTokenService.validarToken(token, idFuncionario);
    }

    @PostMapping("/change")
    public ResponseEntity<Boolean> alterarSenha(@RequestParam("senha") String senha, @RequestBody Funcionario funcionario) {
        return passwordResetTokenService.alterarSenha(senha, funcionario);
    }
}
