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

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) {
        return ResponseEntity.ok(sellerService.getSellerById(id));
    }

    @PostMapping
    public ResponseEntity<SellerDAO> createSeller(@Validated @RequestBody SellerSaveDAO sellerSaveDAO) {
        SellerDAO newSeller = sellerService.save(sellerSaveDAO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newSeller.getId())
                .toUri();

        return ResponseEntity.created(location).body(newSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

     @PutMapping("{id}")    
    public ResponseEntity<Void> updateSeller(@PathVariable long id,  @Validated @RequestBody SellerSaveDAO sellerSaveDAO) {
        sellerService.updateSeller(id, sellerSaveDAO);
        return ResponseEntity.ok().build(); 
    }
}
