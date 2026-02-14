package com.rizwan.demo.repository;

import com.rizwan.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.rizwan.demo.entity.OrderItem;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);
    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.email = :email")
    List<Order> findByUserEmail(@Param("email") String email);
             
}