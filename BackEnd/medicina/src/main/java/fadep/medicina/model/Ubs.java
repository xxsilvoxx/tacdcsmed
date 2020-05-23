package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "nome", name = "ubs"))
public class Ubs {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ubs")
	private Long idUbs;

	@NotNull
	@Size(min = 3, max = 250)
	@Column(name = "nome")
	private String nome;

	@Size(max = 150)
	@Column(name = "descricao")
	private String descricao;

	public Long getIdUbs() {
		return idUbs;
	}

	public void setIdUbs(Long idUbs) {
		this.idUbs = idUbs;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idUbs == null) ? 0 : idUbs.hashCode());
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
		Ubs other = (Ubs) obj;
		if (idUbs == null) {
			if (other.idUbs != null)
				return false;
		} else if (!idUbs.equals(other.idUbs))
			return false;
		return true;
	}
	
	

}
