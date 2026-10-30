package br.com.joaocarloslima.posto.model;

public abstract class Cliente {
    private Long id;
    private String nome;

    public Cliente(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public abstract String getIcone();

    public String getTipo() {
        return getClass().getSimpleName();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
