package fadep.medicina.passwordreset;

import com.fasterxml.jackson.annotation.JsonFormat;
import fadep.medicina.model.Funcionario;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

    public PasswordResetToken () {

    }

    public PasswordResetToken(String token, Funcionario funcionario) {
        this.token = token;
        this.funcionario = funcionario;
        this.dataExpira = calcularDataLimite();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = Funcionario.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "id_usuario")
    private Funcionario funcionario;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "data_expira")
    private Date dataExpira;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Date getDataExpira() {
        return dataExpira;
    }

    public void setDataExpira(Date dataExpira) {
        this.dataExpira = dataExpira;
    }

    private Date calcularDataLimite() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        // Seta a data com acréscimo de 1 dia.
        calendar.add(Calendar.DATE, 1);
        return calendar.getTime();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PasswordResetToken)) return false;
        PasswordResetToken that = (PasswordResetToken) o;
        return getId().equals(that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
