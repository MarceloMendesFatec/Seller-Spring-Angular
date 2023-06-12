package com.example.demo.Resources.Controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.DAO.SellerDAO;
import com.example.demo.DAO.SellerSaveDAO;
import com.example.demo.Model.Seller;
import com.example.demo.Service.SellerService;

@RestController
@CrossOrigin
@RequestMapping("/seller")
public class SellerController {

    private SellerService sellerService;

    @Autowired
    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    // Retorna todos os vendedores
    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    // Retorna um vendedor com base no ID
    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) {
        return ResponseEntity.ok(sellerService.getSellerById(id));
    }

    @PostMapping
    public ResponseEntity<SellerDAO> createSeller(@Validated @RequestBody SellerSaveDAO sellerSaveDAO) {
        SellerDAO newSeller = sellerService.save(sellerSaveDAO);

        // Cria a URI para o novo vendedor criado
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest() // Obtém a URI base da requisição atual ("/seller")
                .path("/{id}") // Acrescenta o caminho do ID do vendedor à URI base ("/seller/{id}")
                .buildAndExpand(newSeller.getId()) // Substitui o placeholder "{id}" com o ID do novo vendedor
                .toUri(); // Converte para um objeto URI completo

        // Retorna a resposta com o código de status 201 (Created), o corpo contendo o
        // novo vendedor e o cabeçalho "Location"
        return ResponseEntity.created(location).body(newSeller);
    }

    // Deleta um vendedor com base no ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

    // Atualiza um vendedor com base no ID e nos dados fornecidos
    @PutMapping("{id}")
    public ResponseEntity<Void> updateSeller(@PathVariable long id,
            @Validated @RequestBody SellerSaveDAO sellerSaveDAO) {
        sellerService.updateSeller(id, sellerSaveDAO);
        return ResponseEntity.ok().build();
    }
}
