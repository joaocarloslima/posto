package br.com.joaocarloslima.posto.model;

public class Bicicleta extends Veiculo {
    public Bicicleta(Long id, String nome) {
        super(id, nome, 2);
    }

    @Override
    public String getIcone() {
        return "🚲";
    }
}
