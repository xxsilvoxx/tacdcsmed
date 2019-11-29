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
@Table(name = "causaPessoa")
public class CausaPessoa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "codCausaPessoa")
	private Long codCausaPessoa;
	
	@ManyToOne
	@JoinColumn(name = "codCausa")
	private Long codCausa;
	
	@ManyToOne
	@JoinColumn(name = "codPessoa")
	private Long codPessoa;
	
	

}
