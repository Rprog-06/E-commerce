package com.rizwan.demo.service;

// import org.springframework.stereotype.Service;
// import java.util.List;

// import org.springframework.transaction.annotation.Transactional;
// import com.rizwan.demo.entity.Users;
// import com.rizwan.demo.repository.UserRepository;
// import com.rizwan.demo.exception.UserNotFoundException;

// @Service
// public class HelloService {

//     private final UserRepository userRepository;

//     public HelloService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     public String getMessage() {
        
//         return "Hello from Service layer 🚀";
//     }
//      public String findUserById(int id) {
//         if (id != 1) {
//             throw new UserNotFoundException("User not found with id " + id);
//         }
//         return "User Rizwan";
//     }
//     public  Users createUser(String name, int age) {
//         Users user = new Users(name, age);
//         user.setName(name);
//         user.setAge(age);

//         return userRepository.save(user);
//     }
//     public List<Users> getAllUsers() {
//         return userRepository.findAll();
//     }

//     // GET USER BY ID
//     public Users getUserById(Long id) {
//         return userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new UserNotFoundException("User not found with id " + id)
//                 );
//     }
//     @Transactional
//     public Users updateUser(Long id, String name, int age) {

//         Users user = userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new UserNotFoundException("User not found with id " + id)
//                 );

//         user.setName(name);
//         user.setAge(age);

//         return user; // NO save()
//     }
//     @Transactional
//     public void deleteuser(Long id) {
//         User user = userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new UserNotFoundException("User not found with id " + id)
//                 );
//         userRepository.delete(user);
//     }

// }

