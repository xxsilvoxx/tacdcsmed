package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "nome", name = "funcao"))
public class Funcao {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_funcao")
	private Long idFuncao;
	
	@Column(name = "nome")
	@NotNull
	@Size(min = 3, max = 250)
	private String nome;

	public Long getIdFuncao() {
		return idFuncao;
	}

	public void setIdFuncao(Long idFuncao) {
		this.idFuncao = idFuncao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idFuncao == null) ? 0 : idFuncao.hashCode());
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
		Funcao other = (Funcao) obj;
		if (idFuncao == null) {
			if (other.idFuncao != null)
				return false;
		} else if (!idFuncao.equals(other.idFuncao))
			return false;
		return true;
	}
	
	
	
}
