package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(name="funcionario")
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_funcionario")
	private Long idFuncionario;
	
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

	@Column(name="funcao")
	@Enumerated(EnumType.STRING)
	private FuncionarioFuncaoEnum funcao;

	public Long getIdAgente() {
		return idFuncionario;
	}

	public void setIdAgente(Long idFuncionario) {
		this.idFuncionario = idFuncionario;
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

	public FuncionarioFuncaoEnum getFuncao() {
		return funcao;
	}

	public void setFuncao(FuncionarioFuncaoEnum funcao) {
		this.funcao = funcao;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Funcionario that = (Funcionario) o;
		return Objects.equals(idFuncionario, that.idFuncionario);
	}

	@Override
	public int hashCode() {
		return Objects.hash(idFuncionario);
	}
}
