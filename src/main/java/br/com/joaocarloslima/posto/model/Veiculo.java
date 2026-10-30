package br.com.joaocarloslima.posto.model;

public abstract class Veiculo extends Cliente {
    private int rodas;

    public Veiculo(Long id, String nome, int rodas) {
        super(id, nome);
        this.rodas = rodas;
    }

    public int getRodas() {
        return rodas;
    }
}
