package com.senac.aula012026.aula012026.infra.handler;

import com.senac.aula012026.aula012026.infra.ex.AcessoInvalidoException;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<ErroResponse> handleRegraNegocio(RegraNegocioException ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(new ErroResponse(ex.getMessage()));
    }

    @ExceptionHandler(AcessoInvalidoException.class)
    public ResponseEntity<ErroResponse> handleAcessoInvalido(AcessoInvalidoException ex) {
        System.out.println(Arrays.toString(ex.getStackTrace()));
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ErroResponse(ex.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErroResponse> handleNotFound(EntityNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErroResponse(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponse> handleValidation(MethodArgumentNotValidException ex) {
        System.out.println(Arrays.toString(ex.getStackTrace()));
        String mensagem = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErroResponse(mensagem));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> handleGenerico(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErroResponse("Erro interno no servidor."));
    }

    public record ErroResponse(String mensagem) {}
}
