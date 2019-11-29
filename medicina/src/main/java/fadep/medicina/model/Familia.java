package fadep.medicina.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "familia")
public class Familia {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codFamilia")
	private Long codFamilia;
	
	@Column(name="nome")
	private String nome;

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codFamilia == null) ? 0 : codFamilia.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
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
		Familia other = (Familia) obj;
		if (codFamilia == null) {
			if (other.codFamilia != null)
				return false;
		} else if (!codFamilia.equals(other.codFamilia))
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}
	
	

}
