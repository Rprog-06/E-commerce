package com.rizwan.demo.controller;

import java.util.List;
import com.rizwan.demo.dto.ProductRequest;
import org.springframework.web.bind.annotation.*;

import com.rizwan.demo.entity.Product;
import com.rizwan.demo.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @PreAuthorize("hasRole('ADMIN')")  
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        Product product = productService.createProduct(request);
        return ResponseEntity.ok(product);
    }
    
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.ok("Deleted");
}
@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}/stock")
public ResponseEntity<?> increaseStock(@PathVariable  Long id, @RequestBody ProductRequest request) {
    productService.increaseStock(id, request.getQuantity());
    return ResponseEntity.ok("Stock increased");
}

}

