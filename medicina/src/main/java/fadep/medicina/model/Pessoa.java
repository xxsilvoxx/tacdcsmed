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

@Entity
@Table(name = "pessoa")
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codPessoa")
	private Long codPessoa;
	
	@ManyToOne
	@JoinColumn(name = "codFamilia")
	private Long codFamilia;
	
	
	@Column(name="nome")
	private String nome;
	
	@Column(name="responsavel_familiar")
	private Boolean responsavel_familiar;
	
	@Column(name="cpf_cnpj")
	private String cpf_cnpj;
	
	@Column(name="data_nascimento")
	private Date data_nascimento;
	
	@Column(name="sexo")
	private String sexo;
	
	@Column(name="nacionalidade")
	private String nacionalidade;
	
	@Column(name="telefone")
	private String telefone;
	
	@Column(name="celular")
	private String celular;
	
	@Column(name="email")
	private String email;

	public Long getCodPessoa() {
		return codPessoa;
	}

	public void setCodPessoa(Long codPessoa) {
		this.codPessoa = codPessoa;
	}

	public Long getCodFamilia() {
		return codFamilia;
	}

	public void setCodFamilia(Long codFamilia) {
		this.codFamilia = codFamilia;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Boolean getResponsavel_familiar() {
		return responsavel_familiar;
	}

	public void setResponsavel_familiar(Boolean responsavel_familiar) {
		this.responsavel_familiar = responsavel_familiar;
	}

	public String getCpf_cnpj() {
		return cpf_cnpj;
	}

	public void setCpf_cnpj(String cpf_cnpj) {
		this.cpf_cnpj = cpf_cnpj;
	}

	public Date getData_nascimento() {
		return data_nascimento;
	}

	public void setData_nascimento(Date data_nascimento) {
		this.data_nascimento = data_nascimento;
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
		result = prime * result + ((codPessoa == null) ? 0 : codPessoa.hashCode());
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
		if (codPessoa == null) {
			if (other.codPessoa != null)
				return false;
		} else if (!codPessoa.equals(other.codPessoa))
			return false;
		return true;
	} 

	
}
