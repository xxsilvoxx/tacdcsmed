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
@Table(name = "micro_area")
public class MicroArea {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codigo")
	private Long codigoMicroArea;
	
	@ManyToOne
	@JoinColumn(name = "codbairro")
	private Bairro codBbairro;
	
	@Column(name = "ubs")
	private String ubs;

	public Long getCodigoMicroArea() {
		return codigoMicroArea;
	}

	public void setCodigoMicroArea(Long codigoMicroArea) {
		this.codigoMicroArea = codigoMicroArea;
	}

	public Bairro getCodBbairro() {
		return codBbairro;
	}

	public void setCodBbairro(Bairro codBbairro) {
		this.codBbairro = codBbairro;
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
		result = prime * result + ((codigoMicroArea == null) ? 0 : codigoMicroArea.hashCode());
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
		if (codigoMicroArea == null) {
			if (other.codigoMicroArea != null)
				return false;
		} else if (!codigoMicroArea.equals(other.codigoMicroArea))
			return false;
		return true;
	}
}
