package fadep.medicina.model;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(name="imagem")
public class Imagem {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id_imagem")
    private Long idImagem;

    @Column(name="caminho")
    private String caminho;

    @Size(max=250)
    @Column(name="tipo")
    private String tipo;

    @Column(name="tamanho")
    private Long tamanho;

    public Long getIdImagem() {
        return idImagem;
    }

    public void setIdImagem(Long idImagem) {
        this.idImagem = idImagem;
    }

    public String getCaminho() {
        return caminho;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getTamanho() {
        return tamanho;
    }

    public void setTamanho(Long tamanho) {
        this.tamanho = tamanho;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Imagem)) return false;
        Imagem imagem = (Imagem) o;
        return getIdImagem().equals(imagem.getIdImagem());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getIdImagem());
    }
}
