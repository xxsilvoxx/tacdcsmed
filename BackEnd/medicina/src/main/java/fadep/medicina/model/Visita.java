package fadep.medicina.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.*;
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

	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	@NotNull
	@Column(name = "data_visita")
	private Date dataVisita;
	
	@Column(name = "anotacoes")
	private String anotacoes;
	
	@Column(name = "comparecer_ubs")
	private Boolean comparecerUbs;

	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
	@Column(name = "data_comparecimento")
	private Date dataCompare;
	
	@Column(name = "descricao_comparecimento")
	private String desCompare;

	@ManyToOne
	@JoinColumn(name = "cod_proxima_visita")
	private Visita proximaVisita;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusVisita status;

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

	public Date getDataVisita() {
		return dataVisita;
	}

	public void setDataVisita(Date dataVisita) {
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

	public Date getDataCompare() {
		return dataCompare;
	}

	public void setDataCompare(Date dataCompare) {
		this.dataCompare = dataCompare;
	}

	public String getDesCompare() {
		return desCompare;
	}

	public void setDesCompare(String desCompare) {
		this.desCompare = desCompare;
	}

	public Visita getProximaVisita() {
		return proximaVisita;
	}

	public void setProximaVisita(Visita proximaVisita) {
		this.proximaVisita = proximaVisita;
	}

	public StatusVisita getStatus() {
		return status;
	}

	public void setStatus(StatusVisita status) {
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
