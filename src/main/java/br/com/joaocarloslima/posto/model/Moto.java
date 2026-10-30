package br.com.joaocarloslima.posto.model;

public class Moto extends Veiculo {
    private double capacidadeTanque; // em litros
    private double tanque;

    public Moto(Long id, String nome, double capacidadeTanque, double tanque) {
        super(id, nome, 2);
        this.capacidadeTanque = capacidadeTanque;
        this.tanque = tanque;
    }

    @Override
    public String getIcone() {
        return "🏍️";
    }
}
