package br.com.joaocarloslima.posto.model;

public abstract class Maquina extends Cliente {
    private int potencia; // em watts

    public Maquina(Long id, String nome, int potencia) {
        super(id, nome);
        this.potencia = potencia;
    }

    public int getPotencia() {
        return potencia;
    }
}
