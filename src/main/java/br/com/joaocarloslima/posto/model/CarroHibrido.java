package br.com.joaocarloslima.posto.model;

public class CarroHibrido extends Veiculo {
    private double capacidadeTanque; // em litros
    private double tanque;
    private double capacidadeBateria; // em kWh
    private double bateria;

    public CarroHibrido(Long id, String nome, double capacidadeTanque, double tanque, double capacidadeBateria, double bateria) {
        super(id, nome, 4);
        this.capacidadeTanque = capacidadeTanque;
        this.tanque = tanque;
        this.capacidadeBateria = capacidadeBateria;
        this.bateria = bateria;
    }

    @Override
    public String getIcone() {
        return "🚕";
    }
}
