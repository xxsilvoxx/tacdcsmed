package fadep.medicina.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="causa")
public class Causa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_causa")
	private Long idCausa;
	
	@Column(name="nome")
	private String nome;

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
