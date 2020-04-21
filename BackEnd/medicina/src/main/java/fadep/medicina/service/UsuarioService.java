package fadep.medicina.service;


import fadep.medicina.model.Pessoa;
import fadep.medicina.model.Usuario;
import fadep.medicina.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
        Usuario usuarioSalvo = buscarPorCodigo(codigo);
        usuarioSalvo.setAtivo(ativo);
        usuarioRepository.save(usuarioSalvo);
    }

    public Usuario buscarPorCodigo(Long codigo) {
        return usuarioRepository.findOne(codigo);
    }
}
