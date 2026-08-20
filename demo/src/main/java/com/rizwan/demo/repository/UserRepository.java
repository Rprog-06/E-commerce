package com.rizwan.demo.repository;

import com.rizwan.demo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
         Optional<Users> findByEmailAndPassword(String email,String Password);
         boolean existsByEmail(String email);
            Optional<Users> findByEmail(String email);
}
