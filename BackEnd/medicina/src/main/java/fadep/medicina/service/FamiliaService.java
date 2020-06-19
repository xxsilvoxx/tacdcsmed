package fadep.medicina.service;

import fadep.medicina.model.Familia;
import fadep.medicina.repository.FamiliaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class FamiliaService {

    @Autowired
    private FamiliaRepository familiaRepository;

    public ResponseEntity<Familia> atualizar(Familia familia, Long codigo) {
        Familia familiaSalva = buscarPorCodigo(codigo);
        if (familiaSalva != null) {
            BeanUtils.copyProperties(familia, familiaSalva, "idFamilia");
            familiaRepository.save(familiaSalva);
            return ResponseEntity.ok(familiaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Familia> remover(Long codigo) {
        Familia familiaSalva = buscarPorCodigo(codigo);
        if (familiaSalva != null) {
            familiaRepository.delete(familiaSalva);
            familiaSalva = buscarPorCodigo(codigo);
            if (familiaSalva == null) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public List<Familia> retornarFamiliasSemResidencia() {
        List<Familia> familiasSemResidencia = new ArrayList<Familia>();
        List<Familia> familias = familiaRepository.findAll();
        List<Familia> familiasComResidencia = familiaRepository.retornarFamiliasComResidencia();
        for (Familia familia: familias) {
            if (!(familiasComResidencia.contains(familia))) {
                if (!(familiasSemResidencia.contains(familia))) {
                    familiasSemResidencia.add(familia);
                }
            }
        }
        return  familiasSemResidencia;
    }

    public Boolean familiaDisponivel(String nomeFamilia) {
        Integer registros = familiaRepository.retornarFamiliaDisponivel(nomeFamilia);
        return registros == 0;
    }

    public Familia buscarPorCodigo(Long codigo) {
        return familiaRepository.findOne(codigo);
    }

}
