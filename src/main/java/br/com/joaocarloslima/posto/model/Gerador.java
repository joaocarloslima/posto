package br.com.joaocarloslima.posto.model;

public class Gerador extends Maquina {
    private double capacidadeTanque; // em litros
    private double tanque;

    public Gerador(Long id, String nome, int potencia, double capacidadeTanque, double tanque) {
        super(id, nome, potencia);
        this.capacidadeTanque = capacidadeTanque;
        this.tanque = tanque;
    }

    @Override
    public String getIcone() {
        return "⚡";
    }
}
