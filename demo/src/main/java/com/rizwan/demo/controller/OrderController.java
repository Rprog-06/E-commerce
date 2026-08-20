package com.rizwan.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.rizwan.demo.dto.OrderResponse;
import org.springframework.security.core.Authentication;    

import com.rizwan.demo.entity.Order;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.rizwan.demo.entity.Users;
 import com.rizwan.demo.exception.ResourceNotFoundException; 
 import com.rizwan.demo.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import com.rizwan.demo.dto.PlaceOrderRequest;
import com.rizwan.demo.enums.OrderStatus;
import com.rizwan.demo.service.OrderService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(OrderService orderService,UserRepository userRepository) {
        // if(orderService == null) {
        //     throw new IllegalArgumentException("OrderService cannot be null");
        // }
        this.orderService = orderService;
        this.userRepository = userRepository;
       
        // System.out.println("OrderController initialized with OrderService:");
    }

    @PostMapping
    public ResponseEntity<String> placeOrder( Authentication authentication,
            @Valid @RequestBody PlaceOrderRequest request
    ) {
        String email = authentication.getName();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));    

    
        Long orderId =orderService.placeOrder(user.getId(),request);

       
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Order placed successfully with id: " + orderId);
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // UPDATE ORDER STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
          Order updatedOrder = orderService.updateOrderStatus(id, OrderStatus.valueOf(status.toString()));
          OrderResponse orderResponse = new OrderResponse();
            orderResponse.setOrderId(updatedOrder.getId());
            orderResponse.setStatus(updatedOrder.getStatus().name());
            orderResponse.setOrderDate(updatedOrder.getOrderDate());

        return ResponseEntity.ok(orderResponse);
    }
    @GetMapping("/my")
public ResponseEntity<List<OrderResponse>> getMyOrders(Authentication authentication) {

    String email = authentication.getName();

    List<OrderResponse> orders = orderService.getOrdersByEmail(email);

    return ResponseEntity.ok(orders);
}
}