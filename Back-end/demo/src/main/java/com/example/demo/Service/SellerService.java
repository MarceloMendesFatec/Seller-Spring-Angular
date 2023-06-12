package com.example.demo.Service;

import java.util.List;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DAO.SellerDAO;
import com.example.demo.DAO.SellerSaveDAO;
import com.example.demo.Model.Seller;
import com.example.demo.Repositories.SellerRepository;

@Service
public class SellerService {
    private SellerRepository sellerRepository;

    // Construtor da classe SellerService, injetando o SellerRepository via
    // autowiring
    @Autowired
    private SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    // Retorna uma lista de todos os vendedores
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    // Retorna um vendedor com base no ID, lançando uma exceção caso não seja
    // encontrado
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado"));
    }

    // Salva um novo vendedor no banco de dados, retornando um objeto SellerDAO
    public SellerDAO save(SellerSaveDAO SellerSaveDAO) {
        Seller newSeller = sellerRepository.save(SellerSaveDAO.toEntity());
        return newSeller.toDAO();
    }

    // Deleta um vendedor com base no ID
    public void deleteSeller(Long id) {
        try {
            sellerRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado", e);
        }
    }

    // Atualiza um vendedor com base no ID e nos dados fornecidos em SellerSaveDAO
    public void updateSeller(long id, SellerSaveDAO sellerSaveDAO) {

        try {
            Seller sellerEntity = sellerRepository.getReferenceById(id);
            Seller updatedSeller = sellerSaveDAO.toEntity();

            // Atualiza os atributos do vendedor existente com os dados fornecidos
            sellerEntity.setName(updatedSeller.getName());
            sellerEntity.setSalary(updatedSeller.getSalary());
            sellerEntity.setBonus(updatedSeller.getBonus());
            sellerEntity.setGender(updatedSeller.getGender());

            // Salva as alterações no banco de dados
            sellerRepository.save(sellerEntity);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado ");
        }

    }
}
