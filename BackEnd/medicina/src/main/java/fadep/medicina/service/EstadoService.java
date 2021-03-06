package fadep.medicina.service;

import fadep.medicina.model.Estado;
import fadep.medicina.repository.EstadoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public ResponseEntity<Estado> atualizar(Estado estado, Long codigo) {
        Estado estadoSalvo = buscarPorCodigo(codigo);
        if (estadoSalvo != null) {
            BeanUtils.copyProperties(estado, estadoSalvo, "idEstado");
            estadoRepository.save(estadoSalvo);
            return ResponseEntity.ok(estadoSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Estado> remover(Long codigo) {
        Estado estadoSalvo = buscarPorCodigo(codigo);
        if (estadoSalvo != null) {
            estadoRepository.delete(estadoSalvo);
            estadoSalvo = buscarPorCodigo(codigo);
            if (estadoSalvo == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Estado buscarPorCodigo(Long codigo) {
    	Estado estado = estadoRepository.findOne(codigo);
    	if (estado != null) {
            return estado;
        }
        return null;
    }

}
