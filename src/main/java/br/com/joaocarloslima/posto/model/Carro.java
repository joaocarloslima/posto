package br.com.joaocarloslima.posto.model;

public class Carro extends Veiculo {
    private double capacidadeTanque; // em litros
    private double tanque;

    public Carro(Long id, String nome, double capacidadeTanque, double tanque) {
        super(id, nome, 4);
        this.capacidadeTanque = capacidadeTanque;
        this.tanque = tanque;
    }

    @Override
    public String getIcone() {
        return "🚗";
    }
}
