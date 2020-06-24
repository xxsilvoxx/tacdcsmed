package fadep.medicina.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import fadep.medicina.model.StatusVisita;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fadep.medicina.model.Visita;
import fadep.medicina.repository.VisitaRepository;

@Service
public class VisitaService {

	@Autowired
	private VisitaRepository visitaRepository;

	public ResponseEntity<Visita> atualizar(Visita visita, Long codigo) {
		Visita visitaSalvo = buscarPorCodigo(codigo);
		if (visitaSalvo != null) {
			BeanUtils.copyProperties(visita, visitaSalvo, "idvisita");
			visitaRepository.save(visitaSalvo);
			return ResponseEntity.ok(visitaSalvo);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<Visita> adicionarVisita(Visita visita) {
		if (visita.getProximaVisita() != null) {
			visita.setStatus(StatusVisita.CONCLUIDA);
			visita.getProximaVisita().setStatus(StatusVisita.PENDENTE);
		} else {
			visita.setStatus(StatusVisita.PENDENTE);
		}
		Visita visitaSalva = visitaRepository.save(visita);
		return (visitaSalva != null)
				? ResponseEntity.status(HttpStatus.CREATED).body(visitaSalva)
				: ResponseEntity.badRequest().build();
	}

	public ResponseEntity<Visita> remover(Long codigo) {
		Visita visitaSalva = buscarPorCodigo(codigo);
		if (visitaSalva != null) {
			visitaRepository.delete(visitaSalva);
			visitaSalva = buscarPorCodigo(codigo);
			if (visitaSalva == null) {
				return ResponseEntity.noContent().build();
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public Visita buscarPorCodigo(Long codigo) {
		Visita visita = visitaRepository.findOne(codigo);
		if (visita != null) {
			return visita;
		}
		return null;

	}

	/**
	 * Método responsável por atualizar o status das visitas
	 * Sempre que for chamado o findAll de visitas, ele executa antes a atualização
	 * das viistas que já estão trasadas.
	 */
	public List<Visita> atualizarStatusVisitas(Long idMicroArea) {
		List<Visita> todas = visitaRepository.retornarVisitasPorMicroarea(idMicroArea);
		List<Visita> retornoValidado = new ArrayList<Visita>();
		for (Visita visita: todas) {
			Date hoje = Calendar.getInstance().getTime();
			if (hoje.after(visita.getDataVisita()) && !visita.getStatus().equals(StatusVisita.CONCLUIDA)) {
				if (visita.getStatus().equals(StatusVisita.PENDENTE)) {
					visita.setStatus(StatusVisita.ATRASADA);
					visitaRepository.save(visita);
				}
			}
			retornoValidado.add(visita);
		}
		return retornoValidado;
	}

	public List<Visita> listarAgendamentos(Long codPaciente) {
		List<Visita> visitasValid = new ArrayList<Visita>();
		List<Visita> visitas = visitaRepository.listarAgendamentos(codPaciente);
		for (int i = 0; i < visitas.size(); i++) {
			Visita visita = visitas.get(i);
			visita.setFuncionario(null);
			visita.setPessoa(null);
			visitasValid.add(visita);
		}
		return visitasValid;
	}

}
