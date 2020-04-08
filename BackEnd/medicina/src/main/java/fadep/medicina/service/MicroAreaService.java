package fadep.medicina.service;

import fadep.medicina.model.MicroArea;
import fadep.medicina.repository.MicroAreaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



@Service
public class MicroAreaService {

    @Autowired
    private MicroAreaRepository microAreaRepository;

    public ResponseEntity<MicroArea> atualizar(MicroArea microArea, Long codigo) {
        MicroArea microAreaSalva = buscarPorCodigo(codigo);
        if (microAreaSalva != null) {
            BeanUtils.copyProperties(microArea, microAreaSalva, "idMicroArea");
            microAreaRepository.save(microAreaSalva);
            return ResponseEntity.ok(microAreaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<MicroArea> remover(Long codigo) {
        MicroArea microAreaSalva = buscarPorCodigo(codigo);
        if (microAreaSalva != null) {
            microAreaRepository.delete(microAreaSalva);
            microAreaSalva = buscarPorCodigo(codigo);
            if (microAreaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Boolean> retornarMicroareaValida(int numero) {
        Integer registros = microAreaRepository.retornarMicroareaDisponivel(numero);
        return (registros > 0) ? (ResponseEntity.ok(false)) : (ResponseEntity.ok(true));
    }

    public MicroArea buscarPorCodigo(Long codigo) {
    	MicroArea microArea = microAreaRepository.findOne(codigo);
    	return (microArea != null) ? (microArea) : (null);
    }

}
