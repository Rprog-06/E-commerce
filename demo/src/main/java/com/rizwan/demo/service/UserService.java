package com.rizwan.demo.service;

// import com.rizwan.demo.entity.User;
// import com.rizwan.demo.exception.UserNotFoundException;
// import com.rizwan.demo.repository.UserRepository;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Sort;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.stereotype.Service;
// import java.util.List;


// @Service
// public class UserService {

//     private final UserRepository userRepository;

//     public UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     public  User createUser(String name, int age) {
//         User user = new Users();
//         user.setName(name);
//         user.setAge(age);

//         return userRepository.save(user);
//     }
//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

//     // GET USER BY ID
//     public User getUserById(Long id) {
//         return userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new UserNotFoundException("User not found with id " + id)
//                 );
//     }
//     public Page<User> getUsers(int page, int size) {
//     Pageable pageable = PageRequest.of(page, size);
//     return userRepository.findAll(pageable);
// }
// public List<User> getUsersSorted(String sortBy, String direction) {
//     Sort sort = direction.equalsIgnoreCase("desc")
//             ? Sort.by(sortBy).descending()
//             : Sort.by(sortBy).ascending();


//     return userRepository.findAll(sort);
// }
//   public Page<User> getUsersPagedSorted(int page, int size, String sortBy, String direction) {
//      Sort sort = direction.equalsIgnoreCase("desc")
//             ? Sort.by(sortBy).descending()
//             : Sort.by(sortBy).ascending();

//     Pageable pageable = PageRequest.of(page, size, sort);
//     return userRepository.findAll(pageable);
// }

// }

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rizwan.demo.dto.LoginResponse;
import com.rizwan.demo.dto.UserRegisterRequest;
import com.rizwan.demo.entity.Users;
import com.rizwan.demo.exception.ResourceNotFoundException;
import com.rizwan.demo.repository.UserRepository;
import com.rizwan.demo.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // public Users createUser(Users user) {
    //     return userRepository.save(user);
    // }
    @Transactional
    public Users registerUser(UserRegisterRequest request) {
        // Check if email already exists
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        };

        Users user = new Users();
        user.setName(request.getName());
        user.setPassword(request.getPassword()); // In real applications, hash the password!
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public Users getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    public LoginResponse login(String email, String password) {

        Users user = userRepository
                .findByEmailAndPassword(email, password)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid email or password"));
       

    // 🔥 Generate JWT
    String token =jwtUtil.generateToken(
            user.getEmail(),
            user.getRole().name()
    );

    LoginResponse response = new LoginResponse();
    response.setId(user.getId());
    response.setName(user.getName());
    response.setEmail(user.getEmail());
    response.setRole(user.getRole().name());
    response.setToken(token);   // 🔥 set token

    return response;

        
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
    
}

