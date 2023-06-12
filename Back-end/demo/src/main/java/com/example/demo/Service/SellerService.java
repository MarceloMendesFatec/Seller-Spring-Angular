package com.example.demo.Service;

import java.util.List;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado"));
    }

    public SellerDAO save(SellerSaveDAO SellerSaveDAO) {
        Seller newSeller = sellerRepository.save(SellerSaveDAO.toEntity());
        return newSeller.toDAO();
    }

    public void deleteSeller(Long id) {
        sellerRepository.deleteById(id);
    }

    public void updateSeller(long id, SellerSaveDAO sellerSaveDAO) {
        Seller sellerEntity = getSellerById(id);
        Seller updatedSeller = sellerSaveDAO.toEntity();


        sellerEntity.setName(updatedSeller.getName());
        sellerEntity.setSalary(updatedSeller.getSalary());
        sellerEntity.setBonus(updatedSeller.getBonus());
        sellerEntity.setGender(updatedSeller.getGender());

        sellerRepository.save(sellerEntity);
    }

}
