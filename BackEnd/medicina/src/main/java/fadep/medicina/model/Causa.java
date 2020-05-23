package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "nome", name = "causa"))
public class Causa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_causa")
	private Long idCausa;

	@NotNull
	@Size(min = 5, max = 250)
	@Column(name="nome")
	private String nome;

	@NotNull
	@Column(name = "risco")
	private Integer risco;

	public Long getIdCausa() {
		return idCausa;
	}

	public void setIdCausa(Long idCausa) {
		this.idCausa = idCausa;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public Integer getRisco() {
		return risco;
	}
	
	public void setRisco(Integer risco) {
		this.risco = risco;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idCausa == null) ? 0 : idCausa.hashCode());
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
		Causa other = (Causa) obj;
		if (idCausa == null) {
			if (other.idCausa != null)
				return false;
		} else if (!idCausa.equals(other.idCausa))
			return false;
		return true;
	}

}
