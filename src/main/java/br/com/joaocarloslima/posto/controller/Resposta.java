package br.com.joaocarloslima.posto.controller;

public record Resposta(boolean atendido, String mensagem, ClienteView cliente) {
}
