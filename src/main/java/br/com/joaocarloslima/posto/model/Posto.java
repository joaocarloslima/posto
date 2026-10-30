package br.com.joaocarloslima.posto.model;

import java.util.ArrayList;
import java.util.List;

public class Posto {
    private List<Cliente> fila = new ArrayList<>();

    public Posto() {
        fila.add(new Carro(1L, "Gol 1.0", 50, 10));
        fila.add(new Bicicleta(2L, "Caloi Elite"));
        fila.add(new CarroEletrico(3L, "BYD Dolphin", 60, 15));
        fila.add(new Moto(4L, "Honda CG 160", 14, 3));
        fila.add(new Gerador(5L, "Gerador Toyama", 3000, 15, 2));
        fila.add(new CarroHibrido(6L, "Corolla Hybrid", 43, 8, 1.3, 0.2));
        fila.add(new PatineteEletrico(7L, "Patinete Xiaomi", 0.5, 0.1));
        fila.add(new CortadorDeGrama(8L, "Cortador Tramontina", 1500, 1.0, 0.1));
    }

    // TODO: abastecer o cliente, se ele tiver tanque
    public String abastecer(Long id) {
        Cliente cliente = buscar(id);
        return "Ainda não sei abastecer " + cliente.getNome();
    }

    // TODO: recarregar o cliente, se ele tiver bateria
    public String recarregar(Long id) {
        Cliente cliente = buscar(id);
        return "Ainda não sei recarregar " + cliente.getNome();
    }

    // TODO: percentual do tanque para a barra da tela (null = não tem tanque)
    public Integer percentualTanque(Cliente cliente) {
        return null;
    }

    // TODO: percentual da bateria para a barra da tela (null = não tem bateria)
    public Integer percentualBateria(Cliente cliente) {
        return null;
    }

    public List<Cliente> getFila() {
        return fila;
    }

    public Cliente buscar(Long id) {
        for (Cliente cliente : fila) {
            if (cliente.getId().equals(id)) {
                return cliente;
            }
        }
        throw new IllegalArgumentException("Cliente não encontrado: " + id);
    }
}
