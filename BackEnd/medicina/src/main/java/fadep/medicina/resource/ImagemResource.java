package fadep.medicina.resource;

import fadep.medicina.model.Imagem;
import fadep.medicina.repository.ImagemRepository;
import fadep.medicina.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/imagens")
public class ImagemResource {

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private ImagemService imagemService;

    @PostMapping("funcionario/{codigo}")
    public ResponseEntity<Imagem> uploadImagem(@PathVariable("codigo") Long codFuncionario, @RequestParam MultipartFile imagem) {
        return imagemService.salvarImagem(imagem, codFuncionario);
    }

    @GetMapping(value="funcionario/{codigo}", produces=MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody ResponseEntity<byte[]> buscarImagem(@PathVariable("codigo") Long codFuncionario) {
        return imagemService.getImage(codFuncionario);
    }

    @DeleteMapping("funcionario/{codigo}")
    public ResponseEntity<Imagem> removerImagem(@PathVariable("codigo") Long codFuncionario) {
        return imagemService.removerImagem(codFuncionario);
    }
}
