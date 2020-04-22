package fadep.medicina.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="causa_pessoa")
public class CausaPessoa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_causa_pessoa")
	private Long idCausaPessoa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_causa")
	private Causa causa;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_pessoa")
	private Pessoa pessoa;

	public Long getIdCausaPessoa() {
		return idCausaPessoa;
	}

	public void setIdCausaPessoa(Long idCausaPessoa) {
		this.idCausaPessoa = idCausaPessoa;
	}

	public Causa getCausa() {
		return causa;
	}

	public void setCausa(Causa causa) {
		this.causa = causa;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idCausaPessoa == null) ? 0 : idCausaPessoa.hashCode());
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
		CausaPessoa other = (CausaPessoa) obj;
		if (idCausaPessoa == null) {
			if (other.idCausaPessoa != null)
				return false;
		} else if (!idCausaPessoa.equals(other.idCausaPessoa))
			return false;
		return true;
	}

}
