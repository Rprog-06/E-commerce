package com.rizwan.demo.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.rizwan.demo.dto.OrderItemResponse;

public class OrderResponse {

    private Long orderId;
    private String status;
    private LocalDateTime orderDate;
    private Long userId;
    private String userName;
    private List<OrderItemResponse> items;
    private double totalPrice;
public double getTotalPrice() { return totalPrice; }
 public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public Long getOrderId() {
        return orderId;
    }
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public List<OrderItemResponse> getItems() {
        return items;
    }
    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}