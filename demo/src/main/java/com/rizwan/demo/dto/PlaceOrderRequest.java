package com.rizwan.demo.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class PlaceOrderRequest {

   

    @NotEmpty
    @Valid
    private List<OrderItemRequest> items;

    // getters & setters
    
    public List<OrderItemRequest> getItems() {
        return items;
    }
    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
    
}