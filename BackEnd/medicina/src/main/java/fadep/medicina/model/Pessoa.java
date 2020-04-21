package fadep.medicina.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="pessoa")
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_pessoa")
	private Long idPessoa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_familia")
	private Familia familia;
	
	@NotNull
	@Column(name="nome")
	private String nome;
	
	@Column(name="responsavel_familiar")
	private Boolean responsavelFamiliar;
	
	@NotNull
	@Size(min=14, max=18)
	@Column(name="cpf_cnpj")
	private String cpfCnpj;
	
	@NotNull
	@Column(name="data_nascimento")
	private Date dataNascimento;
	
	@NotNull
	@Size(min=1, max=1)
	@Column(name="sexo")
	private String sexo;
	
	@NotNull
	@Column(name="nacionalidade")
	private String nacionalidade;
	
	@Size(max=20)
	@Column(name="telefone")
	private String telefone;
	
	@Size(max=20)
	@Column(name="celular")
	private String celular;
	
	@Column(name="email")
	private String email;

	public Long getIdPessoa() {
		return idPessoa;
	}

	public void setIdPessoa(Long idPessoa) {
		this.idPessoa = idPessoa;
	}

	public Familia getFamilia() {
		return familia;
	}

	public void setFamilia(Familia familia) {
		this.familia = familia;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Boolean getResponsavelFamiliar() {
		return responsavelFamiliar;
	}

	public void setResponsavelFamiliar(Boolean responsavelFamiliar) {
		this.responsavelFamiliar = responsavelFamiliar;
	}

	public String getCpfCnpj() {
		return cpfCnpj;
	}

	public void setCpfCnpj(String cpfCnpj) {
		this.cpfCnpj = cpfCnpj;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idPessoa == null) ? 0 : idPessoa.hashCode());
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
		Pessoa other = (Pessoa) obj;
		if (idPessoa == null) {
			if (other.idPessoa != null)
				return false;
		} else if (!idPessoa.equals(other.idPessoa))
			return false;
		return true;
	}

//	public Pessoa get() {
//		// TODO Auto-generated method stub
//		return null;
//	}
	
}
