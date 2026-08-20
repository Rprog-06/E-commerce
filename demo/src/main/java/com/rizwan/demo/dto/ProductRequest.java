package com.rizwan.demo.dto;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ProductRequest {
    @NotBlank(message = "Product name is mandatory")
    private String name;
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private double price;
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    // getters & setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}