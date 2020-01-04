package fadep.medicina.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="agente_de_saude")
public class AgenteDeSaude {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_agente_de_saude")
	private Long idAgente;
	
	@ManyToOne
	@JoinColumn(name="id_micro_area")
	private MicroArea microArea;
	
	@Column(name="nome")
	private String nome;
	
	@Size(max=50)
	@Column(name="login")
	private String login;
	
	@Column(name="senha")
	private String senha;
	
	@Column(name="cod_equipe")
	private Long codEquipe;

	public Long getIdAgente() {
		return idAgente;
	}

	public void setIdAgente(Long idAgente) {
		this.idAgente = idAgente;
	}

	public MicroArea getMicroArea() {
		return microArea;
	}

	public void setMicroArea(MicroArea microArea) {
		this.microArea = microArea;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Long getCodEquipe() {
		return codEquipe;
	}

	public void setCodEquipe(Long codEquipe) {
		this.codEquipe = codEquipe;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idAgente == null) ? 0 : idAgente.hashCode());
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
		AgenteDeSaude other = (AgenteDeSaude) obj;
		if (idAgente == null) {
			if (other.idAgente != null)
				return false;
		} else if (!idAgente.equals(other.idAgente))
			return false;
		return true;
	}

}
