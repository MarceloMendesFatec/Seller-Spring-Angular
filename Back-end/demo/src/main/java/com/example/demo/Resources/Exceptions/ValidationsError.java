package com.example.demo.Resources.Exceptions;

import java.util.ArrayList;
import java.util.List;

public class ValidationsError extends StandardError {
    
// Declaração do atributo privado errors, que é uma lista de strings.
    private List<String> errors = new ArrayList<>();

// Método para adicionar um erro à lista de erros.
    public void addError(String error) {
        this.errors.add(error);
    }
// Método para obter a lista de erros atual.
    public List<String> getErrors() {
        return errors;
    }

    

}
