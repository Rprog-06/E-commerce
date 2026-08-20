package com.rizwan.demo.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rizwan.demo.dto.PlaceOrderRequest;
import com.rizwan.demo.entity.Order;
import com.rizwan.demo.entity.OrderItem;
import com.rizwan.demo.entity.Product;
import com.rizwan.demo.entity.Users;
import com.rizwan.demo.enums.OrderStatus;
import com.rizwan.demo.exception.ResourceNotFoundException;
import com.rizwan.demo.repository.OrderRepository;
import com.rizwan.demo.repository.ProductRepository;
import com.rizwan.demo.repository.UserRepository;
import com.rizwan.demo.dto.OrderItemResponse;
import com.rizwan.demo.dto.OrderResponse;
import java.util.*;



@Service
public class OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public OrderService(
            UserRepository userRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository
    ) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Long placeOrder(Long userId,PlaceOrderRequest request) {

        // 1️⃣ Fetch User
        Users user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // 2️⃣ Create Order
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CREATED);
        order.setOrderDate(LocalDateTime.now());
        double totalPrice = 0.0;

        // 3️⃣ Create Order Items
        for (var itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Product not found"));
            if(product.getDeleted()) {
                throw new ResourceNotFoundException("Product not found");
            }
            if(product.getQuantity()<itemRequest.getQuantity()) {
                throw new ResourceNotFoundException("Not enough quantity for product: "+product.getName());
            }
            product.setQuantity(product.getQuantity()-itemRequest.getQuantity());


            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            totalPrice += product.getPrice()*itemRequest.getQuantity();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice());

            order.getOrderItems().add(orderItem);
        }
        order.setTotalPrice(totalPrice);
        

        // 4️⃣ Save Order (OrderItems saved automatically because of CASCADE)
        Order savedOrder = orderRepository.save(order);

        return savedOrder.getId();
    }
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("Order not found"));
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        response.setOrderDate(order.getOrderDate());
        response.setUserId(order.getUser().getId());
        response.setUserName(order.getUser().getName());
        response.setTotalPrice(order.getTotalPrice());
       List<OrderItemResponse> itemResponses = new ArrayList<>();
        for (OrderItem item : order.getOrderItems()) {
            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setPrice(item.getPrice());

            itemResponses.add(itemResponse);
        }
        response.setItems(itemResponses);
        return response;
                
        
    }
   @Transactional(readOnly = true)
    public Order getOrderEntityById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));
    }

    @Transactional
    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = getOrderEntityById(id); // ✅ FIX
        order.setStatus(status);
        return orderRepository.save(order);
    }
    @Transactional(readOnly = true)
public List<OrderResponse> getOrdersByUser(Long userId) {

   
    List<Order> orders = orderRepository.findByUserId(userId);

    List<OrderResponse> responses = new ArrayList<>();

    for (Order order : orders) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        response.setOrderDate(order.getOrderDate());
        response.setUserId(order.getUser().getId());
        response.setUserName(order.getUser().getName());

        List<OrderItemResponse> items = new ArrayList<>();
        for (OrderItem item : order.getOrderItems()) {
            OrderItemResponse ir = new OrderItemResponse();
            ir.setProductId(item.getProduct().getId());
            ir.setProductName(item.getProduct().getName());
            ir.setQuantity(item.getQuantity());
            ir.setPrice(item.getPrice());
            items.add(ir);
        }

        response.setItems(items);
        responses.add(response);
    }

    return responses;
}
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByEmail(String email) {
        List<Order> orders = orderRepository.findByUserEmail(email);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {
            OrderResponse response = new OrderResponse();
            response.setOrderId(order.getId());
            response.setStatus(order.getStatus().name());
            response.setOrderDate(order.getOrderDate());
            response.setUserId(order.getUser().getId());
            response.setUserName(order.getUser().getName());

            List<OrderItemResponse> items = new ArrayList<>();
            for (OrderItem item : order.getOrderItems()) {
                OrderItemResponse ir = new OrderItemResponse();
                ir.setProductId(item.getProduct().getId());
                ir.setProductName(item.getProduct().getName());
                ir.setQuantity(item.getQuantity());
                ir.setPrice(item.getPrice());
                items.add(ir);
            }

            response.setItems(items);
            responses.add(response);
        }

        return responses;
    }
    

}



    