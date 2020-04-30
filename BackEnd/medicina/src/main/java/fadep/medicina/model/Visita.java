package fadep.medicina.model;

import java.sql.Timestamp;

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
@Table(name = "visita")
public class Visita {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_visita")
	private Long idVisita;

	@NotNull
	@ManyToOne
	@JoinColumn(name="id_pessoa")
	private Pessoa pessoa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_funcionario")
	private Funcionario funcionario;

	@NotNull
	@Column(name = "data_visita")
	private Timestamp dataVisita;
	
	@Column(name = "anotacoes")
	private String anotacoes;
	
	@Column(name = "comparecer_ubs")
	private Boolean comparecerUbs;
	
	@Column(name = "data_comparecimento")
	private Timestamp dataCompare;
	
	@Column(name = "descricao_comparecimento")
	private String desCompare;

	@Column(name = "proxima_visita")
	private Timestamp proximaVisita;

	@Column(name = "status")
	private String status;

	public Long getIdVisita() {
		return idVisita;
	}

	public void setIdVisita(Long idVisita) {
		this.idVisita = idVisita;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public Timestamp getDataVisita() {
		return dataVisita;
	}

	public void setDataVisita(Timestamp dataVisita) {
		this.dataVisita = dataVisita;
	}

	public String getAnotacoes() {
		return anotacoes;
	}

	public void setAnotacoes(String anotacoes) {
		this.anotacoes = anotacoes;
	}

	public Boolean getComparecerUbs() {
		return comparecerUbs;
	}

	public void setComparecerUbs(Boolean comparecerUbs) {
		this.comparecerUbs = comparecerUbs;
	}

	public Timestamp getDataCompare() {
		return dataCompare;
	}

	public void setDataCompare(Timestamp dataCompare) {
		this.dataCompare = dataCompare;
	}

	public String getDesCompare() {
		return desCompare;
	}

	public void setDesCompare(String desCompare) {
		this.desCompare = desCompare;
	}

	public Timestamp getProximaVisita() {
		return proximaVisita;
	}

	public void setProximaVisita(Timestamp proximaVisita) {
		this.proximaVisita = proximaVisita;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idVisita == null) ? 0 : idVisita.hashCode());
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
		Visita other = (Visita) obj;
		if (idVisita == null) {
			if (other.idVisita != null)
				return false;
		} else if (!idVisita.equals(other.idVisita))
			return false;
		return true;
	}

}
