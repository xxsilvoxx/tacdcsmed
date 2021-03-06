package fadep.medicina.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.MedicamentoPessoa;
import fadep.medicina.repository.MedicamentoPessoaRepository;

@Service
public class MedicamentoPessoaService {

  	@Autowired
	private MedicamentoPessoaRepository medicamentoPessoaRepository;

	public ResponseEntity<MedicamentoPessoa> atualizar(MedicamentoPessoa medicamentoPessoa, Long codigo) {
		MedicamentoPessoa medicamentoPessoaSalvo = buscarPorCodigo(codigo);
		if (medicamentoPessoaSalvo != null) {
			if (medicamentoPessoa.getHorarios() != medicamentoPessoaSalvo.getHorarios()) {
				medicamentoPessoaSalvo.setHorarios(medicamentoPessoa.getHorarios());
			}
			BeanUtils.copyProperties(medicamentoPessoa, medicamentoPessoaSalvo, "idMedPessoa");
			medicamentoPessoaRepository.save(medicamentoPessoaSalvo);
			return ResponseEntity.ok(medicamentoPessoaSalvo);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<MedicamentoPessoa> remover(Long codigo) {
		MedicamentoPessoa medicamentoPessoaSalvo = buscarPorCodigo(codigo);
		if (medicamentoPessoaSalvo != null) {
			medicamentoPessoaRepository.delete(medicamentoPessoaSalvo);
			medicamentoPessoaSalvo = buscarPorCodigo(codigo);
			if (medicamentoPessoaSalvo == null) {
				return ResponseEntity.noContent().build();
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public MedicamentoPessoa buscarPorCodigo(Long codigo) {
		MedicamentoPessoa medicamentoPessoa = medicamentoPessoaRepository.findOne(codigo);
		return (medicamentoPessoa != null) ? (medicamentoPessoa) : (null);
	}

}
