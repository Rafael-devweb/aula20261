package com.senac.aula012026.aula012026.infra.ex;

public class AcessoInvalidoException extends RuntimeException {
    public AcessoInvalidoException(String message) {
        super(message);
    }
}
