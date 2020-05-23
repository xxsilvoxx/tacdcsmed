package fadep.medicina.resource;

import fadep.medicina.model.Pessoa;
import fadep.medicina.repository.PessoaRepository;
import fadep.medicina.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {

    @Autowired
    public PessoaRepository pessoaRepository;

    @Autowired
    public PessoaService pessoaService;

    @GetMapping
    public List<Pessoa> listarTodas() {
        return pessoaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Pessoa> cadastrar(@Valid @RequestBody Pessoa pessoa, HttpServletResponse response) {
       Pessoa pessoaSalva = pessoaRepository.save(pessoa);
       return (pessoaSalva != null)
               ?(ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva))
               :(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Pessoa> alterar(@Valid @RequestBody Pessoa pessoa, @PathVariable("codigo") Long codigo) {
        return pessoaService.atualizar(pessoa, codigo);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Pessoa> remover(@PathVariable("codigo") Long codigo) {
        return pessoaService.remover(codigo);
    }

    @GetMapping("/familia/{codigo}/responsavel")
    public ResponseEntity<Pessoa> retornarResponsavel(@PathVariable("codigo") Long codFamilia) {
        return pessoaService.retornarResponsavelFamiliar(codFamilia);
    }

    @GetMapping("/visitas/pendentes")
    public List<Pessoa> retornarPacientesNaoVisitados() {
        return pessoaService.retornarPacientesNaoVisitadas();
    }

    @GetMapping("/validar")
    @ResponseBody
    public Boolean validarCpfCnpj(@RequestParam(name="cpfCnpj") String cpfCnpj) {
        return pessoaService.retornarValidadeCpfCnpj(cpfCnpj);
    }

    @GetMapping("/consultas")
    public List<Pessoa> retornarPacientesComConsulta() {
        Calendar calendar = Calendar.getInstance();
        Calendar umaSemana = Calendar.getInstance();
        umaSemana.add(umaSemana.DATE, 7);
        return pessoaRepository.retornarPacientesComConsultas(
                calendar.getTime(), umaSemana.getTime());
    }
    
    @GetMapping("/familia/{codigo}")
    public List<Pessoa> retornarMembrosFamilia(@PathVariable("codigo") Long idFamilia){
    	return pessoaRepository.retornarMembrosFamilia(idFamilia);	
    }
    

}
