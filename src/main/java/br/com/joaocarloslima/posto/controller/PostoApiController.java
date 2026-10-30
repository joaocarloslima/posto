package br.com.joaocarloslima.posto.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.joaocarloslima.posto.model.Cliente;
import br.com.joaocarloslima.posto.model.Posto;

// a tela do jogo conversa com o Posto por aqui (não precisa mexer)
@RestController
@RequestMapping("/api")
public class PostoApiController {

    private Posto posto = new Posto();

    @GetMapping("/fila")
    public List<ClienteView> fila() {
        return posto.getFila().stream()
                .map(cliente -> ClienteView.de(cliente, posto))
                .toList();
    }

    @PostMapping("/abastecer/{id}")
    public Resposta abastecer(@PathVariable Long id) {
        String mensagem = posto.abastecer(id);
        Cliente cliente = posto.buscar(id);
        boolean atendido = posto.percentualTanque(cliente) != null;
        return new Resposta(atendido, mensagem, ClienteView.de(cliente, posto));
    }

    @PostMapping("/recarregar/{id}")
    public Resposta recarregar(@PathVariable Long id) {
        String mensagem = posto.recarregar(id);
        Cliente cliente = posto.buscar(id);
        boolean atendido = posto.percentualBateria(cliente) != null;
        return new Resposta(atendido, mensagem, ClienteView.de(cliente, posto));
    }

    @PostMapping("/reiniciar")
    public void reiniciar() {
        posto = new Posto();
    }
}
