package fadep.medicina.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "causa")
public class Causa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codCausa")
	private Long codCausa;
	
	@Column(name="nome")
	private String nome;

	public Long getCodCausa() {
		return codCausa;
	}

	public void setCodCausa(Long codCausa) {
		this.codCausa = codCausa;
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
		result = prime * result + ((codCausa == null) ? 0 : codCausa.hashCode());
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
		if (codCausa == null) {
			if (other.codCausa != null)
				return false;
		} else if (!codCausa.equals(other.codCausa))
			return false;
		return true;
	}
	
	

}
