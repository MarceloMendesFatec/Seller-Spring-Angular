package com.example.demo.Resources.Exceptions;

import java.time.Instant;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ResourceExceptionHandler {
    
    // Trata exceções do tipo MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationsError> validationException (MethodArgumentNotValidException exception, HttpServletRequest request) {

        // Cria um objeto ValidationsError para encapsular os detalhes do erro de validação
        ValidationsError error = new ValidationsError();
        
        // Define o status da resposta como UNPROCESSABLE_ENTITY (422 - Entidade Não Processável)
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

        // Define os detalhes do erro
        error.setError("Validation Error"); // Define a mensagem de erro
        error.setMessage(exception.getMessage()); // Define a mensagem de exceção original
        error.setPath(request.getRequestURI()); // Define o caminho da requisição
        error.setStatus(status.value()); // Define o código de status HTTP
        error.setTimeInstant(Instant.now()); // Define o instante do erro

        // Itera sobre todos os erros de campo encontrados na exceção
        exception.getBindingResult()
                 .getFieldErrors()
                 .forEach( e -> error.addError(e.getDefaultMessage()));

        // Retorna uma resposta com o status e o objeto ValidationsError contendo os detalhes do erro
        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<StandardError> entityNotFoundException(EntityNotFoundException exception, HttpServletRequest request){
        
        StandardError error = new StandardError();
        HttpStatus status = HttpStatus.NOT_FOUND;

        error.setError("Resource not found");
        error.setMessage(exception.getMessage());
        error.setPath(request.getRequestURI());
        error.setStatus(status.value());
        error.setTimeInstant(Instant.now());
         
        return ResponseEntity.status(status).body(error);
    }
}

