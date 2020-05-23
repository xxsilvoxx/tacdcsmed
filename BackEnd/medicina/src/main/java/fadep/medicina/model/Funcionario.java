package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"login", "email"}, name="funcionario"))
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_funcionario")
	private Long idFuncionario;

	@NotNull
	@ManyToOne
	@JoinColumn(name="id_micro_area")
	private MicroArea microArea;

	@ManyToOne
	@JoinColumn(name="id_imagem")
	private Imagem imagem;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_ubs")
	private Ubs ubs;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_funcao")
	private Funcao funcao;

	@NotNull
	@Size(min=10, max=100)
	@Column(name="email")
	private String email;

	@Size(min = 3, max = 250)
	@NotNull
	@Column(name="nome")
	private String nome;
	
	@Size(max=50)
	@NotNull
	@Column(name="login")
	private String login;

	@Size(max = 10)
	@NotNull
	@Column(name="senha")
	private String senha;
	
	@Column(name="cod_equipe")
	private Long codEquipe;

	public Long getIdFuncionario() {
		return idFuncionario;
	}

	public void setIdFuncionario(Long idFuncionario) {
		this.idFuncionario = idFuncionario;
	}

	public MicroArea getMicroArea() {
		return microArea;
	}

	public void setMicroArea(MicroArea microArea) {
		this.microArea = microArea;
	}

	public Imagem getImagem() {
		return imagem;
	}

	public void setImagem(Imagem imagem) {
		this.imagem = imagem;
	}

	public Ubs getUbs() {
		return ubs;
	}

	public void setUbs(Ubs ubs) {
		this.ubs = ubs;
	}
	
	public Funcao getFuncao() {
		return funcao;
	}

	public void setFuncao(Funcao funcao) {
		this.funcao = funcao;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Funcionario)) return false;
		Funcionario that = (Funcionario) o;
		return getIdFuncionario().equals(that.getIdFuncionario());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getIdFuncionario());
	}
}
