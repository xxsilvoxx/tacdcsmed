package fadep.medicina.service;

import fadep.medicina.model.Funcionario;
import fadep.medicina.model.Imagem;
import fadep.medicina.repository.FuncionarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public ResponseEntity<Funcionario> atualizar(Funcionario funcionario, Long codigo) {
        Funcionario funcionarioSalvo = buscarPorCodigo(codigo);
        if (funcionarioSalvo != null) {
            BeanUtils.copyProperties(funcionario, funcionarioSalvo, "idFuncionario");
            funcionarioRepository.save(funcionarioSalvo);
            return ResponseEntity.ok(funcionarioSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Funcionario> remover(Long codigo) {
        Funcionario funcionarioSalvo = buscarPorCodigo(codigo);
        if (funcionarioSalvo != null) {
            funcionarioRepository.delete(funcionarioSalvo);
            funcionarioSalvo = buscarPorCodigo(codigo);
            if (funcionarioSalvo == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Funcionario buscarPorCodigo(Long codigo) {
    	Funcionario funcionario = funcionarioRepository.findOne(codigo);
            return (funcionario != null) ? (funcionario) : (null);
    }

    public ResponseEntity<Boolean> verificarDisponibilidadeLogin(String loginDigitado) {
        Integer registros = funcionarioRepository.loginDisponivel(loginDigitado);
        return (registros > 0) ? (ResponseEntity.ok(false)) : (ResponseEntity.ok(true));
    }

    public ResponseEntity<Boolean> verificarDisponibilidadeEmail(String emailDigitado) {
        Integer registros = funcionarioRepository.emailDisponivel(emailDigitado);
        return (registros > 0) ? (ResponseEntity.ok(false)) : (ResponseEntity.ok(true));
    }

    public ResponseEntity<Boolean> verificarDisponibilidadeMicroArea(Long idMicroArea) {
        Integer registros = funcionarioRepository.microAreaDisponivel(idMicroArea);
        return (registros > 0) ? (ResponseEntity.ok(false)) : (ResponseEntity.ok(true));
    }

    public int removerImagem(Long codFuncionario) {
        return funcionarioRepository.removerImagem(codFuncionario);
    }

    public int adicionarImagem(Imagem img, Long codFuncionario) {
        return funcionarioRepository.adicionarImagemAoUsuario(img.getIdImagem(), codFuncionario);
    }

}
