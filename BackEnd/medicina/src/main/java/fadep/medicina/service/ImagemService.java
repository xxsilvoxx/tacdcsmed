package fadep.medicina.service;

import fadep.medicina.model.Funcionario;
import fadep.medicina.model.Imagem;
import fadep.medicina.repository.ImagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private FuncionarioService funcionarioService;

    // Variável que armazena o diretório raíz.
    private String diretorioRaiz = "C:/";
    // Variável que armazena o diretório que será criado para guardar as imagens.
    private String diretorioImagens = "safemind/uploads";

    /**
     * Método que recebe a imagem vinda do frontend
     */
    public ResponseEntity<Imagem> salvarImagem(MultipartFile imagem, Long codFuncionario) {
        Funcionario funcionario = funcionarioService.buscarPorCodigo(codFuncionario);
        if (funcionario != null) {
            Imagem imagemSalva = salvar(this.diretorioImagens, imagem, funcionario);
            if (imagemSalva != null) {
                int linhasModificadas = funcionarioService.adicionarImagem(imagemSalva, codFuncionario);
                if (linhasModificadas > 0) {
                    return ResponseEntity.status(HttpStatus.CREATED).body(imagemSalva);
                } else {
                    return ResponseEntity.badRequest().build();
                }
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return null;
    }

    public Imagem salvar(String diretorio, MultipartFile imagem, Funcionario funcionario) {
        // Array com os principais formatos de imagem.
        String[] tiposImg = {".png", ".jpg", ".jpeg", ".svg"};
        Imagem novaImagem = new Imagem();
        // Monta o diretório apartir da raiz.
        diretorio += "/" + funcionario.getNome() + "_imagens";
        Path diretorioPath = Paths.get(this.diretorioRaiz, diretorio);
        // Monta o diretório concatenando com o nome do arquivo que será salvo.
        Path arquivoPath = diretorioPath.resolve(imagem.getOriginalFilename());
        try {
            // Iteração para verificar se o tipo do arquivo passado é suportado
            // pelo array de tipos de imagem.
            for (String tipo: tiposImg) {
                if (imagem.getOriginalFilename().indexOf(tipo) >= 0) {
                    // Caso o usuário já possua uma imagem salva, ele remove a mesma.
                    Imagem imgSalva = buscarPorCodigoFuncioanrio(funcionario.getIdFuncionario());
                    if (imgSalva != null) {
                        removerImagem(funcionario.getIdFuncionario());
                    }
                    // Verifica se o diretório já está no Sistema Operacional
                    // Caso não esteja, ele cria o diretório.
                    Files.createDirectories(diretorioPath);
                    // Adiciona o arquivo no diretório.
                    imagem.transferTo(arquivoPath.toFile());
                    // Atribui para o objeto que é salvo no banco, o tipo do arquivo
                    // Caminho do arquivo e o tamanho dele.
                    novaImagem.setTipo(tipo);
                    novaImagem.setCaminho(arquivoPath.toString());
                    novaImagem.setTamanho(imagem.getSize());
                    return imagemRepository.save(novaImagem);
                }
            }
            return null;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar a imagem");
        }
    }

    /**
     * Método que retorna o arquivo jpg para o frontend
     */
    public ResponseEntity<byte[]> getImage(Long codigo) {
        Imagem imgSalva = buscarPorCodigoFuncioanrio(codigo);
        if (imgSalva != null) {
            try {
                // Busca o caminho da imagem com a informação salva no banco
                Path caminho = Paths.get(imgSalva.getCaminho());
                // Cria o arquivo do tipo vetor de byte
                byte[] img = Files.readAllBytes(caminho);
                // Se ele consegue fazer a conversão do path para a imagem,
                // ele envia a imagem para o cliente
                if (img != null) {
                    return ResponseEntity.ok(img);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (IOException e) {
                throw new RuntimeException("Erro ao retornar a imagem");
            }
        }
        return ResponseEntity.badRequest().build();
    }

    /**
     * Método que remove a imagem do usuário
     */
    public ResponseEntity<Imagem> removerImagem(Long codigo) {
        Imagem imgSalva = buscarPorCodigoFuncioanrio(codigo);
        if (imgSalva != null) {
            // Cria uma referência ao arquivo dentro do sistema
            File arquivo = new File(imgSalva.getCaminho());
            // Verifica se é um arquivo válido
            if (arquivo.isFile()) {
               // Remove o arquivo e armazena o resultado booleano dentro da variável
               boolean removido = arquivo.delete();
               if (removido) {
                   // Se o arquivo for removido, removo a relação da imagem com o usuário
                   int resultado = funcionarioService.removerImagem(codigo);
                   if (resultado > 0) {
                       // removo a imagem pelo código do banco de dados
                       imagemRepository.removerImagemPeloCodigo(imgSalva.getIdImagem());
                       // Verifico se foi mesmo removida
                       imgSalva = buscarPorCodigoFuncioanrio(codigo);
                       return (imgSalva == null)
                               ? (ResponseEntity.noContent().build())
                               : (ResponseEntity.badRequest().build());
                   }
               } else {
                   return ResponseEntity.badRequest().build();
               }
            }
        }
        return null;
    }

    public Imagem buscarPorCodigoFuncioanrio(Long codigo) {
        Imagem imgSalva = imagemRepository.buscarImagemDoUsuario(codigo);
        return (imgSalva != null) ? imgSalva : null;
    }
}
