package fadep.medicina.listener;

import java.net.URI;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import fadep.medicina.event.RecursoCriadoListener;

@Component
public class RecursoCriadoEvent implements ApplicationListener<RecursoCriadoListener>{
	
	@Override
	public void onApplicationEvent(RecursoCriadoListener event) {
		HttpServletResponse response = event.getResponse();
		Long codigo = event.getCodigo();
		adicionarHeaderLocation(response,codigo);		
	}
	
	private void adicionarHeaderLocation(HttpServletResponse response, Long codigo) {
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}").buildAndExpand(codigo).toUri();
		
		response.setHeader("Location", uri.toASCIIString());
	}
}
