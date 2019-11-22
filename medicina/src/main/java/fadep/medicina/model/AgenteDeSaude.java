package fadep.medicina.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "agente_de_saude")
public class AgenteDeSaude {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "codagente")
	private Long codAgente;
	
	@ManyToOne
	@JoinColumn(name = "codmicroarea")
	private MicroArea codMicroArea;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "login")
	private String login;
	
	@Column(name = "senha")
	private String senha;
	
	@Column(name = "codequipe")
	private Long codEquipe;

	public Long getCodAgente() {
		return codAgente;
	}

	public void setCodAgente(Long codAgente) {
		this.codAgente = codAgente;
	}

	public MicroArea getCodMicroArea() {
		return codMicroArea;
	}

	public void setCodMicroArea(MicroArea codMicroArea) {
		this.codMicroArea = codMicroArea;
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
		result = prime * result + ((codAgente == null) ? 0 : codAgente.hashCode());
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
		if (codAgente == null) {
			if (other.codAgente != null)
				return false;
		} else if (!codAgente.equals(other.codAgente))
			return false;
		return true;
	}
}
