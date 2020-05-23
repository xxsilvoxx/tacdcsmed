package fadep.medicina.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "medicamento_pessoa")
public class MedicamentoPessoa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_medicamento_pessoa")
	private Long idMedPessoa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_pessoa")
	private Pessoa pessoa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_medicamento")
	private Medicamento medicamento;

	@NotNull
	@Column(name = "horarios")
	private String horarios;

	public Long getIdMedPessoa() {
		return idMedPessoa;
	}

	public void setIdMedPessoa(Long idMedPessoa) {
		this.idMedPessoa = idMedPessoa;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Medicamento getMedicamento() {
		return medicamento;
	}

	public void setMedicamento(Medicamento medicamento) {
		this.medicamento = medicamento;
	}

	public String getHorarios() {
		return horarios;
	}

	public void setHorarios(String horarios) {
		this.horarios = horarios;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idMedPessoa == null) ? 0 : idMedPessoa.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MedicamentoPessoa other = (MedicamentoPessoa) obj;
		if (idMedPessoa == null) {
			if (other.idMedPessoa != null)
				return false;
		} else if (!idMedPessoa.equals(other.idMedPessoa))
			return false;
		return true;
	}
	
	

}
