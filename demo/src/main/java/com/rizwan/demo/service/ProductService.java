package com.rizwan.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.rizwan.demo.dto.ProductRequest;

import com.rizwan.demo.entity.Product;
import com.rizwan.demo.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findByDeletedFalse();
    }
    public void delete(Long id) {
        Product product=productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found")); 
        product.setDeleted(true); 
        // productRepository.save(product);
       
        
    }
    public void increaseStock(Long id, int quantity) {
        if(quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setQuantity(product.getQuantity() + quantity); // Increase stock by given quantity
         productRepository.save(product);

    }
}

