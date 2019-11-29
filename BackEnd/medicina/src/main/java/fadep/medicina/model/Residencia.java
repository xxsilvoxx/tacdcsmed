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
@Table(name = "residencia")
public class Residencia {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codResidencia")
	private Long codResidencia; 
	
	@ManyToOne
	@JoinColumn(name = "codFamilia")
	private Long  codFamilia;
	
	@ManyToOne
	@JoinColumn(name = "codMicroArea")
	private Long codMicroArea;
	
	@Column(name="logradouro")
	private String logradouro;
	
	@Column(name="nrLogradouro")
	private Integer nrLogradouro;
	
	@Column(name="bairro")
	private String bairro;
	
	@Column(name="cep")
	private String cep;
	
	@Column(name="localReferencia")
	private String localReferencia;
	
	@Column(name="cor")
	private String cor;
	
	@Column(name="complemento")
	private  String complemento;

	public Long getCodResidencia() {
		return codResidencia;
	}

	public void setCodResidencia(Long codResidencia) {
		this.codResidencia = codResidencia;
	}

	public Long getCodFamilia() {
		return codFamilia;
	}

	public void setCodFamilia(Long codFamilia) {
		this.codFamilia = codFamilia;
	}

	public Long getCodMicroArea() {
		return codMicroArea;
	}

	public void setCodMicroArea(Long codMicroArea) {
		this.codMicroArea = codMicroArea;
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
		result = prime * result + ((codResidencia == null) ? 0 : codResidencia.hashCode());
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
		if (codResidencia == null) {
			if (other.codResidencia != null)
				return false;
		} else if (!codResidencia.equals(other.codResidencia))
			return false;
		return true;
	}
	
	

}
