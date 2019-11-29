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
	@JoinColumn(name="id_microarea")
	private MicroArea microArea;
	
	@NotNull
	@Column(name="logradouro")
	private String logradouro;
	
	@NotNull
	@Column(name="nr_logradouro")
	private Integer nrLogradouro;
	
	@Column(name="bairro")
	private String bairro;
	
	@Size(min=9, max=9)
	@Column(name="cep")
	private String cep;
	
	@Column(name="local_referencia")
	private String localReferencia;
	
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

	public Integer getNrLogradouro() {
		return nrLogradouro;
	}

	public void setNrLogradouro(Integer nrLogradouro) {
		this.nrLogradouro = nrLogradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
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
