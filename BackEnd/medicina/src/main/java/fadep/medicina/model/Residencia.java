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
import javax.validation.constraints.Size;

@Entity
@Table(name="residencia")
public class Residencia {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_residencia")
	private Long idResidencia; 
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_familia")
	private Familia familia;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_micro_area")
	private MicroArea microArea;

	@NotNull
	@Size(min = 8, max=9)
	@Column(name="cep")
	private String cep;
	
	@NotNull
	@Size(min = 3, max = 250)
	@Column(name="logradouro")
	private String logradouro;

	@Column(name="numero")
	private Integer numero;
	
	@Column(name="local_referencia")
	private String localReferencia;

	@Size(max = 250)
	@Column(name="cor")
	private String cor;
	
	@Column(name="complemento")
	private  String complemento;

	public Long getIdResidencia() {
		return idResidencia;
	}

	public void setIdResidencia(Long idResidencia) {
		this.idResidencia = idResidencia;
	}

	public Familia getFamilia() {
		return familia;
	}

	public void setFamilia(Familia familia) {
		this.familia = familia;
	}

	public MicroArea getMicroArea() {
		return microArea;
	}

	public void setMicroArea(MicroArea microArea) {
		this.microArea = microArea;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	public String getLocalReferencia() {
		return localReferencia;
	}

	public void setLocalReferencia(String localReferencia) {
		this.localReferencia = localReferencia;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idResidencia == null) ? 0 : idResidencia.hashCode());
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
		Residencia other = (Residencia) obj;
		if (idResidencia == null) {
			if (other.idResidencia != null)
				return false;
		} else if (!idResidencia.equals(other.idResidencia))
			return false;
		return true;
	}

}
