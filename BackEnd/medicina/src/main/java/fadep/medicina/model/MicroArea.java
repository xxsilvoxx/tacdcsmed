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
@Table(name="micro_area")
public class MicroArea {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_micro_area")
	private Long idMicroArea;

	@NotNull
	@ManyToOne
	@JoinColumn(name="id_bairro")
	private Bairro bairro;

	@NotNull
	private Integer numero;

	public Long getIdMicroArea() {
		return idMicroArea;
	}

	public void setIdMicroArea(Long idMicroArea) {
		this.idMicroArea = idMicroArea;
	}

	public Bairro getBairro() {
		return bairro;
	}

	public void setBairro(Bairro bairro) {
		this.bairro = bairro;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idMicroArea == null) ? 0 : idMicroArea.hashCode());
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
		MicroArea other = (MicroArea) obj;
		if (idMicroArea == null) {
			if (other.idMicroArea != null)
				return false;
		} else if (!idMicroArea.equals(other.idMicroArea))
			return false;
		return true;
	}

}
