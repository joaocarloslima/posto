package br.com.joaocarloslima.posto.model;

public class CarroEletrico extends Veiculo {
    private double capacidadeBateria; // em kWh
    private double bateria;

    public CarroEletrico(Long id, String nome, double capacidadeBateria, double bateria) {
        super(id, nome, 4);
        this.capacidadeBateria = capacidadeBateria;
        this.bateria = bateria;
    }

    @Override
    public String getIcone() {
        return "🚙";
    }
}
