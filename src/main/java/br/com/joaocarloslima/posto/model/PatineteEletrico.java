package br.com.joaocarloslima.posto.model;

public class PatineteEletrico extends Veiculo {
    private double capacidadeBateria; // em kWh
    private double bateria;

    public PatineteEletrico(Long id, String nome, double capacidadeBateria, double bateria) {
        super(id, nome, 2);
        this.capacidadeBateria = capacidadeBateria;
        this.bateria = bateria;
    }

    @Override
    public String getIcone() {
        return "🛴";
    }
}
