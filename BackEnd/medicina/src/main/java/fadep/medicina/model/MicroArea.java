package fadep.medicina.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="micro_area")
public class MicroArea {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_microarea")
	private Long idMicroArea;
	
	@ManyToOne
	@JoinColumn(name="id_bairro")
	private Bairro bairro;
	
	@Column(name="ubs")
	private String ubs;

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

	public String getUbs() {
		return ubs;
	}

	public void setUbs(String ubs) {
		this.ubs = ubs;
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
